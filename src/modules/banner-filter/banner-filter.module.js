const FullBanner = require('../../models/full-banner.model');
const { send } = require('../../utils/response-utils');
const { handleError } = require('../../utils/error-handler');
const Utils = require('../../utils/utils');
const Geocoder = require('../../services/geocoder.module');
const categories = require('../categories/categories.module');

// Delisi location is default
const DEFAULT_QUERY_COORDINATES = [41.7253668, 44.7332176];

const _getCoordinates = async (lat, lng, address) => {
    if (!isNaN(Number(lat)) && !isNaN(Number(lng))) {
        return [lat, lng];
    }

    if (address) {
        const res = await Geocoder.decode(address, 'ka');
        const decoded = res.data && Array.isArray(res.data.results) && res.data.results.length > 0;
        if (decoded) {
            const decoded_lat = res.data.results[0].geometry.location.lat;
            const decoded_lng = res.data.results[0].geometry.location.lng;

            if (!isNaN(Number(decoded_lat)) && !isNaN(Number(decoded_lng))) {
                return [decoded_lat, decoded_lng];
            }
        }
    }

    return DEFAULT_QUERY_COORDINATES;
};

const _buildQuery = (coordinates = null, categories = null) => {
    const query = {
        categories: categories ? { "$all" : categories} : undefined,
        location: coordinates ? {$near: {$geometry:{type: "Point", coordinates: coordinates}}} : undefined
    };

    return Utils.removeUndefinedValues(query);
};

const _extractCategories = (categoriesStr) => {
    if (typeof categoriesStr !== 'string') {
        return null;
    }

    const tokenized = categoriesStr
        .split(',')
        .filter(token => !!token.trim());

    return tokenized.length === 0 ? null : tokenized;
};

// @desc Filter and sort banners by the query
exports.interceptBanners = async (req, res, next) => {
    try {
        const coordinates = await _getCoordinates(req.query.lat, req.query.lng, encodeURIComponent(req.query.address));
        const categories = _extractCategories(req.query.categories);
        const skip = req.query.skip ? Number(req.query.skip) : 0;
        const limit = req.query.limit ? Number(req.query.limit) : 50;

        const query = _buildQuery(coordinates, categories);
        req.banners = await FullBanner
            .find(query)
            .skip(skip)
            .limit(limit);
        next();
    } catch (e) {
        handleError(res, e, 500);
    }
};

// @desc Get all filtered and sorted banners
// @route GET /banners/filter
// @access Public
exports.getBanners = async (req, res) => {
    try {
        if (req.banners) {
            const language = Utils.getResponseLanguage(req.query.language);
            const formatted = req.banners.map(Utils.extractBannerForLanguage(language));
            const withCategories = await categories.resolveCategories(formatted);
            send(res, 200, null, withCategories);
        }
    } catch (e) {
        handleError(res, e, 500);
    }
};

exports.countBanners = async (req, res) => {
    try {
        const categories = _extractCategories(req.query.categories);
        const query = _buildQuery(null, categories);

        const count = await FullBanner.count(query);
        send(res, 200, null, count);
    } catch (e) {
        handleError(res, e, 500);
    }
};


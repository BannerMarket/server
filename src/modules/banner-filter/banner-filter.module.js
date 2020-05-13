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

const _buildQuery = (coordinates, categories) => {
    const query = {
        categories: categories ? { "$all" : categories}: undefined,
        location: {
            $near: {
                $geometry:{
                    type: "Point",
                    coordinates: coordinates
                }
            }
        }
    };

    return Utils.removeUndefinedValues(query);
};

// @desc Filter and sort banners by the query
exports.interceptBanners = async (req, res, next) => {
    try {
        const coordinates = await _getCoordinates(req.body.lat, req.body.lng, encodeURIComponent(req.body.address));
        const categories = Array.isArray(req.params.categories) ? req.params.categories : undefined;
        const query = _buildQuery(coordinates, categories);
        req.banners = await FullBanner.find(query);
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
            const language = Utils.getResponseLanguage(req.params.language);
            const formatted = req.banners.map(Utils.extractBannerForLanguage(language));
            const withCategories = await categories.resolveCategories(formatted);
            send(res, 200, null, withCategories);
        }
    } catch (e) {
        handleError(res, e, 500);
    }
};




const FullBanner = require('../../models/full-banner.model');
const { send } = require('../../utils/response-utils');
const { handleError } = require('../../utils/error-handler');
const Utils = require('../../utils/utils');

// Delisi location is default
const DEFAULT_QUERY_COORDINATES = [41.7253668, 44.7332176];

const _buildQuery = (params) => {
    const categories = Array.isArray(params.categories) ? params.categories : undefined;
    const coordinates = params.lat && params.lng ? [params.lat, params.lng] : DEFAULT_QUERY_COORDINATES;

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
        const query = _buildQuery(req.body);
        req.banners = await FullBanner.find(query);
        next();
    } catch (e) {
        handleError(res, e, 500);
    }
};

// @desc Get all filtered and sorted banners
// @route GET /banners/filter
// @access Public
exports.getBanners = (req, res) => {
    if (req.banners) {
        send(res, 200, null, req.banners);
    }
};




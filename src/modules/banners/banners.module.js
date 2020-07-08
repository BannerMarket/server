const FullBanner = require('../../models/full-banner.model');
const Utils = require('../../utils/utils');
const { deleteImageFiles } = require('./banner-images.module');
const { send } = require('../../utils/response-utils');
const { handleError } = require('../../utils/error-handler');
const categories = require('../categories/categories.module');

// @desc Get banner by id
// @access Public
exports.interceptBanner = async (req, res, next) => {
    try {
        const id = req.params.id;

        const banner = await FullBanner.findById(id);

        if (!banner) {
            return send(res, 404, `Banner with id ${req.params.id} was not found`);
        }

        req.banner = banner;
        next();
    } catch (e) {
        handleError(res, e, 500);
    }
};

// @desc Get all banners filtered by the query
// @route GET /banners/full
// @access Public
exports.getFullBanners = async (req, res) => {
    try {
        const query = req.query;
        const banners = await FullBanner.find(query);
        send(res, 200, null, banners);
    } catch (e) {
        handleError(res, e, 500);
    }
};

// @desc Add new banner
// @route POST /banners/full
// @access Public
// todo make access Private
exports.addNewBanner = async (req, res) => {
    try {
        const banner = new FullBanner(req.body);
        await banner.save();
        send(res, 200, null, banner);
    } catch (e) {
        handleError(res, e, 500);
    }
};

// @desc Get banner by id
// @route GET /banners/full/banner/:id
// @access Public
exports.getFullBanner = (req, res) => {
    const banner = req.banner;

    if (banner) {
        send(res, 200, null, banner);
    }
};

// @desc Edit banner
// @route POST /banners/full/banner/:id
// @access Public
// todo make access Private
exports.editFullBanner = async (req, res) => {
    try {
        const banner = req.banner;

        if (!banner) {
            return;
        }

        Object.keys(req.body)
            .forEach(key => banner[key] = req.body[key]);

        await banner.save();
        send(res, 200, null, banner);
    } catch (e) {
        handleError(res, e, 500);
    }
};

// @desc Delete banner with all it's images
// @route DELETE /banners/full/banner/:id
// @access Public
// todo make access Private
exports.deleteFullBanner = async (req, res) => {
    try {
        const banner = req.banner;

        if (!banner) {
            return;
        }

        await banner.remove();
        const imageNames = banner.images.map(Utils.getFileName);
        deleteImageFiles(imageNames);

        send(res, 200);
    } catch (e) {
        handleError(res, e, 500);
    }
};

exports.getLanguageBanner = async (req, res) => {
    try {
        const banner = req.banner;

        if (banner) {
            const language = Utils.getResponseLanguage(req.query.language);
            const langBanner = Utils.extractBannerForLanguage(language)(banner);
            const withCategories = (await categories.resolveCategories([langBanner]))[0];
            send(res, 200, null, withCategories);
        }
    } catch (e) {
        handleError(res, e, 500);
    }
};

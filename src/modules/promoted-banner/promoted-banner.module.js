const { send } = require('../../utils/response-utils');
const { handleError } = require('../../utils/error-handler');
const PromotedBanner = require('../../models/promoted-banner');
const FullBanner = require('../../models/full-banner.model');
const Utils = require('../../utils/utils');
const categories = require('../categories/categories.module');

const _getLanguageBanners = async (banners, language) => {
    const languageBanners = [];

    for (let i = 0; i < banners.length; i++) {
        const langBanner = Utils.extractBannerForLanguage(language)(banners[0]);
        const withCategories = (await categories.resolveCategories([langBanner]))[0];
        languageBanners.push(withCategories);
    }

    return languageBanners;
};

exports.getBanners = async (req, res) => {
    try {
        const promotedBanners = await PromotedBanner.find({});
        const bannerIds = promotedBanners
            .map(promotedBanner => promotedBanner.bannerId);
        const banners = await FullBanner.find({_id: bannerIds});
        const language = Utils.getResponseLanguage(req.query.language);
        const languageBanners = await _getLanguageBanners(banners, language);

        send(res, 200, null, languageBanners);
    } catch (e) {
        handleError(res, e, 500);
    }
};

exports.addBanner = async (req, res) => {
    try {
        await (new PromotedBanner(req.body)).save();
        send(res, 200);
    } catch (e) {
        handleError(res, e, 500);
    }
};

exports.removeBanner = async (req, res) => {
    try {
        const bannerId = req.params.id;
        const banner = await PromotedBanner.find({bannerId});

        for (let i = 0; i < banner.length; i++) {
            await banner[i].remove();
        }

        send(res, 200);
    } catch (e) {
        handleError(res, e, 500);
    }
};

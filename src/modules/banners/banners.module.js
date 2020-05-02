const mongoose = require('mongoose');
const Utils = require('../../utils/utils');
const Box = require('../../utils/box');
const Banner = require('../../models/banner.model');
const Category = require('../../models/category.model');

function resolveCategories(req, res, categoryIds, next) {
    const query = {'_id': {$in: categoryIds.map(categoryId => mongoose.Types.ObjectId(categoryId, {}))}};
    Category.find(query, (err, categories) => {
        if (err) {
            return res.send(err);
        }

        next(categories);
    });
}

function getBanners(req, res) {
    const query = req.query;
    Banner.find(query, (err, banners) => {
        if (err) {
            return res.send(err);
        }

        res.json(banners);

        // const categoryIds = new Box(banners)
        //     .map(banners => banners.map(banner => banner.categories))
        //     .map(Utils.flatten)
        //     .fold(Utils.unique);
        //
        // resolveCategories(req, res, categoryIds, (categories) => {
        //     banners.forEach(banner => {
        //         banner.categories = banner.categories
        //             .map(categoryId => categories.find(category => category._id == categoryId));
        //     });
        //
        //
        //     res.json(banners);
        // });
    });
}

function addNewBanner(req, res) {
    const lat = Number(req.body.lat);
    const lng = Number(req.body.lng);

    const categories = Array.isArray(req.body.categories) ? req.body.categories : [];

    const titleGe = typeof req.body.titleGe === 'string' ? req.body.titleGe : '';
    const titleEn = typeof req.body.titleEn === 'string' ? req.body.titleEn : '';

    const shortDescriptionGe = typeof req.body.shortDescriptionGe === 'string' ? req.body.shortDescriptionGe : '';
    const shortDescriptionEn = typeof req.body.shortDescriptionEn === 'string' ? req.body.shortDescriptionEn : '';

    const fullDescriptionGe = typeof req.body.fullDescriptionGe === 'string' ? req.body.fullDescriptionGe : '';
    const fullDescriptionEn = typeof req.body.fullDescriptionEn === 'string' ? req.body.fullDescriptionEn : '';

    const images = Array.isArray(req.body.images) ? req.body.images : [];

    if (Number.isNaN(lat) || Number.isNaN(lng) ||
        !titleGe || !titleEn ||
        !shortDescriptionGe || !shortDescriptionEn ||
        !fullDescriptionGe || !shortDescriptionEn) {
        return res.sendStatus(400);
    }

    const banner = new Banner({
        lat, lng,
        categories,
        titleGe, titleEn,
        shortDescriptionGe, shortDescriptionEn,
        fullDescriptionGe, fullDescriptionEn,
        images
    });

    banner.save(err => {
        if (err) {
            return res.send(err);
        }
        res.status(200).json(banner);
    });
}

module.exports = {
    getBanners,
    addNewBanner,
};

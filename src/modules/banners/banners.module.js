const mongoose = require('mongoose');
const Utils = require('../../utils/utils');
const Box = require('../../utils/box');
const FullBanner = require('../../models/full-banner.model');
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

function interceptBanner(req, res, next) {
    const id = req.params.id;

    FullBanner.findById(id, (err, banner) => {
        if (err) {
            return res.send(err);
        }

        if (!banner) {
            return res.sendStatus(404);
        }
        req.banner = banner;
        next();
    });
}

function getFullBanners(req, res) {
    const query = req.query;
    FullBanner.find(query, (err, banners) => {
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

    const banner = new FullBanner({
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

function getFullBanner(req, res) {
    const banner = req.banner;

    if (banner) {
        res.json(banner);
    }
}

function editFullBanner(req, res) {
    const banner = req.banner;

    if (!banner) {
        return;
    }

    const lat = Number(req.body.lat) || banner.lat;
    const lng = Number(req.body.lng) || banner.lng;

    const categories = Array.isArray(req.body.categories) ? req.body.categories : banner.categories;

    const titleGe = typeof req.body.titleGe === 'string' ? req.body.titleGe : banner.titleGe;
    const titleEn = typeof req.body.titleEn === 'string' ? req.body.titleEn : banner.titleEn;

    const shortDescriptionGe = typeof req.body.shortDescriptionGe === 'string' ? req.body.shortDescriptionGe : banner.shortDescriptionGe;
    const shortDescriptionEn = typeof req.body.shortDescriptionEn === 'string' ? req.body.shortDescriptionEn : banner.shortDescriptionEn;

    const fullDescriptionGe = typeof req.body.fullDescriptionGe === 'string' ? req.body.fullDescriptionGe : banner.fullDescriptionGe;
    const fullDescriptionEn = typeof req.body.fullDescriptionEn === 'string' ? req.body.fullDescriptionEn : banner.fullDescriptionEn;

    const images = Array.isArray(req.body.images) ? req.body.images : banner.images;

    banner.lat = lat;
    banner.lng = lng;
    banner.categories = categories;
    banner.titleGe = titleGe;
    banner.titleEn = titleEn;
    banner.shortDescriptionGe = shortDescriptionGe;
    banner.shortDescriptionEn = shortDescriptionEn;
    banner.fullDescriptionGe = fullDescriptionGe;
    banner.fullDescriptionEn = fullDescriptionEn;
    banner.images = images;

    banner.save(err => {
        if (err) {
            return res.send(err);
        }
        res.status(201).send(banner);
    });
}

function deleteFullBanner(req, res) {
    const banner = req.banner;

    if (banner) {
        banner.remove(err => {
            if (err) {
                return res.send(err);
            }

            return res.sendStatus(204);
        });
    }
}

module.exports = {
    getFullBanners,
    addNewBanner,
    interceptBanner,
    getFullBanner,
    editFullBanner,
    deleteFullBanner,
};

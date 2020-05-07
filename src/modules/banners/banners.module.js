const FullBanner = require('../../models/full-banner.model');
const Utils = require('../../utils/utils');
const { deleteImageFiles } = require('./banner-images.module');
const { send } = require('../../utils/response-utils');

function interceptBanner(req, res, next) {
    const id = req.params.id;

    FullBanner.findById(id, (err, banner) => {
        if (err) {
            return send(res, 500, err);
        }

        if (!banner) {
            return send(res, 404, `Banner with this id ${req.params.id} not found`);
        }
        req.banner = banner;
        next();
    });
}

function getFullBanners(req, res) {
    const query = req.query;
    FullBanner.find(query, (err, banners) => {
        if (err) {
            return send(res, 500, err);
        }

        send(res, 200, null, banners);
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
        return send(res, 400, 'Bad params');
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
            return send(res, 500, err);
        }
        send(res, 200, null, banner);
    });
}

function getFullBanner(req, res) {
    const banner = req.banner;

    if (banner) {
        send(res, 200, null, banner);
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
            return send(res, 500, err);
        }
        send(res, 201, null, banner);
    });
}

function deleteFullBanner(req, res) {
    const banner = req.banner;

    if (banner) {
        banner.remove(err => {
            if (err) {
                return send(res, 500, err);
            }

            const imageNames = banner.images
                .map(Utils.getFileName);
            deleteImageFiles(imageNames);

            send(res, 204);
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

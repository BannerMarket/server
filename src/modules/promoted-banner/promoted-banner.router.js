const express = require('express');
const ROUTES = require('./promoted-banner.config');
const {getBanners, addBanner, removeBanner} = require('./promoted-banner.module');

function routes() {
    const router = express.Router();

    router.route(ROUTES.promotedBanners)
        .get(getBanners)
        .post(addBanner);

    router.route(ROUTES.promotedBanner)
        .delete(removeBanner);

    return router;
}

module.exports = routes;

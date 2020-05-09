const express = require('express');
const ROUTES = require('./banner-filter-routes.config');
const banners = require('./banner-filter.module');

function routes() {
    const bannerFilterRouter = express.Router();

    bannerFilterRouter.use(ROUTES.banners, banners.interceptBanners);

    bannerFilterRouter.route(ROUTES.banners)
        .get(banners.getBanners);

    return bannerFilterRouter;
}

module.exports = routes;

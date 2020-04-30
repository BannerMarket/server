const express = require('express');
const ROUTES = require('./banners-routes.config');
const banners = require('./banners.module');

function routes() {
    const bannerRouter = express.Router();

    bannerRouter.route(ROUTES.banners)
        .get(banners.getBanners)
        .post(banners.addNewBanner);

    return bannerRouter;
}

module.exports = routes;

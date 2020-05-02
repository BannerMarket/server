const express = require('express');
const ROUTES = require('./banners-routes.config');
const banners = require('./banners.module');
const images = require('./banner-images.module');

function routes() {
    const bannerRouter = express.Router();

    bannerRouter.route(ROUTES.banners)
        .get(banners.getBanners)
        .post(banners.addNewBanner);

    bannerRouter.route(ROUTES.bannerImages)
        .post(images.uploadImages);

    return bannerRouter;
}

module.exports = routes;

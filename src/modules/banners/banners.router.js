const express = require('express');
const ROUTES = require('./banners-routes.config');
const banners = require('./banners.module');
const images = require('./banner-images.module');

function routes() {
    const bannerRouter = express.Router();

    bannerRouter.use(ROUTES.fullBanner, banners.interceptBanner);

    bannerRouter.route(ROUTES.fullBanners)
        .get(banners.getFullBanners)
        .post(banners.addNewBanner);

    bannerRouter.route(ROUTES.fullBanner)
        .get(banners.getFullBanner)
        .post(banners.editFullBanner)
        .delete(banners.deleteFullBanner);

    bannerRouter.route(ROUTES.bannerImages)
        .post(images.uploadImages);

    return bannerRouter;
}

module.exports = routes;

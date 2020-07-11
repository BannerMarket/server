const express = require('express');
const ROUTES = require('./hero-images.config');
const HeroImages = require('./hero-images.module');

function routes() {
    const router = express.Router();

    router.route(ROUTES.images)
        .get(HeroImages.getImageUrls);

    router.route(ROUTES.uploadImages)
        .post(HeroImages.upload);

    router.route(ROUTES.deleteImages)
        .post(HeroImages.delete);

    return router;
}

module.exports = routes;

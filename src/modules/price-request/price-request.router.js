const express = require('express');
const ROUTES = require('./price-request.config');
const {getRequests, addRequest, removeRequest} = require('./price-request.module');

function routes() {
    const router = express.Router();

    router.route(ROUTES.priceRequests)
        .get(getRequests)
        .post(addRequest);

    router.route(ROUTES.priceRequest)
        .delete(removeRequest);

    return router;
}

module.exports = routes;

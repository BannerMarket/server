const express = require('express');
const ROUTES = require('./auth-router.config');
const auth = require('./auth.module');

function routes() {
    const router = express.Router();

    router.route(ROUTES.register)
        .post(auth.register);

    return router;
}

module.exports = routes;

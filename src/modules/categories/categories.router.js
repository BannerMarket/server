const express = require('express');
const ROUTES = require('./categories-routes.config');
const categories = require('./categories.module');

function routes() {
    const categoriesRouter = express.Router();

    categoriesRouter.route(ROUTES.categories)
        .get(categories.getCategories)
        .post(categories.addNewCategory);

    return categoriesRouter;
}

module.exports = routes;

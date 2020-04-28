const express = require('express');
const ROUTES = require('./categories-routes.config');
const categories = require('./categories.module');

function routes() {
    const categoriesRouter = express.Router();

    categoriesRouter.use(ROUTES.category, categories.interceptCategory);

    categoriesRouter.route(ROUTES.categories)
        .get(categories.getCategories)
        .post(categories.addNewCategory);

    categoriesRouter.route(ROUTES.category)
        .get(categories.getCategory)
        .post(categories.editCategory)
        .delete(categories.deleteCategory);

    return categoriesRouter;
}

module.exports = routes;

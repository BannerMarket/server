const express = require('express');
const ROUTES = require('./dictionary-routes.config');
const dictionary = require('./dictionary.module');

function routes() {
    const dictionaryRouter = express.Router();

    dictionaryRouter.route(ROUTES.translation)
        .get(dictionary.getTranslation)
        .put(dictionary.setTranslation)
        .delete(dictionary.removeTranslation);

    dictionaryRouter.route(ROUTES.dictionary)
        .get(dictionary.getDictionary);

    return dictionaryRouter;
}

module.exports = routes;

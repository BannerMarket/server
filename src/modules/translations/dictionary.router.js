const express = require('express');
const ROUTES = require('./dictionary-routes.config');
const {getTranslation, setTranslation, removeTranslation, getDictionary} = require('./dictionary.module');

function routes() {
    const dictionaryRouter = express.Router();

    dictionaryRouter.route(ROUTES.translation)
        .get(getTranslation)
        .put(setTranslation)
        .delete(removeTranslation);

    dictionaryRouter.route(ROUTES.dictionary)
        .get(getDictionary);

    return dictionaryRouter;
}

module.exports = routes;

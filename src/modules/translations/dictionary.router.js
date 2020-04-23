const express = require('express');
const ROUTES = require('./routes.config');
const dictionary = require('./dictionary.module');

function routes() {
    const dictionaryRouter = express.Router();
    dictionaryRouter.use(ROUTES.translation, dictionary.translationResolver);

    dictionaryRouter.route(ROUTES.translation)
        .get(dictionary.getTranslation)
        .put(dictionary.setTranslation);

    dictionaryRouter.route(ROUTES.dictionary)
        .get(dictionary.getDictionary);

    return dictionaryRouter;
}

module.exports = routes;

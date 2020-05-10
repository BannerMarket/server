const express = require('express');
const ROUTES = require('./place-autocomplete-routes.config');
const placesAutocomplete = require('./places-autocomplete.module');

function routes() {
    const placesAutocompleteRouter = express.Router();

    placesAutocompleteRouter.route(ROUTES.autocomplete)
        .get(placesAutocomplete.getSuggestions);

    return placesAutocompleteRouter;
}

module.exports = routes;

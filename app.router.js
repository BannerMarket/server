const dictionaryRouter = require('./src/modules/translations/dictionary.router')();
const categoriesRouter = require('./src/modules/categories/categories.router')();
const bannersRouter = require('./src/modules/banners/banners.router')();
const bannerFilterRouter = require('./src/modules/banner-filter/banner-filter.router')();
const placesAutocompleteRouter = require('./src/modules/place-autocomplete/places-autocomplete.router')();

const API_ROOT = 'api';
const API_VERSION = '1';

function route(app) {
    app.use(`/${API_ROOT}/v${API_VERSION}`, dictionaryRouter);
    app.use(`/${API_ROOT}/v${API_VERSION}`, categoriesRouter);
    app.use(`/${API_ROOT}/v${API_VERSION}`, bannersRouter);
    app.use(`/${API_ROOT}/v${API_VERSION}`, bannerFilterRouter);
    app.use(`/${API_ROOT}/v${API_VERSION}`, placesAutocompleteRouter);
}

module.exports = route;

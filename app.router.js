const dictionaryRouter = require('./src/modules/translations/dictionary.router')();
const categoriesRouter = require('./src/modules/categories/categories.router')();
const bannersRouter = require('./src/modules/banners/banners.router')();
const bannerFilterRouter = require('./src/modules/banner-filter/banner-filter.router')();
const placesAutocompleteRouter = require('./src/modules/place-autocomplete/places-autocomplete.router')();
const priceRequestRouter = require('./src/modules/price-request/price-request.router')();
const heroImagesRouter = require('./src/modules/hero-images/hero-images.router')();
const promotedBannersRouter = require('./src/modules/promoted-banner/promoted-banner.router')();

const API_ROOT = 'api';
const API_VERSION = '1';
const API_PREFIX = `/${API_ROOT}/v${API_VERSION}`;

function route(app) {
    app.use(API_PREFIX, dictionaryRouter);
    app.use(API_PREFIX, categoriesRouter);
    app.use(API_PREFIX, bannersRouter);
    app.use(API_PREFIX, bannerFilterRouter);
    app.use(API_PREFIX, placesAutocompleteRouter);
    app.use(API_PREFIX, priceRequestRouter);
    app.use(API_PREFIX, heroImagesRouter);
    app.use(API_PREFIX, promotedBannersRouter);
}

module.exports = route;

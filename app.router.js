const dictionaryRouter = require('./src/modules/translations/dictionary.router')();
const categoriesRouter = require('./src/modules/categories/categories.router')();
const bannersRouter = require('./src/modules/banners/banners.router')();

const API_ROOT = 'api';
const API_VERSION = '1';

function route(app) {
    app.use(`/${API_ROOT}/v${API_VERSION}`, dictionaryRouter);
    app.use(`/${API_ROOT}/v${API_VERSION}`, categoriesRouter);
    app.use(`/${API_ROOT}/v${API_VERSION}`, bannersRouter);
}

module.exports = route;

const dictionaryRouter = require('./src/modules/translations/dictionary.router')();
const categoriesRouter = require('./src/modules/categories/categories.router')();

const API_ROOT = 'api';
const API_VERSION = '1';

function route(app) {
    app.use(`/${API_ROOT}/v${API_VERSION}`, dictionaryRouter);
    app.use(`/${API_ROOT}/v${API_VERSION}`, categoriesRouter);
}

module.exports = route;

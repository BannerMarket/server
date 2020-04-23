const dictionaryRouter = require('./src/modules/translations/dictionary.router')();

function route(app) {
    app.use('/api/v1', dictionaryRouter);
}

module.exports = route;

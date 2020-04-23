const mongoose = require('mongoose');
const {Schema} = mongoose;

const translationModel = new Schema({
    _id: {type: String},
    en: {type: String},
    ge: {type: String}
});

module.exports = mongoose.model('Translation', translationModel);

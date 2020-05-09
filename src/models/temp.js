const mongoose = require('mongoose');
const {Schema} = mongoose;

const fullBannerModel = new Schema({
    lat: {type: Number, required: true},
    lng: {type: Number, required: true},
    categories: [{type: String}],
    titleGe: {type: String, required: true},
    titleEn: {type: String, required: true},
    shortDescriptionGe: {type: String, required: true},
    shortDescriptionEn: {type: String, required: true},
    fullDescriptionGe: {type: String, required: true},
    fullDescriptionEn: {type: String, required: true},
    images: [{type: String}]
});

module.exports = mongoose.model('FullBanner', fullBannerModel);

const mongoose = require('mongoose');
const {Schema} = mongoose;

const fullBannerModel = new Schema({
    lat: {type: Number},
    lng: {type: Number},
    categories: [{type: String}],
    titleGe: {type: String},
    titleEn: {type: String},
    shortDescriptionGe: {type: String},
    shortDescriptionEn: {type: String},
    fullDescriptionGe: {type: String},
    fullDescriptionEn: {type: String},
    images: [{type: String}]
});

module.exports = mongoose.model('FullBanner', fullBannerModel);

const mongoose = require('mongoose');
const {Schema} = mongoose;

const bannerModel = new Schema({
    lat: {type: Number},
    lng: {type: Number},
    categories: [{type: String}],
    title: {type: String},
    shortDescription: {type: String},
    fullDescription: {type: String},
    images: [{type: String}]
});

module.exports = mongoose.model('Banner', bannerModel);

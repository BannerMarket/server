const mongoose = require('mongoose');
const {Schema} = mongoose;

const FullBannerModel = new Schema({
    lat: {
        type: Number,
        required: [true, 'Please add latitude']
    },
    lng: {
        type: Number,
        required: [true, 'Please add longitude']
    },
    directionsGe: {
        type: String,
        required: [true, 'Please add directions in Georgian']
    },
    directionsEn: {
        type: String,
        required: [true, 'Please add directions in English']
    },
    location: {
        type: {
            type: String,
            enum: ['Point']
        },
        coordinates: {
            type: [Number],
            index: '2dsphere'
        }
    },
    categories: [{type: String}],
    titleGe: {
        type: String,
        required: [true, 'Please add title in Georgian']
    },
    titleEn: {
        type: String,
        required: [true, 'Please add title in English']
    },
    shortDescriptionGe: {
        type: String,
        required: [true, 'Please add short description in Georgian']
    },
    shortDescriptionEn: {
        type: String,
        required: [true, 'Please add short description in English']
    },
    fullDescriptionGe: {
        type: String,
        required: [true, 'Please add full description in Georgian']
    },
    fullDescriptionEn: {
        type: String,
        required: [true, 'Please add full description in English']
    },
    images: [{type: String}],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

FullBannerModel.index({ location: '2dsphere' });

FullBannerModel.pre('save', function(next) {
    this.lat = Number(this.lat);
    this.lng = Number(this.lng);
    this.categories = this.categories ? this.categories : [];
    this.images = this.images ? this.images : [];

    this.location = {
        type: 'Point',
        coordinates: [this.lat, this.lng]
    };

    next();
});

module.exports = mongoose.model('FullBanner', FullBannerModel);

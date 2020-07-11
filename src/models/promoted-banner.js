const mongoose = require('mongoose');
const {Schema} = mongoose;

const promotedBannerModel = new Schema({
    bannerId: {
        type: String,
        required: [true, 'Please add banner id']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('PromotedBanner', promotedBannerModel);

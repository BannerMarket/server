const mongoose = require('mongoose');
const {Schema} = mongoose;

const priceRequestModel = new Schema({
    phone: {
        type: String,
        required: [true, 'Please add phone number']
    },
    bannerId: {
        type: String,
        required: [true, 'Please add banner id']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('PriceRequest', priceRequestModel);

const mongoose = require('mongoose');
const {Schema} = mongoose;

const heroImageModel = new Schema({
    path: {
        type: String,
        required: [true, 'Please add path to an image']
    },
    fileName: {
        type: String,
        required: [true, 'Please add file name']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('HeroImage', heroImageModel);

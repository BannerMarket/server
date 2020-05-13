const mongoose = require('mongoose');
const {Schema} = mongoose;

const translationModel = new Schema({
    _id: {
        type: String
    },
    en: {
        type: String,
        required: [true, "Please add English translation"],
        trim: true,
    },
    ge: {
        type: String,
        required: [true, "Please add Georgian translation"],
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Translation', translationModel);

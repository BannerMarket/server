const mongoose = require('mongoose');
const {Schema} = mongoose;

const categoryModel = new Schema({
    name: {
        type: String,
        required: [true, 'Please add name']
    },
    parentId: {
        type: String
    },
    sortOrder: {
        type: Number,
        required: [true, 'please add sort order']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Category', categoryModel);

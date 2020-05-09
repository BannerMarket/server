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
    }
});

module.exports = mongoose.model('Category', categoryModel);

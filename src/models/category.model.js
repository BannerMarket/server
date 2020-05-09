const mongoose = require('mongoose');
const {Schema} = mongoose;

const categoryModel = new Schema({
    name: {type: String, required: true},
    parentId: {type: String},
    sortOrder: {type: Number, required: true}
});

module.exports = mongoose.model('Category', categoryModel);

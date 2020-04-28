const mongoose = require('mongoose');
const {Schema} = mongoose;

const categoryModel = new Schema({
    name: {type: String},
    parentId: {type: String},
    sortOrder: {type: Number}
});

module.exports = mongoose.model('Category', categoryModel);

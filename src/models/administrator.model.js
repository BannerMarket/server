const mongoose = require('mongoose');
const {Schema} = mongoose;

const administratorModel = new Schema({
    username: {
        type: String,
        required: [true, 'Please add username']
    },
    password: {
        type: String,
        required: [true, 'Please add password']
    },
});

module.exports = mongoose.model('Administrator', administratorModel);

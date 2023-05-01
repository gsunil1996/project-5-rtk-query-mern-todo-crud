const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('listtodos', todoSchema);
const mongoose = require("mongoose")

module.exports = mongoose.model('ChatSession', new mongoose.Schema({
    _id : String,
    name : String,
    chat_position : String
}, { timestamps: true }))
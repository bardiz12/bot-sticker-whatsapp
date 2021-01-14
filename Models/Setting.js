const mongoose = require("mongoose")

module.exports = mongoose.model('Setting', new mongoose.Schema({
    _id : String,
    value : String
}, { timestamps: true }))
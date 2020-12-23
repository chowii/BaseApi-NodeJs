const mongoose = require('mongoose')

const moviesSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    year: Number,
    type: String,
    rated: String,
})

module.exports = mongoose.model('Movie', moviesSchema)

const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: String,
    authors: [String],
    thumbnail: String,
    category: String,
    notes: String
});

module.exports = mongoose.model('Book', bookSchema);
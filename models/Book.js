const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    coverUrl: String,
    openLibraryId: String,
    rating: Number,
    notes: String,
    dateAdded: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Book", bookSchema);
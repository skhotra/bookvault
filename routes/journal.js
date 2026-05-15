const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

/* View all saved books */
router.get("/", async (request, response) => {
    try {
        const books = await Book.find({});
        response.render("journal", { books });
    } catch (e) {
        console.error(e);
    }
});

/* Save a book from search results */
router.post("/save", async (request, response) => {
    try {
        const book = new Book({
            title: request.body.title,
            author: request.body.author,
            coverUrl: request.body.coverUrl,
            openLibraryId: request.body.openLibraryId,
            rating: parseInt(request.body.rating),
            notes: request.body.notes
        });
        await book.save();
        response.render("saved", {
            title: book.title,
            author: book.author,
            rating: book.rating,
            notes: book.notes,
            date: new Date()
        });
    } catch (e) {
        console.error(e);
    }
});

/* Delete a single book by id */
router.post("/delete/:id", async (request, response) => {
    try {
        await Book.findByIdAndDelete(request.params.id);
        response.redirect("/journal");
    } catch (e) {
        console.error(e);
    }
});

/* Show remove-all confirmation page */
router.get("/remove", (request, response) => {
    response.render("remove");
});

/* Remove all books */
router.post("/processRemove", async (request, response) => {
    try {
        const result = await Book.deleteMany({});
        response.render("processRemove", {
            count: result.deletedCount,
            date: new Date()
        });
    } catch (e) {
        console.error(e);
    }
});

module.exports = router;
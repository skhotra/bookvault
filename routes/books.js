const express = require("express");
const router = express.Router();

router.get("/search", (request, response) => {
    response.render("search");
});

router.get("/results", async (request, response) => {
    const query = request.query.q;
    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=10`;

    try {
        const fetch = (await import("node-fetch")).default;
        const res = await fetch(url);
        const data = await res.json();

        const books = data.docs.map(doc => ({
            title: doc.title || "Unknown Title",
            author: doc.author_name ? doc.author_name[0] : "Unknown Author",
            coverUrl: doc.cover_i
                ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
                : "",
            openLibraryId: doc.key || ""
        }));

        response.render("results", { books, query });
    } catch (e) {
        console.error(e);
        response.render("results", { books: [], query });
    }
});

module.exports = router;
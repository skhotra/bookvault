const path = require("path");
require("dotenv").config({
    path: path.resolve(__dirname, "credentialsDontPost/.env"),
});

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const bookRoutes = require("./routes/books");
const journalRoutes = require("./routes/journal");

const portNumber = process.env.PORT || process.argv[2];


app.set("view engine", "ejs");
app.set("views", __dirname + "/templates");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));

const uri = process.env.MONGO_CONNECTION_STRING;

mongoose.connect(uri)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));

app.use("/books", bookRoutes);
app.use("/journal", journalRoutes);

app.get("/", (request, response) => {
    response.render("index");
});

app.listen(portNumber);
process.stdout.write("Web server started and running at http://localhost:" + portNumber + "\n");
process.stdout.write("Stop to shutdown the server: ");
process.stdin.setEncoding("utf8");

process.stdin.on("readable", () => {
    const dataInput = process.stdin.read();
    if (dataInput !== null) {
        const command = dataInput.trim();
        if (command === "stop") {
            process.stdout.write("Shutting down the server\n");
            process.exit(0);
        }
    }
    process.stdout.write("Stop to shutdown the server: ");
});
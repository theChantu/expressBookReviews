const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

function doesExist(username) {
    for (const key in users) {
        if (users[key].username === username) {
            return true;
        }
    }
    return false;
}

public_users.post("/register", (req, res) => {
    //Write your code here
    const username = req.body.username;
    const password = req.body.password;

    if (username && password) {
        if (!doesExist(username)) {
            users.push({ username: username, password: password });
            return res.status(200).json({
                message: "User successfully registred. Now you can login",
            });
        } else {
            return res.status(404).json({ message: "User already exists!" });
        }
    }
    return res.status(404).json({ message: "Unable to register user." });
});

// Get the book list available in the shop
public_users.get("/", function (req, res) {
    //Write your code here
    return res.status(300).json(books);
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", function (req, res) {
    //Write your code here
    return res.status(300).json(books[req.params.isbn]);
});

// Get book details based on author
public_users.get("/author/:author", function (req, res) {
    //Write your code here
    for (const key in books) {
        if (books[key].author == req.params.author) {
            return res.status(300).json(books[key]);
        }
    }

    return res.status(300).json("No books found");
});

// Get all books based on title
public_users.get("/title/:title", function (req, res) {
    //Write your code here
    for (const key in books) {
        if (books[key].title == req.params.title) {
            return res.status(300).json(books[key]);
        }
    }

    return res.status(300).json("No books found");
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
    //Write your code here
    return res.status(300).json(books[req.params.isbn].reviews);
});

module.exports.general = public_users;

const express = require("express");
const jwt = require("jsonwebtoken");
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => {
    //returns boolean
    //write code to check is the username is valid
};

const authenticatedUser = (username, password) => {
    //returns boolean
    //write code to check if username and password match the one we have in records.
    for (const key in users) {
        if (
            users[key].username === username &&
            users[key].password === password
        ) {
            return true;
        }
    }
    return false;
};

//only registered users can login
regd_users.post("/login", (req, res) => {
    //Write your code here
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        return res.status(404).json({ message: "Error logging in" });
    }

    if (authenticatedUser(username, password)) {
        let accessToken = jwt.sign(
            {
                data: password,
            },
            "access",
            { expiresIn: 60 * 60 }
        );

        req.session.authorization = {
            accessToken,
            username,
        };
        return res.status(200).send("User successfully logged in");
    } else {
        return res
            .status(208)
            .json({ message: "Invalid Login. Check username and password" });
    }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    //Write your code here
    const review = req.query.review;
    const username = req.session.authorization.username;
    const isbn = req.params.isbn;
    books[isbn].reviews = { ...books[isbn].reviews, [username]: review };
    // return res.status(200).json("Successfully added review");
    return res.status(200).json(books[isbn]);
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
    //Write your code here
    const review = req.query.review;
    const username = req.session.authorization.username;
    const isbn = req.params.isbn;
    const bookReviews = books[isbn].reviews;
    delete bookReviews[username];
    // return res.status(200).json("Successfully deleted review");
    return res.status(200).json(books[isbn]);
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;

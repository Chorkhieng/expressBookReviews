const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
    const password = req.body.password;
    // Check if both username and password are provided
    if (username && password) {
        // Check if the user does not already exist
        if (!isValid(username)) {
            // Add the new user to the users array
            users.push({"username": username, "password": password});
            // console.log(users);
            return res.status(200).json({message: "User successfully registered. Now you can login"});
            
        } else {
            return res.status(404).json({message: "User already exists!"});
        }
    }
    // Return error if username or password is missing
    return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.status(300).json(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  return res.status(300).json(books[isbn]);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author.toLowerCase().trim();

    const matchingBooks = Object.values(books).filter(book => book.author.toLowerCase().split(' ').join('') === author);

    if (matchingBooks.length === 0) {
        return res.status(404).json({ message: "No books found for this author" });
    }

    return res.status(300).json(matchingBooks);
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
  //Write your code here
  const title = req.params.title;
  const matchingBooks = Object.values(books).filter(book => book.title.toLowerCase().split(' ').join('') === title);
  if (matchingBooks.length === 0) {
    return res.status(404).json({message: " No books found for this title"});
  }
  return res.status(300).json(matchingBooks);
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  const matchingReviews = books[isbn];
  if (matchingReviews.length === 0) {
    return res.status(404).json({message: " No books found for this ISBN"});
  }
  return res.status(300).json(matchingReviews);
});


module.exports.general = public_users;

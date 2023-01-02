const express = require('express');
const {books} = require('../data/books.json');
const {users} = require('../data/users.json');
const { UserModel, BookModel } = require('../models');
const {getAllBooks,getSingleBookById,getAllIssuedBooks,addNewBook,updateBookById,getSingleBookByName } = require("../controllers/book-controller")
const router = express.Router();



/**
 * Route : /books
 * Method : Get
 * Description : Getting all books
 * Access : Public
 * Parameters : none
 */
router.get('/',getAllBooks);

/**
 * Route : /books/:id
 * Method : Get
 * Description : Getting book by id
 * Access : Public
 * Parameters : id
 */
router.get('/:id',getSingleBookById)

/**
 * Route : /books/issued/by-user
 * Method : Get
 * Description : Getting  all issued book 
 * Access : Public
 * Parameters : none
 */
router.get("/issued/by-user", getAllIssuedBooks)

router.get("/getbook/name/:name",getSingleBookByName);

/**
 * Route : /books
 * Method : Post
 * Description : Create new book 
 * Access : Public
 * Parameters : none
 * Data : aothor, name, genre , publisher ,id
 */

router.post('/', addNewBook)

/**
 * Route : /books/:id
 * Method : Put
 * Description : Update book
 * Access : Public
 * Parameters : id
 * Data : aothor, name, genre , publisher ,id
 */

router.put("/:id",updateBookById)


//default export
module.exports = router;
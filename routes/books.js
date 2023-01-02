const express = require('express');
const {books} = require('../data/books.json');
const {users} = require('../data/users.json');
const { UserModel, BookModel } = require('../models');
const {getAllBooks,getSingleBookById,getAllIssuedBooks } = require("../controllers/book-controller")
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

/**
 * Route : /books
 * Method : Post
 * Description : Create new book 
 * Access : Public
 * Parameters : none
 * Data : aothor, name, genre , publisher ,id
 */

router.post('/', (req,res)=>{
    const {data} = req.body;

    if(!data){
        return res.status(400).json({
          success : false,
          message : "No data provided"  
        })
    }
    const book = books.find((each)=> each.id === data.id);

    if(book){
        return res.status(404).json({
            success: false,
            message: "Book already existes with this id ,please use a unique id"
        })
    }

    const allBooks = [...books ,data];
        return res.status(201).json({
            success : true,
            data : allBooks
        })
})

/**
 * Route : /books/:id
 * Method : Put
 * Description : Update book
 * Access : Public
 * Parameters : id
 * Data : aothor, name, genre , publisher ,id
 */

router.put("/:id",(req,res)=>{
    const {id} = req.params;
    const {data} = req.body;

    const book = books.find((each)=> each.id === id);

    if(!book){
        return res.status(404).json({
            success: false,
            message: "Book not found with this perticular id"
        })
    }

    const updateData = books.map((each)=>{
        if(each.id === id ){
            return {...each ,...data}
        }
        return each
    })
    return res.status(200).json({
        success: true,
        data: updateData
    })
})


//default export
module.exports = router;
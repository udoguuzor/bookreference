import express, { Router } from "express"

import { createBook, deleteAllBooks, deleteBook, getABook, getAllBooks, updateBook } from "../controller/BookController"

export const bookRouter:Router = express.Router()


bookRouter.post("/books/create/:id", createBook)
bookRouter.get("/getOne/:id", getABook)
bookRouter.get("/getAll", getAllBooks)
bookRouter.patch("/update", updateBook)
bookRouter.delete("/deletebook/:id", deleteBook)
bookRouter.delete("/Allbooks", deleteAllBooks)
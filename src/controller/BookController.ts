import { Request, Response } from "express";
import { bookModel, Ibook } from "../model/bookModel";
import { userModel } from "../model/userModel";

// Create a new book
export const createBook = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { author,yearOfPublication , title, category } = req.body;

        const user = await userModel.findById(id);

        if (!user) {
            res.status(404).json({ error: "user not found" })
            return;
        }

        if (!user.isLogin) {
            res.status(401).json({ error: "User not loggedin" })
            return;
        }

        const book = new bookModel({
            title, yearOfPublication,
            seller: user._id,
            author, category
        });

        await book.save()

        await userModel.findByIdAndUpdate(user._id, { $push: { books: book._id } })

        res.status(201).json({ message: "Book created successfully", data: book })
    }
    catch (err: any) {
        res.status(500).json({ message: "Failed to create book", err })
    }
}



// Get all books
export const getAllBooks = async (req: Request, res: Response): Promise<void> => {
    try {
        const allBooks = await bookModel.find();
        res.status(200).json({ message: "Books retrieved successfully", data: allBooks });
        return;
    } catch (err: any) {
        res.status(500).json({ message: "An error occurred trying to get all books", error: err.message });
        return;
    }
};


export const getABook = async (req: Request, res: Response): Promise<void> => {
    try {
        const aBook = await bookModel.findById(req.params.id);
        if (!aBook) {
            res.status(404).json({ message: "Book not found" });
            return;
        }
        res.status(200).json({ message: "Book retrieved successfully", data: aBook });
        return;
    } catch (err: any) {
        res.status(500).json({ message: "An error occurred trying to get book", error: err.message });
        return;
    }
};

// Update a book by ID
export const updateBook = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, author, yearOfPublication, category, seller } = req.body as Partial<Ibook>;
        
        // Find the book and update it with the data from the request body
        // The second argument, req.body, was missing and has been added.
        const updatedBook = await bookModel.findByIdAndUpdate(
            req.params.id, 
            { title, author, yearOfPublication, category, seller }, 
            { new: true }
        );

        if (!updatedBook) {
            // Changed status to 404 as the book was not found
            res.status(404).json({ message: "Book not found" });
            return;
        }
        res.status(200).json({ message: "Book updated successfully", data: updatedBook });
    } catch (err: any) {
        res.status(500).json({ message: "An error occurred trying to update book", error: err.message });
        return;
    }
};

// Delete a book by ID
export const deleteBook = async (req: Request, res: Response): Promise<void> => {
    try {
        const deletedBook = await bookModel.findByIdAndDelete(req.params.id);
        if (!deletedBook) {
            res.status(404).json({ message: "No book found to delete" });
            return;
        }
        // Use a 200 OK status for a successful deletion
        res.status(200).json({ message: "Book deleted successfully" });
        return;
    } catch (err: any) {
        res.status(500).json({ message: "An error occurred trying to delete book", error: err.message });
        return;
    }
};

// Delete all books
export const deleteAllBooks = async (req: Request, res: Response) => {
    try {
        await bookModel.deleteMany();
        res.status(200).json({ message: "All books deleted successfully" });
        return;
    } catch (err: any) {
        res.status(500).json({ message: "An error occurred trying to delete all books", error: err.message });
        return;
    }
};

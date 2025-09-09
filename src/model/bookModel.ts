import mongoose from "mongoose";

export interface Ibook extends Document {
    title: string;
    author: string;
    yearOfPublication: number;
    category: string;
    seller: mongoose.Types.ObjectId[];
}

const bookSchema: mongoose.Schema<Ibook> = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    yearOfPublication: { type: Number, required: true },
    category: { type: String, required: true },
    seller: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
});

export const bookModel = mongoose.model<Ibook>("books", bookSchema);

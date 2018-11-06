
import mongoose from "mongoose";

export type BookModel = mongoose.Document & {
    image: string,
    name: string,
    description: string,
};

const bookSchema = new mongoose.Schema({
    image: String,
    name: String,
    description: String,
}, { timestamps: true });


const Book = mongoose.model("Book", bookSchema);
export default Book;

import { Request, Response } from "express";
import { BookModel, default as Book } from "../models/Book";


/**
 * GET /
 * Home page.
 */
export let index = (req: Request, res: Response) => {
    Book.find({}, function (err, books: any[]) {
        if (err) console.log(err);
        res.render("home", {
            title: "Home",
            books: books
        });
    });
};

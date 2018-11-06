import { NextFunction, Request, Response } from "express";
import { default as Book } from "../models/Book";


/**
 * GET /contact
 * Contact form page.
 */
export let getAddBook = (req: Request, res: Response) => {
    res.render("book/add", {
        title: "Add book"
    });
};

export let postAddBook = (req: Request, res: Response, next: NextFunction) => {
    req.assert("image", "Image is not empty").notEmpty();
    req.assert("name", "Name is not empty").len({ min: 4 });

    const errors = req.validationErrors();

    if (errors) {
        req.flash("errors", errors);
        return res.redirect("/book/add");
    }

    const book = new Book({
        image: req.body.image,
        name: req.body.name,
        description: req.body.description
    });
    book.save((err) => {
        if (err) { return next(err); }
        req.flash("success", "OK!");
        return res.redirect("/book/add");
    });
};

export let getAllBook = (req: Request, res: Response) => {
    Book.find({}, function (err, books: any[]) {
        if (err) console.log(err);
        res.json(books);
    });
};
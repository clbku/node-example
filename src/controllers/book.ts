import { NextFunction, Request, Response } from "express";
import { BookModel, default as Book } from "../models/Book";
import { WriteError } from "mongodb";


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
        res.redirect("/admin");
    });
};

export let getDeleteBook = (req: Request, res: Response, next: NextFunction) => {
    Book.remove({ _id: req.params.id }, (err) => {
        if (err) { return next(err); }
        req.flash("success", "OK!");
        res.redirect("/admin");
    });
};

export let getEditBook = (req: Request, res: Response) => {
    Book.findById(req.params.id, function (err, book) {
        if (err) {
            console.log(err);
        }
        res.render("book/edit", {
            title: "Edit Book",
            book: book
        });
    });
};

export let postEditBook = (req: Request, res: Response, next: NextFunction) => {
    req.assert("image", "image not empty").notEmpty();
    req.assert("name", "name not empty").notEmpty();
    req.assert("description", "description not empty").notEmpty();

    const errors = req.validationErrors();

    if (errors) {
        req.flash("errors", errors);
        return res.redirect("/admin");
    }

    Book.findById(req.params.id, (err, book: BookModel) => {
        if (err) { return next(err); }
        book.image = req.body.image;
        book.name = req.body.name ;
        book.description = req.body.description ;
        book.save((err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", { msg: "OK!" });
            res.redirect("/admin");
        });
    });
};


export let getAllBook = (req: Request, res: Response) => {
    Book.find({}, function (err, books: any[]) {
        if (err) console.log(err);
        res.json(books);
    });
};
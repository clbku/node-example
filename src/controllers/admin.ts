import { NextFunction, Request, Response } from "express";
import { BookModel, default as Book } from "../models/Book";
import User, { UserModel } from "../models/User";
import { any } from "async";

export let getAdmin = (req: Request, res: Response) => {

    User.find({}, function (err, userList: UserModel) {
        if (err) console.log(err);
        Book.find({}, function (err, bookList: BookModel) {
            if (err) console.log(err);
            res.render("admin", {
                title: "Admin",
                books: bookList,
                users: userList
            });
        });
    });
};


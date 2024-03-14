import {Request, Response, NextFunction, Handler} from "express";
import UserM from "../database/models/user.schema";
import e from "../assets/errors/list.error";
import tryController from "../assets/errors/tryController";

const userExistence: Handler = tryController(async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserM.exists({email: req.body.email});

    if (user) throw e["403"];

    next();
});

export default userExistence;
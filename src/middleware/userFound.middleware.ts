import {Request, Response, NextFunction, Handler} from "express";
import UserM from "../database/models/user.schema";
import {IUser} from "../assets/interfaces/user.interface";
import tryController from "../assets/errors/tryController";
import e from "../assets/errors/list.error";

const userFound: Handler = tryController(async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserM.findOne({email: req.body.email}) as IUser;

    if (!user) throw e["401"];

    req.body.userFoundMiddleware = user;

    next();
});

export default userFound;
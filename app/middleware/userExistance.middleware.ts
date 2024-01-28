import {Request, Response, NextFunction} from "express";
import UserM from "../database/models/user.schema";
import {Types} from "mongoose";

const userExistance = async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserM.exists({email: req.body.email});

    if (user) {
        res.status(400).send("User already existed");

        return;
    }

    next();
}

export default userExistance;
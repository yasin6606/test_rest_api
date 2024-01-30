import {Request, Response, NextFunction} from "express";
import UserM from "../database/models/user.schema";
import ErrorHandling from "../assets/errors/ErrorHandling";

const userExistance = async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserM.exists({email: req.body.email});

    if (user)
        return ErrorHandling.sendErrorStatic(res, 403);

    next();
}

export default userExistance;
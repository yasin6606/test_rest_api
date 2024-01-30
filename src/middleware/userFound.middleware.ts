import {Request, Response, NextFunction} from "express";
import UserM from "../database/models/user.schema";
import {IUser} from "../assets/interfaces/user.interface";
import ErrorHandling from "../assets/errors/ErrorHandling";

const userFound = async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserM.findOne({email: req.body.email}) as IUser;

    if (!user)
        return ErrorHandling.sendErrorStatic(res, 401);

    req.body.userFoundMiddleware = user;

    next();
}

export default userFound;
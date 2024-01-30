import {Response, Request} from "express";
import UserM from "../database/models/user.schema";
import {compare} from "bcryptjs";
import {JwtPayload, sign, SignOptions, verify, VerifyOptions} from "jsonwebtoken";
import {Types} from "mongoose";
import {IUser} from "../assets/interfaces/user.interface";
import ErrorHandling from "../assets/errors/ErrorHandling";

class LoginController extends ErrorHandling {
    private tokenSignOpt: SignOptions = {algorithm: "HS512", expiresIn: "1h"};
    private tokenVerifyOpt: VerifyOptions = {};

    public getLoginToken = async (req: Request, res: Response): Promise<void> => {
        try {
            const user = req.body.userFoundMiddleware;

            const comparedPass: boolean = await compare(req.body.password, user.password || "");

            if (!comparedPass) return this.sendError(res, 401);

            const userToken: string = sign({id: user._id}, "salt", this.tokenSignOpt);

            res.json({userToken});
        } catch (error) {
            this.sendError(res, 500, error);
        }
    }

    public userInfo = async (req: Request, res: Response): Promise<void> => {
        try {
            if (!req.headers.authorization) return this.sendError(res, 402);

            const decodedToken = verify(req.headers.authorization, "salt", this.tokenVerifyOpt) as JwtPayload;

            const _id = new Types.ObjectId(decodedToken.id);

            const user = await UserM.findOne(_id) as IUser;

            res.json({email: user.email});
        } catch (error) {
            this.sendError(res, 500, error);
        }
    }
}

export default LoginController;
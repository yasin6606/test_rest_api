import {Response, Request, Handler} from "express";
import UserM from "../database/models/user.schema";
import {compare} from "bcryptjs";
import {JwtPayload, sign, SignOptions, verify, VerifyOptions} from "jsonwebtoken";
import {Types} from "mongoose";
import {IUser} from "../assets/interfaces/user.interface";
import tryController from "../assets/errors/tryController";
import e from "../assets/errors/list.error";

class LoginController {
    private tokenSignOpt: SignOptions = {algorithm: "HS512", expiresIn: "1h"};
    private tokenVerifyOpt: VerifyOptions = {};

    public getLoginToken: Handler = tryController(async (req: Request, res: Response): Promise<void> => {
        const user = req.body.userFoundMiddleware;

        const comparedPass: boolean = await compare(req.body.password, user.password || "");

        if (!comparedPass) throw e["400"];

        const userToken: string = sign({id: user._id}, "salt", this.tokenSignOpt);

        res.json({userToken});
    });

    public userInfo: Handler = tryController(async (req: Request, res: Response): Promise<void> => {
        if (!req.headers.authorization) throw e["402"];

        const decodedToken = verify(req.headers.authorization, "salt", this.tokenVerifyOpt) as JwtPayload;

        const _id = new Types.ObjectId(decodedToken.id);

        const user = await UserM.findOne(_id) as IUser;

        // @ts-ignore
        res.json({...user._doc, _id: undefined, password: undefined});
    });
}

export default LoginController;
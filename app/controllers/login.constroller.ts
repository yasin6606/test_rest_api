import {Response, Request} from "express";
import UserM from "../database/models/user.schema";
import {compare} from "bcryptjs";
import {JwtPayload, sign, SignOptions, verify, VerifyOptions} from "jsonwebtoken";
import {Types} from "mongoose";
import {IUser} from "../assets/interfaces/user.interface";

class LoginController {
    private tokenSignOpt: SignOptions = {algorithm: "HS512", expiresIn: "1h"};
    private tokenVerifyOpt: VerifyOptions = {};

    public getLoginToken = async (req: Request, res: Response): Promise<void> => {
        try {
            const user = await UserM.findOne({email: req.body.email});

            if (!user) throw Error("User not found");

            const comparedPass: boolean = await compare(req.body.password, user!.password || "");

            if (!comparedPass) throw Error("wrong login");

            const userToken: string = sign({id: user._id}, "salt", this.tokenSignOpt);

            res.json({userToken});
        } catch (error) {
            console.log("Error ==> ", error);
            res.status(500).json(error);
        }
    }

    public userInfo = async (req: Request, res: Response): Promise<void> => {
        try {

            if (!req.headers.authorization) throw new Error("fetch user info error!");

            const decodedToken = verify(req.headers.authorization, "salt", this.tokenVerifyOpt) as JwtPayload;

            const _id = new Types.ObjectId(decodedToken.id);

            const user = await UserM.findOne(_id) as IUser;

            // Hide user's password hash
            user.password = undefined;

            res.json(user);
        } catch (error) {
            res.sendStatus(500).send(error);
        }
    }
}

export default LoginController;
import {Response, Request, Handler} from "express";
import UserM from "../database/models/user.schema";
import tryController from "../assets/errors/tryController";
import e from "../assets/errors/list.error";

class RegisterController {
    public register: Handler = tryController(async (req: Request, res: Response): Promise<void> => {
        const newUser = new UserM({...req.body});

        let newUserCreated = await newUser.save();

        if (!newUserCreated) throw e["301"];

        // Do not reveal the password
        newUserCreated.password = undefined;

        res.status(201).json(newUserCreated)
    });
}

export default RegisterController;

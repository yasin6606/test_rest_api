import {Response, Request} from "express";
import UserM from "../database/models/user.schema";
import ErrorHandling from "../assets/errors/ErrorHandling";

class RegisterController extends ErrorHandling {
    public register = async (req: Request, res: Response): Promise<void> => {
        try {

            const newUser = new UserM({...req.body});

            let newUserCreated = await newUser.save();

            // Do not reveal the password
            newUserCreated.password = undefined;

            newUserCreated ? res.status(201).json(newUserCreated) : this.sendError(res, 301);
        } catch (error) {
            this.sendError(res, 500, error);
        }
    }
}

export default RegisterController;

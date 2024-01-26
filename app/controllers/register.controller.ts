import {Response, Request} from "express";
import UserM from "../database/models/user.schema";

class RegisterController {
    public register = async (req: Request, res: Response): Promise<void> => {
        try {

            const newUser = new UserM({...req.body});

            let newUserCreated = await newUser.save();

            // Do not reveal the password
            delete newUserCreated.password;

            newUserCreated ? res.status(201).json(newUserCreated) : res.status(500).json({msg: "cannot register new one!"});
        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    }
}

export default RegisterController;
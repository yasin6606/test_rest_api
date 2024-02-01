import {Request, Response} from "express";
import errorList from "../assets/errors/list.error";

const NotfoundRoute = (req: Request, res: Response): void => {
    // TODO logger

    res.json(errorList["404"]);
}

export default NotfoundRoute;
import {Request, Response, Handler} from "express";
import tryController from "../assets/errors/tryController";
import e from "../assets/errors/list.error";

const notExistedRoute: Handler = tryController(async (req: Request, res: Response) => {
    req.headers.authorization

    throw e["404"];
});

export default notExistedRoute;
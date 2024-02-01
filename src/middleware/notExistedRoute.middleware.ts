import {Request, Response} from "express";
import ErrorHandling from "../assets/errors/ErrorHandling";

const notExistedRoute = async (req: Request, res: Response) => {
    ErrorHandling.sendErrorStatic(res, 404);
}

export default notExistedRoute;
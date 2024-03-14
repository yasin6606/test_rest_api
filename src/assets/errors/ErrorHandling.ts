import {ErrorRequestHandler, NextFunction, Request, Response} from "express";
import {IErrorMessage} from "../interfaces/errors.interface";
import e from "./list.error";

class ErrorHandling extends Error {
    constructor() {
        super();
    }

    private sendErrorHandler = (res: Response, errorCode: number, customError?: any): void => {
        if (customError) {
            res.status(errorCode).send(customError);

            return;
        }

        res.status(errorCode).send(e[`${errorCode}`]);
    };

    protected sendError = (res: Response, errorCode: number, customError?: any): void => {
        this.sendErrorHandler(res, errorCode, customError)
    };

    protected errorControllerMiddleware: ErrorRequestHandler = async (error: IErrorMessage | Error, req: Request, res: Response, next: NextFunction): Promise<void> => {
        if ((<IErrorMessage>error).errorCode) {
            ErrorHandling.sendErrorStatic(res, (<IErrorMessage>error).errorCode, error);

            return;
        }

        ErrorHandling.sendErrorStatic(res, 500, error);
    };

    public static sendErrorStatic = (res: Response, errorCode: number, customError?: any): void => {
        new ErrorHandling().sendErrorHandler(res, errorCode, customError)
    };

    public consoleError = (errorCode: number, customError?: any): void => {
        console.error(`Error Code: ${errorCode}\n${customError}`);
    };
}

export default ErrorHandling;
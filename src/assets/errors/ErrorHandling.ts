import e from "./list.error";
import {Response} from "express";

class ErrorInheritance extends Error {
    constructor() {
        super();
    }
}

class ErrorHandling extends ErrorInheritance {
    private sendErrorHandler = (res: Response, errorCode: number, customError?: any): void => {
        if (customError) {
            res.status(errorCode).send(customError);

            return;
        }

        res.status(errorCode).send(e[`${errorCode}`]);
    }

    protected sendError = (res: Response, errorCode: number, customError?: any): void => {
        this.sendErrorHandler(res, errorCode, customError)
    }

    public static sendErrorStatic = (res: Response, errorCode: number, customError?: any): void => {
        new ErrorHandling().sendErrorHandler(res, errorCode, customError)
    }

    public consoleError = (errorCode: number, customError?: any): void => {
        console.error(`Error Code: ${errorCode}\n${customError}`);
    }
}

export default ErrorHandling;
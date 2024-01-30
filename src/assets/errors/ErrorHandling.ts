import e from "./errorsList";
import {Response} from "express";

class ErrorInheritance extends Error {
    constructor(props: any) {
        super(props);
    }

}

class ErrorHandling {
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
}

export default ErrorHandling;
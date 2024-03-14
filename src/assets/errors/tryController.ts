import {NextFunction, Request, Response, Handler} from "express";

const tryController = (controller: Handler): Handler => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await (controller)(req, res, next);
        } catch (error) {
            next(error);
        }
    };
};

export const tryControllerNormalFunc = async (controller: any): Promise<any> => {
    return async () => {
        try {
            await controller();
        } catch (error) {
            console.log("error ---------------------->\n", error);
        }
    };
};

export default tryController;
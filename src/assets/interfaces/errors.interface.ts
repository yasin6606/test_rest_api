export interface IErrorMessage {
    errorCode: number;
    message?: string;
    stack?: any;
}

export interface IErrors {
    [codeNumber: number]: IErrorMessage
}
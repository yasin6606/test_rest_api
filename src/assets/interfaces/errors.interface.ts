export interface IErrorMessage {
    message?: string;
}

export interface IErrors {
    [codeNumber: number]: IErrorMessage
}
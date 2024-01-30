import {IErrorMessage} from "../interfaces/errors.interface";

const e: { [codeN: number]: IErrorMessage } = {
    301: {message: "Database Error"},
    400: {message: "User not found"},
    401: {message: "Fetch user info error!"},
    402: {message: "Token authorization failed"},
    403: {message: "User already existed"},
    500: {message: "Internal server error"}
}

export default e;
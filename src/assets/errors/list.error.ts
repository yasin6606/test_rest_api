import {IErrors} from "../interfaces/errors.interface";

const e: IErrors = {
    301: {errorCode: 301, message: "Database Error"},
    400: {errorCode: 400, message: "User not found"},
    401: {errorCode: 401, message: "Fetch user info error!"},
    402: {errorCode: 402, message: "Token authorization failed"},
    403: {errorCode: 403, message: "User already existed"},
    404: {errorCode: 404, message: "Route is not existed"},
    500: {errorCode: 500, message: "Internal server error"},
    501: {errorCode: 501, message: "Server runs into a problem: "},
    502: {errorCode: 502, message: "Database connection runs into a problem: "}
}

export default e;
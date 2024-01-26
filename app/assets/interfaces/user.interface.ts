import {Model} from "mongoose";

export interface IUser {
    email: string;
    password?: string;
}
export interface IUserModel extends Model<IUser> {
}
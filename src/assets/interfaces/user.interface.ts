import {Model, ObjectId} from "mongoose";

export interface IUser {
    _id?: ObjectId
    email: string;
    password?: string;
}

export interface IUserModel extends Model<IUser> {
}
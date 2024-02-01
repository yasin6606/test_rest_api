import {Model, ObjectId} from "mongoose";

export interface IUser {
    _id?: ObjectId
    firstname: string;
    lastname: string;
    phoneNumber: string;
    email: string;
    password?: string;
}

export interface IUserModel extends Model<IUser> {
}
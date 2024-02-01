import {Schema, model, PreSaveMiddlewareFunction} from "mongoose";
import {IUser, IUserModel} from "../../assets/interfaces/user.interface";
import {hash} from "bcryptjs";

const preSaveHandler: PreSaveMiddlewareFunction = async function (next): Promise<void> {
    if (this.isModified("password"))
        this.password = await hash(this.password, 10);

    next();
};

const userSchema = new Schema<IUser, IUserModel>({
    firstname: {type: String, trim: true},
    lastname: {type: String, trim: true},
    phoneNumber: {type: String, trim: true},
    email: {type: String, trim: true, required: true},
    password: {type: String, required: true},
}, {timestamps: true});

userSchema.pre("save", preSaveHandler);

export default model<IUser, IUserModel>("User", userSchema);
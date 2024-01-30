import {Schema, model, PreSaveMiddlewareFunction} from "mongoose";
import {IUser, IUserModel} from "../../assets/interfaces/user.interface";
import {hash} from "bcryptjs";

const preSaveHandler: PreSaveMiddlewareFunction = async function (next): Promise<void> {
    if (this.isModified("password"))
        this.password = await hash(this.password, 10);

    next();
};

const userSchema = new Schema<IUser, IUserModel>({
    email: {type: String, required: true},
    password: {type: String, required: true},
}, {timestamps: true});

userSchema.pre("save", preSaveHandler);

export default model<IUser, IUserModel>("User", userSchema);
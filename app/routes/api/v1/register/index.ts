import {Router} from "express";
import RegC from "../../../../controllers/register.controller";
import userExistance from "../../../../middleware/userExistance.middleware";

const routers: Router = Router();

const loginCObj: RegC = new RegC();

routers.post("/", userExistance, loginCObj.register);

export default routers;
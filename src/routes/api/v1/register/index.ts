import {Router} from "express";
import {ROOT} from "../list.routes.v1";
import RegC from "../../../../controllers/register.controller";
import userExistance from "../../../../middleware/userExistance.middleware";

const routers: Router = Router();

const loginCObj: RegC = new RegC();

routers.post(ROOT, userExistance, loginCObj.register);

export default routers;
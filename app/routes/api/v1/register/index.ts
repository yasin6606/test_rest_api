import {Router} from "express";
import RegC from "../../../../controllers/register.controller"

const routers: Router = Router();

const loginCObj: RegC = new RegC();

routers.post("/", loginCObj.register);

export default routers;
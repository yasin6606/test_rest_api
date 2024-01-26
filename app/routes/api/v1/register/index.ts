import {Router} from "express";
import RegC from "../../../../controllers/register.controller"

const routers: Router = Router();

const loginCObj: RegC = new RegC();

routers.post("/", loginCObj.register);
routers.post("/temp", loginCObj.tempRegister);

export default routers;
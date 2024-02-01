import {Router} from "express";
<<<<<<< HEAD
import {ROOT} from "../list.routes.v1";
=======
import {ROOT} from "../list.router";
>>>>>>> 6eb0bba96ec9676a5eb45083529bf7d07f8df52b
import RegC from "../../../../controllers/register.controller";
import userExistance from "../../../../middleware/userExistance.middleware";

const routers: Router = Router();

const loginCObj: RegC = new RegC();

routers.post(ROOT, userExistance, loginCObj.register);

export default routers;
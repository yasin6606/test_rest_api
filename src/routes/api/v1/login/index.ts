import {Router} from "express";
import {GET_TOKEN, USER_INFO} from "../list.routes.v1";
import LoginController from "../../../../controllers/login.constroller"
import userFound from "../../../../middleware/userFound.middleware";

const routers: Router = Router();

const loginCObj: LoginController = new LoginController();

routers.post(GET_TOKEN, userFound, loginCObj.getLoginToken);
routers.get(USER_INFO, loginCObj.userInfo);

export default routers;
import {Router} from "express";
import LoginConstroller from "../../../../controllers/login.constroller"

const routers: Router = Router();

const loginCObj: LoginConstroller = new LoginConstroller();

routers.post("/getToken", loginCObj.getLoginToken);
routers.get("/userInfo:id", loginCObj.userInfo);

export default routers;
import {Router} from "express";
import LoginRoutes from "./login/index"
import RegisterRoutes from "./register/index"

const routers: Router = Router();

routers.use("/v1/login", LoginRoutes);
routers.use("/v1/register", RegisterRoutes);

export default routers;
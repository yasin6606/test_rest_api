import {Router} from "express";
import v1Routes from "./api/v1/index"

const routers: Router = Router();

routers.use("/api", v1Routes);

export default routers;
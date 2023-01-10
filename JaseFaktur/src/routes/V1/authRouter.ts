import { Router, Request, Response } from "express";

import BaseRouters from "../DependenciesRoute/BaseRouter";
import {auth} from "../../middleware/AuthMiddleware";

//controllers
import authC from "@/controllers/AuthController";

class UserRoutes extends BaseRouters{
    public routes(): void {
        this.router.post("/register", authC.register);
        this.router.post("/login", authC.login);
        this.router.get("/whoAmi", auth, authC.profile);
    }
}

export default new UserRoutes().router;
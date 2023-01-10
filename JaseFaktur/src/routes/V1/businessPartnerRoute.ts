import { Router, Request, Response } from "express";
import BaseRouters from "../DependenciesRoute/BaseRouter";
//import {auth} from "../middlewares/AuthMiddleware";

//controllers
import bp  from "../../controllers/BusinessPartnerController";

class BusinessPartnerRoute extends BaseRouters{
    public routes(): void {
        this.router.get("/bp", bp.index);
        this.router.post("/", bp.create);
        this.router.get("/:id", bp.show);
        this.router.put("/:id", bp.update);
        this.router.delete("/:id", bp.delete);
    }
}

export default new BusinessPartnerRoute().router;
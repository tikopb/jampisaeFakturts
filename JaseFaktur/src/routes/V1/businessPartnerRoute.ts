import { Router, Request, Response } from "express";
import BaseRouters from "../DependenciesRoute/BaseRouter";

//controllers
import bp  from "@/controllers/BusinessPartnerController";
import { auth } from "@/middleware/AuthMiddleware";

class BusinessPartnerRoute extends BaseRouters{
    public routes(): void {
        this.router.get("/bp",auth, bp.index);
        this.router.post("/", auth, bp.create);
        this.router.get("/:id", auth, bp.show);
        this.router.put("/:id", auth, bp.update);
        this.router.delete("/:id", auth, bp.delete);
    }
}

export default new BusinessPartnerRoute().router;
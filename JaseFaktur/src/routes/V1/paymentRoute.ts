import { Router, Request, Response } from "express";
import BaseRouters from "../DependenciesRoute/BaseRouter";

//controllers
import payment from "@/controllers/PaymentController";
import { auth } from "@/middleware/AuthMiddleware";

class paymentRoute extends BaseRouters{
    public routes(): void {
        this.router.get("/bp",auth, payment.index);
        this.router.post("/", auth, payment.create);
        this.router.get("/:id", auth, payment.show);
        this.router.put("/:id", auth, payment.update);
        this.router.delete("/:id", auth, payment.delete);
    }
}

export default new paymentRoute().router;
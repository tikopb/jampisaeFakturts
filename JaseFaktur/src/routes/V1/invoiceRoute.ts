import { Router, Request, Response } from "express";
import BaseRouters from "../DependenciesRoute/BaseRouter";

//controllers
import invoice from "@/controllers/InvoiceController";
import { auth } from "@/middleware/AuthMiddleware";

class invoiceRoute extends BaseRouters{
    public routes(): void {
        this.router.get("/bp",auth, invoice.index);
        this.router.post("/", auth, invoice.create);
        this.router.get("/:id", auth, invoice.show);
        this.router.put("/:id", auth, invoice.update);
        this.router.delete("/:id", auth, invoice.delete);
    }
}

export default new invoiceRoute().router;
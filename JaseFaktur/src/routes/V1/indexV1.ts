import BaseRoutes from "../DependenciesRoute/BaseRouter";
import authRouter from "./authRouter";
import businessPartnerRoute from "./businessPartnerRoute";
import invoiceRoute from "./invoiceRoute";
import paymentRoute from "./paymentRoute";

class index extends BaseRoutes {
    public routes(): void {
        this.router.use("/auth", authRouter);
        this.router.use("/bp", businessPartnerRoute);
        this.router.use("/invoive", invoiceRoute);
        this.router.use("/payment", paymentRoute);
    }
}

export default new index().router;
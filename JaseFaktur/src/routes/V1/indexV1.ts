import BaseRoutes from "../DependenciesRoute/BaseRouter";
//import validate from "../middlewares/AuthValidator";
//import { auth } from "../middlewares/AuthMiddleware";

import authRouter from "./authRouter";

class indexV1 extends BaseRoutes {
    public routes(): void {
        this.router.use("/auth", authRouter);
    }
}

export default new indexV1().router;
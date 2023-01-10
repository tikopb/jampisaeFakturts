import BaseRoutes from "./DependenciesRoute/BaseRouter";
//import validate from "../middlewares/AuthValidator";
//import { auth } from "../middlewares/AuthMiddleware";

import indexV1 from "./V1/indexV1";

class indexApi extends BaseRoutes {
    public routes(): void {
        this.router.use("/v1", indexV1);
    }
}

export default new indexApi().router;
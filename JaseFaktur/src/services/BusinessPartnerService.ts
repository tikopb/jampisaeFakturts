import { Request } from "express";
const db  = require("@/db/models");

class BusinessPartnerService {
    credential: {
        user_id: number
    };
    body: Request['body'];
    params: Request['params'];

    constructor(req: Request){
        this.credential = req.app.locals.credential;
        this.body = req.body;
        this.params = req.params;
    }

}

export default BusinessPartnerService;
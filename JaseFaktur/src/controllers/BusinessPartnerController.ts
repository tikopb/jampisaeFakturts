import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import ControllerInterface from "./DepedenciesController/ControllerInterface";

const db  = require("../db/models");

class BusinessPartnerController implements ControllerInterface{
    index = async (req: Request, res: Response): Promise<Response> => {
        const data = await db.business_partner.findAll({}) 
        return res.status(200).send({
            data,
            message: ""
        })
    }
    create = async (req: Request, res: Response): Promise<Response> => {
        const param = req.body;

        const data = await db.business_partner.create({
            value: param.value,
            name: param.name,
            description: param.description,
            
        })

        throw new Error("Method not implemented.");
    }
    show(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<Response<any, Record<string, any>>> {
        throw new Error("Method not implemented.");
    }
    update(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<Response<any, Record<string, any>>> {
        throw new Error("Method not implemented.");
    }
    delete(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<Response<any, Record<string, any>>> {
        throw new Error("Method not implemented.");
    }
    
}

export default new BusinessPartnerController();
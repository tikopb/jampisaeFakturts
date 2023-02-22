import { Request, Response } from "express";
import ControllerInterface from "./DepedenciesController/ControllerInterface";

const db  = require("@/db/models");

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
        const UserParam = await req.app.locals.credential.user;
        console.log(param)
        try {
            let data = await db.business_partner.create({
                value: param.value,
                name: param.name,
                description: param.description,
                createdby: UserParam.user_id,
                updatedby: UserParam.user_id,
            })
            return res.status(200).send({
                data,
                message: "data generated"
            })
        } catch (err: any) {
            if (err.name === 'SequelizeUniqueConstraintError') {
                res.status(403)
                return res.send({ 
                    status: 'error', 
                    msg: `Business Partner with name ${param.name} already exists`
                });
            } else {
                res.status(500)
                return res.send({ 
                    status: 'error', 
                    msg: `Something went wrong ${err.message}`
                });
            }
        }
    }
    show = async (req: Request, res: Response): Promise<Response> => {
        const business_partner_id = req.params.id
       
        const data = await db.business_partner.findByPk(business_partner_id) 
        return res.status(200).send({
            data,
            message: ""
        })
    }
    update = async (req: Request, res: Response): Promise<Response> => {
        const param = req.body;
        const UserParam = req.app.locals.credential.user;

        try {
            let data = await db.business_partner.findByPk(req.params.id)
            data.set({
                value: param.value,
                name: param.name,
                description: param.description,
                updatedBy: UserParam.user_id,
            })
            await data.save()
            return res.status(200).send({
                data,
                message: "data generated"
            })
        } catch (err: any) {
            if (err.name === 'SequelizeUniqueConstraintError') {
                res.status(403)
                return res.send({ 
                    status: 'error', 
                    msg: `Business Partner with name ${param.name} already exists`
                });
            } else {
                res.status(500)
                return res.send({ 
                    status: 'error', 
                    msg: "Something went wrong"
                });
            }
        }
    }
    delete = async (req: Request, res: Response): Promise<Response> => {
        const business_partner_id = req.params.id
        let data = await db.business_partner.findByPk(business_partner_id);
        try {
            await data.destroy();
            return res.status(200).json({
                msg: "data deleted"
            })
        } catch (err: any) {
            return res.status(401).json({
                msg: err.message
            })
        }
    }
    
}

export default new BusinessPartnerController();
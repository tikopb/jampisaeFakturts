import { Request, Response } from "express";
import ControllerInterface from "./DepedenciesController/ControllerInterface";

const db  = require("@/db/models");

class PaymentController implements ControllerInterface{
    index = async (req: Request, res: Response): Promise<Response> => {
        const data = await db.payment.findAll({}) 
        return res.status(200).send({
            data,
            message: ""
        })
    }
    create = async (req: Request, res: Response): Promise<Response> => {
        const param = req.body;
        const UserParam = req.app.locals.credential.user;

        try {
            let data = await db.payment.create({
                invoice_id: param.invoice_id,
                business_partner_id: param.invoice_id,
                createdBy: UserParam.user_id,
                updatedBy: UserParam.user_id,
                paymentDate: param.paymentDate,
                grandtotal: param.grandtotal
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
                    msg: "Something went wrong"
                });
            }
        }
    }
    show = async (req: Request, res: Response): Promise<Response> => {
        const payment_id = req.params.id
        const data = await db.payment.findByPk({
            payment_id
        }) 
        return res.status(200).send({
            data,
            message: ""
        })
    }
    update = async (req: Request, res: Response): Promise<Response> => {
        const param = req.body;
        const UserParam = req.app.locals.credential.user;

        try {
            let data = await db.payment.findByPk(req.params.id)
            data.set({
                invoice_id: param.invoice_id,
                createdBy: UserParam.user_id,
                updatedBy: UserParam.user_id,
                paymentDate: param.paymentDate,
                grandtotal: param.grandtotal
            })
            await data.save()
            return res.status(200).send({
                data,
                message: "data updated"
            })
        } catch (err: any) {
            res.status(500)
            return res.send({ 
                status: 'error', 
                msg: `Something went wrong ${err.toString()}`
            });
        }
    }
    delete = async (req: Request, res: Response): Promise<Response> => {
        const payment_id = req.params.id
        let data = await db.payment.findByPk(payment_id);
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

export default new PaymentController();
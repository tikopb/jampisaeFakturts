import { Request, Response } from "express";
import ControllerInterface from "./DepedenciesController/ControllerInterface";

const db  = require("@/db/models");

class InvoiceControlller implements ControllerInterface{
    index = async (req: Request, res: Response): Promise<Response> => {
        const data = await db.invoice.findAll({}) 
        return res.status(200).send({
            data,
            message: ""
        })
    }
    create = async (req: Request, res: Response): Promise<Response> => {
        const param = req.body;
        const UserParam = req.app.locals.credential.user;

        try {
            let data = await db.invoice.create({
                business_partner_id: param.invoice_id,
                createdBy: UserParam.user_id,
                updatedBy: UserParam.user_id,
                fakturno: param.fakturno,
                dueDate: param.dueDate,
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
        const invoice_id = req.params.id
        const data = await db.invoice.findByPk({
            invoice_id
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
            let data = await db.invoice.findByPk(req.params.id)
            data.set({
                updatedBy: UserParam.user_id,
                fakturno: param.fakturno,
                dueDate: param.dueDate,
                paymentDate: param.paymentDate,
                grandtotal: param.grandtotal
            })
            await data.save()
            return res.status(200).send({
                data,
                message: "data updated"
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
        const invoice_id = req.params.id
        let data = await db.invoice.findByPk(invoice_id);
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

class utility {
    countFakturNo = async() => {
        // ambil nilai dari max document no faktur!
    }
}

export default new InvoiceControlller();
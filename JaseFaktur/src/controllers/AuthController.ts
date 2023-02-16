import { Request, Response } from "express";
import Authentication from "@/utils/Authentication";

const db  = require("@/db/models");
class AuthController {
    register = async (req: Request, res: Response): Promise<Response> => {
        let { username, password, name, description } = req.body;
        const hashedPassword: string = await Authentication.passwordHash(password);
       
        try {
            let data = await db.user.create({ username, password: hashedPassword, name, description});
            return res.status(200).send({
                data: data.username,
                msg: "succsess"
            });
        } catch (err: any) {
            if (err.name === 'SequelizeUniqueConstraintError') {
                return res.status(403).send({ 
                    status: 'error', 
                    msg: `user with value ${username} already exists`
                });
            } else {
                return res.status(500).send({ 
                    status: 'error', 
                    msg: "Something went wrong"
                });
            }
        }
    }

    login = async (req: Request, res: Response): Promise<Response> => {
        // cari data user by username
        let { username, password } = req.body;

        const user = await db.user.findOne({
            where: { username }
        });

        // check password
        let compare = await Authentication.passwordCompare(password, user.password);

        // generate token
        if (compare) {
            let token = await Authentication.generateToken(user.id, username, user.password);
            return res.send({
                token
            });
        }

        return res.send("auth failed");
    }

    profile = (req: Request, res: Response): Response => {
        return res.send(req.app.locals.credential);
    }
}

export default new  AuthController(); 
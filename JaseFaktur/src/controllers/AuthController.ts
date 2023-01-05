import { Request, Response } from "express";

const db  = require("../db/models");

class AuthController{
    register = async (req: Request, res: Response): Promise<Response> => {
        let payload = req.body;
        
        return res.status(200).json("registered succsess");
    }
}

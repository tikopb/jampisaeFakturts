import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const db  = require("@/db/models");

class Authentication {
    public static passwordHash = (password: string): Promise<string> => {
        return bcrypt.hash(password, 12);
    }

    public static passwordCompare = async (text: string, encryptedText: string): Promise<boolean> => {
        let result = await bcrypt.compare(text, encryptedText);
        return result;
    }

    public static generateToken = async (user_id: number, username: string, password: string): Promise<Object> => {
        const secretKey: string = process.env.JWT_SECRET_KEY || "secret";
        const user = await db.user.findOne({
            where:{
                user_id //get id with user_id parameter
            },
            attributes: ['user_id', 'username']
        })

        const payload = {
            id: user.user_id,
            username: user.username,
        }

        const accesstoken: string = jwt.sign({payload}, secretKey,{
            expiresIn: "10s",
          });
        const refreshToken = jwt.sign({payload}, secretKey, {
            expiresIn: "2d",
        });

        const token = {
            accesstoken,
            refreshToken
        }

        const returnValue ={
            payload,
            token
        }

        return returnValue;
    }

}

export default Authentication;
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

    public static generateToken = async (id: number, username: string, password: string): Promise<string> => {
        const secretKey: string = process.env.JWT_SECRET_KEY || "secret";
        const user = await db.user.findByPk(id)

        const token: string = jwt.sign({user}, secretKey);
        return token;
    }
}

export default Authentication;
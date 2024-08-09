import { prismaClient } from "../application/database.js";
import jwt from 'jsonwebtoken';

export const authMiddleware = async (req, res, next) => {
    const token = req.get('Authorization');
    if(!token){
        res.status(401).json({
            errors: "Unauthorized"
        }).end();
    } else {
        // Non JWT
        /*
        const user = await prismaClient.user.findFirst({
            where: {
                token: token
            }
        });
        if (!user) {
            res.status(401).json({
                errors:"Unauthorized"
            }).end();
        } else {
            req.user=user;
            next();
        }
        */
        //End of Non JWT

        // JWT
        
        const secret = process.env.JWT_SECRET;
        try{
            const jwtDecode = jwt.verify(token, secret);
            req.userToken = jwtDecode;
            next();
        } catch (e) {
            res.status(401).json({
                errors: "Token access failed"
            }).end();
        }
        
        //End of JWT
    }
}
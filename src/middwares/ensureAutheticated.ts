import {Request, Response, NextFunction} from "express"
import {verify} from "jsonwebtoken"

export function ensureAutheticated(req: Request, res: Response, next: NextFunction){
    const authToken = req.headers.authorization;

    if(!authToken){
        return res.status(401).json({
            message: "Token is missing"
        })
    }
    const[, token] = authToken.split(" ")
    try {
        verify(token, "greenhouse")
        return next();
    } catch (error) {
        return res.status(401).json({
            message: "Token invalid"
        })
    }
}
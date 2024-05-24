import httpStatus from "http-status";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken'
import { catchAsync } from "../utils/catchAsync";
import config from "../config";
import AppError from "../errors/AppError";

export const auth = (...requiredRoles: string[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization;
        // console.log(token);
        // check token is missing or not
        if (!token) {
            throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized Access")

        }
        // check tokes is valid or not
        let decoded;
        try {
            decoded = jwt.verify(token, config.access_token_secret as string) as JwtPayload;
            // console.log(decoded);
            if (!requiredRoles.length && !requiredRoles.includes(decoded.role)) {
            throw new AppError(httpStatus.FORBIDDEN, "Forbidden")
                
            }

        } catch (err) {
            throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized Access")
        }
        //   console.log(decoded);
        // send user
        req.user = decoded as JwtPayload;
        next();
    })
}
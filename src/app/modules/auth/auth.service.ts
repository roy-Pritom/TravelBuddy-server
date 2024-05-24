import { AccountStatus } from "@prisma/client";
import config from "../../config";
import AppError from "../../errors/AppError";
import { jwtHelpers } from "../../utils/jwtHelpers";
import prisma from "../../utils/prisma"
import bcrypt from 'bcrypt';
import httpStatus from "http-status";

// login
const login = async (payload: { email: string, password: string }) => {
    const userData = await prisma.user.findUnique({
        where: {
            email: payload.email
        }
    })
    if(!userData){
        throw new AppError(404,"User does not exist!")
    }
    if(userData?.accountStatus===AccountStatus.DEACTIVATE){
        throw new AppError(httpStatus.FORBIDDEN,"Your account is blocked!")
    }

    const isPasswordCorrect = await bcrypt.compare(payload.password, userData.password);
    // console.log(isPasswordCorrect);
    if (!isPasswordCorrect) {
        throw new Error('Password incorrect!')
    }
    const jwtPayload={
        id:userData.id,
        email:userData.email,
        role:userData?.role
    }
    const accessToken=jwtHelpers.createToken(jwtPayload,config.access_token_secret as string,config.access_token_expiresIn as string);
    const refreshToken=jwtHelpers.createToken(jwtPayload,config.refresh_token_secret as string,config.refresh_token_expiresIn as string);

    return  {
        accessToken,
        refreshToken,
        userData

    }
    

}

export const AuthServices = {
    login,

}
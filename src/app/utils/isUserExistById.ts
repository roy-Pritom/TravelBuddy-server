import httpStatus from "http-status";
import prisma from "./prisma";
import AppError from "../errors/AppError";

const isUserExistById=async(userId:string)=>{
    const userData=await prisma.user.findUnique({
        where:{
            id:userId
        }
    })
    if(!userData){
        throw new AppError(httpStatus.NOT_FOUND,"User does not exist!")
       
    }
    return userData;
}

export default isUserExistById;
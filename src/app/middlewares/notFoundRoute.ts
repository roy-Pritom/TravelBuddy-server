import { NextFunction, Request, Response } from "express"
import httpStatus from "http-status"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const notFoundRoute=(req:Request,res:Response,next:NextFunction)=>{
    res.status(httpStatus.NOT_FOUND).json({
     success:false,
     message:'Route not found!',
     errorDetails:{
         path:req.originalUrl,
         message:"Your requested path is not found!"
     }
    })
 }

 export default notFoundRoute;
import { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError";
import { ZodError } from "zod";
import handleZodError from "../errors/handleZodError";

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
const globalErrorHandler=(err:any,req:Request,res:Response,next:NextFunction)=>{
   let statusCode=500;
   let message="Something went wrong!";
   let errorDetails=err;

   if(err instanceof AppError){
      statusCode=err?.statusCode;
      message=err?.message
   }
   else if(err instanceof ZodError){
   const zodError=handleZodError(err);
    statusCode=zodError?.statusCode;
    message=zodError?.message;
    errorDetails=zodError?.error;
   }

   return res.status(statusCode).json({
    success:false,
    message,
    errorDetails
   })
}

export default globalErrorHandler;
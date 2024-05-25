import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { UserServices } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

// register user
const createUser=catchAsync(async(req:Request,res:Response)=>{
  const result=await UserServices.createUserInToDb(req.body);
  sendResponse(res,{
    statusCode:httpStatus.CREATED,
    success:true,
    message:"User registered successfully",
    data:result
  })
})
// Create Admin
const createAdmin=catchAsync(async(req:Request,res:Response)=>{
  const result=await UserServices.createAdminInToDb(req.body);
  sendResponse(res,{
    statusCode:httpStatus.CREATED,
    success:true,
    message:"Admin created successfully",
    data:result
  })
})


// Get User Profile
const getUserProfile=catchAsync(async(req:Request,res:Response)=>{
  const {id}=req.user;
  const result=await UserServices.getUserProfileFromDb(id);
  sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:"User profile retrieved successfully",
    data:result
  })
})
// Get All User 
const getAllUser=catchAsync(async(req:Request,res:Response)=>{

  const result=await UserServices.getAllUser();
  sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:"Users  retrieved successfully",
    data:result
  })
})

// Update User Profile
const updateUserProfile=catchAsync(async(req:Request,res:Response)=>{
  const {id}=req.user;
  // console.log(req.body);
  const result=await UserServices.updateUserProfileInToDb(req.body,id);
  sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:"User profile updated successfully",
    data:result
  })
})
// Update Account Status
const updateUserAccountStatus=catchAsync(async(req:Request,res:Response)=>{
  const {id}=req.params;

  const result=await UserServices.updateUserAccountStatus(id,req.body);
  sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:"Account status updated successfully",
    data:result
  })
})
// Update role Status
const updateUserRoleStatus=catchAsync(async(req:Request,res:Response)=>{
  const {id}=req.params;

  const result=await UserServices.updateUserRoleStatus(id,req.body);
  sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:"Role updated successfully",
    data:result
  })
})


export const UserControllers={
    createUser,
    createAdmin,
    getUserProfile,
    updateUserProfile,
    getAllUser,
    updateUserAccountStatus,
    updateUserRoleStatus
}
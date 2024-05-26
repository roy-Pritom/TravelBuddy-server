import { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";


// login
const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.login(req.body);
  const { accessToken, refreshToken, userData } = result;
  res.cookie('refreshToken', refreshToken, {
    secure: false,
    httpOnly: true
  })
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully",
    data: {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      role:userData.role,
      accessToken
    }
  })
})


// change password
const changePassword = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const { ...passwordData } = req.body;

  await AuthServices.changePassword(user, passwordData);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Password changed successfully!',
    data: {
      status: 200,
      message: 'Password changed successfully!',
    },
  });
});

export const AuthControllers = {
  loginUser,
  changePassword
}
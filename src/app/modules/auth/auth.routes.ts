import express from 'express';
import { AuthControllers } from './auth.controller';
import { AuthValidationSchemas } from './auth.validation';
import { validateRequest } from '../../middlewares/validateRequest';
import { auth } from '../../middlewares/auth';
import { UserRole } from '@prisma/client';


const router=express.Router();

// login
router.post('/login',validateRequest(AuthValidationSchemas.loginValidationSchema),AuthControllers.loginUser)

// refresh token
router.post(
    '/refresh-token',
  
     AuthControllers.refreshToken
);


// change password
router.post('/change-password',validateRequest(AuthValidationSchemas.changePasswordZodSchema),auth(UserRole.ADMIN,UserRole.USER),AuthControllers.changePassword);


export const AuthRoutes=router;
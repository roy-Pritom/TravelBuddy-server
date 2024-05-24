import express from 'express';
import { AuthControllers } from './auth.controller';
import { AuthValidationSchemas } from './auth.validation';
import { validateRequest } from '../../middlewares/validateRequest';


const router=express.Router();

// login
router.post('/login',validateRequest(AuthValidationSchemas.loginValidationSchema),AuthControllers.loginUser)


export const AuthRoutes=router;
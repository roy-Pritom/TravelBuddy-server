import express from 'express';
import { UserControllers } from './user.controller';
import { auth } from '../../middlewares/auth';
import { validateRequest } from '../../middlewares/validateRequest';
import { userValidationSchemas } from './user.vaidation';
import { USER_ROLE } from '../../interface/common';
import { UserRole } from '@prisma/client';

const router=express.Router();
// create user
router.post('/register',validateRequest(userValidationSchemas.crateUserValidationSchema),UserControllers.createUser);

// create admin
router.post('/create-admin',validateRequest(userValidationSchemas.crateAdminValidationSchema),UserControllers.createAdmin);

// Get User Profile
router.get('/profile',auth(USER_ROLE.ADMIN,USER_ROLE.USER),UserControllers.getUserProfile);
// Get All User
router.get('/users',auth(USER_ROLE.ADMIN,USER_ROLE.USER),UserControllers.getAllUser);

// Update User Profile
router.put('/profile',auth(UserRole.ADMIN,UserRole.USER),validateRequest(userValidationSchemas.updateUserProfileValidationSchema),UserControllers.updateUserProfile);


export const UserRoutes=router;
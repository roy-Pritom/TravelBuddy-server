"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const auth_1 = require("../../middlewares/auth");
const validateRequest_1 = require("../../middlewares/validateRequest");
const user_vaidation_1 = require("./user.vaidation");
const common_1 = require("../../interface/common");
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
// create user
router.post('/register', (0, validateRequest_1.validateRequest)(user_vaidation_1.userValidationSchemas.crateUserValidationSchema), user_controller_1.UserControllers.createUser);
// create admin
router.post('/create-admin', (0, validateRequest_1.validateRequest)(user_vaidation_1.userValidationSchemas.crateAdminValidationSchema), user_controller_1.UserControllers.createAdmin);
// Get User Profile
router.get('/profile', (0, auth_1.auth)(common_1.USER_ROLE.ADMIN, common_1.USER_ROLE.USER), user_controller_1.UserControllers.getUserProfile);
// Get All User
router.get('/users', (0, auth_1.auth)(common_1.USER_ROLE.ADMIN, common_1.USER_ROLE.USER), user_controller_1.UserControllers.getAllUser);
// Update User Profile
router.put('/profile', (0, auth_1.auth)(client_1.UserRole.ADMIN, client_1.UserRole.USER), (0, validateRequest_1.validateRequest)(user_vaidation_1.userValidationSchemas.updateUserProfileValidationSchema), user_controller_1.UserControllers.updateUserProfile);
// update account status
router.patch('/update-status/:id', (0, auth_1.auth)(client_1.UserRole.ADMIN), user_controller_1.UserControllers.updateUserAccountStatus);
// update user role
router.patch('/update-user-role/:id', (0, auth_1.auth)(client_1.UserRole.ADMIN), user_controller_1.UserControllers.updateUserRoleStatus);
exports.UserRoutes = router;

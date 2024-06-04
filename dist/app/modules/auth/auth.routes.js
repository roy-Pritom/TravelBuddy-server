"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const auth_validation_1 = require("./auth.validation");
const validateRequest_1 = require("../../middlewares/validateRequest");
const auth_1 = require("../../middlewares/auth");
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
// login
router.post('/login', (0, validateRequest_1.validateRequest)(auth_validation_1.AuthValidationSchemas.loginValidationSchema), auth_controller_1.AuthControllers.loginUser);
// refresh token
router.post('/refresh-token', auth_controller_1.AuthControllers.refreshToken);
// change password
router.post('/change-password', (0, validateRequest_1.validateRequest)(auth_validation_1.AuthValidationSchemas.changePasswordZodSchema), (0, auth_1.auth)(client_1.UserRole.ADMIN, client_1.UserRole.USER), auth_controller_1.AuthControllers.changePassword);
exports.AuthRoutes = router;

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
const router = express_1.default.Router();
// register user
router.post('/register', (0, validateRequest_1.validateRequest)(user_vaidation_1.userValidationSchemas.crateUserValidationSchema), user_controller_1.UserControllers.createUser);
// Get User Profile
router.get('/profile', (0, auth_1.auth)(), user_controller_1.UserControllers.getUserProfile);
// Update User Profile
router.put('/profile', (0, auth_1.auth)(), (0, validateRequest_1.validateRequest)(user_vaidation_1.userValidationSchemas.updateUserProfileValidationSchema), user_controller_1.UserControllers.updateUserProfile);
exports.UserRoutes = router;

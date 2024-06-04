"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidationSchemas = void 0;
const zod_1 = require("zod");
const loginValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ "required_error": "Email is required", "invalid_type_error": "Give valid email" }).email(),
        password: zod_1.z.string({ "required_error": "Password is required", })
    })
});
const refreshTokenValidationSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({
            required_error: 'Refresh Token is required',
        }),
    }),
});
const changePasswordZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        oldPassword: zod_1.z.string({
            required_error: 'Old password  is required',
        }),
        newPassword: zod_1.z.string({
            required_error: 'New password  is required',
        }),
    }),
});
exports.AuthValidationSchemas = {
    loginValidationSchema,
    changePasswordZodSchema,
    refreshTokenValidationSchema
};

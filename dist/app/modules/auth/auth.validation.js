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
exports.AuthValidationSchemas = {
    loginValidationSchema,
};

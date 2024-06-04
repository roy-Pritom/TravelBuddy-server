"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidationSchemas = void 0;
const zod_1 = require("zod");
const profileSchema = zod_1.z.object({
    bio: zod_1.z.string().optional(),
    age: zod_1.z.number()
});
const crateUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string(),
        email: zod_1.z.string().email(),
        password: zod_1.z.string().min(5),
        // role:z.string(['USER','ADMIN']),
        profile: profileSchema
    })
});
const crateAdminValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string(),
        email: zod_1.z.string().email(),
        password: zod_1.z.string().min(5),
        profile: profileSchema
    })
});
const updateUserProfileValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        email: zod_1.z.string().email().optional(),
        bio: zod_1.z.string().optional(),
        age: zod_1.z.number().optional()
    })
});
exports.userValidationSchemas = {
    crateUserValidationSchema,
    crateAdminValidationSchema,
    updateUserProfileValidationSchema,
};

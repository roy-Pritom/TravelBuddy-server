"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TravelValidationSchemas = void 0;
const zod_1 = require("zod");
const buddyRequestValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string({ "required_error": "UserId is required", "invalid_type_error": "Give valid userId" }),
    })
});
const requestResponseValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum(["APPROVED", "PENDING", "REJECTED"]),
    })
});
exports.TravelValidationSchemas = {
    buddyRequestValidationSchema,
    requestResponseValidationSchema
};

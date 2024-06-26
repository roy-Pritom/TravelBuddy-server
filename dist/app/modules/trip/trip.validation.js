"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripValidationSchemas = void 0;
const zod_1 = require("zod");
const createTripValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        destination: zod_1.z.string(),
        description: zod_1.z.string(),
        travelType: zod_1.z.string(),
        startDate: zod_1.z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
        endDate: zod_1.z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
        budget: zod_1.z.number(),
        activities: zod_1.z.array(zod_1.z.string())
    })
});
const updateTripValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        destination: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        travelType: zod_1.z.string().optional(),
        startDate: zod_1.z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
        endDate: zod_1.z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
        budget: zod_1.z.number().optional(),
        activities: zod_1.z.array(zod_1.z.string()).optional()
    })
});
exports.TripValidationSchemas = {
    createTripValidationSchema,
    updateTripValidationSchema
};

import { z } from "zod";


const createTripValidationSchema = z.object({
    body: z.object({
        destination: z.string(),
        description:z.string(),
        travelType:z.string(),
        startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
        endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
        budget: z.number(),
        activities: z.array(z.string())
    })
})
const updateTripValidationSchema = z.object({
    body: z.object({
        destination: z.string().optional(),
        description:z.string().optional(),
        travelType:z.string().optional(),
        startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
        endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
        budget: z.number().optional(),
        activities: z.array(z.string()).optional()
    })
})



export const TripValidationSchemas = {
   createTripValidationSchema,
   updateTripValidationSchema
}
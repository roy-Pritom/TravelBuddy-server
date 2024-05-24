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



export const TripValidationSchemas = {
   createTripValidationSchema
}
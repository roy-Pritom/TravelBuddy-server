import { z } from "zod";


const buddyRequestValidationSchema = z.object({
    body: z.object({
        userId: z.string({"required_error":"UserId is required","invalid_type_error":"Give valid userId"}),
    })
})


const requestResponseValidationSchema = z.object({
    body: z.object({
        status: z.enum(["APPROVED","PENDING","REJECTED"] as [string, ...string[]]),
    })
})



export const TravelValidationSchemas = {
    buddyRequestValidationSchema,
    requestResponseValidationSchema
}
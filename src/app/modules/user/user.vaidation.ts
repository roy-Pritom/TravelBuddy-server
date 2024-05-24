import { z } from "zod";

const profileSchema = z.object({
    bio: z.string().optional(),
    age: z.number()
  });

  
const crateUserValidationSchema=z.object({
    body:z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(5),
        // role:z.string(['USER','ADMIN']),
        profile: profileSchema
    })
})
  
const crateAdminValidationSchema=z.object({
    body:z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(5),
        profile: profileSchema
    })
})

const updateUserProfileValidationSchema=z.object({
    body:z.object({
        name: z.string().optional(),
        email: z.string().email().optional(),
        bio:z.string().optional(),
        age:z.number().optional()
    })
})




export const userValidationSchemas={
    crateUserValidationSchema,
    crateAdminValidationSchema,
    updateUserProfileValidationSchema,


}
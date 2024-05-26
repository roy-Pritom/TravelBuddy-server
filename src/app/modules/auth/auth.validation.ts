import { z } from "zod";


const loginValidationSchema = z.object({
    body: z.object({
        email: z.string({"required_error":"Email is required","invalid_type_error":"Give valid email"}).email(),
        password: z.string({"required_error":"Password is required",})
    })
})

const changePasswordZodSchema = z.object({
    body: z.object({
        oldPassword: z.string({
            required_error: 'Old password  is required',
        }),
        newPassword: z.string({
            required_error: 'New password  is required',
        }),
    }),
});



export const AuthValidationSchemas = {
    loginValidationSchema,
    changePasswordZodSchema


}
import { ZodError, ZodIssue } from "zod";

const handleZodError = (err: ZodError) => {
    const error = err.issues.map((issue) => {
        return {
            field: issue?.path[1],
            message: issue?.message
        }
    })
    const message = err.issues.map((issue: ZodIssue) => {
        return `${issue?.path[1]} is ${issue?.message}`
    }).join('.')

    const statusCode = 400;
    return {
        statusCode,
        message,
        error
    }
}

export default handleZodError;
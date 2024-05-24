"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../errors/AppError"));
const zod_1 = require("zod");
const handleZodError_1 = __importDefault(require("../errors/handleZodError"));
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
const globalErrorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = "Something went wrong!";
    let errorDetails = err;
    if (err instanceof AppError_1.default) {
        statusCode = err === null || err === void 0 ? void 0 : err.statusCode;
        message = err === null || err === void 0 ? void 0 : err.message;
    }
    else if (err instanceof zod_1.ZodError) {
        const zodError = (0, handleZodError_1.default)(err);
        statusCode = zodError === null || zodError === void 0 ? void 0 : zodError.statusCode;
        message = zodError === null || zodError === void 0 ? void 0 : zodError.message;
        errorDetails = zodError === null || zodError === void 0 ? void 0 : zodError.error;
    }
    return res.status(statusCode).json({
        success: false,
        message,
        errorDetails
    });
};
exports.default = globalErrorHandler;

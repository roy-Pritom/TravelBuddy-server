"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleZodError = (err) => {
    const error = err.issues.map((issue) => {
        return {
            field: issue === null || issue === void 0 ? void 0 : issue.path[1],
            message: issue === null || issue === void 0 ? void 0 : issue.message
        };
    });
    const message = err.issues.map((issue) => {
        return `${issue === null || issue === void 0 ? void 0 : issue.path[1]} is ${issue === null || issue === void 0 ? void 0 : issue.message}`;
    }).join('.');
    const statusCode = 400;
    return {
        statusCode,
        message,
        error
    };
};
exports.default = handleZodError;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const catchAsync_1 = require("../utils/catchAsync");
const config_1 = __importDefault(require("../config"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const auth = (...requiredRoles) => {
    return (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.headers.authorization;
        // console.log(token);
        // check token is missing or not
        if (!token) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "Unauthorized Access");
        }
        // check tokes is valid or not
        let decoded;
        try {
            decoded = jsonwebtoken_1.default.verify(token, config_1.default.access_token_secret);
            // console.log(decoded);
            if (!requiredRoles.length && !requiredRoles.includes(decoded.role)) {
                throw new AppError_1.default(http_status_1.default.FORBIDDEN, "Forbidden");
            }
        }
        catch (err) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "Unauthorized Access");
        }
        //   console.log(decoded);
        // send user
        req.user = decoded;
        next();
    }));
};
exports.auth = auth;

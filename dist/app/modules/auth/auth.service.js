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
exports.AuthServices = void 0;
const client_1 = require("@prisma/client");
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const jwtHelpers_1 = require("../../utils/jwtHelpers");
const prisma_1 = __importDefault(require("../../utils/prisma"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_1 = __importDefault(require("http-status"));
const auth_utils_1 = require("./auth.utils");
// login
const login = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma_1.default.user.findUnique({
        where: {
            email: payload.email,
            accountStatus: client_1.AccountStatus.ACTIVE
        }
    });
    if (!userData) {
        throw new AppError_1.default(404, "User does not exist!");
    }
    if ((userData === null || userData === void 0 ? void 0 : userData.accountStatus) === client_1.AccountStatus.DEACTIVATE) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "Your account is blocked!");
    }
    const isPasswordCorrect = yield bcrypt_1.default.compare(payload.password, userData.password);
    // console.log(isPasswordCorrect);
    if (!isPasswordCorrect) {
        throw new Error('Password incorrect!');
    }
    const jwtPayload = {
        id: userData.id,
        email: userData.email,
        role: userData === null || userData === void 0 ? void 0 : userData.role
    };
    const accessToken = jwtHelpers_1.jwtHelpers.createToken(jwtPayload, config_1.default.access_token_secret, config_1.default.access_token_expiresIn);
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken(jwtPayload, config_1.default.refresh_token_secret, config_1.default.refresh_token_expiresIn);
    return {
        accessToken,
        refreshToken,
        userData
    };
});
// refresh token
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    //verify token
    // invalid token - synchronous
    let verifiedToken = null;
    try {
        verifiedToken = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.refresh_token_secret);
    }
    catch (err) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'Invalid Refresh Token');
    }
    const { id } = verifiedToken;
    const isUserExist = yield prisma_1.default.user.findUnique({
        where: {
            id: id,
            accountStatus: client_1.AccountStatus.ACTIVE
        }
    });
    if (!isUserExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    const newAccessToken = jwtHelpers_1.jwtHelpers.createToken({
        id: isUserExist.id,
        email: isUserExist.email,
        role: isUserExist.role,
    }, config_1.default.access_token_secret, config_1.default.access_token_expiresIn);
    return {
        accessToken: newAccessToken,
    };
});
// change password
const changePassword = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { oldPassword, newPassword } = payload;
    const isUserExist = yield prisma_1.default.user.findUnique({
        where: {
            id: user === null || user === void 0 ? void 0 : user.id,
            accountStatus: client_1.AccountStatus.ACTIVE
        }
    });
    if (!isUserExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    // checking old password
    if (isUserExist.password &&
        !(yield auth_utils_1.AuthUtils.comparePasswords(oldPassword, isUserExist.password))) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'Old Password is incorrect');
    }
    const hashPassword = bcrypt_1.default.hashSync(newPassword, 12);
    yield prisma_1.default.user.update({
        where: {
            id: isUserExist.id
        },
        data: {
            password: hashPassword
        }
    });
});
exports.AuthServices = {
    login,
    changePassword,
    refreshToken
};

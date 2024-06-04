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
exports.UserServices = void 0;
const client_1 = require("@prisma/client");
const isUserExistById_1 = __importDefault(require("../../utils/isUserExistById"));
const prisma_1 = __importDefault(require("../../utils/prisma"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const calculatePagination_1 = __importDefault(require("../../utils/calculatePagination"));
// register user
const createUserInToDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(payload);
    // hash password
    const hashPassword = bcrypt_1.default.hashSync(payload.password, 12);
    const userData = {
        name: payload.name,
        email: payload.email,
        password: hashPassword
    };
    // use transaction for creating user and profile together
    const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const createUserData = yield transactionClient.user.create({
            data: userData,
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
                updatedAt: true,
                password: false
            }
        });
        yield transactionClient.profile.create({
            data: Object.assign(Object.assign({}, payload.profile), { userId: createUserData.id })
        });
        return createUserData;
    }));
    return result;
});
// create admin
const createAdminInToDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(payload);
    // hash password
    const hashPassword = bcrypt_1.default.hashSync(payload.password, 12);
    const userData = {
        name: payload.name,
        email: payload.email,
        role: client_1.UserRole.ADMIN,
        password: hashPassword
    };
    // use transaction for creating user and profile together
    const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const createUserData = yield transactionClient.user.create({
            data: userData,
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
                updatedAt: true,
            }
        });
        yield transactionClient.profile.create({
            data: Object.assign(Object.assign({}, payload.profile), { userId: createUserData.id })
        });
        const createAdminData = yield transactionClient.admin.create({
            data: {
                name: payload === null || payload === void 0 ? void 0 : payload.name,
                email: payload === null || payload === void 0 ? void 0 : payload.email
            }
        });
        return createAdminData;
    }));
    return result;
});
// Get User Profile
const getUserProfileFromDb = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, isUserExistById_1.default)(userId);
    const result = yield prisma_1.default.profile.findUnique({
        where: {
            userId
        },
        include: {
            user: {
                select: {
                    name: true,
                    email: true,
                    password: false
                }
            }
        }
    });
    return result;
});
// update user profile
const updateUserProfileInToDb = (payload, userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, isUserExistById_1.default)(userId);
    const userData = yield prisma_1.default.user.update({
        where: {
            id: userId
        },
        data: {
            name: payload === null || payload === void 0 ? void 0 : payload.name,
            email: payload === null || payload === void 0 ? void 0 : payload.email
        },
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true,
            password: false
        }
    });
    // for profile data
    const profileData = yield prisma_1.default.profile.update({
        where: {
            userId
        },
        data: {
            bio: payload === null || payload === void 0 ? void 0 : payload.bio,
            age: payload === null || payload === void 0 ? void 0 : payload.age,
            location: payload === null || payload === void 0 ? void 0 : payload.location,
            profilePhoto: payload === null || payload === void 0 ? void 0 : payload.profilePhoto,
            profileDescription: payload === null || payload === void 0 ? void 0 : payload.profileDescription
        },
        select: {
            bio: true,
            age: true,
            location: true,
            profilePhoto: true,
            profileDescription: true,
        }
    });
    const result = Object.assign(Object.assign({}, userData), profileData);
    return result;
});
const getAllUser = (options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, skip, page } = (0, calculatePagination_1.default)(options);
    const result = yield prisma_1.default.user.findMany({
        skip: skip,
        take: limit,
        include: {
            profile: true
        }
    });
    const total = yield prisma_1.default.user.count({});
    return {
        meta: {
            page,
            limit,
            total
        },
        data: result
    };
});
const updateUserAccountStatus = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.update({
        where: {
            id,
        },
        data: {
            accountStatus: payload === null || payload === void 0 ? void 0 : payload.accountStatus
        }
    });
    return result;
});
const updateUserRoleStatus = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.update({
        where: {
            id,
        },
        data: {
            role: payload === null || payload === void 0 ? void 0 : payload.role
        }
    });
    return result;
});
exports.UserServices = {
    createUserInToDb,
    createAdminInToDb,
    getUserProfileFromDb,
    updateUserProfileInToDb,
    getAllUser,
    updateUserAccountStatus,
    updateUserRoleStatus
};

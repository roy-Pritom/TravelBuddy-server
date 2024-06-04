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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripServices = void 0;
const calculatePagination_1 = __importDefault(require("../../utils/calculatePagination"));
const isUserExistById_1 = __importDefault(require("../../utils/isUserExistById"));
const prisma_1 = __importDefault(require("../../utils/prisma"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
// create trip
const createTripInToDb = (payload, id) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(payload);
    const user = yield (0, isUserExistById_1.default)(id);
    const result = yield prisma_1.default.trip.create({
        data: Object.assign({ userId: user.id }, payload)
    });
    return result;
});
// Get Paginated and Filtered Trips
const getAllTripsFromDb = (params, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, sortBy, sortOrder, skip, page } = (0, calculatePagination_1.default)(options);
    const andConditions = [];
    const searchAbleFields = ["destination"];
    // console.log(params.searchTerm);
    // Search functionality
    if (params.searchTerm) {
        andConditions.push({
            OR: searchAbleFields.map(field => ({
                [field]: {
                    contains: params.searchTerm,
                    mode: "insensitive"
                }
            }))
        });
    }
    // Filtering logic excluding searchTerm from filterData
    const { searchTerm, minBudget, maxBudget, startDate, endDate } = params, filterData = __rest(params, ["searchTerm", "minBudget", "maxBudget", "startDate", "endDate"]);
    // Filters
    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map(key => ({
                [key]: {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    equals: filterData[key]
                }
            }))
        });
    }
    // Budget range filter
    if (minBudget || maxBudget) {
        andConditions.push({
            budget: {
                gte: minBudget ? parseInt(minBudget) : undefined,
                lte: maxBudget ? parseInt(maxBudget) : undefined,
            },
        });
    }
    // Date range filter
    if (startDate || endDate) {
        andConditions.push({
            AND: [
                startDate ? { startDate: { gte: startDate } } : {},
                endDate ? { endDate: { lte: endDate } } : {},
            ],
        });
    }
    // check user deleted or not
    andConditions.push({ isDeleted: false });
    const searchInputs = { AND: andConditions };
    const result = yield prisma_1.default.trip.findMany({
        where: searchInputs,
        include: {
            user: {
                include: {
                    profile: true
                }
            }
        },
        skip: skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder,
        },
    });
    const total = yield prisma_1.default.trip.count({
        where: searchInputs
    });
    return {
        meta: {
            page,
            limit,
            total
        },
        data: result
    };
});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getTripByUser = (id, params, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, skip, page } = (0, calculatePagination_1.default)(options);
    const andConditions = [];
    const searchAbleFields = ["destination"];
    // Search functionality
    if (params.searchTerm) {
        andConditions.push({
            OR: searchAbleFields.map(field => ({
                [field]: {
                    contains: params.searchTerm,
                    mode: "insensitive"
                }
            }))
        });
    }
    andConditions.push({ userId: id, isDeleted: false });
    const searchInputs = { AND: andConditions };
    const result = yield prisma_1.default.trip.findMany({
        where: searchInputs,
        skip: skip,
        take: limit,
    });
    const total = yield prisma_1.default.trip.count({
        where: searchInputs
    });
    return {
        meta: {
            page,
            limit,
            total
        },
        data: result
    };
});
// update trip
const updateTrip = (payload, id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.trip.findUniqueOrThrow({
        where: {
            id,
            isDeleted: false
        }
    });
    const result = yield prisma_1.default.trip.update({
        where: {
            id,
            isDeleted: false
        },
        data: payload
    });
    return result;
});
// get trip by Id
const getTripById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.trip.findUniqueOrThrow({
        where: {
            id,
            isDeleted: false
        },
        include: {
            user: {
                include: {
                    profile: true
                }
            }
        }
    });
    return result;
});
const getOpenTripById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.trip.findUniqueOrThrow({
        where: {
            id,
            isDeleted: false
        }
    });
    return result;
});
// delete trip soft delete
const softDeleteTrip = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const trip = yield prisma_1.default.trip.findUnique({
        where: {
            id
        },
    });
    if (!trip) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Trip does not exist!");
    }
    if ((trip === null || trip === void 0 ? void 0 : trip.isDeleted) === true) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Trip already deleted!");
    }
    const result = yield prisma_1.default.trip.update({
        where: {
            id
        },
        data: {
            isDeleted: true
        }
    });
    return result;
});
const getDeletedTrips = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.trip.findMany({
        where: {
            isDeleted: true
        }
    });
    return result;
});
exports.TripServices = {
    createTripInToDb,
    getAllTripsFromDb,
    getTripByUser,
    updateTrip,
    getTripById,
    softDeleteTrip,
    getDeletedTrips,
    getOpenTripById
};

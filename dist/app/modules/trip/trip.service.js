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
    const { searchTerm, minBudget, maxBudget } = params, filterData = __rest(params, ["searchTerm", "minBudget", "maxBudget"]);
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
    const searchInputs = { AND: andConditions };
    const result = yield prisma_1.default.trip.findMany({
        where: searchInputs,
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
exports.TripServices = {
    createTripInToDb,
    getAllTripsFromDb
};

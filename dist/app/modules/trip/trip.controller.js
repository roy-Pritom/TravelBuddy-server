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
exports.TripControllers = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const http_status_1 = __importDefault(require("http-status"));
const trip_service_1 = require("./trip.service");
const pick_1 = require("../../utils/pick");
// create trip
const createTrip = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    // console.log(req.user);
    // console.log(id);
    const result = yield trip_service_1.TripServices.createTripInToDb(req.body, id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Trip created successfully",
        data: result
    });
}));
// get trips by user
const getTripByUser = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.pick)(req.query, ["searchTerm"]);
    const { id } = req.user;
    // console.log(req.user);
    // console.log(id);
    const options = (0, pick_1.pick)(req.query, ['page', 'limit']);
    const result = yield trip_service_1.TripServices.getTripByUser(id, filters, options);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Trip fetch successfully",
        meta: result.meta,
        data: result.data
    });
}));
// Get Paginated and Filtered Trips
const getAllTrips = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.pick)(req.query, ["searchTerm", "destination", "budget", "startDate", "endDate", "minBudget", "maxBudget"]);
    // for pagination
    const options = (0, pick_1.pick)(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);
    const result = yield trip_service_1.TripServices.getAllTripsFromDb(filters, options);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Trips retrieved successfully",
        meta: result.meta,
        data: result.data
    });
}));
// update trip
const updateTrip = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tripId } = req.params;
    const result = yield trip_service_1.TripServices.updateTrip(req.body, tripId);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Trip updated successfully",
        data: result
    });
}));
// get trip by id
const getTripById = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tripId } = req.params;
    const result = yield trip_service_1.TripServices.getTripById(tripId);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Trip retrieved successfully",
        data: result
    });
}));
// getOpenTripById for every user
const getOpenTripById = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tripId } = req.params;
    const result = yield trip_service_1.TripServices.getOpenTripById(tripId);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Trip retrieved successfully",
        data: result
    });
}));
// softDeleteTrip
const softDeleteTrip = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tripId } = req.params;
    const result = yield trip_service_1.TripServices.softDeleteTrip(tripId);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Trip deleted successfully",
        data: result
    });
}));
const getDeletedTrips = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield trip_service_1.TripServices.getDeletedTrips();
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Deleted trips fetch successfully",
        data: result
    });
}));
exports.TripControllers = {
    createTrip,
    getAllTrips,
    getTripByUser,
    updateTrip,
    getTripById,
    softDeleteTrip,
    getDeletedTrips,
    getOpenTripById
};

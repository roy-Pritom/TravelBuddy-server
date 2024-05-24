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
exports.TravelControllers = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const http_status_1 = __importDefault(require("http-status"));
const travel_service_1 = require("./travel.service");
// Send Travel Buddy Request
const sendTravelBuddyRequest = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tripId } = req.params;
    const { id } = req.user;
    const result = yield travel_service_1.TravelServices.sendTravelBuddyRequestInToDb(req.body, tripId, id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Travel buddy request sent successfully",
        data: result
    });
}));
// Get Potential Travel Buddies For a Specific Trip
const getTravelBuddiesByTripId = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tripId } = req.params;
    const result = yield travel_service_1.TravelServices.getTravelBuddiesByTripId(tripId);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Potential travel buddies retrieved successfully",
        data: result
    });
}));
//  Respond to Travel Buddy Request
const responseToBuddyRequest = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { buddyId } = req.params;
    const { id } = req.user;
    const result = yield travel_service_1.TravelServices.responseToBuddyRequest(req.body, buddyId, id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Travel buddy request responded successfully",
        data: result
    });
}));
exports.TravelControllers = {
    sendTravelBuddyRequest,
    getTravelBuddiesByTripId,
    responseToBuddyRequest
};

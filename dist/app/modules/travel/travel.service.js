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
exports.TravelServices = void 0;
const isUserExistById_1 = __importDefault(require("../../utils/isUserExistById"));
const prisma_1 = __importDefault(require("../../utils/prisma"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
// Send Travel Buddy Request
const sendTravelBuddyRequestInToDb = (payload, tripId, senderId) => __awaiter(void 0, void 0, void 0, function* () {
    // check request sender user exist or not
    yield (0, isUserExistById_1.default)(senderId);
    const requestData = Object.assign({ tripId,
        senderId }, payload);
    const result = yield prisma_1.default.travelBuddyRequest.create({
        data: requestData
    });
    return result;
});
// Get Potential Travel Buddies For a Specific Trip
const getTravelBuddiesByTripId = (tripId) => __awaiter(void 0, void 0, void 0, function* () {
    // check trip is exist or not
    yield prisma_1.default.trip.findUniqueOrThrow({
        where: {
            id: tripId
        }
    });
    const result = yield prisma_1.default.travelBuddyRequest.findMany({
        where: {
            tripId: tripId
        },
        include: {
            user: {
                select: {
                    name: true,
                    email: true,
                    password: false
                }
            }
        },
    });
    // const userData=await isUserExistById(userId)
    return result;
});
//  Respond to Travel Buddy Request
const responseToBuddyRequest = (payload, buddyId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    // check user is exist or not
    yield (0, isUserExistById_1.default)(buddyId);
    //   find logged in user
    const userData = yield (0, isUserExistById_1.default)(userId);
    const result = yield prisma_1.default.travelBuddyRequest.updateMany({
        where: {
            senderId: buddyId,
            userId
        },
        data: {
            status: payload.status
        }
    });
    if (result.count === 0) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, `No buddy request has been sent to ${userData === null || userData === void 0 ? void 0 : userData.name} with this ID`);
    }
    // Retrieve the updated buddy requests
    const updatedRequests = yield prisma_1.default.travelBuddyRequest.findMany({
        where: {
            senderId: buddyId,
            userId
        }
    });
    return updatedRequests;
});
exports.TravelServices = {
    sendTravelBuddyRequestInToDb,
    getTravelBuddiesByTripId,
    responseToBuddyRequest
};

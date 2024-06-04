"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TravelRoutes = void 0;
const express_1 = __importDefault(require("express"));
const travel_controller_1 = require("./travel.controller");
const auth_1 = require("../../middlewares/auth");
const validateRequest_1 = require("../../middlewares/validateRequest");
const travel_validation_1 = require("./travel.validation");
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
// Send Travel Buddy Request
router.post('/trip/:tripId/request', (0, auth_1.auth)(client_1.UserRole.ADMIN, client_1.UserRole.USER), (0, validateRequest_1.validateRequest)(travel_validation_1.TravelValidationSchemas.buddyRequestValidationSchema), travel_controller_1.TravelControllers.sendTravelBuddyRequest);
// Get Potential Travel Buddies For a Specific Trip
router.get('/travel-buddies/:tripId', (0, auth_1.auth)(client_1.UserRole.ADMIN, client_1.UserRole.USER), travel_controller_1.TravelControllers.getTravelBuddiesByTripId);
// getAllTravelRequests
router.get('/buddy-requests', (0, auth_1.auth)(client_1.UserRole.ADMIN), travel_controller_1.TravelControllers.getAllTravelRequests);
// Get Travel Buddies request For a Specific User
router.get('/travel-requests', (0, auth_1.auth)(client_1.UserRole.ADMIN, client_1.UserRole.USER), travel_controller_1.TravelControllers.getTravelBuddyRequestsByUser);
// getReceiveTravelBuddyRequestsByUser
router.get('/receive-buddy-requests', (0, auth_1.auth)(client_1.UserRole.ADMIN, client_1.UserRole.USER), travel_controller_1.TravelControllers.getReceiveTravelBuddyRequestsByUser);
//  Respond to Travel Buddy Request
router.put('/travel-buddies/:buddyId/respond', (0, auth_1.auth)(client_1.UserRole.ADMIN, client_1.UserRole.USER), (0, validateRequest_1.validateRequest)(travel_validation_1.TravelValidationSchemas.requestResponseValidationSchema), travel_controller_1.TravelControllers.responseToBuddyRequest);
exports.TravelRoutes = router;

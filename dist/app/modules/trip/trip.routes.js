"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripRoutes = void 0;
const express_1 = __importDefault(require("express"));
const trip_controller_1 = require("./trip.controller");
const auth_1 = require("../../middlewares/auth");
const validateRequest_1 = require("../../middlewares/validateRequest");
const trip_validation_1 = require("./trip.validation");
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
// create trip
router.post('/trips', (0, auth_1.auth)(client_1.UserRole.USER, client_1.UserRole.ADMIN), (0, validateRequest_1.validateRequest)(trip_validation_1.TripValidationSchemas.createTripValidationSchema), trip_controller_1.TripControllers.createTrip);
// Get Paginated and Filtered Trips
router.get('/trips', trip_controller_1.TripControllers.getAllTrips);
// Get Trip by id for user and admin 
router.get('/trip/:tripId', (0, auth_1.auth)(client_1.UserRole.ADMIN, client_1.UserRole.USER), trip_controller_1.TripControllers.getTripById);
router.get('/get-trip/:tripId', trip_controller_1.TripControllers.getOpenTripById);
// Get  Trips by user
router.get('/user/trips', (0, auth_1.auth)(client_1.UserRole.USER, client_1.UserRole.ADMIN), trip_controller_1.TripControllers.getTripByUser);
// deleted  Trips by admin
router.get('/deleted-trips', (0, auth_1.auth)(client_1.UserRole.ADMIN), trip_controller_1.TripControllers.getDeletedTrips);
// update trip
router.patch('/update-trip/:tripId', (0, auth_1.auth)(client_1.UserRole.USER, client_1.UserRole.ADMIN), (0, validateRequest_1.validateRequest)(trip_validation_1.TripValidationSchemas.updateTripValidationSchema), trip_controller_1.TripControllers.updateTrip);
// delete trip soft delete
router.delete('/trip/soft-delete/:tripId', (0, auth_1.auth)(client_1.UserRole.ADMIN), trip_controller_1.TripControllers.softDeleteTrip);
exports.TripRoutes = router;

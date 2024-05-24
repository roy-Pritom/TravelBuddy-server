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
const router = express_1.default.Router();
// create trip
router.post('/trips', (0, auth_1.auth)(), (0, validateRequest_1.validateRequest)(trip_validation_1.TripValidationSchemas.createTripValidationSchema), trip_controller_1.TripControllers.createTrip);
// Get Paginated and Filtered Trips
router.get('/trips', trip_controller_1.TripControllers.getAllTrips);
exports.TripRoutes = router;

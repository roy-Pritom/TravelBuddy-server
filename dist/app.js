"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_routes_1 = require("./app/modules/user/user.routes");
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const notFoundRoute_1 = __importDefault(require("./app/middlewares/notFoundRoute"));
const auth_routes_1 = require("./app/modules/auth/auth.routes");
const trip_routes_1 = require("./app/modules/trip/trip.routes");
const travel_routes_1 = require("./app/modules/travel/travel.routes");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
// parser
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('Hello user!');
});
app.use('/api', user_routes_1.UserRoutes);
app.use('/api', auth_routes_1.AuthRoutes);
app.use('/api', trip_routes_1.TripRoutes);
app.use('/api', travel_routes_1.TravelRoutes);
app.use(globalErrorHandler_1.default);
app.use(notFoundRoute_1.default);
exports.default = app;

import express from 'express';
import { TripControllers } from './trip.controller';
import { auth } from '../../middlewares/auth';
import { validateRequest } from '../../middlewares/validateRequest';
import { TripValidationSchemas } from './trip.validation';
import { UserRole } from '@prisma/client';

const router=express.Router();

// create trip
router.post('/trips',auth(UserRole.USER,UserRole.ADMIN),validateRequest(TripValidationSchemas.createTripValidationSchema),TripControllers.createTrip);

// Get Paginated and Filtered Trips
router.get('/trips',TripControllers.getAllTrips)
// Get  Trips by user
router.get('/user/trips',auth(UserRole.USER,UserRole.ADMIN),TripControllers.getTripByUser)


export const TripRoutes=router;
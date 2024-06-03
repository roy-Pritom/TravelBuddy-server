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
// Get Trip by id for user and admin 
router.get('/trip/:tripId',auth(UserRole.ADMIN,UserRole.USER),TripControllers.getTripById)
router.get('/get-trip/:tripId',TripControllers.getOpenTripById)
// Get  Trips by user
router.get('/user/trips',auth(UserRole.USER,UserRole.ADMIN),TripControllers.getTripByUser)
// deleted  Trips by admin
router.get('/deleted-trips',auth(UserRole.ADMIN),TripControllers.getDeletedTrips)

// update trip
router.patch('/update-trip/:tripId',auth(UserRole.USER,UserRole.ADMIN),
validateRequest(TripValidationSchemas.updateTripValidationSchema),TripControllers.updateTrip)

// delete trip soft delete
router.delete('/trip/soft-delete/:tripId',auth(UserRole.ADMIN),TripControllers.softDeleteTrip)

export const TripRoutes=router;
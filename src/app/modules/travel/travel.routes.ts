import express from 'express';
import { TravelControllers } from './travel.controller';
import { auth } from '../../middlewares/auth';
import { validateRequest } from '../../middlewares/validateRequest';
import { TravelValidationSchemas } from './travel.validation';
import { UserRole } from '@prisma/client';


const router = express.Router();

// Send Travel Buddy Request
router.post('/trip/:tripId/request', auth(UserRole.ADMIN,UserRole.USER), validateRequest(TravelValidationSchemas.buddyRequestValidationSchema), TravelControllers.sendTravelBuddyRequest)

// Get Potential Travel Buddies For a Specific Trip
router.get('/travel-buddies/:tripId',auth(UserRole.ADMIN,UserRole.USER),TravelControllers.getTravelBuddiesByTripId)

// getAllTravelRequests
router.get('/buddy-requests',auth(UserRole.ADMIN),TravelControllers.getAllTravelRequests)

// Get Travel Buddies request For a Specific User
router.get('/travel-requests',auth(UserRole.ADMIN,UserRole.USER),TravelControllers.getTravelBuddyRequestsByUser)

//  Respond to Travel Buddy Request
router.put('/travel-buddies/:buddyId/respond',auth(UserRole.ADMIN,UserRole.USER),validateRequest(TravelValidationSchemas.requestResponseValidationSchema), TravelControllers.responseToBuddyRequest)

export const TravelRoutes = router;
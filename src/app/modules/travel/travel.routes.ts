import express from 'express';
import { TravelControllers } from './travel.controller';
import { auth } from '../../middlewares/auth';
import { validateRequest } from '../../middlewares/validateRequest';
import { TravelValidationSchemas } from './travel.validation';


const router = express.Router();

// Send Travel Buddy Request
router.post('/trip/:tripId/request', auth(), validateRequest(TravelValidationSchemas.buddyRequestValidationSchema), TravelControllers.sendTravelBuddyRequest)

// Get Potential Travel Buddies For a Specific Trip
router.get('/travel-buddies/:tripId',auth(),TravelControllers.getTravelBuddiesByTripId)

//  Respond to Travel Buddy Request
router.put('/travel-buddies/:buddyId/respond',auth(),validateRequest(TravelValidationSchemas.requestResponseValidationSchema), TravelControllers.responseToBuddyRequest)


export const TravelRoutes = router;
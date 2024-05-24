import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { TravelServices } from "./travel.service";

// Send Travel Buddy Request
const sendTravelBuddyRequest = catchAsync(async (req: Request, res: Response) => {
    const { tripId } = req.params;
    const { id } = req.user;
    const result = await TravelServices.sendTravelBuddyRequestInToDb(req.body, tripId, id);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Travel buddy request sent successfully",
        data: result
    })
})

// Get Potential Travel Buddies For a Specific Trip
const getTravelBuddiesByTripId = catchAsync(async (req: Request, res: Response) => {
    const { tripId } = req.params;
    const result = await TravelServices.getTravelBuddiesByTripId(tripId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Potential travel buddies retrieved successfully",
        data: result
    })
})

//  Respond to Travel Buddy Request
const responseToBuddyRequest = catchAsync(async (req: Request, res: Response) => {
    const { buddyId } = req.params;
    const { id } = req.user;
    const result = await TravelServices.responseToBuddyRequest(req.body,buddyId,id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Travel buddy request responded successfully",
        data: result
    })
})


export const TravelControllers = {
    sendTravelBuddyRequest,
    getTravelBuddiesByTripId,
    responseToBuddyRequest

}
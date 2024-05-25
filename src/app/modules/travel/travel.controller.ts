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

// get request history
const getTravelBuddyRequestsByUser = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.user;
    const result = await TravelServices.getTravelBuddyRequestsByUser(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Travel buddy request fetch successfully",
        data: result
    })
})
// getAllTravelRequests
const getAllTravelRequests = catchAsync(async (req: Request, res: Response) => {
    const result = await TravelServices.getAllTravelRequests();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Travel buddy requests fetch successfully",
        data: result
    })
})
// getReceiveTravelBuddyRequestsByUser
const getReceiveTravelBuddyRequestsByUser = catchAsync(async (req: Request, res: Response) => {
    const {id}=req.user;
    const result = await TravelServices.getReceiveTravelBuddyRequestsByUser(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Receive Travel buddy requests fetch successfully",
        data: result
    })
})


export const TravelControllers = {
    sendTravelBuddyRequest,
    getTravelBuddiesByTripId,
    responseToBuddyRequest,
    getTravelBuddyRequestsByUser,
    getAllTravelRequests,
    getReceiveTravelBuddyRequestsByUser

}
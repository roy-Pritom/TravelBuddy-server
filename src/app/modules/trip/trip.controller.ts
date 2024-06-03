import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { TripServices } from "./trip.service";
import { pick } from "../../utils/pick";

// create trip
const createTrip = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.user;
  // console.log(req.user);
  // console.log(id);
  const result = await TripServices.createTripInToDb(req.body, id);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Trip created successfully",
    data: result
  })
})
// get trips by user
const getTripByUser = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ["searchTerm"])
  const { id } = req.user;
  // console.log(req.user);
  // console.log(id);
  const options = pick(req.query, ['page', 'limit'])
  const result = await TripServices.getTripByUser(id,filters,options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Trip fetch successfully",
    meta: result.meta,
    data: result.data
  })
})

// Get Paginated and Filtered Trips
const getAllTrips = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ["searchTerm", "destination", "budget", "startDate", "endDate", "minBudget", "maxBudget"])
  // for pagination
  const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder'])
  const result = await TripServices.getAllTripsFromDb(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Trips retrieved successfully",
    meta: result.meta,
    data: result.data
  })
})


// update trip
const updateTrip = catchAsync(async (req: Request, res: Response) => {
  const { tripId } = req.params;
  const result = await TripServices.updateTrip(req.body, tripId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Trip updated successfully",
    data: result
  })
})
// get trip by id
const getTripById = catchAsync(async (req: Request, res: Response) => {
  const { tripId } = req.params;
  const result = await TripServices.getTripById(tripId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Trip retrieved successfully",
    data: result
  })
})
// getOpenTripById for every user
const getOpenTripById = catchAsync(async (req: Request, res: Response) => {
  const { tripId } = req.params;
  const result = await TripServices.getOpenTripById(tripId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Trip retrieved successfully",
    data: result
  })
})

// softDeleteTrip
const softDeleteTrip = catchAsync(async (req: Request, res: Response) => {
  const { tripId } = req.params;
  const result = await TripServices.softDeleteTrip(tripId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Trip deleted successfully",
    data: result
  })
})
const getDeletedTrips = catchAsync(async (req: Request, res: Response) => {

  const result = await TripServices.getDeletedTrips();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Deleted trips fetch successfully",
    data: result
  })
})


export const TripControllers = {
  createTrip,
  getAllTrips,
  getTripByUser,
  updateTrip,
  getTripById,
  softDeleteTrip,
  getDeletedTrips,
  getOpenTripById
}
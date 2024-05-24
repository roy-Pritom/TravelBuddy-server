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
  const { id } = req.user;
  // console.log(req.user);
  // console.log(id);
  const result = await TripServices.getTripByUser(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Trip fetch successfully",
    data: result
  })
})

// Get Paginated and Filtered Trips
const getAllTrips = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ["searchTerm", "destination", "budget","startDate","endDate","minBudget","maxBudget"])
  // for pagination
  const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder'])
  const result = await TripServices.getAllTripsFromDb(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Trips retrieved successfully",
    meta:result.meta,
    data: result.data
  })
})


export const TripControllers = {
  createTrip,
  getAllTrips,
  getTripByUser
}
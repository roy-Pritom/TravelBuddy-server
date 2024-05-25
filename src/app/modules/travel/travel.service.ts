import { TravelStatus } from "@prisma/client";
import isUserExistById from "../../utils/isUserExistById"
import prisma from "../../utils/prisma"
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

// Send Travel Buddy Request
const sendTravelBuddyRequestInToDb = async (payload: { userId: string }, tripId: string, senderId: string) => {
    // check request sender user exist or not
    await isUserExistById(senderId);
    const requestData = {
        tripId,
        senderId,
        ...payload
    }
    const result = await prisma.travelBuddyRequest.create({
        data: requestData
    })
    return result;

}

// Get Potential Travel Buddies For a Specific Trip
const getTravelBuddiesByTripId = async (tripId: string) => {
    // check trip is exist or not
    await prisma.trip.findUniqueOrThrow({
        where: {
            id: tripId
        }
    })
    const result = await prisma.travelBuddyRequest.findMany({
        where: {
            tripId: tripId
        },
        include: {
            user: {
                select: {
                    name: true,
                    email: true,
                    password: false
                }
            }
        },

    })

    // const userData=await isUserExistById(userId)
    return result;

}


// Get travel request by user
const getTravelBuddyRequestsByUser=async(id:string)=>{
const result=await prisma.travelBuddyRequest.findMany({
    where:{
        senderId:id
    },
    include:{
        trip:true
    }
});
return result;
}
//  Respond to Travel Buddy Request
const responseToBuddyRequest = async (payload: { status: TravelStatus }, buddyId: string, userId: string) => {
    // check user is exist or not
    await isUserExistById(buddyId);
    //   find logged in user
    const userData = await isUserExistById(userId)
    const result = await prisma.travelBuddyRequest.updateMany({
        where: {
            senderId: buddyId,
            userId
        },
        data: {
            status: payload.status
        }

    })
    if (result.count === 0) {
        throw new AppError(httpStatus.NOT_FOUND, `No buddy request has been sent to ${userData?.name} with this ID`)
    }

     // Retrieve the updated buddy requests
     const updatedRequests = await prisma.travelBuddyRequest.findMany({
        where: {
            senderId: buddyId,
            userId
        }
    });

    return updatedRequests;
}

const getAllTravelRequests=async()=>{
   const result=await prisma.travelBuddyRequest.findMany();
   return result;
}

export const TravelServices = {
    sendTravelBuddyRequestInToDb,
    getTravelBuddiesByTripId,
    responseToBuddyRequest,
    getTravelBuddyRequestsByUser,
    getAllTravelRequests
}
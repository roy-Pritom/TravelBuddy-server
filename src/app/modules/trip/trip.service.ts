/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prisma } from "@prisma/client";
import calculatePagination from "../../utils/calculatePagination";
import isUserExistById from "../../utils/isUserExistById";
import prisma from "../../utils/prisma"
import { TTrip, TTripFilterRequest } from "./trip.interface";
import { TPaginationOptions } from "../../interface/pagination";

// create trip
const createTripInToDb = async (payload: TTrip, id: string) => {
    // console.log(payload);
    const user = await isUserExistById(id);
    const result = await prisma.trip.create({
        data: {
            userId: user.id,
            ...payload
        }
    })
    return result;
}


// Get Paginated and Filtered Trips
const getAllTripsFromDb = async (params: TTripFilterRequest, options: TPaginationOptions) => {
    const { limit, sortBy, sortOrder, skip, page } = calculatePagination(options);
    const andConditions: Prisma.TripWhereInput[] = [];
    const searchAbleFields = ["destination"];
    // console.log(params.searchTerm);
    // Search functionality
    if (params.searchTerm) {
        andConditions.push({
            OR: searchAbleFields.map(field => ({
                [field]: {
                    contains: params.searchTerm,
                    mode: "insensitive"
                }
            }))
        });
    }

    // Filtering logic excluding searchTerm from filterData
    const { searchTerm, minBudget, maxBudget, ...filterData } = params;

    // Filters
    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map(key => ({
                [key]: {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    equals: (filterData as any)[key]
                }
            }))
        });
    }

    // Budget range filter
    if (minBudget || maxBudget) {
        andConditions.push({
            budget: {
                gte: minBudget ? parseInt(minBudget) : undefined,
                lte: maxBudget ? parseInt(maxBudget) : undefined,
            },
        });
    }

    const searchInputs: Prisma.TripWhereInput = { AND: andConditions };


    const result = await prisma.trip.findMany({
        where: searchInputs,
        skip: skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder,
        },
    });

    const total = await prisma.trip.count({
        where: searchInputs
    })

    return {
        meta: {
            page,
            limit,
            total
        },
        data: result
    };
};


const getTripByUser = async (id: string) => {
    const result = await prisma.trip.findMany({
        where: {
            userId: id
        }
    })
    return result;
}


// update trip

const updateTrip=async(payload:Partial<TTrip>,id:string)=>{
   const result=await prisma.trip.update({
    where:{
        id
    },
    data:payload
   })

   return result;
}

export const TripServices = {
    createTripInToDb,
    getAllTripsFromDb,
    getTripByUser,
    updateTrip

}
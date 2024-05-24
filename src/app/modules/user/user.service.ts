import { AccountStatus, UserRole } from "@prisma/client";
import isUserExistById from "../../utils/isUserExistById";
import prisma from "../../utils/prisma";
import { TUpdateUser, TUser } from "./user.interface";
import bcrypt from 'bcrypt';

// register user
const createUserInToDb = async (payload: TUser) => {
    // console.log(payload);
    // hash password
    const hashPassword = bcrypt.hashSync(payload.password, 12);
    const userData = {
        name: payload.name,
        email: payload.email,
        password: hashPassword
    }
    // use transaction for creating user and profile together
    const result = await prisma.$transaction(async (transactionClient) => {
        const createUserData = await transactionClient.user.create({
            data: userData,
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
                updatedAt: true,
                password: false
            }
        })
        await transactionClient.profile.create({
            data: {
                ...payload.profile,
                userId: createUserData.id
            }
        })
        return createUserData;
    })

    return result;
}


// create admin
const createAdminInToDb = async (payload: TUser) => {
    // console.log(payload);
    // hash password
    const hashPassword = bcrypt.hashSync(payload.password, 12);
    const userData = {
        name: payload.name,
        email: payload.email,
        role: UserRole.ADMIN,
        password: hashPassword
    }
    // use transaction for creating user and profile together
    const result = await prisma.$transaction(async (transactionClient) => {
        const createUserData = await transactionClient.user.create({
            data: userData,
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
                updatedAt: true,

            }
        })
        await transactionClient.profile.create({
            data: {
                ...payload.profile,
                userId: createUserData.id
            }
        })
        const createAdminData = await transactionClient.admin.create({
            data: {
                name: payload?.name,
                email: payload?.email
            }
        })
        return createAdminData;
    })

    return result;
}

// Get User Profile
const getUserProfileFromDb = async (userId: string) => {
    await isUserExistById(userId);
    const result = await prisma.profile.findUnique({
        where: {
            userId
        },
        include: {
            user: {
                select: {
                    name: true,
                    email: true,
                    password: false
                }
            }
        }
    })
    return result;
}

// update user profile
const updateUserProfileInToDb = async (payload: Partial<TUpdateUser>, userId: string) => {
    await isUserExistById(userId);
    const userData = await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            name: payload?.name,
            email: payload?.email
        },
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true,
            password: false
        }
    })
    // for profile data
    const profileData = await prisma.profile.update({
        where: {
            userId
        },
        data: {
            bio: payload?.bio,
            age: payload?.age,
            location: payload?.location,
            profilePhoto: payload?.profilePhoto,
            profileDescription:payload?.profileDescription
        },
        select: {
            bio: true,
            age: true,
            location: true,
            profilePhoto: true,
            profileDescription: true,
        }
    })
    const result = {
        ...userData,
        ...profileData
    }
    return result;
}


const getAllUser=async()=>{
const result=await prisma.user.findMany({
   
    include:{
        profile:true
    }
});
return result;
}
const updateUserAccountStatus=async(id:string,payload:{accountStatus:AccountStatus})=>{
const result=await prisma.user.update({
     where:{
        id,
     },
     data:{
        accountStatus:payload?.accountStatus
     }
});
return result;
}


export const UserServices = {
    createUserInToDb,
    createAdminInToDb,
    getUserProfileFromDb,
    updateUserProfileInToDb,
    getAllUser,
    updateUserAccountStatus
}
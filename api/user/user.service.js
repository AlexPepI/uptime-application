import User from "../models/User.js"
import { getAuth,clerkClient } from "@clerk/express"

const WhoAmI = async (req) => {
    const { userId } = getAuth(req)
    const user = await clerkClient.users.getUser(userId)
    return(user)
}

const getAllUsersService = async () => {
    const allDatabaseUsers = await User.findAll();
    return(allDatabaseUsers)
}

const signUpService = async (clerkId) =>{
    await User.create({
        clerk_Id:clerkId
    })
    return(`User with clerkId = ${clerkId}, Signed Up to our database`)
}

export {WhoAmI,signUpService,getAllUsersService}
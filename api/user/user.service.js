import User from "../models/User.js"
import { getAuth,clerkClient } from "@clerk/express"

const WhoAmI = async (req) => {
    const { userId } = getAuth(req)
    const user = await clerkClient.users.getUser(userId)
    return(user.id)
}

const getAllUsersService = async () => {
    const allDatabaseUsers = await User.findAll();
    return(allDatabaseUsers)
}

const signUpService = async (clerk_Id) =>{

    const exists = await User.findOne({ where: { clerk_Id } });
    if (exists) {
        return("Already Signed up")
    }

    await User.create({
        clerk_Id:clerk_Id,
        sitesMonitoring:0
    })
    return(`User with clerkId = ${clerk_Id}, Signed Up to our database`)
}

export {WhoAmI,signUpService,getAllUsersService}
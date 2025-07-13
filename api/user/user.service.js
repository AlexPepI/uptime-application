import { getAuth,clerkClient } from "@clerk/express"

const WhoAmI = async (req) => {

    const { userId } = getAuth(req)
    const user = await clerkClient.users.getUser(userId)
    return(user)
}

export {WhoAmI}
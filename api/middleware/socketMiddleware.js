import { User } from "../models/index.js";
import { verifyToken } from "@clerk/clerk-sdk-node";

const socketMiddleware = async (socket, next) => {
  try {
    const token = socket.handshake.auth.token
    if (!token) throw new Error('No auth token')

    const { sub: clerkId } = await verifyToken(token,{
      secretKey: process.env.CLERK_SECRET_KEY
    })

    const user = await User.findOne({ where: { clerk_Id: clerkId } })
    if (!user) throw new Error('User not found')


    socket.dbUserId = user.user_Id
    socket.join(`user:${user.user_Id}`)

    return next()
  } catch (err) {
    console.error('Socket auth error:', err.message)
    return next(new Error('unauthorized'))
  }
}

export default socketMiddleware
import {WhoAmI,getAllUsersService,signUpService} from "./user.service.js";

const getUser= async (req,res) => {    
    
    try {
        const response = await WhoAmI(req)
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({msg : error.message})
    }
}

const getAllUsers= async (req,res) => {    
    
    try {
        const response = await getAllUsersService(req)
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({msg : error.message})
    }
}

const signUpUser = async (req,res) => {
    try {
        const clerkId = req.body.clerkId
        const response = await signUpService(clerkId)
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({msg : error.message})
    }
}



export {getUser,signUpUser,getAllUsers}
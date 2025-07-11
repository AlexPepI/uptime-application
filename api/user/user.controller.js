import {signupUser,getAllUsers} from "./user.service.js";

const signup= async (req,res) => {    
    
    const {username} = req.body;
    try {
        await signupUser(username)
        res.status(200).json("OK")
    } catch (error) {
        res.status(400).json({msg : error.message})
    }
}

const getAll= async (req,res) => {    
    
    try {
        const response = await getAllUsers()
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({msg : error.message})
    }
}


export {signup,getAll}
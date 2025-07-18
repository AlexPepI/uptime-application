import {WhoAmI} from "./user.service.js";

const getUser= async (req,res) => {    
    
    try {
        const response = await WhoAmI(req)
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({msg : error.message})
    }
}

export {getUser}
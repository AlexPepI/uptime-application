import User from '../models/User.js';

const signupUser = async (username) => {

    await User.create({
        username:username
    })
    
}

const getAllUsers = async () => {

    const result = await User.findAll()
    return result

}

export {signupUser,getAllUsers}
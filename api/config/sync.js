import {Monitor,User,Check} from "../models/index.js";

const sync = async (x) => {
    
    await User.sync(x); //production too
    await Monitor.sync(x);
    await Check.sync(x)
    console.log("sync")
}

export default sync
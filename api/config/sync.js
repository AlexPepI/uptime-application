import {Monitor,User} from "../models/index.js";

const sync = async () => {
    console.log("sync")
    User.sync({force:false}); //production too
    Monitor.sync({force:false})
}

export default sync
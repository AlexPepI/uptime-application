import User from "../models/User.js";

const sync = async () => {
    console.log("sync")
    User.sync({force:true}); //production too
}

export default sync
import User from "../models/User.js";

const sync = async () => {
    console.log("sync")
    User.sync({force:false});
}

export default sync
import express from "express";

// import { requireAuth } from "@clerk/express";

const router = express.Router();


// console.log(process.env.CLERK_PUBLISHABLE_KEY)

router.get("/",(req,res)=>{
    console.log("Okay")
    res.status(200).json("Hello from the Server !!")
})

export default router
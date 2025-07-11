import express from "express";

const router = express.Router();

router.get("/",(req,res)=>{
    console.log("Okay")
    res.status(200).json("Hello from the Server !!")
})

export default router
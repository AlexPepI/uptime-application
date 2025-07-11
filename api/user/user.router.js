import { Router } from "express";
import {signup,getAll} from "./user.controller.js";

const userRouter = Router();
userRouter.get("/all",getAll)
userRouter.post("/signup",signup);

export default userRouter
import { Router } from "express";
import {getUser} from "./user.controller.js";

const userRouter = Router();
userRouter.get("/whoami",getUser)


export default userRouter
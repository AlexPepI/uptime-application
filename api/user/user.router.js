import { Router } from "express";
import {getUser,getAllUsers,signUpUser} from "./user.controller.js";

const userRouter = Router();
userRouter.get("/whoami",getUser);
userRouter.get("/all",getAllUsers);
userRouter.post('/sign-up',signUpUser);


export default userRouter
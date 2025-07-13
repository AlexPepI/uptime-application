import cors from "cors";
import "dotenv/config"
import express from "express";
import sync from "./config/sync.js";
import testRouter from "./routes/test.js";
import userRouter from "./user/user.router.js";
import { clerkMiddleware, requireAuth } from '@clerk/express';

const app = express();
app.use(express.json());
const port = 3001;

app.use(cors());
app.use(clerkMiddleware());
sync();

app.use("/api/test",testRouter)

app.use("/api/user",requireAuth(),userRouter)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

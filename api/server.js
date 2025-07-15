import "dotenv/config";
import cors from "cors";
import express from "express";
import sync from "./config/sync.js";
import userRouter from "./user/user.router.js";
import clerkWebhook from "./webhooks/clerk/clerkWebhook.js"
// import uptimeRouter from "./uptime/uptime.router.js";
import { clerkMiddleware, requireAuth } from '@clerk/express';

const app = express();
app.use(cors());
app.use(clerkWebhook);
app.use(express.json());
const port = 3001;


app.use(clerkMiddleware());
sync();

app.use("/api/user",requireAuth(),userRouter)
// app.use("/api/uptime",uptimeRouter)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

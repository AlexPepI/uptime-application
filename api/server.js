import "dotenv/config";
import cors from "cors";
import express from "express";
import sync from "./config/sync.js";
import { initScheduler } from "./scheduler/uptimeScheduler.js";
// import {User} from "./models/index.js";
import userRouter from "./user/user.router.js";
import uptimeRouter from "./uptime/uptime.router.js";
import clerkWebhook from "./webhooks/clerk/clerkWebhook.js";
import { clerkMiddleware, requireAuth } from '@clerk/express';

const app = express();
app.use(cors());
app.use(clerkWebhook);
app.use(express.json());
const port = 3001;

app.use(clerkMiddleware());
// sync();
// const user = await User.findByPk(1);
// const mon = await user.createMonitor({ url: "https://example.com" });

app.use("/api/user",requireAuth(),userRouter)
app.use("/api/uptime",requireAuth(),uptimeRouter)


async function start() {
  sync();
  await initScheduler();
  app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

}

start();

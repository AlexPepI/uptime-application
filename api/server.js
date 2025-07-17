import "dotenv/config";
import cors from "cors";
import express from "express";
import { createServer } from "http";
import sync from "./config/sync.js";

import { Server as IOServer } from "socket.io";
import userRouter from "./user/user.router.js";
import uptimeRouter from "./uptime/uptime.router.js";
import clerkWebhook from "./webhooks/clerk/clerkWebhook.js";
import { clerkMiddleware, requireAuth } from '@clerk/express';
import { initScheduler } from "./scheduler/uptimeScheduler.js";
import socketMiddleware from "./middleware/socketMiddleware.js";


const app = express();
app.use(cors());
app.use(clerkWebhook);
app.use(express.json());
const port = 3001;

app.use(clerkMiddleware());

app.use("/api/user",requireAuth(),userRouter)
app.use("/api/uptime",requireAuth(),uptimeRouter)

const httpServer = createServer(app);

export const io = new IOServer(httpServer, {
  cors: { origin: "*" }  // tighten this in production!
});

const uptimeNsp = io.of("/api/refresh-values")
uptimeNsp.use(socketMiddleware);

uptimeNsp.on('connection', socket => {
  console.log(`User ${socket.dbUserId} connected to /refresh-values`)
  socket.on('disconnect', () => {
    console.log(`User ${socket.dbUserId} disconnected`)
  })
})

async function start() {
  await sync({alter:true});
  await initScheduler();
  // app.listen(port, () => {
  //   console.log(`Server is running on port ${port}`);
  // });
   httpServer.listen( port, () => {
    console.log("🚀 Server running");
  });
}


start();

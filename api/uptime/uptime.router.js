import { Router } from "express";
import { getUptimeResponse,stopCronJob,getActiveMonitors } from "./uptime.controller.js";

const uptimeRouter = Router();
uptimeRouter.get("/url",getUptimeResponse);
uptimeRouter.post("/stop",stopCronJob);
uptimeRouter.get("/active-monitors",getActiveMonitors)


export default uptimeRouter
import { Router } from "express";
import { getUptimeResponse,stopCronJob } from "./uptime.controller.js";

const uptimeRouter = Router();
uptimeRouter.get("/url",getUptimeResponse);
uptimeRouter.post("/stop",stopCronJob)


export default uptimeRouter
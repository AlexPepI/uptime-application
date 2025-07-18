import { Router } from "express";
import { getUptimeResponse,stopCronJob,getActiveMonitors,getMonitorsChecks } from "./uptime.controller.js";

const uptimeRouter = Router();
uptimeRouter.post("/url",getUptimeResponse);
uptimeRouter.post("/stop",stopCronJob);
uptimeRouter.get("/active-monitors",getActiveMonitors)
uptimeRouter.get("/monitor/:id",getMonitorsChecks);


export default uptimeRouter
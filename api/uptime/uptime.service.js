import {Monitor} from "../models/index.js"
import { scheduleMonitor,runCheck } from "../scheduler/uptimeScheduler.js";

const UptimeService = async (user_Id, url) => {
  // 1) enforce max-5-URLs
  const count = await Monitor.count({ where: { user_Id, active: true } });
  if (count >= 5) {
    throw new Error("You can only monitor up to 5 URLs");
  }

  // 2) prevent duplicates
  const exists = await Monitor.findOne({ where: { user_Id, url, active: true } });
  if (exists) {
    throw new Error("You’re already monitoring that URL");
  }

  const deactivated = await Monitor.findOne({ where: { user_Id, url, active: false } });
  if (deactivated) {
    deactivated.active = true;
    await deactivated.save();
    runCheck(deactivated);
    scheduleMonitor(deactivated);
    return deactivated;
  }


  // 3) create the monitor
  const monitor = await Monitor.create({ user_Id, url, active: true });

    runCheck(monitor);

    scheduleMonitor(monitor);

    return monitor;
}

const StopUptimeService = async (user_Id,url) => {

  // 1) find the active monitor
  const monitor = await Monitor.findOne({
    where: { user_Id, url, active: true },
  });
  if (!monitor) {
    throw new Error("No active monitor found for that URL");
  }
  // 2) mark it inactive
  monitor.active = false;
  await monitor.save();
  return { message: "Monitoring stopped", monitor };
}

const GetChecksService = async (monitorId) => {

}


export {UptimeService,StopUptimeService,GetChecksService}
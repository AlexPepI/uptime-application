// scheduler/uptimeScheduler.js
import { Monitor } from "../models/index.js";

const INTERVAL = 5 * 60 * 1000; //change to 5 minutes later

const runCheck = async (monitor) => {
  const start = Date.now();
  let status = "up";

  // 10s timeout via AbortController
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);

  try {
    const res = await fetch(monitor.url, { signal: controller.signal });
    if (res.status >= 500) status = "down";
  } catch {
    status = "down";
  } finally {
    clearTimeout(timeout);
  }

  const latency = Date.now() - start;
  console.log(`[${new Date().toISOString()}] ${monitor.url} → ${status} (${latency}ms)`);
}

const scheduleMonitor = (monitor) => {
  const initialDelay = Math.random() * INTERVAL;

  setTimeout(function tick() {
    runCheck(monitor).catch(console.error);
    setTimeout(tick, INTERVAL);
  }, initialDelay);
}

// on server start: load all active monitors
const initScheduler = async () => {
  const monitors = await Monitor.findAll({ where: { active: true } });
  monitors.forEach(scheduleMonitor);
}

// to start a single new monitor immediately
export { scheduleMonitor,initScheduler,runCheck };

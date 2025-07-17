// scheduler/uptimeScheduler.js
import { Monitor,Check } from "../models/index.js";
import {io} from "../server.js"


const INTERVAL = 5 * 60 * 1000; //change to 5 minutes later

const runCheck = async (monitor) => {
    
    let status = "up";

    // 10s timeout via AbortController
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10_000);
    const start = Date.now();
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

    const check = await Check.create({
    monitorId: monitor.id,
    status,
    latency,
  });

  io.of('/api/refresh-values')
    .to(`user:${monitor.user_Id}`)
    .emit('new-check', {
      monitorId: monitor.id,
      status:    check.status,
      latency:   check.latency,
      timestamp: check.createdAt,
  })
}

const scheduleMonitor = (monitor) => {
  const initialDelay = Math.random() * INTERVAL;

  setTimeout(async function tick() {
    // re-load to get the latest `active` flag
    const fresh = await Monitor.findByPk(monitor.id);
    if (!fresh || !fresh.active) {
      return; // stop scheduling further
    }

    await runCheck(fresh).catch(console.error);
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

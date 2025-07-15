import cron from "node-cron"

const activeJobs = new Map();

const UptimeService = async (targetUrl) => {

    try {
        const start = performance.now();
        const response = await fetch(targetUrl, { 
            method: 'GET' 
        });
        const end = performance.now();
        const responseTime = Math.round(end - start);


        const job = cron.schedule('*/1 * * * *', async () => {
            try {
                const start = performance.now();
                const response = await fetch(targetUrl, {
                headers: { 'User-Agent': 'Mozilla/5.0' },
                redirect: 'follow',
                });
                const duration = Math.round(performance.now() - start);
                console.log(`[UP] ${targetUrl} - ${response.status} - ${duration}ms`);
            } catch (err) {
                console.log(`[DOWN] ${targetUrl} - ERROR: ${err.message}`);
            }
        });

        job.start(); 
        activeJobs.set(targetUrl, job);
        console.log(activeJobs);
        return({
        status:  'up',
        httpStatus: response.status,
        responseTime: `${responseTime}ms`
        });
    }catch (err) {
        return({ status: 'down', error: err.message });
    }
}

const StopCronJobService = async (url) => {
    const job = activeJobs.get(url);
    if (!job) return('No job found for this URL' );
    job.stop();
    activeJobs.delete(url);
    console.log(`🛑 Stopped monitoring for ${url}`);
    return(`Stopped monitoring for ${url}`)
}



export {UptimeService,StopCronJobService}
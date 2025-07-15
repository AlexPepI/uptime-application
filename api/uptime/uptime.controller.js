import { UptimeService,StopCronJobService } from "./uptime.service.js"

const getUptimeResponse= async (req,res) => {
    const targetUrl = req.query.url;
    
    if (!targetUrl) {
        return res.status(400).json({ error: 'Missing url parameter' });
    }
    
    try {
        new URL(targetUrl);
    } catch {
        return res.status(400).json({ error: 'Invalid URL format' });
    }

    try {
        const response = await UptimeService(targetUrl)
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({msg : error.message})
    }
}

const stopCronJob = async (req,res) => {

    const { url } = req.body;
    if (!url) {
        return res.status(400).json({ error: 'Missing url parameter' });
    }    
    try {
        new URL(url);
    } catch {
        return res.status(400).json({ error: 'Invalid URL format' });
    }

    try {
        const response = await StopCronJobService(url)
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({msg : error.message})
    }
}

export {getUptimeResponse,stopCronJob}
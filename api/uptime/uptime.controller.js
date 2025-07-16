import {User} from "../models/index.js";
import { WhoAmI } from "../user/user.service.js";
import { UptimeService,StopCronJobService } from "./uptime.service.js";

const getUptimeResponse= async (req,res) => {

    try {
        const targetUrl = req.query.url;
        const userClerkId = await WhoAmI(req);
        const userId = await User.findOne({ where: { clerk_Id:userClerkId} })
        const response = await UptimeService(userId.user_Id,targetUrl)
        res.status(201).json(response)
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
        const userId = await WhoAmI(req);
        const response = await StopCronJobService(userId,url)
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({msg : error.message})
    }
}

export {getUptimeResponse,stopCronJob}
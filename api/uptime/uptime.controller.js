import {User,Monitor,Check} from "../models/index.js";
import { WhoAmI } from "../user/user.service.js";
import { UptimeService,StopUptimeService } from "./uptime.service.js";



const getActiveMonitors = async (req,res) => {
    try {
        const userClerkId = await WhoAmI(req);
        const user = await User.findOne({ where: { clerk_Id:userClerkId} })    
        const monitors = await Monitor.findAll({ where: { user_Id:user.user_Id, active: true } });
        const enriched = []
        for (const m of monitors) {
            const lastCheck = await Check.findOne({
                where:    { monitorId: m.id },
                order:    [['createdAt', 'DESC']],
                attributes: ['status', 'latency', 'createdAt']
            })
            enriched.push({
                ...m.get({ plain: true }),
                lastCheck: lastCheck ? lastCheck.get({ plain: true }) : null
            })
        }
        return res.status(200).json(enriched)
    } catch (error) {
        res.status(400).json({msg : error.message})
    }    

}

const getUptimeResponse= async (req,res) => {

    try {
        const targetUrl = req.body.url;
        // console.log(req.body)
        // console.log(targetUrl)
        const userClerkId = await WhoAmI(req);
        const userId = await User.findOne({ where: { clerk_Id:userClerkId} })
        const response = await UptimeService(userId.user_Id,targetUrl)
        res.status(201).json(response)
    } catch (error) {
        if(error.message==="Validation error: Validation isUrl on url failed"){
            error.message="You must add a url"
        }

        res.status(400).json({msg : error.message})
    }
}

const stopCronJob = async (req,res) => {

    const { url } = req.body;
    if (!url) {
        return res.status(400).json({ error: 'Missing url parameter' });
    }    

    try {
        const userClerkId = await WhoAmI(req);
        const userId = await User.findOne({ where: { clerk_Id:userClerkId} })
        const response = await StopUptimeService(userId.user_Id,url)
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({msg : error.message})
    }
}

export {getUptimeResponse,stopCronJob,getActiveMonitors}
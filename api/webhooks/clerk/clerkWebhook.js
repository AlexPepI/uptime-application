import dotenv from 'dotenv';
import User from '../../models/User.js';
import express from 'express';
import { Webhook } from 'svix';

dotenv.config();
const clerkWebhookRouter = express.Router();

clerkWebhookRouter.post(
  '/api/webhooks',
  express.raw({ type: 'application/json' }),
  async (req, res) => {
    try {
      const secret = process.env.CLERK_WEBHOOK_SECRET;
      const wh = new Webhook(secret);
      const evt = wh.verify(req.body, req.headers);

      if (evt.type === 'user.created') {
        const clerkId = evt.data.id;
        await User.create({
            clerk_Id:clerkId,
            sitesMonitoring:0
        })
      }
      res.status(200).send('Webhook received');
    } catch (err) {
      res.status(400).send('Invalid webhook');
    }
  }
);

export default clerkWebhookRouter;


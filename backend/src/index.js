//const express = require('express');
import dns from 'dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);
import express from 'express';
import cors from 'cors';
import "dotenv/config.js";
import fs from "fs";
import path from "path";
import clerkWebhook from "./webhooks/clerk.webhooks.js";
import { clerkMiddleware } from '@clerk/express'
import { connectDB } from './lib/db.js';
import job from './lib/cron.js';
import User from './models/user.model.js';
import authRoute from './routes/auth.routes.js';
import messageRoutes from './routes/message.route.js';
const app = express();
const port = 3000;
const publicDir = path.join(process.cwd(), "public");
const FRONTEND_URL = process.env.FRONTEND_URL;
app.use('/api/webhooks/clerk',express.raw({ type: 'application/json' }), clerkWebhook);
app.use(express.json());
app.use(cors({
  origin: FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true}));
app.use(clerkMiddleware())

app.get('/h', (req, res) => {
  res.status(200).send('Hello World!');
});
app.use('/api/auth',authRoute);
app.use("/api/messages", messageRoutes);
if (fs.existsSync(publicDir)) {
  app.use(express.static(publicDir));

  app.get("/{*any}", (req, res, next) => {
    res.sendFile(path.join(publicDir, "index.html"), (err) => next(err));
  });
}
app.listen(port, () => {
  connectDB();
  console.log(`Server is running on http://localhost:${port}`);
  if(process.env.NODE_ENV === "production") { job.start(); }
});
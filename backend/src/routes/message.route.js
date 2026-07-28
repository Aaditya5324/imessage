import express from 'express';
import {protectroute } from '../middleware/auth.middleware.js';
import { getUsersForSidebar,getConversationsForSidebar,getMessages,sendMessage } from '../controllers/message.controller.js';
const router = express.Router();
router.get('/user', protectroute, getUsersForSidebar);
router.get('/conversations', protectroute, getConversationsForSidebar);
router.get('/:id', protectroute, getMessages);
router.post('/send/:id', protectroute, sendMessage);
export default router;
import express from 'express';
import { checkAuth } from '../controllers/auth.controller.js';
import { protectroute } from '../middleware/auth.middleware.js';
const router = express.Router();
router.get('/check',protectroute,checkAuth)
export default router;


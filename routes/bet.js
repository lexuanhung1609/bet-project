import express from 'express';
import { createBet } from '../controllers/bet.js';
const router = express.Router();

router.post('/create', createBet);

export default router;

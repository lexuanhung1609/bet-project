import express from 'express';
import { createBet, deleteBet } from '../controllers/bet.js';
const router = express.Router();

router.post('/create', createBet);
router.post('/delete', deleteBet);

export default router;

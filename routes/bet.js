import express from 'express';
import { createBet, deleteBet, updateBet } from '../controllers/bet.js';
const router = express.Router();

router.post('/create', createBet);
router.post('/delete', deleteBet);
router.post('/update', updateBet);

export default router;

import express from 'express';
import { createBet, deleteBet, updateBet, getListBet } from '../controllers/bet.js';
const router = express.Router();

router.post('/create', createBet);
router.post('/delete', deleteBet);
router.post('/update', updateBet);
router.post('/getlistbet', getListBet);

export default router;

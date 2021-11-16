import express from 'express';
import {
  createBet,
  deleteBet,
  updateBet,
  getListBet,
  getSingleBet,
  getUserBet,
} from '../controllers/bet.js';

const router = express.Router();

router.get('/', getUserBet);
router.post('/create', createBet);
router.post('/delete', deleteBet);
router.post('/update', updateBet);
router.get('/:_id', getSingleBet);
router.post('/getlistbet', getListBet);

export default router;

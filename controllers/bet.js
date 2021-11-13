import { Bet } from '../models/bet.js';

const createBet = async (req, res, next) => {
  const bodyData = req.body;
  const bet = bodyData;
  const result = await Bet.create(bet);
  res.json(result);
};

const deleteBet = async (req, res, next) => {
  const id = req.id;
  const result = await Bet.deleteOne({ id: id });
  res.json(result);
};

export { createBet, deleteBet };

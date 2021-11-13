import { Bet } from '../models/bet.js';

const createBet = async (req, res, next) => {
  const bodyData = req.body;
  const bet = bodyData;
  const result = await Bet.create(bet);
  res.json(result);
};

export { createBet };

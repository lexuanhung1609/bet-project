import { Bet } from '../models/bet.js';

const createBet = async (req, res, next) => {
  const bodyData = req.body;
  const bet = bodyData;
  const result = await Bet.create(bet);
  res.json(result);
};

const deleteBet = async (req, res, next) => {
  const id = req.body.id;
  if (!id) {
    return res.json('Please enter id');
  }

  try {
    const result = await Bet.deleteOne({ _id: id });
    return res.json(result);
  } catch (error) {
    res.json({
      error,
    });
  }
};

export { createBet, deleteBet };

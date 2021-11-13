import { Bet } from '../models/bet.js';
import { OK, NOT_FOUND, FAIL } from '../shared/response.js';

const createBet = async (req, res, next) => {
  const bodyData = req.body;
  const bet = bodyData;
  const result = await Bet.create(bet);
  res.json(result);
};

const deleteBet = async (req, res, next) => {
  const id = req.body.id;

  if (!id) {
    return res.json(NOT_FOUND([]));
  }

  const existedBet = await Bet.findOne({ _id: id });

  if (!existedBet) {
    return res.json(NOT_FOUND([]));
  }

  try {
    const result = await Bet.deleteOne({ _id: id });
    return res.json(OK([existBet]));
  } catch (error) {
    return res.json(FAIL([]));
  }
};

export { createBet, deleteBet };

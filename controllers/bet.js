import { Bet } from '../models/bet.js';
import Response from '../shared/response.js';

const createBet = async (req, res, next) => {
  const bodyData = req.body;
  const bet = bodyData;
  const result = await Bet.create(bet);
  res.json(result);
};

const deleteBet = async (req, res, next) => {
  const id = req.body.id;
  const response = new Response();
  if (!id) {
    return res.json(response.NOT_FOUND([]));
  }

  const existBet = await Bet.findOne({ _id: id });

  if (!existBet) {
    return res.json(response.NOT_FOUND([]));
  }

  try {
    const result = await Bet.deleteOne({ _id: id });
    return res.json(response.OK([existBet]));
  } catch (error) {
    return res.json(response.FAIL([]));
  }
};

export { createBet, deleteBet };

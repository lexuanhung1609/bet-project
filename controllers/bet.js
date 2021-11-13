import { Bet } from '../models/bet.js';
import { OK, NOT_FOUND, FAIL } from '../shared/response.js';

const createBet = async (req, res, next) => {
  const bodyData = req.body;
  let { team1, team2, time, rate } = bodyData;
  if (team1 !== '' && team2 !== '' && time !== '' && rate !== '') {
    const bet = new Bet(bodyData);
    try {
      const result = await Bet.create(bet);
      return res.json(OK([existedBet]));
    } catch (e) {
      return res.json(FAIL([]));
    }
  }
  return res.json(NOT_FOUND([]));
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
    return res.json(OK([existedBet]));
  } catch (error) {
    return res.json(FAIL([]));
  }
};

const updateBet = async (req, res, next) => {
  const bodyData = req.body;
  const betNew = bodyData;
  const betID = betNew._id;

  const findBet = { _id: betID };
  const newValues = { team1: betNew.team1, team2: betNew.team2, time: betNew.time, status: betNew.status, rate: betNew.rate, winner: betNew.winner };
  const updateBet = await Bet.updateOne(findBet, newValues);

  const updatedBet = await Bet.findOne({ _id: betID });

  return res.json(OK([updatedBet]));
}

export { createBet, deleteBet, updateBet };
const getSingleBet = async (req, res, next) => {
  const bet = await Bet.findById(req.params);
  res.json(bet);
};

export { createBet, getSingleBet, deleteBet };

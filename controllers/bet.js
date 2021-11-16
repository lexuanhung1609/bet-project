import { Bet } from '../models/bet.js';
import { Team } from '../models/team.js';
import { OK, NOT_FOUND, FAIL } from '../shared/response.js';

const createBet = async (req, res, next) => {
  const bodyData = req.body;
  let { team1, team2, time, rate } = bodyData;
  if (team1 !== '' && team2 !== '' && time !== '' && rate !== '') {
    const bet = new Bet(bodyData);
    try {
      const result = await Bet.create(bet);
      return res.json(OK([result]));
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
  const newValues = {
    team1: betNew.team1,
    team2: betNew.team2,
    time: betNew.time,
    status: betNew.status,
    rate: betNew.rate,
    winner: betNew.winner,
  };
  const updateBet = await Bet.updateOne(findBet, newValues);

  const updatedBet = await Bet.findOne({ _id: betID });

  return res.json(OK([updatedBet]));
};

const getListBet = async (req, res, next) => {
  const bodyData = req.body;
  try {
    const allBet = await Bet.find();
    return res.json(allBet);
  } catch (error) {
    return res.json(FAIL());
  }
};

const getSingleBet = async (req, res, next) => {
  try {
    const result = await Bet.findById(req.params);
    return res.json(OK([result]));
  } catch (e) {
    return res.json(FAIL());
  }
};

const getUserBet = async (req, res, next) => {
  const bodyData = req.body;
  const allBet = await Bet.find();
  const allMatch = {};
  let match_index = 0;

  for (const key in allBet) {
    if (Object.hasOwnProperty.call(allBet, key)) {
      const element = allBet[key];
      const team1 = await Team.findById(element.team1);
      const team2 = await Team.findById(element.team2);
      const winner = await Team.findById(element.winner);
      const match = allBet[match_index];
      match.winner = winner;
      match.team1 = team1;
      match.team2 = team2;
      allMatch[match_index] = match;
      match_index++;
      console.log(match);
    }
  }
  return res.render('user/index', { allMatch, allBet });
};

export {
  createBet,
  deleteBet,
  updateBet,
  getListBet,
  getSingleBet,
  getUserBet,
};

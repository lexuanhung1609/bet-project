import { Team } from '../models/team.js';

const createTeam = async (req, res, next) => {
  const bodyData = req.body;
  const team = bodyData;
  const result = await Team.create(team);
  res.json(result);
};

export { createTeam };

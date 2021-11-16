import { Team } from '../models/team.js';
import {OK, NOT_FOUND, FAIL} from '../shared/response.js';

const createTeam = async (req, res, next) => {
  const bodyData = req.body;
  let { name, imgUrl, region } = bodyData;
  if (name !== '' && imgUrl !== '' && region !== '') {
    console.log(bodyData);
    const team = new Team(bodyData);
    try {
      const result = await Team.create(team);
      return res.json(OK([team]));
    } catch (e) {
      return res.json(FAIL([]));
    }
  }
  return res.json(NOT_FOUND([]));
};

export { createTeam };

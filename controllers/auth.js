import { User } from '../models/user.js';
import {randomPassword} from '../utils/password.js'
const getSignup = (req, res) => {
  res.render('auth/signup');
};

const postSignup = async (req, res) => {
  const reqData = req.body;
  let { confirmPassword, ...data } = reqData;
  const user = { ...data, role: ['USER'] };
  const result = await User.create(user);
  User.create(user)
    .then((result) => {
      return;
    })
    .catch({});
  console.log(result);
  if (result) {
    res.redirect('/');
  }
};

const getTempPassword = (req, res, next) =>
{
  res.render('auth/temp-password',{
    randomPassword: randomPassword()
  });
};

const getResetPassword = (req, res, next) =>
{
  res.render('auth/reset-password');
}

export { getSignup, postSignup, getTempPassword, getResetPassword };

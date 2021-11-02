import { User } from '../models/user.js';

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

const getLogin = (req, res) => {
  res.render('auth/login')
}

const getForgotPassword = (req, res) => {
  res.render('auth/forgot-password')
}

export { getSignup, postSignup, getLogin, getForgotPassword };

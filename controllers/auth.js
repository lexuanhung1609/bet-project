import { User } from '../models/user.js';
import { randomPassword } from '../utils/password.js';

const validate = (req, res)=> {
  const email = req.body.email;
  const username = req.body.username;
  User.findOne({ username: username }, (err, user) => {
    // if (err) {
    //   console.log(err);
    // }
    if (user) {
      // console.log(user);
      res.render('auth/signup', {
        message: 'username already exist',
      });
    }
  });
  User.findOne({ email: email }, (err, user) => {
    // if (err) {
    //   console.log(err);
    // }
    if (user) {
      // console.log(user);
      res.render('auth/signup', {
        message: 'email already exist',
      });
    }
  });
}
const getSignup = (req, res) => {
  res.render('auth/signup', {message: null});
};

const postSignup = async (req, res) => {
  const reqData = req.body;
  const password = req.body.password
  const confirmPwd = req.body.confirmPassword;

  if (password != confirmPwd) {
    res.render('auth/signup', {message: 'password and confirm password must be the same'})
  }
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
    res.redirect('/login');
  }
};

const getLogin = (req, res) => {
  res.render('auth/login');
};

const getForgotPassword = (req, res) => {
  res.render('auth/forgot-password');
};

const getTempPassword = (req, res, next) => {
  res.render('auth/temp-password', {
    randomPassword: randomPassword(),
  });
};

const getResetPassword = (req, res, next) => {
  res.render('auth/reset-password');
};

export {
  getSignup,
  postSignup,
  getLogin,
  getForgotPassword,
  getTempPassword,
  getResetPassword,
  validate,
};

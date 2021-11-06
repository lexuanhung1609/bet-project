import { User } from '../models/user.js';
import { randomPassword } from '../utils/password.js';

const getSignup = (req, res) => {
  res.render('auth/signup', { message: null });
};

const postSignup = async (req, res) => {
  const reqData = req.body;
  const password = req.body.password;
  const confirmPwd = req.body.confirmPassword;
  const email = req.body.email;
  const username = req.body.username;

  if (password != confirmPwd) {
    return res.render('auth/signup', {
      message: 'Your password and confirm password did not match',
    });
  }

  const emailExists = await User.exists({ email: email });
  if (emailExists) {
    return res.render('auth/signup', { message: 'email already existed' });
  }

  let { confirmPassword, ...data } = reqData;
  const user = { ...data, role: ['USER'] };
  const result = await User.create(user);
  if (result) {
    res.redirect('/login');
  }
};

const getLogin = (req, res) => {
  res.render('auth/login', { message: null });
};

const postLogin = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.render('auth/login', {
      message: 'Please fill the required field',
    });
  }

  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!emailRegex.test(email)) {
    return res.render('auth/login', {
      message: 'Invalid email',
    });
  }

  const result = await User.findOne({ email: email });

  if (!result) {
    return res.render('auth/login', {
      message: "Your email doesn't exist!",
    });
  } else if (result.password != password) {
    return res.render('auth/login', {
      message: 'Incorrect password!',
    });
  } else {
    return res.redirect('/');
  }
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
  postLogin,
  getForgotPassword,
  getTempPassword,
  getResetPassword,
};

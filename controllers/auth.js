import { render } from 'ejs';
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
  res.render('auth/forgot-password', {
    errorMessage: null
  })
}

const postForgotPassword = async (req, res) => {
  const reqData = req.body;
  const reqEmail = reqData.email;

  const profile = await User.findOne({ email: reqEmail });
  if (profile === null) {
    return res.render('auth/forgot-password', {
      errorMessage: 'Your email does not exist!'
    })
  } else {
    const passedEmail = encodeURIComponent(reqEmail);
    res.redirect('temp-password?email=' + passedEmail);
  }
}

const getTempPassword = (req, res, next) => {
  const passedEmail = req.query.email;
  res.render('auth/temp-password', {
    passedEmail: passedEmail.trim(),
    randomPassword: randomPassword()
  });
};

const postTempPassword = async (req, res, next) => {
  const tempPassword = req.body.tempPassword;
  const passedEmail = req.body.email;


  const profile = await User.findOne({ email: passedEmail.trim() });
  const updatedPasswordProfile = await User.updateOne({ password: profile.password }, { $set: { password: tempPassword } });
  return res.redirect('reset-password?email=' + passedEmail);
};

const getResetPassword = (req, res, next) => {
  const passedEmail = req.query.email;
  res.render('auth/reset-password', {
    passedEmail: passedEmail.trim(),
    errorMessage: null
  });
}

const postResetPassword = async (req, res, next) => {
  const passedEmail = req.body.email;
  const profile = await User.findOne({ email: passedEmail.trim() });
  const currentPassword = req.body.currentPwd;

  if (profile.password != currentPassword) {
    return res.render('auth/reset-password', {
      passedEmail: passedEmail.trim(),
      errorMessage: 'Your current password is incorrect!'
    });
  }

  const newPassword = req.body.newPwd;
  const confirmNewPassword = req.body.confirmNewPwd;

  if (newPassword != confirmNewPassword) {
    return res.render('auth/reset-password', {
      passedEmail: passedEmail.trim(),
      errorMessage: 'Your password(s) did not match!'
    });
  }

  const updatedPasswordProfile = await User.updateOne({ password: currentPassword }, { $set: { password: newPassword } });
  res.redirect('login');
}

const getAdminIndex = (req, res, next) => {
  res.render('auth/admin');
};

export { getSignup, postSignup, postLogin, getLogin, getForgotPassword, getTempPassword, getResetPassword, postForgotPassword, postTempPassword, postResetPassword, getAdminIndex };
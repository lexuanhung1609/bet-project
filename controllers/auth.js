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
  if (result) {
    res.redirect('/');
  }
};

const getLogin = (req, res) => {
  res.render('auth/login', {message: null})
}

const postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.render('auth/login', {
      message: 'Please fill the required field',
    })
  }

  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!re.test(email)) {
    return res.render('auth/login', {
      message: "Invalid email",
    })
  }

  User.findOne({email: email}).lean().exec((err, doc) => {
    if (!doc) {
      res.render('auth/login', {
        message: "Your email doesn't exist!",
      })
    }
    else if (doc.password != password)
    {
      res.render('auth/login', {
        message: "Incorrect password",
      })
    }
    else {
      res.redirect('/')
    }
  })

}

const getForgotPassword = (req, res) => {
  res.render('auth/forgot-password')
}

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
 
export { getSignup, postSignup, getLogin, postLogin, getForgotPassword, getTempPassword, getResetPassword };


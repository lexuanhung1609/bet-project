import * as express from 'express';
import { getSignup, postSignup, getLogin, getForgotPassword, getTempPassword, getResetPassword, postForgotPassword, postTempPassword, postResetPassword, getAdminIndex, postLogin } from '../controllers/auth.js';
const router = express.Router();

router.get('/signup', getSignup);
router.post('/signup', postSignup);

router.get('/login', getLogin);
router.post('/login', postLogin);
router.get('/forgotpassword', getForgotPassword);
router.post('/forgotpassword', postForgotPassword);

router.get('/temp-password', getTempPassword);
router.post('/temp-password', postTempPassword);

router.get('/reset-password', getResetPassword);
router.post('/reset-password', postResetPassword);

export default router;

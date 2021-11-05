import * as express from 'express';
import { getSignup, postSignup, getLogin, postLogin, getForgotPassword, getTempPassword, getResetPassword } from '../controllers/auth.js';
const router = express.Router();

router.get('/signup', getSignup);
router.post('/signup', postSignup);
router.get('/login', getLogin);
router.post('/login', postLogin);
router.get('/forgotpassword', getForgotPassword);
router.get('/temp-password', getTempPassword);
router.get('/reset-password', getResetPassword);

export default router;

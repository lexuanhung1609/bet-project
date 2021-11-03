import * as express from 'express';
import { getSignup, postSignup, getLogin, getForgotPassword, getTempPassword, getResetPassword, validate } from '../controllers/auth.js';
const router = express.Router();

router.get('/signup', getSignup);
router.post('/signup', validate, postSignup);
router.get('/login', getLogin);
router.get('/forgotpassword', getForgotPassword);
router.get('/temp-password', getTempPassword);
router.get('/reset-password', getResetPassword);

export default router;

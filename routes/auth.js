import * as express from 'express';
import { getSignup, postSignup, getLogin, getForgotPassword } from '../controllers/auth.js';
const router = express.Router();

router.get('/signup', getSignup);
router.post('/signup', postSignup);
router.get('/login', getLogin)
router.get('/forgotpassword', getForgotPassword)

export default router;

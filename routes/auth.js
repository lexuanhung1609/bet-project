import * as express from 'express';
import { getSignup, postSignup, getForgotPassword } from '../controllers/auth.js';
const router = express.Router();

router.get('/signup', getSignup);
router.post('/signup', postSignup);
router.get('/forgotpassword', getForgotPassword)

export default router;

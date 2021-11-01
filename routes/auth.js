import * as express from 'express';
import { getSignup, postSignup, getTempPassword, getResetPassword } from '../controllers/auth.js';
const router = express.Router();

router.get('/signup', getSignup);
router.post('/signup', postSignup);
router.get('/temp-password', getTempPassword);
router.get('/reset-password', getResetPassword);

export default router;

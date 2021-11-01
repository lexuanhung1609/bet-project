import * as express from 'express';
import { getSignup, postSignup,getLogin } from '../controllers/auth.js';
const router = express.Router();

router.get('/signup', getSignup);
router.post('/signup', postSignup);
router.get('/login',getLogin);

export default router;

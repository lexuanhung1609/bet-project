import * as express from 'express';
import { getSignup, postSignup } from '../controllers/auth.js';
const router = express.Router();

router.get('/signup', getSignup);
router.post('/signup', postSignup);

export default router;

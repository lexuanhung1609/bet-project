import * as express from 'express';
import { getAdminIndex } from '../controllers/auth.js';
const router = express.Router();

router.get('/', getAdminIndex);

export default router;

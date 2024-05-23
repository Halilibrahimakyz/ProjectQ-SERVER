import { Router } from 'express';
import { httpTest } from '../../controllers/test';

const router = Router();

router.get('/', httpTest);
router.get('/get', httpTest);

export default router;

import { Router } from 'express';
import { httpTest,httpTestRefreshToken } from '../../controllers/test';
import protect from '../../middleware/auth';  // Varsayılan olarak içe aktarma
import refreshAuth from '../../middleware/refreshAuth';

const router = Router();

router.get('/', protect, httpTest);
router.get('/get', protect, httpTest);
router.post('/refresh-token', refreshAuth, httpTestRefreshToken);

export default router;

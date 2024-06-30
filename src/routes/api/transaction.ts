import { Router } from 'express';
import { httpPostDonate } from '../../controllers/transaction';
import protect from '../../middleware/auth';
import { upload } from '../../middleware/multer';

const router = Router();

router.post('/donate', protect, httpPostDonate);


export default router;

import { Router } from 'express';
import { httpCheckUserName } from '../../controllers/validate';


const router = Router();

router.post('/check-user-name', httpCheckUserName);

export default router;

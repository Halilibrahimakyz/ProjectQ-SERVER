import { Router } from 'express';
import { httpLoginStudent,httpLogin, httpLoginSupporter, httpSignUpStudent, httpSignUpSupporter, httpRefreshToken, httpLogout } from '../../controllers/auth';
import { setCreatorAndModifier } from '../../middleware/setCreatorAndModifier';

const router = Router();

router.post('/login/student', httpLoginStudent);
router.post('/login', httpLogin);
router.post('/login/supporter', httpLoginSupporter);
router.post('/signup/student',  httpSignUpStudent);
router.post('/signup/supporter',  httpSignUpSupporter);
router.post('/refresh-token', httpRefreshToken);
router.post('/logout', httpLogout);

export default router;

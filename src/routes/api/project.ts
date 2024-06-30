import { Router } from 'express';
import { httpPostCreateProject,httpGetProjects } from '../../controllers/project';
import protect from '../../middleware/auth';
import { upload } from '../../middleware/multer';

const router = Router();

router.post('/create', protect, httpPostCreateProject);
router.get('/projects', protect, httpGetProjects);


export default router;

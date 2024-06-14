import { Router } from 'express';
import { httpGetCities,httpGetUniversities } from '../../controllers/info';
import { setCreatorAndModifier } from '../../middleware/setCreatorAndModifier';

const router = Router();

router.get('/cities', httpGetCities);
router.get('/universities', httpGetUniversities);


export default router;

import { Router } from 'express';
import contactController from '../controllers/ContactController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/', loginRequired, contactController.index);
router.post('/', loginRequired, contactController.store);

export default router;

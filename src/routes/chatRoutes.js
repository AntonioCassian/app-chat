import { Router } from 'express';
import chatController from '../controllers/ChatController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/:id', chatController.show);
router.post('/', loginRequired, chatController.store);
router.post('/message', chatController.messageIo);

export default router;

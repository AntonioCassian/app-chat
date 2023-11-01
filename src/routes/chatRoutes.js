import { Router } from 'express';
import chatController from '../controllers/ChatController';

const router = new Router();

router.get('/:id', chatController.show);
router.post('/', chatController.store);

export default router;

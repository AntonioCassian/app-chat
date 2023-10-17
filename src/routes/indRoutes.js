import { Router } from 'express';

const router = new Router();

router.get('/', (req, res) => {
  res.send('HELLOW WORD!');
});

export default router;

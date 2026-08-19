import { Router } from 'express';
import { menuController } from '../controllers/menuController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { roleMiddleware } from '../middleware/roleMiddleware.js';

const router = Router();
router.get('/', menuController.list);
router.use(authMiddleware, roleMiddleware(['staff', 'admin']));
router.get('/manage', menuController.manage);
router.post('/', menuController.create);
router.put('/:itemId', menuController.update);
router.delete('/:itemId', menuController.remove);

export default router;

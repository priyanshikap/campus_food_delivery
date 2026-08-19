import { Router } from 'express';
import { slotController } from '../controllers/slotController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { roleMiddleware } from '../middleware/roleMiddleware.js';

const router = Router();
router.get('/', slotController.list);
router.use(authMiddleware, roleMiddleware(['staff', 'admin']));
router.get('/manage', slotController.manage);
router.post('/', slotController.create);
router.put('/:slotId', slotController.update);
router.delete('/:slotId', slotController.remove);

export default router;

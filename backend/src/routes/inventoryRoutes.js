import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { roleMiddleware } from '../middleware/roleMiddleware.js';
import { inventoryController } from '../controllers/inventoryController.js';

const router = Router();
router.use(authMiddleware, roleMiddleware(['staff', 'admin']));
router.get('/', inventoryController.list);
router.put('/:menuItemId/:slotId/:pickupDate', inventoryController.update);

export default router;

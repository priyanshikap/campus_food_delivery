import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { roleMiddleware } from '../middleware/roleMiddleware.js';
import { staffController } from '../controllers/staffController.js';

const router = Router();
router.use(authMiddleware, roleMiddleware(['staff', 'admin']));
router.get('/orders', staffController.orders);
router.patch('/orders/:orderId/status', staffController.updateOrderStatus);

export default router;

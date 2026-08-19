import { Router } from 'express';
import { orderController } from '../controllers/orderController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();
router.use(authMiddleware);
router.get('/', orderController.list);
router.get('/:orderId', orderController.get);
router.post('/', orderController.create);
router.patch('/:orderId/status', orderController.updateStatus);

export default router;

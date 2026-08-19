import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { roleMiddleware } from '../middleware/roleMiddleware.js';
import { adminController } from '../controllers/adminController.js';

const router = Router();
router.use(authMiddleware, roleMiddleware(['admin']));
router.get('/users', adminController.users);
router.patch('/users/:userId/status', adminController.updateUserStatus);
router.get('/analytics', adminController.analytics);

export default router;

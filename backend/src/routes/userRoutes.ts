import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.get('/profile', authenticateToken, UserController.getProfile);
router.put('/profile', authenticateToken, UserController.updateProfile);
router.get('/referrals', authenticateToken, UserController.getReferralStats);
router.post('/referrals/add', authenticateToken, UserController.addReferral);
router.post('/withdraw', authenticateToken, UserController.initiateWithdraw);
router.get('/payments', authenticateToken, UserController.getPaymentHistory);

export default router;

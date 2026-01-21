import { Router } from 'express';
import { PaymentController } from '../controllers/PaymentController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.get('/', authenticateToken, PaymentController.getPaymentHistory);
router.post('/initiate', authenticateToken, PaymentController.initiatePayment);
router.post('/:paymentId/complete', authenticateToken, PaymentController.completePayment);

export default router;

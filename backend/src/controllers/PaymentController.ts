import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { PaymentService } from '../services/PaymentService';

const paymentService = new PaymentService();

export class PaymentController {
  static async getPaymentHistory(req: AuthRequest, res: Response) {
    try {
      const payments = await paymentService.getPaymentHistory(req.user!.id);
      res.json(payments);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async initiatePayment(req: AuthRequest, res: Response) {
    try {
      const { amount, method, walletOrPhone } = req.body;
      const payment = await paymentService.initiatePayment(
        req.user!.id,
        amount,
        method,
        walletOrPhone
      );
      res.json(payment);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async completePayment(req: AuthRequest, res: Response) {
    try {
      const { paymentId } = req.params;
      const payment = await paymentService.completePayment(paymentId);
      res.json(payment);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

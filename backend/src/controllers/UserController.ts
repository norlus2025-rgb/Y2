import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { UserService } from '../services/UserService';
import { PaymentService } from '../services/PaymentService';
import { PaymentMethod } from '../entities/Payment';

const userService = new UserService();
const paymentService = new PaymentService();

export class UserController {
  static async getProfile(req: AuthRequest, res: Response) {
    try {
      const user = await userService.getUserProfile(req.user!.id);
      res.json(user);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async updateProfile(req: AuthRequest, res: Response) {
    try {
      const user = await userService.updateUserProfile(req.user!.id, req.body);
      res.json(user);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getReferralStats(req: AuthRequest, res: Response) {
    try {
      const stats = await userService.getReferralStats(req.user!.id);
      res.json(stats);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async addReferral(req: AuthRequest, res: Response) {
    try {
      const { referralCode } = req.body;
      const referral = await userService.addReferral(referralCode, req.user!.id);
      res.json(referral);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async initiateWithdraw(req: AuthRequest, res: Response) {
    try {
      const { amount, method, walletOrPhone } = req.body;
      
      const payment = await paymentService.initiatePayment(
        req.user!.id,
        amount,
        method as PaymentMethod,
        walletOrPhone
      );

      res.json(payment);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getPaymentHistory(req: AuthRequest, res: Response) {
    try {
      const payments = await paymentService.getPaymentHistory(req.user!.id);
      res.json(payments);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

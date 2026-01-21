import { AppDataSource } from '../config/database';
import { Payment, PaymentStatus, PaymentMethod } from '../entities/Payment';
import { User } from '../entities/User';
import { MTNService, OrangeMoneyService, VodafoneService } from './MobileMoneyService';
import { CryptoService } from './CryptoService';
import { JwtService } from '../utils/jwt';

export class PaymentService {
  private paymentRepository = AppDataSource.getRepository(Payment);
  private userRepository = AppDataSource.getRepository(User);

  async initiatePayment(
    userId: string,
    amount: number,
    method: PaymentMethod,
    walletOrPhone: string
  ): Promise<Payment> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user || user.balance < amount) {
      throw new Error('Insufficient balance');
    }

    const payment = this.paymentRepository.create({
      user,
      amount,
      method,
      status: PaymentStatus.PENDING,
      walletAddress: method.includes('ethereum') || method === PaymentMethod.USDC ? walletOrPhone : null,
      phoneNumber: ['mtn', 'orange', 'vodafone'].includes(method) ? walletOrPhone : null,
      reference: JwtService.generateReferralCode(),
    });

    await this.paymentRepository.save(payment);

    // Process payment based on method
    await this.processPayment(payment);

    return payment;
  }

  private async processPayment(payment: Payment): Promise<void> {
    try {
      let result: any;

      switch (payment.method) {
        case PaymentMethod.MTN:
          result = await MTNService.sendMoney(
            payment.phoneNumber!,
            payment.amount,
            payment.reference
          );
          break;

        case PaymentMethod.ORANGE:
          result = await OrangeMoneyService.sendMoney(
            payment.phoneNumber!,
            payment.amount,
            payment.reference
          );
          break;

        case PaymentMethod.VODAFONE:
          result = await VodafoneService.sendMoney(
            payment.phoneNumber!,
            payment.amount,
            payment.reference
          );
          break;

        case PaymentMethod.USDC:
          result = await CryptoService.sendUSDC(
            payment.walletAddress!,
            payment.amount
          );
          payment.transactionHash = result.transactionHash;
          break;

        case PaymentMethod.ETHEREUM:
          result = await CryptoService.sendETH(
            payment.walletAddress!,
            payment.amount
          );
          payment.transactionHash = result.transactionHash;
          break;

        default:
          throw new Error('Unsupported payment method');
      }

      payment.status = PaymentStatus.PROCESSING;
      await this.paymentRepository.save(payment);
    } catch (error: any) {
      payment.status = PaymentStatus.FAILED;
      payment.failureReason = error.message;
      await this.paymentRepository.save(payment);
      throw error;
    }
  }

  async completePayment(paymentId: string): Promise<Payment> {
    const payment = await this.paymentRepository.findOne({
      where: { id: paymentId },
      relations: ['user'],
    });

    if (!payment) {
      throw new Error('Payment not found');
    }

    payment.status = PaymentStatus.COMPLETED;
    payment.completedAt = new Date();

    // Deduct from user balance
    if (payment.user) {
      payment.user.balance -= payment.amount;
      await this.userRepository.save(payment.user);
    }

    return await this.paymentRepository.save(payment);
  }

  async getPaymentHistory(userId: string): Promise<Payment[]> {
    return await this.paymentRepository.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
    });
  }
}

import { AppDataSource } from '../config/database';
import { User } from '../entities/User';
import { UserReferral } from '../entities/UserReferral';
import { JwtService } from '../utils/jwt';

export class UserService {
  private userRepository = AppDataSource.getRepository(User);
  private referralRepository = AppDataSource.getRepository(UserReferral);

  async createOrUpdateUser(googleUser: any): Promise<{ user: User; token: string }> {
    let user = await this.userRepository.findOne({
      where: { googleId: googleUser.id },
    });

    if (!user) {
      user = this.userRepository.create({
        email: googleUser.email,
        firstName: googleUser.given_name,
        lastName: googleUser.family_name,
        googleId: googleUser.id,
        profileImage: googleUser.picture,
        referralCode: JwtService.generateReferralCode(),
        isActive: true,
      });

      await this.userRepository.save(user);
    }

    const token = JwtService.generateToken({
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
    });

    return { user, token };
  }

  async getUserProfile(userId: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { id: userId },
      relations: ['referrals', 'payments'],
    });
  }

  async updateUserProfile(userId: string, data: Partial<User>): Promise<User> {
    await this.userRepository.update(userId, data);
    return (await this.userRepository.findOne({
      where: { id: userId },
    })) as User;
  }

  async getReferralStats(userId: string): Promise<{
    code: string;
    totalReferrals: number;
    totalCommission: number;
  }> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) throw new Error('User not found');

    const referrals = await this.referralRepository.find({
      where: { referrer: { id: userId } },
    });

    const totalCommission = referrals.reduce((sum, ref) => sum + ref.totalCommissionEarned, 0);

    return {
      code: user.referralCode!,
      totalReferrals: referrals.length,
      totalCommission,
    };
  }

  async addReferral(referrerCode: string, userId: string): Promise<UserReferral> {
    const referrer = await this.userRepository.findOne({
      where: { referralCode: referrerCode },
    });

    if (!referrer) throw new Error('Invalid referral code');

    const referral = this.referralRepository.create({
      referrer,
      referredUser: await this.userRepository.findOne({ where: { id: userId } }),
      commissionRate: 5,
    });

    return await this.referralRepository.save(referral);
  }

  async creditUserBalance(userId: string, amount: number): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new Error('User not found');

    user.balance += amount;
    user.totalEarned += amount;

    // Handle referral commission
    const referral = await this.referralRepository.findOne({
      where: { referredUser: { id: userId } },
      relations: ['referrer'],
    });

    if (referral) {
      const commission = (amount * referral.commissionRate) / 100;
      referral.totalCommissionEarned += commission;
      referral.referrer.balance += commission;
      referral.referrer.referralEarnings += commission;

      await this.referralRepository.save(referral);
      await this.userRepository.save(referral.referrer);
    }

    await this.userRepository.save(user);
  }
}

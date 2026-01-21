import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from './User';

@Entity('user_referrals')
export class UserReferral {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  referralCode: string;

  @Column({ default: 0 })
  commissionRate: number; // 5% = 5

  @Column({ default: 0 })
  totalCommissionEarned: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.referrals)
  referrer: User;

  @ManyToOne(() => User, (user) => user.referredBy)
  referredUser: User;
}

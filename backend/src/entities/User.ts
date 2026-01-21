import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Task } from './Task';
import { UserReferral } from './UserReferral';
import { Payment } from './Payment';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  googleId: string;

  @Column({ nullable: true })
  profileImage: string;

  @Column({ default: 0 })
  balance: number;

  @Column({ default: 0 })
  totalEarned: number;

  @Column({ default: 0 })
  referralEarnings: number;

  @Column({ nullable: true })
  referralCode: string;

  @Column({ type: 'varchar', array: true, default: () => "'{mtn,orange,usdc}'" })
  preferredPaymentMethods: string[];

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  country: string;

  @Column({ default: false })
  isActive: boolean;

  @Column({ default: false })
  isAdmin: boolean;

  @Column({ default: false })
  emailVerified: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];

  @OneToMany(() => UserReferral, (referral) => referral.referrer)
  referrals: UserReferral[];

  @OneToMany(() => UserReferral, (referral) => referral.referredUser)
  referredBy: UserReferral[];

  @OneToMany(() => Payment, (payment) => payment.user)
  payments: Payment[];
}

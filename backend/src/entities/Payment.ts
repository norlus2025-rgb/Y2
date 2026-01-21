import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from './User';

export enum PaymentStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
}

export enum PaymentMethod {
  MTN = 'mtn',
  ORANGE = 'orange',
  VODAFONE = 'vodafone',
  ETHEREUM = 'ethereum',
  BITCOIN = 'bitcoin',
  USDC = 'usdc',
  STRIPE = 'stripe',
}

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal', { precision: 15, scale: 8 })
  amount: number;

  @Column({ enum: PaymentMethod })
  method: PaymentMethod;

  @Column({ enum: PaymentStatus, default: PaymentStatus.PENDING })
  status: PaymentStatus;

  @Column('text', { nullable: true })
  transactionHash: string;

  @Column({ nullable: true })
  walletAddress: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  reference: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  completedAt: Date;

  @Column({ nullable: true })
  failureReason: string;

  @ManyToOne(() => User, (user) => user.payments)
  user: User;
}

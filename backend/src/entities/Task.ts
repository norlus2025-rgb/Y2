import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from './User';
import { TaskSubmission } from './TaskSubmission';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column()
  category: string;

  @Column('decimal', { precision: 10, scale: 2 })
  reward: number;

  @Column()
  rewardCurrency: string; // USDC, BTC, ETH, MTN, ORANGE, etc.

  @Column('text')
  instructions: string;

  @Column({ default: false })
  requiresScreenshot: boolean;

  @Column({ default: 0 })
  totalCompletions: number;

  @Column({ default: 100 })
  maxCompletions: number;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  expiresAt: Date;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;

  @OneToMany(() => TaskSubmission, (submission) => submission.task)
  submissions: TaskSubmission[];
}

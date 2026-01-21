import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { Task } from './Task';
import { User } from './User';

export enum SubmissionStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

@Entity('task_submissions')
export class TaskSubmission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ enum: SubmissionStatus, default: SubmissionStatus.PENDING })
  status: SubmissionStatus;

  @Column({ nullable: true })
  screenshotUrl: string;

  @Column({ nullable: true })
  notes: string;

  @Column({ nullable: true })
  rejectionReason: string;

  @Column({ default: false })
  isVerified: boolean;

  @CreateDateColumn()
  submittedAt: Date;

  @Column({ nullable: true })
  verifiedAt: Date;

  @ManyToOne(() => Task, (task) => task.submissions, { onDelete: 'CASCADE' })
  task: Task;

  @ManyToOne(() => User)
  user: User;
}

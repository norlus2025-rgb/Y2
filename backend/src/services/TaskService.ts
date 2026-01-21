import { AppDataSource } from '../config/database';
import { Task } from '../entities/Task';
import { TaskSubmission, SubmissionStatus } from '../entities/TaskSubmission';
import { User } from '../entities/User';
import { UserService } from './UserService';

export class TaskService {
  private taskRepository = AppDataSource.getRepository(Task);
  private submissionRepository = AppDataSource.getRepository(TaskSubmission);
  private userRepository = AppDataSource.getRepository(User);
  private userService = new UserService();

  async createTask(
    adminId: string,
    taskData: {
      title: string;
      description: string;
      category: string;
      reward: number;
      rewardCurrency: string;
      instructions: string;
      imageUrl?: string;
      requiresScreenshot?: boolean;
      maxCompletions?: number;
      expiresAt: Date;
    }
  ): Promise<Task> {
    const admin = await this.userRepository.findOne({ where: { id: adminId } });
    if (!admin?.isAdmin) throw new Error('Admin access required');

    const task = this.taskRepository.create({
      ...taskData,
      user: admin,
      maxCompletions: taskData.maxCompletions || 100,
    });

    return await this.taskRepository.save(task);
  }

  async getAvailableTasks(userId?: string): Promise<Task[]> {
    const query = this.taskRepository.createQueryBuilder('task')
      .where('task.isActive = :isActive', { isActive: true })
      .andWhere('task.expiresAt > :now', { now: new Date() })
      .andWhere('task.totalCompletions < task.maxCompletions')
      .orderBy('task.createdAt', 'DESC');

    if (userId) {
      query.andWhere(
        'task.id NOT IN (SELECT task.id FROM task_submissions WHERE user.id = :userId)',
        { userId }
      );
    }

    return await query.getMany();
  }

  async submitTask(
    userId: string,
    taskId: string,
    screenshotUrl?: string
  ): Promise<TaskSubmission> {
    const task = await this.taskRepository.findOne({ where: { id: taskId } });
    if (!task) throw new Error('Task not found');

    // Check if user already submitted
    const existing = await this.submissionRepository.findOne({
      where: { task: { id: taskId }, user: { id: userId } },
    });

    if (existing) throw new Error('Task already submitted by this user');

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new Error('User not found');

    const submission = this.submissionRepository.create({
      task,
      user,
      screenshotUrl,
      status: task.requiresScreenshot && !screenshotUrl 
        ? SubmissionStatus.PENDING 
        : SubmissionStatus.APPROVED,
    });

    await this.submissionRepository.save(submission);

    // Auto-approve if no screenshot needed
    if (submission.status === SubmissionStatus.APPROVED) {
      await this.approveSubmission(submission.id);
    }

    return submission;
  }

  async approveSubmission(submissionId: string): Promise<TaskSubmission> {
    const submission = await this.submissionRepository.findOne({
      where: { id: submissionId },
      relations: ['task', 'user'],
    });

    if (!submission) throw new Error('Submission not found');

    submission.status = SubmissionStatus.APPROVED;
    submission.isVerified = true;
    submission.verifiedAt = new Date();

    await this.submissionRepository.save(submission);

    // Credit user with reward
    await this.userService.creditUserBalance(submission.user.id, Number(submission.task.reward));

    // Update task completion count
    submission.task.totalCompletions += 1;
    await this.taskRepository.save(submission.task);

    return submission;
  }

  async rejectSubmission(submissionId: string, reason: string): Promise<TaskSubmission> {
    const submission = await this.submissionRepository.findOne({
      where: { id: submissionId },
    });

    if (!submission) throw new Error('Submission not found');

    submission.status = SubmissionStatus.REJECTED;
    submission.rejectionReason = reason;

    return await this.submissionRepository.save(submission);
  }

  async getUserSubmissions(userId: string): Promise<TaskSubmission[]> {
    return await this.submissionRepository.find({
      where: { user: { id: userId } },
      relations: ['task'],
      order: { submittedAt: 'DESC' },
    });
  }

  async getPendingSubmissions(): Promise<TaskSubmission[]> {
    return await this.submissionRepository.find({
      where: { status: SubmissionStatus.PENDING },
      relations: ['user', 'task'],
      order: { submittedAt: 'ASC' },
    });
  }

  async updateTask(
    taskId: string,
    data: Partial<Task>
  ): Promise<Task> {
    await this.taskRepository.update(taskId, data);
    return (await this.taskRepository.findOne({ where: { id: taskId } })) as Task;
  }

  async deleteTask(taskId: string): Promise<void> {
    await this.taskRepository.delete(taskId);
  }
}

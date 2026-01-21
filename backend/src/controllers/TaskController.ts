import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { TaskService } from '../services/TaskService';

const taskService = new TaskService();

export class TaskController {
  static async getAvailableTasks(req: AuthRequest, res: Response) {
    try {
      const tasks = await taskService.getAvailableTasks(req.user?.id);
      res.json(tasks);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async submitTask(req: AuthRequest, res: Response) {
    try {
      const { taskId, screenshotUrl } = req.body;
      const submission = await taskService.submitTask(
        req.user!.id,
        taskId,
        screenshotUrl
      );
      res.json(submission);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getUserSubmissions(req: AuthRequest, res: Response) {
    try {
      const submissions = await taskService.getUserSubmissions(req.user!.id);
      res.json(submissions);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Admin endpoints
  static async createTask(req: AuthRequest, res: Response) {
    try {
      const task = await taskService.createTask(req.user!.id, req.body);
      res.status(201).json(task);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getPendingSubmissions(req: AuthRequest, res: Response) {
    try {
      const submissions = await taskService.getPendingSubmissions();
      res.json(submissions);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async approveSubmission(req: AuthRequest, res: Response) {
    try {
      const { submissionId } = req.params;
      const submission = await taskService.approveSubmission(submissionId);
      res.json(submission);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async rejectSubmission(req: AuthRequest, res: Response) {
    try {
      const { submissionId } = req.params;
      const { reason } = req.body;
      const submission = await taskService.rejectSubmission(submissionId, reason);
      res.json(submission);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async updateTask(req: AuthRequest, res: Response) {
    try {
      const { taskId } = req.params;
      const task = await taskService.updateTask(taskId, req.body);
      res.json(task);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async deleteTask(req: AuthRequest, res: Response) {
    try {
      const { taskId } = req.params;
      await taskService.deleteTask(taskId);
      res.json({ message: 'Task deleted successfully' });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

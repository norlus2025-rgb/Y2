import { Router } from 'express';
import { TaskController } from '../controllers/TaskController';
import { authenticateToken, adminOnly } from '../middleware/auth';

const router = Router();

// User routes
router.get('/', authenticateToken, TaskController.getAvailableTasks);
router.post('/:taskId/submit', authenticateToken, TaskController.submitTask);
router.get('/my-submissions', authenticateToken, TaskController.getUserSubmissions);

// Admin routes
router.post('/', authenticateToken, adminOnly, TaskController.createTask);
router.get('/admin/pending', authenticateToken, adminOnly, TaskController.getPendingSubmissions);
router.post('/admin/:submissionId/approve', authenticateToken, adminOnly, TaskController.approveSubmission);
router.post('/admin/:submissionId/reject', authenticateToken, adminOnly, TaskController.rejectSubmission);
router.put('/admin/:taskId', authenticateToken, adminOnly, TaskController.updateTask);
router.delete('/admin/:taskId', authenticateToken, adminOnly, TaskController.deleteTask);

export default router;

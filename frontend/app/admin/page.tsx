'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import apiClient from '@/utils/api';

export default function AdminDashboard() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('tasks');
  const [tasks, setTasks] = useState<any[]>([]);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    reward: '',
    rewardCurrency: 'USDC',
    instructions: '',
    maxCompletions: 100,
    expiresAt: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.isAdmin) {
      router.push('/');
      return;
    }

    const fetchData = async () => {
      try {
        const [tasksRes, submissionsRes] = await Promise.all([
          apiClient.get('/tasks'),
          apiClient.get('/tasks/admin/pending'),
        ]);
        setTasks(tasksRes.data);
        setSubmissions(submissionsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, router]);

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.post('/tasks', {
        ...formData,
        reward: parseFloat(formData.reward),
        expiresAt: new Date(formData.expiresAt),
      });
      setFormData({
        title: '',
        description: '',
        category: '',
        reward: '',
        rewardCurrency: 'USDC',
        instructions: '',
        maxCompletions: 100,
        expiresAt: '',
      });
      alert('Task created successfully!');
      // Refresh tasks
      const res = await apiClient.get('/tasks');
      setTasks(res.data);
    } catch (error) {
      console.error('Error creating task:', error);
      alert('Error creating task');
    }
  };

  const handleApproveSubmission = async (submissionId: string) => {
    try {
      await apiClient.post(`/tasks/admin/${submissionId}/approve`);
      setSubmissions(submissions.filter((s) => s.id !== submissionId));
      alert('Submission approved!');
    } catch (error) {
      console.error('Error approving submission:', error);
    }
  };

  const handleRejectSubmission = async (submissionId: string, reason: string) => {
    try {
      await apiClient.post(`/tasks/admin/${submissionId}/reject`, { reason });
      setSubmissions(submissions.filter((s) => s.id !== submissionId));
      alert('Submission rejected!');
    } catch (error) {
      console.error('Error rejecting submission:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-terracotta-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-terracotta-900 mb-8">Admin Dashboard</h1>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b-2 border-gray-200">
          {['tasks', 'submissions'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-semibold transition ${
                activeTab === tab
                  ? 'text-terracotta-600 border-b-2 border-terracotta-600'
                  : 'text-gray-600 hover:text-terracotta-600'
              }`}
            >
              {tab === 'tasks' ? 'Create Task' : 'Review Submissions'}
            </button>
          ))}
        </div>

        {/* Tasks Tab */}
        {activeTab === 'tasks' && (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Form */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-terracotta-900 mb-6">New Task</h2>
              <form onSubmit={handleCreateTask} className="space-y-4">
                <input
                  type="text"
                  placeholder="Task Title"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-terracotta-600 outline-none"
                />
                <textarea
                  placeholder="Description"
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-terracotta-600 outline-none"
                  rows={3}
                />
                <input
                  type="text"
                  placeholder="Category"
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-terracotta-600 outline-none"
                />
                <input
                  type="number"
                  placeholder="Reward Amount"
                  required
                  step="0.01"
                  value={formData.reward}
                  onChange={(e) => setFormData({ ...formData, reward: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-terracotta-600 outline-none"
                />
                <select
                  value={formData.rewardCurrency}
                  onChange={(e) => setFormData({ ...formData, rewardCurrency: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-terracotta-600 outline-none"
                >
                  <option>USDC</option>
                  <option>ETH</option>
                  <option>BTC</option>
                  <option>MTN</option>
                  <option>ORANGE</option>
                </select>
                <textarea
                  placeholder="Instructions"
                  required
                  value={formData.instructions}
                  onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-terracotta-600 outline-none"
                  rows={3}
                />
                <input
                  type="datetime-local"
                  required
                  value={formData.expiresAt}
                  onChange={(e) => setFormData({ ...formData, expiresAt: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-terracotta-600 outline-none"
                />
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-terracotta-600 to-warm-500 text-white py-3 rounded-lg font-bold hover:shadow-lg transition"
                >
                  Create Task
                </button>
              </form>
            </div>

            {/* Tasks List */}
            <div>
              <h2 className="text-2xl font-bold text-terracotta-900 mb-6">Tasks List</h2>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {tasks.map((task) => (
                  <div key={task.id} className="bg-white rounded-lg p-4 border-l-4 border-terracotta-500">
                    <h3 className="font-bold text-terracotta-900">{task.title}</h3>
                    <p className="text-sm text-gray-600">{task.category}</p>
                    <p className="font-bold text-warm-600 mt-2">{task.reward} {task.rewardCurrency}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      Completions: {task.totalCompletions}/{task.maxCompletions}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Submissions Tab */}
        {activeTab === 'submissions' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-terracotta-900">Pending Submissions</h2>
            {submissions.length > 0 ? (
              <div className="grid gap-6">
                {submissions.map((submission) => (
                  <div key={submission.id} className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-terracotta-900">
                          {submission.user.firstName} {submission.user.lastName}
                        </h3>
                        <p className="text-gray-600">{submission.task.title}</p>
                      </div>
                      <span className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full font-semibold">
                        Pending
                      </span>
                    </div>

                    <div className="flex gap-4">
                      <button
                        onClick={() => handleApproveSubmission(submission.id)}
                        className="flex-1 bg-green-500 text-white py-2 rounded-lg font-bold hover:bg-green-600 transition"
                      >
                        ✓ Approve
                      </button>
                      <button
                        onClick={() => {
                          const reason = prompt('Rejection reason:');
                          if (reason) handleRejectSubmission(submission.id, reason);
                        }}
                        className="flex-1 bg-red-500 text-white py-2 rounded-lg font-bold hover:bg-red-600 transition"
                      >
                        ✗ Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-xl">
                <p className="text-2xl text-gray-600">No pending submissions</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import apiClient from '@/utils/api';
import TaskCard from '@/components/TaskCard';

export interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  reward: number;
  rewardCurrency: string;
  imageUrl?: string;
  instructions: string;
}

export default function TasksPage() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState('all');

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
      return;
    }

    const fetchTasks = async () => {
      try {
        const response = await apiClient.get('/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [user, router]);

  const categories = ['all', ...new Set(tasks.map((t) => t.category))];
  const filteredTasks =
    filterCategory === 'all'
      ? tasks
      : tasks.filter((t) => t.category === filterCategory);

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
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-terracotta-900 mb-4">Available Tasks</h1>
          <p className="text-gray-600">
            {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'} available
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-6 py-2 rounded-full font-semibold whitespace-nowrap transition ${
                filterCategory === cat
                  ? 'bg-gradient-to-r from-terracotta-600 to-warm-500 text-white'
                  : 'bg-white border-2 border-terracotta-200 text-terracotta-700 hover:border-terracotta-600'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Tasks Grid */}
        {filteredTasks.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-2xl text-gray-600">No tasks available in this category</p>
            <p className="text-gray-500 mt-2">Check back soon for more tasks!</p>
          </div>
        )}
      </div>
    </div>
  );
}

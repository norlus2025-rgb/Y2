'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import apiClient from '@/utils/api';

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

export default function TaskCard({ task }: { task: Task }) {
  const { user } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitTask = async () => {
    setIsSubmitting(true);
    try {
      await apiClient.post(`/tasks/${task.id}/submit`, {
        screenshotUrl: null,
      });
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error('Error submitting task:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition border-l-4 border-terracotta-500 p-6">
      {task.imageUrl && (
        <img
          src={task.imageUrl}
          alt={task.title}
          className="w-full h-40 object-cover rounded-lg mb-4"
        />
      )}
      
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-terracotta-900">{task.title}</h3>
          <span className="inline-block mt-2 bg-warm-100 text-warm-700 text-sm px-3 py-1 rounded-full">
            {task.category}
          </span>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-terracotta-600">
            {task.reward} {task.rewardCurrency}
          </div>
        </div>
      </div>

      <p className="text-gray-600 mb-4">{task.description}</p>
      
      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <p className="text-sm text-gray-700">
          <strong>Instructions:</strong> {task.instructions}
        </p>
      </div>

      <button
        onClick={handleSubmitTask}
        disabled={isSubmitting || submitted}
        className={`w-full py-3 rounded-lg font-bold transition ${
          submitted
            ? 'bg-green-500 text-white'
            : 'bg-gradient-to-r from-terracotta-600 to-warm-500 text-white hover:shadow-lg'
        }`}
      >
        {submitted ? '✓ Submitted' : isSubmitting ? 'Submitting...' : 'Submit Task'}
      </button>
    </div>
  );
}

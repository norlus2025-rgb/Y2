'use client';

import Link from 'next/link';

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

// Platform icons and colors
const platformStyles: Record<string, { icon: string; bg: string; text: string }> = {
  youtube: { icon: '📺', bg: 'bg-red-100', text: 'text-red-700' },
  facebook: { icon: '👍', bg: 'bg-blue-100', text: 'text-blue-700' },
  tiktok: { icon: '🎵', bg: 'bg-gray-800', text: 'text-white' },
  instagram: { icon: '📸', bg: 'bg-pink-100', text: 'text-pink-700' },
  twitter: { icon: '🐦', bg: 'bg-sky-100', text: 'text-sky-700' },
};

export default function TaskCard({ task }: { task: Task }) {
  const style = platformStyles[task.category.toLowerCase()] || { icon: '📱', bg: 'bg-terracotta-100', text: 'text-terracotta-700' };

  return (
    <Link href={`/tasks/${task.id}`}>
      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group cursor-pointer">
        {/* Header with platform icon */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className={`w-12 h-12 ${style.bg} rounded-xl flex items-center justify-center text-2xl`}>
              {style.icon}
            </div>
            <span className={`${style.bg} ${style.text} text-xs font-bold px-3 py-1 rounded-full`}>
              {task.category}
            </span>
          </div>

          <h3 className="text-lg font-bold text-terracotta-900 mb-2 group-hover:text-terracotta-600 transition">
            {task.title}
          </h3>

          <p className="text-gray-500 text-sm mb-4 line-clamp-2">
            {task.description}
          </p>
        </div>

        {/* Footer with reward */}
        <div className="bg-gradient-to-r from-terracotta-50 to-warm-50 px-6 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500">Récompense</p>
            <p className="text-xl font-bold text-terracotta-600">
              {task.reward} FCFA
            </p>
          </div>
          <div className="bg-gradient-to-r from-terracotta-600 to-warm-500 text-white px-4 py-2 rounded-lg font-semibold text-sm group-hover:shadow-lg transition">
            Voir →
          </div>
        </div>
      </div>
    </Link>
  );
}

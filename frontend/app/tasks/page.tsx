'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
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

// Demo tasks for testing without backend
const demoTasks: Task[] = [
  {
    id: '1',
    title: 'Aimer une page Facebook',
    description: 'Aimez notre page Facebook officielle et restez abonné pendant 30 jours',
    category: 'Facebook',
    reward: 100,
    rewardCurrency: 'FCFA',
    instructions: '1. Cliquez sur le lien\n2. Aimez la page\n3. Prenez une capture d\'écran',
  },
  {
    id: '2',
    title: 'S\'abonner à une chaîne YouTube',
    description: 'Abonnez-vous à notre chaîne YouTube et activez la cloche de notification',
    category: 'YouTube',
    reward: 150,
    rewardCurrency: 'FCFA',
    instructions: '1. Cliquez sur le lien\n2. Abonnez-vous\n3. Activez la cloche\n4. Capture d\'écran',
  },
  {
    id: '3',
    title: 'Suivre un compte TikTok',
    description: 'Suivez ce compte TikTok populaire et likez 3 vidéos',
    category: 'TikTok',
    reward: 75,
    rewardCurrency: 'FCFA',
    instructions: '1. Suivez le compte\n2. Likez 3 vidéos\n3. Capture d\'écran du profil',
  },
  {
    id: '4',
    title: 'Suivre un compte Instagram',
    description: 'Suivez ce compte Instagram et likez le dernier post',
    category: 'Instagram',
    reward: 100,
    rewardCurrency: 'FCFA',
    instructions: '1. Suivez le compte\n2. Likez le dernier post\n3. Capture d\'écran',
  },
  {
    id: '5',
    title: 'Regarder une vidéo YouTube',
    description: 'Regardez cette vidéo YouTube en entier (5 minutes) et laissez un commentaire',
    category: 'YouTube',
    reward: 200,
    rewardCurrency: 'FCFA',
    instructions: '1. Regardez la vidéo en entier\n2. Likez la vidéo\n3. Laissez un commentaire positif\n4. Capture d\'écran',
  },
  {
    id: '6',
    title: 'Partager une publication Facebook',
    description: 'Partagez cette publication sur votre profil Facebook',
    category: 'Facebook',
    reward: 125,
    rewardCurrency: 'FCFA',
    instructions: '1. Cliquez sur Partager\n2. Choisissez "Partager maintenant"\n3. Capture d\'écran de votre partage',
  },
];

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

    // Use demo tasks for now (will fetch from API when backend is connected)
    const fetchTasks = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        setTasks(demoTasks);
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
      <div className="min-h-screen bg-gradient-to-br from-terracotta-50 to-warm-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-terracotta-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-terracotta-50 to-warm-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-terracotta-900 mb-2">Tâches disponibles</h1>
          <p className="text-terracotta-600">
            {filteredTasks.length} {filteredTasks.length === 1 ? 'tâche disponible' : 'tâches disponibles'}
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-5 py-2.5 rounded-full font-semibold whitespace-nowrap transition-all ${filterCategory === cat
                  ? 'bg-gradient-to-r from-terracotta-600 to-warm-500 text-white shadow-lg'
                  : 'bg-white border-2 border-terracotta-200 text-terracotta-700 hover:border-terracotta-400 hover:bg-terracotta-50'
                }`}
            >
              {cat === 'all' ? '🔥 Toutes' : cat}
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
          <div className="text-center py-16 bg-white rounded-2xl shadow">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-xl text-gray-600 mb-2">Aucune tâche dans cette catégorie</p>
            <p className="text-gray-500">Revenez bientôt pour de nouvelles tâches !</p>
          </div>
        )}
      </div>
    </div>
  );
}

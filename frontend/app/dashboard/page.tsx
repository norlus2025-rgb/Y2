'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import apiClient from '@/utils/api';
import Link from 'next/link';

export default function DashboardPage() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [tasksCompleted, setTasksCompleted] = useState(0);

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
      return;
    }

    const fetchStats = async () => {
      try {
        const profile = await apiClient.get('/users/profile');
        setStats(profile.data);
        // Mock tasks count for demo
        setTasksCompleted(12);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user, router]);

  // Calculate user level based on tasks completed
  const getLevel = (tasks: number) => {
    if (tasks >= 100) return { name: 'Expert', color: 'from-yellow-400 to-yellow-600', icon: '👑' };
    if (tasks >= 50) return { name: 'Pro', color: 'from-purple-500 to-purple-700', icon: '⭐' };
    if (tasks >= 20) return { name: 'Actif', color: 'from-blue-500 to-blue-700', icon: '🔥' };
    return { name: 'Débutant', color: 'from-green-500 to-green-700', icon: '🌱' };
  };

  const level = getLevel(tasksCompleted);

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
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-terracotta-900">
            Salut, {user?.firstName} ! 👋
          </h1>
          <p className="text-terracotta-600 mt-1">Voici ton tableau de bord</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Balance */}
          <div className="bg-gradient-to-br from-terracotta-500 to-terracotta-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <span className="text-4xl">💰</span>
              <Link href="/dashboard/withdraw" className="text-xs bg-white/20 px-3 py-1 rounded-full hover:bg-white/30 transition">
                Retirer
              </Link>
            </div>
            <p className="text-white/80 text-sm mb-1">Solde disponible</p>
            <p className="text-3xl font-bold">{(user?.balance || 15000).toLocaleString()} FCFA</p>
          </div>

          {/* Total Earned */}
          <div className="bg-gradient-to-br from-warm-500 to-warm-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <span className="text-4xl">📈</span>
            </div>
            <p className="text-white/80 text-sm mb-1">Total gagné</p>
            <p className="text-3xl font-bold">{(user?.totalEarned || 45000).toLocaleString()} FCFA</p>
          </div>

          {/* Referral Earnings */}
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <span className="text-4xl">🤝</span>
              <Link href="/referrals" className="text-xs bg-white/20 px-3 py-1 rounded-full hover:bg-white/30 transition">
                Inviter
              </Link>
            </div>
            <p className="text-white/80 text-sm mb-1">Gains parrainage</p>
            <p className="text-3xl font-bold">{(user?.referralEarnings || 5000).toLocaleString()} FCFA</p>
          </div>

          {/* Level */}
          <div className={`bg-gradient-to-br ${level.color} rounded-2xl p-6 text-white shadow-lg`}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-4xl">{level.icon}</span>
            </div>
            <p className="text-white/80 text-sm mb-1">Niveau</p>
            <p className="text-3xl font-bold">{level.name}</p>
            <p className="text-xs text-white/60 mt-1">{tasksCompleted} tâches complétées</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Available Tasks */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-terracotta-100 to-warm-100 rounded-xl flex items-center justify-center text-2xl">
                📋
              </div>
              <div>
                <h2 className="text-xl font-bold text-terracotta-900">Tâches disponibles</h2>
                <p className="text-gray-500">12 nouvelles tâches aujourd'hui</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">Complète des tâches simples pour gagner de l'argent</p>
            <Link
              href="/tasks"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-terracotta-600 to-warm-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition"
            >
              Voir les tâches
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>

          {/* Invite Friends */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-xl flex items-center justify-center text-2xl">
                👥
              </div>
              <div>
                <h2 className="text-xl font-bold text-terracotta-900">Invite tes amis</h2>
                <p className="text-gray-500">Gagne 5% sur leurs gains</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">Partage ton lien et gagne des commissions à vie !</p>
            <Link
              href="/referrals"
              className="inline-flex items-center gap-2 border-2 border-terracotta-500 text-terracotta-600 px-6 py-3 rounded-xl font-semibold hover:bg-terracotta-50 transition"
            >
              Obtenir mon lien
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-terracotta-900 mb-6">Activités récentes</h2>
          <div className="space-y-4">
            {[
              { type: 'task', label: 'Tâche YouTube complétée', amount: '+100 FCFA', time: 'Il y a 2h', icon: '📺' },
              { type: 'task', label: 'Tâche Facebook complétée', amount: '+75 FCFA', time: 'Il y a 5h', icon: '👍' },
              { type: 'referral', label: 'Commission de parrainage', amount: '+25 FCFA', time: 'Hier', icon: '🤝' },
              { type: 'task', label: 'Tâche TikTok complétée', amount: '+150 FCFA', time: 'Hier', icon: '🎵' },
            ].map((activity, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-xl shadow">
                    {activity.icon}
                  </div>
                  <div>
                    <p className="font-medium text-terracotta-900">{activity.label}</p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                </div>
                <span className="text-green-600 font-bold">{activity.amount}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { href: '/dashboard/withdraw', label: 'Retirer', icon: '💸', color: 'bg-green-100 text-green-700' },
            { href: '/tasks', label: 'Tâches', icon: '📋', color: 'bg-blue-100 text-blue-700' },
            { href: '/referrals', label: 'Parrainer', icon: '👥', color: 'bg-orange-100 text-orange-700' },
            { href: '/dashboard/settings', label: 'Paramètres', icon: '⚙️', color: 'bg-gray-100 text-gray-700' },
          ].map((link, idx) => (
            <Link
              key={idx}
              href={link.href}
              className={`${link.color} p-4 rounded-xl text-center hover:shadow-md transition`}
            >
              <div className="text-2xl mb-2">{link.icon}</div>
              <p className="font-semibold">{link.label}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

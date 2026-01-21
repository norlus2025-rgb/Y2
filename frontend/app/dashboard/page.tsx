'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import apiClient from '@/utils/api';

export default function DashboardPage() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
      return;
    }

    const fetchStats = async () => {
      try {
        const profile = await apiClient.get('/users/profile');
        setStats(profile.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user, router]);

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
          <h1 className="text-4xl font-bold text-terracotta-900">
            Welcome back, {user?.firstName}!
          </h1>
          <p className="text-gray-600 mt-2">Here's your earning dashboard</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {[
            {
              label: 'Current Balance',
              value: `${user?.balance || 0} USDC`,
              icon: '💰',
              color: 'from-terracotta-500 to-terracotta-600',
            },
            {
              label: 'Total Earned',
              value: `${user?.totalEarned || 0} USDC`,
              icon: '📈',
              color: 'from-warm-500 to-warm-600',
            },
            {
              label: 'Referral Earnings',
              value: `${user?.referralEarnings || 0} USDC`,
              icon: '🤝',
              color: 'from-orange-500 to-orange-600',
            },
            {
              label: 'Tasks Completed',
              value: '0',
              icon: '✅',
              color: 'from-green-500 to-green-600',
            },
          ].map((stat, idx) => (
            <div
              key={idx}
              className={`bg-gradient-to-br ${stat.color} text-white rounded-xl p-6 shadow-lg`}
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <p className="text-white/80 text-sm">{stat.label}</p>
              <p className="text-3xl font-bold mt-2">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-2xl font-bold text-terracotta-900 mb-4">Available Tasks</h2>
            <p className="text-gray-600 mb-4">Check out new tasks available today</p>
            <a
              href="/tasks"
              className="inline-block bg-gradient-to-r from-terracotta-600 to-warm-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition"
            >
              View Tasks
            </a>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-2xl font-bold text-terracotta-900 mb-4">Withdraw Earnings</h2>
            <p className="text-gray-600 mb-4">Minimum withdrawal: 0.1 USDC</p>
            <a
              href="/dashboard/withdraw"
              className="inline-block bg-gradient-to-r from-terracotta-600 to-warm-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition"
            >
              Withdraw Now
            </a>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-2xl font-bold text-terracotta-900 mb-4">Quick Links</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <a
              href="/referrals"
              className="p-4 border-2 border-terracotta-200 rounded-lg text-terracotta-900 font-semibold hover:bg-terracotta-50 transition"
            >
              👥 Invite Friends & Earn 5%
            </a>
            <a
              href="/dashboard/settings"
              className="p-4 border-2 border-warm-200 rounded-lg text-warm-900 font-semibold hover:bg-warm-50 transition"
            >
              ⚙️ Account Settings
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

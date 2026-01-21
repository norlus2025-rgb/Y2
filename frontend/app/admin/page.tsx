'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Demo submissions for testing
const demoSubmissions = [
  {
    id: '1',
    user: { firstName: 'Amadou', lastName: 'Diallo' },
    task: { title: 'Aimer une page Facebook', reward: 100 },
    screenshotUrl: null,
    submittedAt: new Date(Date.now() - 3600000),
  },
  {
    id: '2',
    user: { firstName: 'Fatou', lastName: 'Traoré' },
    task: { title: 'S\'abonner à une chaîne YouTube', reward: 150 },
    screenshotUrl: null,
    submittedAt: new Date(Date.now() - 7200000),
  },
  {
    id: '3',
    user: { firstName: 'Kofi', lastName: 'Mensah' },
    task: { title: 'Suivre un compte TikTok', reward: 75 },
    screenshotUrl: null,
    submittedAt: new Date(Date.now() - 86400000),
  },
];

// Demo tasks
const demoTasks = [
  { id: '1', title: 'Aimer une page Facebook', category: 'Facebook', reward: 100, totalCompletions: 45, maxCompletions: 100, isActive: true },
  { id: '2', title: 'S\'abonner YouTube', category: 'YouTube', reward: 150, totalCompletions: 78, maxCompletions: 100, isActive: true },
  { id: '3', title: 'Suivre TikTok', category: 'TikTok', reward: 75, totalCompletions: 100, maxCompletions: 100, isActive: false },
];

export default function AdminDashboard() {
  const { user, setUser } = useAuthStore();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [tasks, setTasks] = useState(demoTasks);
  const [submissions, setSubmissions] = useState(demoSubmissions);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Facebook',
    reward: '',
    instructions: '',
    maxCompletions: 100,
    expiresAt: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Allow demo admin access
    if (!user) {
      router.push('/auth/login');
      return;
    }

    // Simulate loading
    setTimeout(() => setLoading(false), 500);
  }, [user, router]);

  // Enable admin mode for demo
  const enableAdminMode = () => {
    if (user) {
      setUser({ ...user, isAdmin: true } as any);
    }
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();

    const newTask = {
      id: String(tasks.length + 1),
      title: formData.title,
      category: formData.category,
      reward: parseInt(formData.reward),
      totalCompletions: 0,
      maxCompletions: formData.maxCompletions,
      isActive: true,
    };

    setTasks([...tasks, newTask]);
    setFormData({
      title: '',
      description: '',
      category: 'Facebook',
      reward: '',
      instructions: '',
      maxCompletions: 100,
      expiresAt: '',
    });

    alert('✅ Tâche créée avec succès !');
  };

  const handleApproveSubmission = (submissionId: string) => {
    setSubmissions(submissions.filter((s) => s.id !== submissionId));
    alert('✅ Soumission approuvée ! L\'utilisateur a été crédité.');
  };

  const handleRejectSubmission = (submissionId: string) => {
    const reason = prompt('Raison du rejet :');
    if (reason) {
      setSubmissions(submissions.filter((s) => s.id !== submissionId));
      alert('❌ Soumission rejetée.');
    }
  };

  // Stats
  const stats = {
    totalUsers: 1247,
    activeToday: 342,
    tasksCompleted: 8934,
    totalPaid: 2450000,
    pendingWithdrawals: 12,
    pendingSubmissions: submissions.length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  // Check if user is admin
  if (!user?.isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-terracotta-50 to-warm-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="text-5xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-terracotta-900 mb-4">Accès Admin requis</h2>
          <p className="text-gray-600 mb-6">
            Cette page est réservée aux administrateurs.
          </p>
          <button
            onClick={enableAdminMode}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl font-bold hover:shadow-lg transition mb-4"
          >
            🚀 Activer le mode Admin (Démo)
          </button>
          <Link href="/dashboard" className="text-terracotta-600 hover:underline">
            ← Retour au tableau de bord
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <span className="text-2xl">⚙️</span>
              <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
            </div>
            <Link href="/dashboard" className="text-gray-400 hover:text-white transition">
              Retour au site →
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {[
            { id: 'dashboard', label: '📊 Tableau de bord', icon: '📊' },
            { id: 'tasks', label: '📋 Tâches', icon: '📋' },
            { id: 'submissions', label: '✅ Soumissions', icon: '✅' },
            { id: 'users', label: '👥 Utilisateurs', icon: '👥' },
            { id: 'payments', label: '💰 Paiements', icon: '💰' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-lg font-semibold whitespace-nowrap transition ${activeTab === tab.id
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { label: 'Utilisateurs', value: stats.totalUsers.toLocaleString(), color: 'bg-blue-500' },
                { label: 'Actifs aujourd\'hui', value: stats.activeToday, color: 'bg-green-500' },
                { label: 'Tâches complétées', value: stats.tasksCompleted.toLocaleString(), color: 'bg-purple-500' },
                { label: 'Total payé (FCFA)', value: stats.totalPaid.toLocaleString(), color: 'bg-orange-500' },
                { label: 'Retraits en attente', value: stats.pendingWithdrawals, color: 'bg-yellow-500' },
                { label: 'Soumissions', value: stats.pendingSubmissions, color: 'bg-red-500' },
              ].map((stat, idx) => (
                <div key={idx} className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                  <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <div className={`h-1 ${stat.color} rounded-full mt-2 w-3/4`}></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tasks Tab */}
        {activeTab === 'tasks' && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Form */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h2 className="text-xl font-bold text-white mb-6">➕ Nouvelle tâche</h2>
              <form onSubmit={handleCreateTask} className="space-y-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-1">Titre *</label>
                  <input
                    type="text"
                    placeholder="Ex: Aimer une page Facebook"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white focus:border-orange-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-1">Description</label>
                  <textarea
                    placeholder="Description de la tâche"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white focus:border-orange-500 outline-none"
                    rows={2}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-1">Catégorie *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white focus:border-orange-500 outline-none"
                    >
                      <option>Facebook</option>
                      <option>YouTube</option>
                      <option>TikTok</option>
                      <option>Instagram</option>
                      <option>Twitter</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-1">Récompense (FCFA) *</label>
                    <input
                      type="number"
                      placeholder="100"
                      required
                      value={formData.reward}
                      onChange={(e) => setFormData({ ...formData, reward: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white focus:border-orange-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-1">Instructions *</label>
                  <textarea
                    placeholder="1. Allez sur le lien&#10;2. Effectuez l'action&#10;3. Prenez une capture d'écran"
                    required
                    value={formData.instructions}
                    onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white focus:border-orange-500 outline-none"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-1">Max participants</label>
                    <input
                      type="number"
                      value={formData.maxCompletions}
                      onChange={(e) => setFormData({ ...formData, maxCompletions: parseInt(e.target.value) })}
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white focus:border-orange-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-1">Date d'expiration</label>
                    <input
                      type="datetime-local"
                      value={formData.expiresAt}
                      onChange={(e) => setFormData({ ...formData, expiresAt: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white focus:border-orange-500 outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-bold hover:shadow-lg transition"
                >
                  Créer la tâche
                </button>
              </form>
            </div>

            {/* Tasks List */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h2 className="text-xl font-bold text-white mb-6">📋 Liste des tâches</h2>
              <div className="space-y-3 max-h-[500px] overflow-y-auto">
                {tasks.map((task) => (
                  <div key={task.id} className={`p-4 rounded-lg border ${task.isActive ? 'bg-gray-900 border-gray-600' : 'bg-gray-900/50 border-gray-700'}`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-white">{task.title}</h3>
                        <p className="text-sm text-gray-400">{task.category} · {task.reward} FCFA</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${task.isActive ? 'bg-green-500/20 text-green-400' : 'bg-gray-600 text-gray-400'}`}>
                        {task.isActive ? 'Actif' : 'Terminé'}
                      </span>
                    </div>
                    <div className="mt-2">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Progression</span>
                        <span>{task.totalCompletions}/{task.maxCompletions}</span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-orange-500 rounded-full"
                          style={{ width: `${(task.totalCompletions / task.maxCompletions) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Submissions Tab */}
        {activeTab === 'submissions' && (
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-6">✅ Soumissions en attente ({submissions.length})</h2>
            {submissions.length > 0 ? (
              <div className="space-y-4">
                {submissions.map((submission) => (
                  <div key={submission.id} className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-white">
                          {submission.user.firstName} {submission.user.lastName}
                        </h3>
                        <p className="text-gray-400">{submission.task.title}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(submission.submittedAt).toLocaleString('fr-FR')}
                        </p>
                      </div>
                      <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm font-medium">
                        En attente
                      </span>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleApproveSubmission(submission.id)}
                        className="flex-1 bg-green-500 text-white py-2 rounded-lg font-bold hover:bg-green-600 transition"
                      >
                        ✓ Approuver ({submission.task.reward} FCFA)
                      </button>
                      <button
                        onClick={() => handleRejectSubmission(submission.id)}
                        className="flex-1 bg-red-500 text-white py-2 rounded-lg font-bold hover:bg-red-600 transition"
                      >
                        ✗ Rejeter
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">✨</div>
                <p className="text-gray-400">Aucune soumission en attente</p>
              </div>
            )}
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-6">👥 Gestion des utilisateurs</h2>
            <p className="text-gray-400 text-center py-12">
              Cette fonctionnalité sera disponible avec le backend connecté.
            </p>
          </div>
        )}

        {/* Payments Tab */}
        {activeTab === 'payments' && (
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-6">💰 Gestion des paiements</h2>
            <p className="text-gray-400 text-center py-12">
              Cette fonctionnalité sera disponible avec le backend connecté.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

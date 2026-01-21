'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Demo data
const initialTasks = [
  { id: '1', title: 'Aimer une page Facebook', description: 'Aimez notre page officielle', category: 'Facebook', reward: 100, totalCompletions: 45, maxCompletions: 100, isActive: true, link: 'https://facebook.com/taskflow', createdAt: new Date(Date.now() - 86400000 * 5) },
  { id: '2', title: 'S\'abonner YouTube', description: 'Abonnez-vous à notre chaîne', category: 'YouTube', reward: 150, totalCompletions: 78, maxCompletions: 100, isActive: true, link: 'https://youtube.com/@taskflow', createdAt: new Date(Date.now() - 86400000 * 3) },
  { id: '3', title: 'Suivre TikTok', description: 'Suivez notre compte TikTok', category: 'TikTok', reward: 75, totalCompletions: 100, maxCompletions: 100, isActive: false, link: 'https://tiktok.com/@taskflow', createdAt: new Date(Date.now() - 86400000 * 7) },
  { id: '4', title: 'Partager Instagram', description: 'Partagez notre post', category: 'Instagram', reward: 125, totalCompletions: 23, maxCompletions: 50, isActive: true, link: 'https://instagram.com/taskflow', createdAt: new Date(Date.now() - 86400000 * 1) },
];

const initialSubmissions = [
  { id: '1', user: { id: 'u1', firstName: 'Amadou', lastName: 'Diallo', email: 'amadou@email.com' }, task: { title: 'Aimer une page Facebook', reward: 100 }, screenshotUrl: null, submittedAt: new Date(Date.now() - 3600000), status: 'pending' },
  { id: '2', user: { id: 'u2', firstName: 'Fatou', lastName: 'Traoré', email: 'fatou@email.com' }, task: { title: 'S\'abonner YouTube', reward: 150 }, screenshotUrl: null, submittedAt: new Date(Date.now() - 7200000), status: 'pending' },
  { id: '3', user: { id: 'u3', firstName: 'Kofi', lastName: 'Mensah', email: 'kofi@email.com' }, task: { title: 'Suivre TikTok', reward: 75 }, screenshotUrl: null, submittedAt: new Date(Date.now() - 86400000), status: 'pending' },
];

const initialUsers = [
  { id: 'u1', firstName: 'Amadou', lastName: 'Diallo', email: 'amadou@email.com', balance: 2500, totalEarned: 15000, country: 'Bénin', isActive: true, createdAt: new Date(Date.now() - 86400000 * 30) },
  { id: 'u2', firstName: 'Fatou', lastName: 'Traoré', email: 'fatou@email.com', balance: 8750, totalEarned: 45000, country: 'Sénégal', isActive: true, createdAt: new Date(Date.now() - 86400000 * 45) },
  { id: 'u3', firstName: 'Kofi', lastName: 'Mensah', email: 'kofi@email.com', balance: 1200, totalEarned: 8500, country: 'Ghana', isActive: true, createdAt: new Date(Date.now() - 86400000 * 15) },
  { id: 'u4', firstName: 'Marie', lastName: 'Ouédraogo', email: 'marie@email.com', balance: 0, totalEarned: 3200, country: 'Burkina Faso', isActive: false, createdAt: new Date(Date.now() - 86400000 * 60) },
];

const initialWithdrawals = [
  { id: 'w1', user: { firstName: 'Fatou', lastName: 'Traoré' }, amount: 5000, method: 'MTN Money', phone: '+229 97 00 00 00', status: 'pending', createdAt: new Date(Date.now() - 3600000) },
  { id: 'w2', user: { firstName: 'Amadou', lastName: 'Diallo' }, amount: 3000, method: 'Orange Money', phone: '+229 96 00 00 00', status: 'pending', createdAt: new Date(Date.now() - 7200000) },
  { id: 'w3', user: { firstName: 'Kofi', lastName: 'Mensah' }, amount: 10000, method: 'Wave', phone: '+233 50 00 00 00', status: 'completed', createdAt: new Date(Date.now() - 86400000 * 2) },
];

export default function AdminDashboard() {
  const { user, setUser } = useAuthStore();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [tasks, setTasks] = useState(initialTasks);
  const [submissions, setSubmissions] = useState(initialSubmissions);
  const [users, setUsers] = useState(initialUsers);
  const [withdrawals, setWithdrawals] = useState(initialWithdrawals);
  const [editingTask, setEditingTask] = useState<any>(null);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Facebook',
    reward: '',
    instructions: '',
    link: '',
    maxCompletions: 100,
  });
  const [loading, setLoading] = useState(true);
  const [searchUser, setSearchUser] = useState('');

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
      return;
    }
    setTimeout(() => setLoading(false), 500);
  }, [user, router]);

  const enableAdminMode = () => {
    if (user) {
      setUser({ ...user, isAdmin: true } as any);
    }
  };

  // Task functions
  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask = {
      id: String(Date.now()),
      title: formData.title,
      description: formData.description,
      category: formData.category,
      reward: parseInt(formData.reward),
      totalCompletions: 0,
      maxCompletions: formData.maxCompletions,
      isActive: true,
      link: formData.link,
      createdAt: new Date(),
    };
    setTasks([newTask, ...tasks]);
    resetForm();
    alert('✅ Tâche créée avec succès !');
  };

  const handleEditTask = (task: any) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description || '',
      category: task.category,
      reward: String(task.reward),
      instructions: '',
      link: task.link || '',
      maxCompletions: task.maxCompletions,
    });
    setShowTaskForm(true);
  };

  const handleUpdateTask = (e: React.FormEvent) => {
    e.preventDefault();
    setTasks(tasks.map(t => t.id === editingTask.id ? {
      ...t,
      title: formData.title,
      description: formData.description,
      category: formData.category,
      reward: parseInt(formData.reward),
      link: formData.link,
      maxCompletions: formData.maxCompletions,
    } : t));
    resetForm();
    alert('✅ Tâche modifiée avec succès !');
  };

  const handleDeleteTask = (taskId: string) => {
    if (confirm('⚠️ Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
      setTasks(tasks.filter(t => t.id !== taskId));
      alert('🗑️ Tâche supprimée !');
    }
  };

  const toggleTaskActive = (taskId: string) => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, isActive: !t.isActive } : t));
  };

  const resetForm = () => {
    setFormData({ title: '', description: '', category: 'Facebook', reward: '', instructions: '', link: '', maxCompletions: 100 });
    setEditingTask(null);
    setShowTaskForm(false);
  };

  // Submission functions
  const handleApproveSubmission = (id: string) => {
    setSubmissions(submissions.map(s => s.id === id ? { ...s, status: 'approved' } : s));
    alert('✅ Soumission approuvée ! Utilisateur crédité.');
  };

  const handleRejectSubmission = (id: string) => {
    const reason = prompt('Raison du rejet :');
    if (reason) {
      setSubmissions(submissions.map(s => s.id === id ? { ...s, status: 'rejected' } : s));
      alert('❌ Soumission rejetée.');
    }
  };

  // User functions
  const toggleUserActive = (userId: string) => {
    setUsers(users.map(u => u.id === userId ? { ...u, isActive: !u.isActive } : u));
  };

  // Withdrawal functions
  const handleApproveWithdrawal = (id: string) => {
    setWithdrawals(withdrawals.map(w => w.id === id ? { ...w, status: 'completed' } : w));
    alert('✅ Paiement effectué !');
  };

  const handleRejectWithdrawal = (id: string) => {
    if (confirm('Rejeter cette demande de retrait ?')) {
      setWithdrawals(withdrawals.map(w => w.id === id ? { ...w, status: 'rejected' } : w));
      alert('❌ Demande rejetée.');
    }
  };

  // Stats
  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.isActive).length,
    totalTasks: tasks.length,
    activeTasks: tasks.filter(t => t.isActive).length,
    pendingSubmissions: submissions.filter(s => s.status === 'pending').length,
    pendingWithdrawals: withdrawals.filter(w => w.status === 'pending').length,
    totalPaid: withdrawals.filter(w => w.status === 'completed').reduce((sum, w) => sum + w.amount, 0),
    totalEarned: users.reduce((sum, u) => sum + u.totalEarned, 0),
  };

  const filteredUsers = users.filter(u =>
    u.firstName.toLowerCase().includes(searchUser.toLowerCase()) ||
    u.lastName.toLowerCase().includes(searchUser.toLowerCase()) ||
    u.email.toLowerCase().includes(searchUser.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!user?.isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
        <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">🔐</div>
          <h2 className="text-2xl font-bold text-white mb-4">Panneau Administrateur</h2>
          <p className="text-gray-400 mb-6">
            Cet espace est réservé au propriétaire du site pour gérer les tâches, utilisateurs et paiements.
          </p>
          <button
            onClick={enableAdminMode}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-xl font-bold hover:shadow-lg transition text-lg"
          >
            🚀 Accéder au panneau Admin
          </button>
          <Link href="/" className="block mt-4 text-gray-500 hover:text-gray-300">
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <span className="text-2xl">⚙️</span>
              <div>
                <h1 className="text-xl font-bold text-white">Panneau Administrateur</h1>
                <p className="text-xs text-gray-400">TaskFlow Africa</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                Admin connecté
              </div>
              <Link href="/" className="text-gray-400 hover:text-white transition">
                Voir le site →
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {[
            { id: 'dashboard', label: '📊 Tableau de bord' },
            { id: 'tasks', label: `📋 Tâches (${tasks.length})` },
            { id: 'submissions', label: `✅ Soumissions (${stats.pendingSubmissions})` },
            { id: 'users', label: `👥 Utilisateurs (${users.length})` },
            { id: 'payments', label: `💰 Paiements (${stats.pendingWithdrawals})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-xl font-semibold whitespace-nowrap transition ${activeTab === tab.id
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
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
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Total Utilisateurs', value: stats.totalUsers, sub: `${stats.activeUsers} actifs`, color: 'blue', icon: '👥' },
                { label: 'Tâches', value: stats.totalTasks, sub: `${stats.activeTasks} actives`, color: 'green', icon: '📋' },
                { label: 'Soumissions', value: stats.pendingSubmissions, sub: 'en attente', color: 'yellow', icon: '⏳' },
                { label: 'Retraits', value: stats.pendingWithdrawals, sub: 'à traiter', color: 'red', icon: '💸' },
              ].map((stat, idx) => (
                <div key={idx} className="bg-gray-800 rounded-2xl p-5 border border-gray-700">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl">{stat.icon}</span>
                  </div>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                  <p className="text-sm text-gray-400">{stat.label}</p>
                  <p className="text-xs text-gray-500 mt-1">{stat.sub}</p>
                </div>
              ))}
            </div>

            {/* Financial Stats */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-green-900/50 to-green-800/30 rounded-2xl p-6 border border-green-700/50">
                <p className="text-green-400 text-sm mb-2">💰 Total gagné par les utilisateurs</p>
                <p className="text-4xl font-bold text-white">{stats.totalEarned.toLocaleString()} FCFA</p>
              </div>
              <div className="bg-gradient-to-br from-orange-900/50 to-orange-800/30 rounded-2xl p-6 border border-orange-700/50">
                <p className="text-orange-400 text-sm mb-2">💸 Total payé (retraits)</p>
                <p className="text-4xl font-bold text-white">{stats.totalPaid.toLocaleString()} FCFA</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <h3 className="text-lg font-bold text-white mb-4">Actions rapides</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <button onClick={() => { setActiveTab('tasks'); setShowTaskForm(true); }} className="p-4 bg-gray-700 hover:bg-gray-600 rounded-xl text-center transition">
                  <span className="text-2xl block mb-2">➕</span>
                  <span className="text-white text-sm">Nouvelle tâche</span>
                </button>
                <button onClick={() => setActiveTab('submissions')} className="p-4 bg-gray-700 hover:bg-gray-600 rounded-xl text-center transition">
                  <span className="text-2xl block mb-2">✅</span>
                  <span className="text-white text-sm">Valider soumissions</span>
                </button>
                <button onClick={() => setActiveTab('payments')} className="p-4 bg-gray-700 hover:bg-gray-600 rounded-xl text-center transition">
                  <span className="text-2xl block mb-2">💳</span>
                  <span className="text-white text-sm">Traiter paiements</span>
                </button>
                <button onClick={() => setActiveTab('users')} className="p-4 bg-gray-700 hover:bg-gray-600 rounded-xl text-center transition">
                  <span className="text-2xl block mb-2">👥</span>
                  <span className="text-white text-sm">Gérer utilisateurs</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tasks Tab */}
        {activeTab === 'tasks' && (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">Gestion des tâches</h2>
              <button
                onClick={() => { setEditingTask(null); setShowTaskForm(!showTaskForm); resetForm(); }}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl font-bold transition flex items-center gap-2"
              >
                {showTaskForm ? '✕ Fermer' : '➕ Nouvelle tâche'}
              </button>
            </div>

            {/* Task Form */}
            {showTaskForm && (
              <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4">
                  {editingTask ? '✏️ Modifier la tâche' : '➕ Créer une nouvelle tâche'}
                </h3>
                <form onSubmit={editingTask ? handleUpdateTask : handleCreateTask} className="grid md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-gray-400 text-sm mb-1">Titre *</label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Ex: Aimer notre page Facebook"
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-xl text-white focus:border-orange-500 outline-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-gray-400 text-sm mb-1">Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Description de la tâche..."
                      rows={2}
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-xl text-white focus:border-orange-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-1">Catégorie *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-xl text-white focus:border-orange-500 outline-none"
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
                      required
                      value={formData.reward}
                      onChange={(e) => setFormData({ ...formData, reward: e.target.value })}
                      placeholder="100"
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-xl text-white focus:border-orange-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-1">Lien de la tâche</label>
                    <input
                      type="url"
                      value={formData.link}
                      onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                      placeholder="https://..."
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-xl text-white focus:border-orange-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-1">Max participants</label>
                    <input
                      type="number"
                      value={formData.maxCompletions}
                      onChange={(e) => setFormData({ ...formData, maxCompletions: parseInt(e.target.value) })}
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-xl text-white focus:border-orange-500 outline-none"
                    />
                  </div>
                  <div className="md:col-span-2 flex gap-3">
                    <button type="submit" className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl font-bold hover:shadow-lg transition">
                      {editingTask ? '💾 Enregistrer les modifications' : '✅ Créer la tâche'}
                    </button>
                    {editingTask && (
                      <button type="button" onClick={resetForm} className="px-6 bg-gray-700 text-white py-3 rounded-xl font-bold hover:bg-gray-600 transition">
                        Annuler
                      </button>
                    )}
                  </div>
                </form>
              </div>
            )}

            {/* Tasks List */}
            <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-900">
                    <tr>
                      <th className="text-left p-4 text-gray-400 font-medium">Tâche</th>
                      <th className="text-left p-4 text-gray-400 font-medium">Catégorie</th>
                      <th className="text-left p-4 text-gray-400 font-medium">Récompense</th>
                      <th className="text-left p-4 text-gray-400 font-medium">Progression</th>
                      <th className="text-left p-4 text-gray-400 font-medium">Statut</th>
                      <th className="text-right p-4 text-gray-400 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {tasks.map((task) => (
                      <tr key={task.id} className="hover:bg-gray-700/50">
                        <td className="p-4">
                          <p className="text-white font-medium">{task.title}</p>
                          <p className="text-gray-500 text-sm">{task.description}</p>
                        </td>
                        <td className="p-4">
                          <span className="px-3 py-1 bg-gray-700 rounded-full text-sm text-white">{task.category}</span>
                        </td>
                        <td className="p-4 text-orange-400 font-bold">{task.reward} FCFA</td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-2 bg-gray-700 rounded-full overflow-hidden">
                              <div className="h-full bg-orange-500" style={{ width: `${(task.totalCompletions / task.maxCompletions) * 100}%` }}></div>
                            </div>
                            <span className="text-gray-400 text-sm">{task.totalCompletions}/{task.maxCompletions}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <button
                            onClick={() => toggleTaskActive(task.id)}
                            className={`px-3 py-1 rounded-full text-sm font-medium ${task.isActive ? 'bg-green-500/20 text-green-400' : 'bg-gray-600 text-gray-400'}`}
                          >
                            {task.isActive ? '✓ Actif' : 'Inactif'}
                          </button>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button onClick={() => handleEditTask(task)} className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition" title="Modifier">
                              ✏️
                            </button>
                            <button onClick={() => handleDeleteTask(task.id)} className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition" title="Supprimer">
                              🗑️
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Submissions Tab */}
        {activeTab === 'submissions' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white">Soumissions à valider</h2>
            {submissions.filter(s => s.status === 'pending').length > 0 ? (
              <div className="grid gap-4">
                {submissions.filter(s => s.status === 'pending').map((sub) => (
                  <div key={sub.id} className="bg-gray-800 rounded-2xl p-5 border border-gray-700">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-white font-bold">{sub.user.firstName} {sub.user.lastName}</p>
                        <p className="text-gray-400 text-sm">{sub.user.email}</p>
                        <p className="text-orange-400 mt-2">{sub.task.title} • {sub.task.reward} FCFA</p>
                        <p className="text-gray-500 text-xs mt-1">{new Date(sub.submittedAt).toLocaleString('fr-FR')}</p>
                      </div>
                      <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm">En attente</span>
                    </div>
                    <div className="flex gap-3">
                      <button onClick={() => handleApproveSubmission(sub.id)} className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-xl font-bold transition">
                        ✓ Approuver (+{sub.task.reward} FCFA)
                      </button>
                      <button onClick={() => handleRejectSubmission(sub.id)} className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl font-bold transition">
                        ✕ Rejeter
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-800 rounded-2xl p-12 text-center border border-gray-700">
                <span className="text-5xl block mb-4">✨</span>
                <p className="text-gray-400">Aucune soumission en attente</p>
              </div>
            )}
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">Gestion des utilisateurs</h2>
              <input
                type="search"
                placeholder="🔍 Rechercher..."
                value={searchUser}
                onChange={(e) => setSearchUser(e.target.value)}
                className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-xl text-white focus:border-orange-500 outline-none"
              />
            </div>
            <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-900">
                  <tr>
                    <th className="text-left p-4 text-gray-400 font-medium">Utilisateur</th>
                    <th className="text-left p-4 text-gray-400 font-medium">Pays</th>
                    <th className="text-left p-4 text-gray-400 font-medium">Solde</th>
                    <th className="text-left p-4 text-gray-400 font-medium">Total gagné</th>
                    <th className="text-left p-4 text-gray-400 font-medium">Statut</th>
                    <th className="text-right p-4 text-gray-400 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {filteredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-gray-700/50">
                      <td className="p-4">
                        <p className="text-white font-medium">{u.firstName} {u.lastName}</p>
                        <p className="text-gray-500 text-sm">{u.email}</p>
                      </td>
                      <td className="p-4 text-gray-300">{u.country}</td>
                      <td className="p-4 text-orange-400 font-bold">{u.balance.toLocaleString()} FCFA</td>
                      <td className="p-4 text-green-400">{u.totalEarned.toLocaleString()} FCFA</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-sm ${u.isActive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                          {u.isActive ? 'Actif' : 'Bloqué'}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => toggleUserActive(u.id)}
                          className={`px-4 py-2 rounded-lg font-medium transition ${u.isActive ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'}`}
                        >
                          {u.isActive ? '🚫 Bloquer' : '✓ Débloquer'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Payments Tab */}
        {activeTab === 'payments' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white">Demandes de retrait</h2>
            {withdrawals.filter(w => w.status === 'pending').length > 0 ? (
              <div className="grid gap-4">
                {withdrawals.filter(w => w.status === 'pending').map((w) => (
                  <div key={w.id} className="bg-gray-800 rounded-2xl p-5 border border-gray-700">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-white font-bold">{w.user.firstName} {w.user.lastName}</p>
                        <p className="text-gray-400">{w.method} • {w.phone}</p>
                        <p className="text-gray-500 text-sm mt-1">{new Date(w.createdAt).toLocaleString('fr-FR')}</p>
                      </div>
                      <p className="text-2xl font-bold text-orange-400">{w.amount.toLocaleString()} FCFA</p>
                    </div>
                    <div className="flex gap-3">
                      <button onClick={() => handleApproveWithdrawal(w.id)} className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-xl font-bold transition">
                        ✓ Marquer comme payé
                      </button>
                      <button onClick={() => handleRejectWithdrawal(w.id)} className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl font-bold transition">
                        ✕ Rejeter
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-800 rounded-2xl p-12 text-center border border-gray-700">
                <span className="text-5xl block mb-4">✨</span>
                <p className="text-gray-400">Aucune demande de retrait en attente</p>
              </div>
            )}

            {/* Completed withdrawals */}
            <h3 className="text-lg font-bold text-white mt-8">Paiements effectués</h3>
            <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-900">
                  <tr>
                    <th className="text-left p-4 text-gray-400">Utilisateur</th>
                    <th className="text-left p-4 text-gray-400">Méthode</th>
                    <th className="text-left p-4 text-gray-400">Montant</th>
                    <th className="text-left p-4 text-gray-400">Statut</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {withdrawals.filter(w => w.status !== 'pending').map((w) => (
                    <tr key={w.id}>
                      <td className="p-4 text-white">{w.user.firstName} {w.user.lastName}</td>
                      <td className="p-4 text-gray-400">{w.method}</td>
                      <td className="p-4 text-orange-400 font-bold">{w.amount.toLocaleString()} FCFA</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-sm ${w.status === 'completed' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                          {w.status === 'completed' ? '✓ Payé' : '✕ Rejeté'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

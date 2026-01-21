'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Demo history data
const demoHistory = [
    { id: '1', type: 'task', title: 'Aimer une page Facebook', amount: 100, status: 'completed', date: new Date(Date.now() - 3600000) },
    { id: '2', type: 'task', title: 'S\'abonner YouTube', amount: 150, status: 'completed', date: new Date(Date.now() - 7200000) },
    { id: '3', type: 'referral', title: 'Commission de Amadou D.', amount: 25, status: 'completed', date: new Date(Date.now() - 86400000) },
    { id: '4', type: 'withdrawal', title: 'Retrait MTN Money', amount: -5000, status: 'completed', date: new Date(Date.now() - 172800000) },
    { id: '5', type: 'task', title: 'Suivre TikTok', amount: 75, status: 'pending', date: new Date(Date.now() - 259200000) },
    { id: '6', type: 'task', title: 'Partager Facebook', amount: 125, status: 'rejected', date: new Date(Date.now() - 345600000) },
    { id: '7', type: 'referral', title: 'Commission de Fatou T.', amount: 50, status: 'completed', date: new Date(Date.now() - 432000000) },
    { id: '8', type: 'withdrawal', title: 'Retrait Orange Money', amount: -3000, status: 'pending', date: new Date(Date.now() - 518400000) },
];

export default function HistoryPage() {
    const { user } = useAuthStore();
    const router = useRouter();
    const [filter, setFilter] = useState('all');
    const [history, setHistory] = useState(demoHistory);

    useEffect(() => {
        if (!user) {
            router.push('/auth/login');
        }
    }, [user, router]);

    const filteredHistory = filter === 'all'
        ? history
        : history.filter(h => h.type === filter);

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'task': return '📋';
            case 'referral': return '👥';
            case 'withdrawal': return '💸';
            default: return '📌';
        }
    };

    const getTypeLabel = (type: string) => {
        switch (type) {
            case 'task': return 'Tâche';
            case 'referral': return 'Parrainage';
            case 'withdrawal': return 'Retrait';
            default: return type;
        }
    };

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'completed': return 'bg-green-100 text-green-700';
            case 'pending': return 'bg-yellow-100 text-yellow-700';
            case 'rejected': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'completed': return 'Complété';
            case 'pending': return 'En attente';
            case 'rejected': return 'Rejeté';
            default: return status;
        }
    };

    const formatDate = (date: Date) => {
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        if (days === 0) return 'Aujourd\'hui';
        if (days === 1) return 'Hier';
        if (days < 7) return `Il y a ${days} jours`;
        return date.toLocaleDateString('fr-FR');
    };

    // Calculate totals
    const totals = {
        earned: history.filter(h => h.amount > 0 && h.status === 'completed').reduce((sum, h) => sum + h.amount, 0),
        withdrawn: Math.abs(history.filter(h => h.type === 'withdrawal' && h.status === 'completed').reduce((sum, h) => sum + h.amount, 0)),
        pending: history.filter(h => h.status === 'pending').reduce((sum, h) => sum + Math.abs(h.amount), 0),
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-terracotta-50 to-warm-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <Link href="/dashboard" className="text-terracotta-600 hover:underline mb-4 inline-block">
                        ← Retour au tableau de bord
                    </Link>
                    <h1 className="text-3xl font-bold text-terracotta-900">📜 Historique</h1>
                    <p className="text-terracotta-600">Toutes tes activités sur la plateforme</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-white rounded-xl shadow p-4 text-center">
                        <p className="text-2xl font-bold text-green-600">+{totals.earned.toLocaleString()}</p>
                        <p className="text-sm text-gray-500">FCFA gagnés</p>
                    </div>
                    <div className="bg-white rounded-xl shadow p-4 text-center">
                        <p className="text-2xl font-bold text-red-600">-{totals.withdrawn.toLocaleString()}</p>
                        <p className="text-sm text-gray-500">FCFA retirés</p>
                    </div>
                    <div className="bg-white rounded-xl shadow p-4 text-center">
                        <p className="text-2xl font-bold text-yellow-600">{totals.pending.toLocaleString()}</p>
                        <p className="text-sm text-gray-500">FCFA en attente</p>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                    {[
                        { id: 'all', label: 'Tout' },
                        { id: 'task', label: '📋 Tâches' },
                        { id: 'referral', label: '👥 Parrainages' },
                        { id: 'withdrawal', label: '💸 Retraits' },
                    ].map((f) => (
                        <button
                            key={f.id}
                            onClick={() => setFilter(f.id)}
                            className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition ${filter === f.id
                                    ? 'bg-terracotta-600 text-white'
                                    : 'bg-white text-terracotta-700 hover:bg-terracotta-50'
                                }`}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>

                {/* History List */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    {filteredHistory.length > 0 ? (
                        <div className="divide-y divide-gray-100">
                            {filteredHistory.map((item) => (
                                <div key={item.id} className="p-4 hover:bg-gray-50 transition">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-terracotta-100 rounded-full flex items-center justify-center text-xl">
                                                {getTypeIcon(item.type)}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-terracotta-900">{item.title}</p>
                                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                                    <span>{getTypeLabel(item.type)}</span>
                                                    <span>•</span>
                                                    <span>{formatDate(item.date)}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className={`font-bold ${item.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                {item.amount > 0 ? '+' : ''}{item.amount.toLocaleString()} FCFA
                                            </p>
                                            <span className={`text-xs px-2 py-1 rounded-full ${getStatusStyle(item.status)}`}>
                                                {getStatusLabel(item.status)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="text-5xl mb-4">📭</div>
                            <p className="text-gray-500">Aucune activité dans cette catégorie</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

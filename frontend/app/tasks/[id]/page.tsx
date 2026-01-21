'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useRouter, useParams } from 'next/navigation';
import apiClient from '@/utils/api';
import Link from 'next/link';

interface Task {
    id: string;
    title: string;
    description: string;
    category: string;
    reward: number;
    rewardCurrency: string;
    imageUrl?: string;
    instructions: string;
    requiresScreenshot: boolean;
    totalCompletions: number;
    maxCompletions: number;
}

export default function TaskDetailPage() {
    const { user } = useAuthStore();
    const router = useRouter();
    const params = useParams();
    const [task, setTask] = useState<Task | null>(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [screenshot, setScreenshot] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>('');
    const [notes, setNotes] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!user) {
            router.push('/auth/login');
            return;
        }

        const fetchTask = async () => {
            try {
                const response = await apiClient.get(`/tasks/${params.id}`);
                setTask(response.data);
            } catch (error) {
                console.error('Error fetching task:', error);
                router.push('/tasks');
            } finally {
                setLoading(false);
            }
        };

        fetchTask();
    }, [user, router, params.id]);

    const handleScreenshotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setScreenshot(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSubmitting(true);

        try {
            const formData = new FormData();
            formData.append('taskId', task!.id);
            if (screenshot) {
                formData.append('screenshot', screenshot);
            }
            if (notes) {
                formData.append('notes', notes);
            }

            await apiClient.post('/tasks/submit', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            setSubmitted(true);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Une erreur est survenue');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-terracotta-50 to-warm-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-terracotta-600"></div>
            </div>
        );
    }

    if (submitted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-terracotta-50 to-warm-50 py-12">
                <div className="max-w-lg mx-auto px-4">
                    <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-terracotta-900 mb-4">Tâche soumise !</h2>
                        <p className="text-gray-600 mb-6">
                            Votre soumission est en cours de vérification. Vous serez crédité de{' '}
                            <span className="font-bold text-terracotta-600">{task?.reward} FCFA</span> une fois validée.
                        </p>
                        <div className="space-y-3">
                            <Link
                                href="/tasks"
                                className="block w-full bg-gradient-to-r from-terracotta-600 to-warm-500 text-white py-3 rounded-xl font-bold hover:shadow-lg transition"
                            >
                                Voir d'autres tâches
                            </Link>
                            <Link
                                href="/dashboard"
                                className="block w-full border-2 border-terracotta-200 text-terracotta-700 py-3 rounded-xl font-bold hover:bg-terracotta-50 transition"
                            >
                                Retour au tableau de bord
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!task) return null;

    // Map category to platform icon and colors
    const platformStyles: Record<string, { icon: string; bg: string; text: string }> = {
        youtube: { icon: '📺', bg: 'bg-red-100', text: 'text-red-700' },
        facebook: { icon: '👍', bg: 'bg-blue-100', text: 'text-blue-700' },
        tiktok: { icon: '🎵', bg: 'bg-gray-100', text: 'text-gray-700' },
        instagram: { icon: '📸', bg: 'bg-pink-100', text: 'text-pink-700' },
        twitter: { icon: '🐦', bg: 'bg-sky-100', text: 'text-sky-700' },
    };

    const style = platformStyles[task.category.toLowerCase()] || { icon: '📱', bg: 'bg-terracotta-100', text: 'text-terracotta-700' };

    return (
        <div className="min-h-screen bg-gradient-to-br from-terracotta-50 to-warm-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Button */}
                <Link
                    href="/tasks"
                    className="inline-flex items-center gap-2 text-terracotta-600 hover:text-terracotta-700 mb-6 font-medium"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Retour aux tâches
                </Link>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Task Info */}
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        {/* Header */}
                        <div className="flex items-start gap-4 mb-6">
                            <div className={`w-16 h-16 ${style.bg} rounded-2xl flex items-center justify-center text-3xl`}>
                                {style.icon}
                            </div>
                            <div className="flex-1">
                                <span className={`inline-block px-3 py-1 ${style.bg} ${style.text} rounded-full text-sm font-medium mb-2`}>
                                    {task.category}
                                </span>
                                <h1 className="text-2xl font-bold text-terracotta-900">{task.title}</h1>
                            </div>
                        </div>

                        {/* Reward */}
                        <div className="bg-gradient-to-r from-terracotta-500 to-warm-500 rounded-xl p-6 text-white mb-6">
                            <p className="text-sm opacity-80 mb-1">Récompense</p>
                            <p className="text-3xl font-bold">{task.reward} FCFA</p>
                        </div>

                        {/* Description */}
                        <div className="mb-6">
                            <h3 className="font-bold text-terracotta-900 mb-2">Description</h3>
                            <p className="text-gray-600">{task.description}</p>
                        </div>

                        {/* Instructions */}
                        <div className="mb-6">
                            <h3 className="font-bold text-terracotta-900 mb-2">Instructions</h3>
                            <div className="bg-warm-50 rounded-xl p-4 text-warm-900">
                                <p className="whitespace-pre-line">{task.instructions}</p>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gray-50 rounded-xl p-4 text-center">
                                <p className="text-sm text-gray-500">Complétées</p>
                                <p className="text-xl font-bold text-terracotta-900">{task.totalCompletions}</p>
                            </div>
                            <div className="bg-gray-50 rounded-xl p-4 text-center">
                                <p className="text-sm text-gray-500">Places restantes</p>
                                <p className="text-xl font-bold text-green-600">{task.maxCompletions - task.totalCompletions}</p>
                            </div>
                        </div>
                    </div>

                    {/* Submission Form */}
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <h2 className="text-xl font-bold text-terracotta-900 mb-6">Soumettre la tâche</h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Step 1 */}
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-8 h-8 bg-terracotta-500 rounded-full flex items-center justify-center text-white font-bold">
                                    1
                                </div>
                                <div>
                                    <h3 className="font-bold text-terracotta-900 mb-2">Effectuez la tâche</h3>
                                    <p className="text-gray-600 text-sm">
                                        Suivez les instructions ci-contre pour compléter la tâche
                                    </p>
                                </div>
                            </div>

                            {/* Step 2 - Screenshot */}
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-8 h-8 bg-terracotta-500 rounded-full flex items-center justify-center text-white font-bold">
                                    2
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-terracotta-900 mb-2">
                                        Prenez une capture d'écran {task.requiresScreenshot && <span className="text-red-500">*</span>}
                                    </h3>
                                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-terracotta-400 transition cursor-pointer">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleScreenshotChange}
                                            className="hidden"
                                            id="screenshot"
                                            required={task.requiresScreenshot}
                                        />
                                        <label htmlFor="screenshot" className="cursor-pointer">
                                            {previewUrl ? (
                                                <img src={previewUrl} alt="Preview" className="max-h-48 mx-auto rounded-lg" />
                                            ) : (
                                                <>
                                                    <div className="text-4xl mb-2">📷</div>
                                                    <p className="text-gray-600">Cliquez pour uploader</p>
                                                    <p className="text-sm text-gray-400">PNG, JPG jusqu'à 5MB</p>
                                                </>
                                            )}
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Step 3 - Notes */}
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-8 h-8 bg-terracotta-500 rounded-full flex items-center justify-center text-white font-bold">
                                    3
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-terracotta-900 mb-2">Notes (optionnel)</h3>
                                    <textarea
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                        placeholder="Ajoutez des détails si nécessaire..."
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-terracotta-500 focus:ring-0 transition resize-none"
                                        rows={3}
                                    />
                                </div>
                            </div>

                            {error && (
                                <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={submitting || (task.requiresScreenshot && !screenshot)}
                                className="w-full bg-gradient-to-r from-terracotta-600 to-warm-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {submitting ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                        </svg>
                                        Envoi en cours...
                                    </span>
                                ) : (
                                    `Soumettre et gagner ${task.reward} FCFA`
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

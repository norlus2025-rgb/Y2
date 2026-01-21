'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import Link from 'next/link';

export default function RegisterPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { setUser, setToken } = useAuthStore();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        country: 'Bénin',
        acceptTerms: false,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    // Get referral code from URL if present
    const referralCode = searchParams.get('ref') || '';

    const countries = [
        'Bénin', 'Burkina Faso', 'Cameroun', 'Côte d\'Ivoire', 'Gabon',
        'Ghana', 'Guinée', 'Mali', 'Niger', 'Nigeria', 'Sénégal', 'Togo', 'Autre'
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    const validateForm = () => {
        if (!formData.firstName.trim()) {
            setError('Le prénom est requis');
            return false;
        }
        if (!formData.lastName.trim()) {
            setError('Le nom est requis');
            return false;
        }
        if (!formData.email.includes('@')) {
            setError('Email invalide');
            return false;
        }
        if (formData.password.length < 6) {
            setError('Le mot de passe doit contenir au moins 6 caractères');
            return false;
        }
        if (formData.password !== formData.confirmPassword) {
            setError('Les mots de passe ne correspondent pas');
            return false;
        }
        if (!formData.acceptTerms) {
            setError('Vous devez accepter les conditions d\'utilisation');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!validateForm()) return;

        setLoading(true);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    referralCode: referralCode || undefined,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Erreur lors de l\'inscription');
            }

            setSuccess(true);

            // Auto login after registration
            if (data.token) {
                setToken(data.token);
                setUser(data.user);
                setTimeout(() => router.push('/dashboard'), 2000);
            }
        } catch (err: any) {
            setError(err.message || 'Une erreur est survenue');
        } finally {
            setLoading(false);
        }
    };

    // Demo registration
    const handleDemoRegister = () => {
        setUser({
            id: 'demo-new-user',
            email: formData.email || 'nouveau@taskflow.africa',
            firstName: formData.firstName || 'Nouvel',
            lastName: formData.lastName || 'Utilisateur',
            balance: 0,
            totalEarned: 0,
            referralEarnings: 0,
            referralCode: 'NEW2024',
            profileImage: undefined,
        });
        router.push('/dashboard');
    };

    if (success) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-terracotta-900 via-terracotta-800 to-warm-900 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-terracotta-900 mb-4">Compte créé ! 🎉</h2>
                    <p className="text-gray-600 mb-6">
                        Bienvenue sur TaskFlow Africa ! Vous allez être redirigé vers votre tableau de bord...
                    </p>
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-terracotta-600 mx-auto"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-terracotta-900 via-terracotta-800 to-warm-900 flex items-center justify-center p-4 py-12">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <pattern id="pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M10 0L20 10L10 20L0 10Z" fill="currentColor" className="text-warm-500" />
                    </pattern>
                    <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern)" />
                </svg>
            </div>

            <div className="relative w-full max-w-lg">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-3">
                        <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                            <span className="text-3xl">💰</span>
                        </div>
                        <span className="text-white text-2xl font-bold">TaskFlow Africa</span>
                    </Link>
                </div>

                {/* Referral Banner */}
                {referralCode && (
                    <div className="bg-green-500/20 border border-green-400/30 rounded-2xl p-4 mb-6 text-center">
                        <p className="text-green-100">
                            🎁 Vous avez été invité ! Code parrain: <span className="font-bold">{referralCode}</span>
                        </p>
                    </div>
                )}

                {/* Card */}
                <div className="bg-white rounded-3xl shadow-2xl p-8">
                    <h1 className="text-2xl font-bold text-terracotta-900 mb-2 text-center">
                        Créer un compte
                    </h1>
                    <p className="text-gray-500 text-center mb-6">
                        Rejoins des milliers d'Africains qui gagnent de l'argent
                    </p>

                    {/* Google Register */}
                    <a
                        href={`${process.env.NEXT_PUBLIC_API_URL}/auth/google${referralCode ? `?ref=${referralCode}` : ''}`}
                        className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-200 text-gray-700 px-6 py-4 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-300 transition mb-4"
                    >
                        <svg className="w-6 h-6" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        S'inscrire avec Google
                    </a>

                    {/* Demo Button */}
                    <button
                        onClick={handleDemoRegister}
                        className="w-full mb-4 flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition"
                    >
                        <span className="text-xl">🚀</span>
                        Mode démo (sans inscription)
                    </button>

                    {/* Divider */}
                    <div className="relative mb-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-gray-400">ou avec email</span>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Prénom *</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    placeholder="Jean"
                                    required
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-terracotta-500 focus:ring-0 transition"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    placeholder="Dupont"
                                    required
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-terracotta-500 focus:ring-0 transition"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="votre@email.com"
                                required
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-terracotta-500 focus:ring-0 transition"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Numéro WhatsApp</label>
                            <input
                                type="tel"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                placeholder="+229 XX XX XX XX"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-terracotta-500 focus:ring-0 transition"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Pays *</label>
                            <select
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-terracotta-500 focus:ring-0 transition bg-white"
                            >
                                {countries.map(country => (
                                    <option key={country} value={country}>{country}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe *</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                required
                                minLength={6}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-terracotta-500 focus:ring-0 transition"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Confirmer le mot de passe *</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="••••••••"
                                required
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-terracotta-500 focus:ring-0 transition"
                            />
                        </div>

                        <label className="flex items-start gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                name="acceptTerms"
                                checked={formData.acceptTerms}
                                onChange={handleChange}
                                className="mt-1 w-5 h-5 rounded border-gray-300 text-terracotta-600 focus:ring-terracotta-500"
                            />
                            <span className="text-sm text-gray-600">
                                J'accepte les{' '}
                                <a href="#" className="text-terracotta-600 hover:underline">conditions d'utilisation</a>
                                {' '}et la{' '}
                                <a href="#" className="text-terracotta-600 hover:underline">politique de confidentialité</a>
                            </span>
                        </label>

                        {error && (
                            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-terracotta-600 to-warm-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition disabled:opacity-50"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                    Création en cours...
                                </span>
                            ) : (
                                'Créer mon compte'
                            )}
                        </button>
                    </form>

                    <p className="text-center text-gray-500 text-sm mt-6">
                        Déjà un compte ?{' '}
                        <Link href="/auth/login" className="text-terracotta-600 font-semibold hover:underline">
                            Se connecter
                        </Link>
                    </p>
                </div>

                {/* Trust */}
                <p className="text-center text-white/60 text-sm mt-6">
                    🔒 Vos données sont sécurisées
                </p>
            </div>
        </div>
    );
}

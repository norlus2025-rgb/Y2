'use client';

import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SettingsPage() {
    const { user, setUser, logout } = useAuthStore();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('profile');
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        country: '',
    });

    const [paymentData, setPaymentData] = useState({
        mtnNumber: '',
        orangeNumber: '',
        waveNumber: '',
        paypalEmail: '',
        usdtAddress: '',
    });

    const [notifications, setNotifications] = useState({
        email: true,
        taskUpdates: true,
        referralUpdates: true,
        promotions: false,
    });

    useEffect(() => {
        if (!user) {
            router.push('/auth/login');
            return;
        }

        setFormData({
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            email: user.email || '',
            phoneNumber: '+229 97 00 00 00',
            country: 'Bénin',
        });
    }, [user, router]);

    const handleSaveProfile = async () => {
        setSaving(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (user) {
            setUser({
                ...user,
                firstName: formData.firstName,
                lastName: formData.lastName,
            });
        }

        setSaving(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    const countries = [
        'Bénin', 'Burkina Faso', 'Cameroun', 'Côte d\'Ivoire', 'Gabon',
        'Ghana', 'Guinée', 'Mali', 'Niger', 'Nigeria', 'Sénégal', 'Togo'
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-terracotta-50 to-warm-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <Link href="/dashboard" className="text-terracotta-600 hover:underline mb-4 inline-block">
                        ← Retour au tableau de bord
                    </Link>
                    <h1 className="text-3xl font-bold text-terracotta-900">⚙️ Paramètres</h1>
                    <p className="text-terracotta-600">Gère ton profil et tes préférences</p>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-6 overflow-x-auto">
                    {[
                        { id: 'profile', label: '👤 Profil' },
                        { id: 'payment', label: '💳 Paiement' },
                        { id: 'notifications', label: '🔔 Notifications' },
                        { id: 'security', label: '🔒 Sécurité' },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-5 py-2.5 rounded-xl font-semibold whitespace-nowrap transition ${activeTab === tab.id
                                    ? 'bg-terracotta-600 text-white shadow-lg'
                                    : 'bg-white text-terracotta-700 hover:bg-terracotta-50'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Profile Tab */}
                {activeTab === 'profile' && (
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h2 className="text-xl font-bold text-terracotta-900 mb-6">Informations personnelles</h2>

                        <div className="flex items-center gap-6 mb-8">
                            <div className="w-20 h-20 bg-terracotta-100 rounded-full flex items-center justify-center text-3xl font-bold text-terracotta-600">
                                {formData.firstName?.[0]}{formData.lastName?.[0]}
                            </div>
                            <div>
                                <p className="font-bold text-terracotta-900">{formData.firstName} {formData.lastName}</p>
                                <p className="text-gray-500">{formData.email}</p>
                                <button className="mt-2 text-sm text-terracotta-600 hover:underline">
                                    Changer la photo
                                </button>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                                <input
                                    type="text"
                                    value={formData.firstName}
                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-terracotta-500 focus:ring-0 transition"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                                <input
                                    type="text"
                                    value={formData.lastName}
                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-terracotta-500 focus:ring-0 transition"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    disabled
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Numéro WhatsApp</label>
                                <input
                                    type="tel"
                                    value={formData.phoneNumber}
                                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-terracotta-500 focus:ring-0 transition"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Pays</label>
                                <select
                                    value={formData.country}
                                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-terracotta-500 focus:ring-0 transition bg-white"
                                >
                                    {countries.map(c => <option key={c}>{c}</option>)}
                                </select>
                            </div>
                        </div>

                        <button
                            onClick={handleSaveProfile}
                            disabled={saving}
                            className={`w-full py-3 rounded-xl font-bold transition ${saved
                                    ? 'bg-green-500 text-white'
                                    : 'bg-gradient-to-r from-terracotta-600 to-warm-500 text-white hover:shadow-lg'
                                }`}
                        >
                            {saving ? 'Enregistrement...' : saved ? '✓ Enregistré !' : 'Enregistrer les modifications'}
                        </button>
                    </div>
                )}

                {/* Payment Tab */}
                {activeTab === 'payment' && (
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h2 className="text-xl font-bold text-terracotta-900 mb-6">Méthodes de paiement</h2>
                        <p className="text-gray-600 mb-6">Configure tes informations pour recevoir tes paiements plus rapidement.</p>

                        <div className="space-y-4">
                            <div className="p-4 border-2 border-gray-200 rounded-xl">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center text-white font-bold">M</div>
                                    <span className="font-semibold text-terracotta-900">MTN Mobile Money</span>
                                </div>
                                <input
                                    type="tel"
                                    value={paymentData.mtnNumber}
                                    onChange={(e) => setPaymentData({ ...paymentData, mtnNumber: e.target.value })}
                                    placeholder="+229 XX XX XX XX"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-terracotta-500"
                                />
                            </div>

                            <div className="p-4 border-2 border-gray-200 rounded-xl">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold">O</div>
                                    <span className="font-semibold text-terracotta-900">Orange Money</span>
                                </div>
                                <input
                                    type="tel"
                                    value={paymentData.orangeNumber}
                                    onChange={(e) => setPaymentData({ ...paymentData, orangeNumber: e.target.value })}
                                    placeholder="+229 XX XX XX XX"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-terracotta-500"
                                />
                            </div>

                            <div className="p-4 border-2 border-gray-200 rounded-xl">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">W</div>
                                    <span className="font-semibold text-terracotta-900">Wave</span>
                                </div>
                                <input
                                    type="tel"
                                    value={paymentData.waveNumber}
                                    onChange={(e) => setPaymentData({ ...paymentData, waveNumber: e.target.value })}
                                    placeholder="+229 XX XX XX XX"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-terracotta-500"
                                />
                            </div>

                            <div className="p-4 border-2 border-gray-200 rounded-xl">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">P</div>
                                    <span className="font-semibold text-terracotta-900">PayPal</span>
                                </div>
                                <input
                                    type="email"
                                    value={paymentData.paypalEmail}
                                    onChange={(e) => setPaymentData({ ...paymentData, paypalEmail: e.target.value })}
                                    placeholder="votre@email.com"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-terracotta-500"
                                />
                            </div>

                            <div className="p-4 border-2 border-gray-200 rounded-xl">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold">₮</div>
                                    <span className="font-semibold text-terracotta-900">USDT (TRC-20)</span>
                                </div>
                                <input
                                    type="text"
                                    value={paymentData.usdtAddress}
                                    onChange={(e) => setPaymentData({ ...paymentData, usdtAddress: e.target.value })}
                                    placeholder="TXxxx..."
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-terracotta-500"
                                />
                            </div>
                        </div>

                        <button className="w-full mt-6 bg-gradient-to-r from-terracotta-600 to-warm-500 text-white py-3 rounded-xl font-bold hover:shadow-lg transition">
                            Enregistrer les méthodes de paiement
                        </button>
                    </div>
                )}

                {/* Notifications Tab */}
                {activeTab === 'notifications' && (
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h2 className="text-xl font-bold text-terracotta-900 mb-6">Préférences de notifications</h2>

                        <div className="space-y-4">
                            {[
                                { key: 'email', label: 'Notifications par email', desc: 'Recevoir les notifications importantes par email' },
                                { key: 'taskUpdates', label: 'Nouvelles tâches', desc: 'Être notifié quand de nouvelles tâches sont disponibles' },
                                { key: 'referralUpdates', label: 'Activité parrainage', desc: 'Notifications sur les inscriptions et gains de filleuls' },
                                { key: 'promotions', label: 'Promotions', desc: 'Recevoir les offres spéciales et promotions' },
                            ].map((item) => (
                                <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                    <div>
                                        <p className="font-semibold text-terracotta-900">{item.label}</p>
                                        <p className="text-sm text-gray-500">{item.desc}</p>
                                    </div>
                                    <button
                                        onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key as keyof typeof notifications] })}
                                        className={`w-14 h-8 rounded-full transition-colors ${notifications[item.key as keyof typeof notifications] ? 'bg-terracotta-500' : 'bg-gray-300'
                                            }`}
                                    >
                                        <div className={`w-6 h-6 bg-white rounded-full shadow transition-transform ${notifications[item.key as keyof typeof notifications] ? 'translate-x-7' : 'translate-x-1'
                                            }`}></div>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Security Tab */}
                {activeTab === 'security' && (
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h2 className="text-xl font-bold text-terracotta-900 mb-6">Mot de passe</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe actuel</label>
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-terracotta-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nouveau mot de passe</label>
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-terracotta-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirmer</label>
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-terracotta-500"
                                    />
                                </div>
                                <button className="w-full bg-terracotta-600 text-white py-3 rounded-xl font-bold hover:bg-terracotta-700 transition">
                                    Changer le mot de passe
                                </button>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h2 className="text-xl font-bold text-red-600 mb-4">Zone de danger</h2>
                            <p className="text-gray-600 mb-4">Actions irréversibles sur ton compte.</p>
                            <div className="space-y-3">
                                <button
                                    onClick={handleLogout}
                                    className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-50 transition"
                                >
                                    Se déconnecter
                                </button>
                                <button className="w-full border-2 border-red-300 text-red-600 py-3 rounded-xl font-bold hover:bg-red-50 transition">
                                    Supprimer mon compte
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

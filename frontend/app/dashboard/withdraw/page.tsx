'use client';

import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import apiClient from '@/utils/api';

type PaymentMethod = 'mtn' | 'orange' | 'wave' | 'paypal' | 'usdt';

const paymentMethods: { id: PaymentMethod; name: string; icon: string; color: string; minAmount: number }[] = [
    { id: 'mtn', name: 'MTN Mobile Money', icon: '📱', color: 'bg-yellow-500', minAmount: 1000 },
    { id: 'orange', name: 'Orange Money', icon: '📱', color: 'bg-orange-500', minAmount: 1000 },
    { id: 'wave', name: 'Wave', icon: '🌊', color: 'bg-blue-500', minAmount: 500 },
    { id: 'paypal', name: 'PayPal', icon: '💳', color: 'bg-blue-600', minAmount: 5000 },
    { id: 'usdt', name: 'USDT (TRC-20)', icon: '💎', color: 'bg-green-500', minAmount: 5000 },
];

export default function WithdrawPage() {
    const { user } = useAuthStore();
    const router = useRouter();
    const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
    const [amount, setAmount] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [walletAddress, setWalletAddress] = useState('');
    const [paypalEmail, setPaypalEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    // Mock balance for demo
    const balance = user?.balance || 15000;
    const minWithdrawal = 1000; // FCFA

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const withdrawAmount = parseInt(amount);

            if (withdrawAmount < minWithdrawal) {
                throw new Error(`Le montant minimum est de ${minWithdrawal} FCFA`);
            }

            if (withdrawAmount > balance) {
                throw new Error('Solde insuffisant');
            }

            // API call would go here
            await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API

            setSuccess(true);
        } catch (err: any) {
            setError(err.message || 'Une erreur est survenue');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-terracotta-50 to-warm-50 py-12">
                <div className="max-w-lg mx-auto px-4">
                    <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-terracotta-900 mb-4">Demande envoyée !</h2>
                        <p className="text-gray-600 mb-6">
                            Votre demande de retrait de <span className="font-bold text-terracotta-600">{amount} FCFA</span> a été envoyée.
                            Vous recevrez votre paiement dans les 24-48h.
                        </p>
                        <button
                            onClick={() => router.push('/dashboard')}
                            className="w-full bg-gradient-to-r from-terracotta-600 to-warm-500 text-white py-3 rounded-xl font-bold hover:shadow-lg transition"
                        >
                            Retour au tableau de bord
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-terracotta-50 to-warm-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-terracotta-900">Retirer mes gains</h1>
                    <p className="text-terracotta-600 mt-2">Choisissez votre méthode de paiement préférée</p>
                </div>

                {/* Balance Card */}
                <div className="bg-gradient-to-r from-terracotta-600 to-warm-500 rounded-2xl p-6 mb-8 text-white shadow-lg">
                    <p className="text-sm opacity-80 mb-1">Solde disponible</p>
                    <p className="text-4xl font-bold">{balance.toLocaleString()} FCFA</p>
                    <p className="text-sm opacity-80 mt-2">Minimum de retrait: {minWithdrawal.toLocaleString()} FCFA</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Payment Methods */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h2 className="text-xl font-bold text-terracotta-900 mb-4">Méthode de paiement</h2>
                        <div className="space-y-3">
                            {paymentMethods.map((method) => (
                                <button
                                    key={method.id}
                                    onClick={() => setSelectedMethod(method.id)}
                                    className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition ${selectedMethod === method.id
                                            ? 'border-terracotta-500 bg-terracotta-50'
                                            : 'border-gray-200 hover:border-terracotta-300'
                                        }`}
                                >
                                    <div className={`w-12 h-12 ${method.color} rounded-xl flex items-center justify-center text-2xl text-white`}>
                                        {method.icon}
                                    </div>
                                    <div className="text-left flex-1">
                                        <p className="font-semibold text-terracotta-900">{method.name}</p>
                                        <p className="text-sm text-gray-500">Min: {method.minAmount.toLocaleString()} FCFA</p>
                                    </div>
                                    {selectedMethod === method.id && (
                                        <div className="w-6 h-6 bg-terracotta-500 rounded-full flex items-center justify-center">
                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Withdrawal Form */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h2 className="text-xl font-bold text-terracotta-900 mb-4">Détails du retrait</h2>

                        {!selectedMethod ? (
                            <div className="text-center py-12 text-gray-500">
                                <p className="text-5xl mb-4">👈</p>
                                <p>Sélectionnez une méthode de paiement</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Amount */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Montant (FCFA)
                                    </label>
                                    <input
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        placeholder="Ex: 5000"
                                        min={minWithdrawal}
                                        max={balance}
                                        required
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-terracotta-500 focus:ring-0 transition"
                                    />
                                    <div className="flex justify-between mt-2">
                                        <button
                                            type="button"
                                            onClick={() => setAmount(String(Math.floor(balance / 2)))}
                                            className="text-sm text-terracotta-600 hover:underline"
                                        >
                                            50%
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setAmount(String(balance))}
                                            className="text-sm text-terracotta-600 hover:underline"
                                        >
                                            Tout retirer
                                        </button>
                                    </div>
                                </div>

                                {/* Phone Number for Mobile Money */}
                                {(selectedMethod === 'mtn' || selectedMethod === 'orange' || selectedMethod === 'wave') && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Numéro de téléphone
                                        </label>
                                        <input
                                            type="tel"
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                            placeholder="+229 XX XX XX XX"
                                            required
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-terracotta-500 focus:ring-0 transition"
                                        />
                                    </div>
                                )}

                                {/* PayPal Email */}
                                {selectedMethod === 'paypal' && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email PayPal
                                        </label>
                                        <input
                                            type="email"
                                            value={paypalEmail}
                                            onChange={(e) => setPaypalEmail(e.target.value)}
                                            placeholder="votre@email.com"
                                            required
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-terracotta-500 focus:ring-0 transition"
                                        />
                                    </div>
                                )}

                                {/* Wallet Address for USDT */}
                                {selectedMethod === 'usdt' && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Adresse wallet TRC-20
                                        </label>
                                        <input
                                            type="text"
                                            value={walletAddress}
                                            onChange={(e) => setWalletAddress(e.target.value)}
                                            placeholder="TXxx..."
                                            required
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-terracotta-500 focus:ring-0 transition"
                                        />
                                    </div>
                                )}

                                {error && (
                                    <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                                        {error}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading || !amount}
                                    className="w-full bg-gradient-to-r from-terracotta-600 to-warm-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                            </svg>
                                            Traitement...
                                        </span>
                                    ) : (
                                        `Retirer ${amount ? parseInt(amount).toLocaleString() : '0'} FCFA`
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>

                {/* Info Box */}
                <div className="mt-8 bg-warm-100 border border-warm-300 rounded-2xl p-6">
                    <h3 className="font-bold text-warm-900 mb-2">ℹ️ Informations importantes</h3>
                    <ul className="text-warm-800 text-sm space-y-1">
                        <li>• Les paiements sont traités sous 24 à 48 heures</li>
                        <li>• Assurez-vous que vos informations de paiement sont correctes</li>
                        <li>• Des frais peuvent s'appliquer selon la méthode choisie</li>
                        <li>• En cas de problème, contactez le support</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

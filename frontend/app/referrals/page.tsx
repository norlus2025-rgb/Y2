'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';

export default function ReferralsPage() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
      return;
    }
  }, [user, router]);

  // Generate referral link using user's referral code
  const referralCode = user?.referralCode || 'DEMO2024';
  const referralLink = `${typeof window !== 'undefined' ? window.location.origin : ''}/auth/register?ref=${referralCode}`;

  // Demo data
  const referralStats = {
    totalReferrals: 12,
    activeReferrals: 8,
    totalCommission: 5250,
    pendingCommission: 750,
  };

  const recentReferrals = [
    { name: 'Kouamé A.', date: 'Il y a 2 jours', earned: 150, status: 'active' },
    { name: 'Fatou D.', date: 'Il y a 5 jours', earned: 320, status: 'active' },
    { name: 'Jean-Pierre M.', date: 'Il y a 1 semaine', earned: 0, status: 'pending' },
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = referralLink;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareOnWhatsApp = () => {
    const message = `🎁 Rejoins TaskFlow Africa et gagne de l'argent en effectuant des tâches simples sur les réseaux sociaux !\n\nInscris-toi avec mon lien et commence à gagner : ${referralLink}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-terracotta-50 to-warm-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-terracotta-900 mb-2">👥 Parrainage</h1>
          <p className="text-terracotta-600">Invite tes amis et gagne 5% de leurs gains à vie !</p>
        </div>

        {/* Referral Link Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-terracotta-900 mb-4">Ton lien de parrainage</h2>

          <div className="bg-terracotta-50 rounded-xl p-4 mb-4 flex items-center gap-4">
            <div className="flex-1 overflow-hidden">
              <p className="text-terracotta-700 font-mono text-sm truncate">{referralLink}</p>
            </div>
            <button
              onClick={copyToClipboard}
              className={`flex-shrink-0 px-4 py-2 rounded-lg font-bold transition ${copied
                  ? 'bg-green-500 text-white'
                  : 'bg-terracotta-600 text-white hover:bg-terracotta-700'
                }`}
            >
              {copied ? '✓ Copié !' : 'Copier'}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={shareOnWhatsApp}
              className="flex items-center justify-center gap-2 bg-green-500 text-white py-3 rounded-xl font-bold hover:bg-green-600 transition"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Partager sur WhatsApp
            </button>
            <button
              onClick={() => {
                const text = `Rejoins TaskFlow Africa et gagne de l'argent ! ${referralLink}`;
                if (navigator.share) {
                  navigator.share({ text, url: referralLink });
                }
              }}
              className="flex items-center justify-center gap-2 bg-terracotta-600 text-white py-3 rounded-xl font-bold hover:bg-terracotta-700 transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Partager
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-2xl shadow p-5 text-center">
            <p className="text-3xl font-bold text-terracotta-600">{referralStats.totalReferrals}</p>
            <p className="text-gray-500 text-sm">Filleuls total</p>
          </div>
          <div className="bg-white rounded-2xl shadow p-5 text-center">
            <p className="text-3xl font-bold text-green-600">{referralStats.activeReferrals}</p>
            <p className="text-gray-500 text-sm">Actifs</p>
          </div>
          <div className="bg-white rounded-2xl shadow p-5 text-center">
            <p className="text-3xl font-bold text-warm-600">{referralStats.totalCommission.toLocaleString()}</p>
            <p className="text-gray-500 text-sm">FCFA gagnés</p>
          </div>
          <div className="bg-white rounded-2xl shadow p-5 text-center">
            <p className="text-3xl font-bold text-orange-600">{referralStats.pendingCommission.toLocaleString()}</p>
            <p className="text-gray-500 text-sm">FCFA en attente</p>
          </div>
        </div>

        {/* Recent Referrals */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-terracotta-900 mb-4">Tes filleuls récents</h2>
          <div className="space-y-4">
            {recentReferrals.map((referral, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-terracotta-100 rounded-full flex items-center justify-center text-terracotta-600 font-bold">
                    {referral.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-terracotta-900">{referral.name}</p>
                    <p className="text-sm text-gray-500">{referral.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">+{referral.earned} FCFA</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${referral.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                    {referral.status === 'active' ? 'Actif' : 'En attente'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How it Works */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-terracotta-900 mb-6">Comment ça marche ?</h2>
          <div className="space-y-4">
            {[
              {
                step: 1,
                title: 'Partage ton lien',
                desc: 'Copie et partage ton lien de parrainage via WhatsApp, email ou réseaux sociaux',
                icon: '🔗',
              },
              {
                step: 2,
                title: 'Tes amis s\'inscrivent',
                desc: 'Ils créent un compte en utilisant ton lien de parrainage',
                icon: '📝',
              },
              {
                step: 3,
                title: 'Ils complètent des tâches',
                desc: 'Tes filleuls gagnent de l\'argent en effectuant des tâches',
                icon: '✅',
              },
              {
                step: 4,
                title: 'Tu gagnes 5%',
                desc: 'Tu reçois automatiquement 5% de commission sur tous leurs gains, à vie !',
                icon: '💰',
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-terracotta-600 to-warm-500 rounded-xl flex items-center justify-center text-2xl">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold text-terracotta-900">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

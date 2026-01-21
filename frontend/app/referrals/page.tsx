'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import apiClient from '@/utils/api';

export default function ReferralsPage() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [referralData, setReferralData] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
      return;
    }

    const fetchReferrals = async () => {
      try {
        const response = await apiClient.get('/users/referrals');
        setReferralData(response.data);
      } catch (error) {
        console.error('Error fetching referral data:', error);
      }
    };

    fetchReferrals();
  }, [user, router]);

  const referralLink = `${process.env.NEXT_PUBLIC_CLIENT_URL}/?ref=${referralData?.code}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-terracotta-900">Invite & Earn</h1>
          <p className="text-gray-600 mt-2">Earn 5% commission on your friends' earnings</p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-terracotta-900 mb-4">Your Referral Link</h2>
              <div className="bg-gray-50 rounded-lg p-4 mb-4 break-all">
                <p className="text-sm text-gray-600 font-mono">{referralLink}</p>
              </div>
              <button
                onClick={copyToClipboard}
                className={`w-full py-3 rounded-lg font-bold transition ${
                  copied
                    ? 'bg-green-500 text-white'
                    : 'bg-gradient-to-r from-terracotta-600 to-warm-500 text-white hover:shadow-lg'
                }`}
              >
                {copied ? '✓ Copied!' : 'Copy Link'}
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-gradient-to-br from-terracotta-50 to-warm-50 rounded-lg p-6">
                <p className="text-gray-600 text-sm mb-2">Total Referrals</p>
                <p className="text-4xl font-bold text-terracotta-900">
                  {referralData?.totalReferrals || 0}
                </p>
              </div>
              <div className="bg-gradient-to-br from-warm-50 to-orange-50 rounded-lg p-6">
                <p className="text-gray-600 text-sm mb-2">Commission Earned</p>
                <p className="text-4xl font-bold text-warm-900">
                  {referralData?.totalCommission || 0} USDC
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* How it Works */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-terracotta-900 mb-6">How It Works</h2>
          <div className="space-y-4">
            {[
              {
                step: 1,
                title: 'Share Your Link',
                desc: 'Copy and share your referral link with friends via WhatsApp, email, or social media',
              },
              {
                step: 2,
                title: 'They Sign Up',
                desc: 'Your friends sign up using your referral link to create their accounts',
              },
              {
                step: 3,
                title: 'They Complete Tasks',
                desc: 'Your friends earn money by completing tasks on the platform',
              },
              {
                step: 4,
                title: 'You Earn 5%',
                desc: 'You automatically receive 5% commission on everything they earn',
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-terracotta-600 to-warm-500 text-white rounded-full flex items-center justify-center font-bold">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-bold text-terracotta-900">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

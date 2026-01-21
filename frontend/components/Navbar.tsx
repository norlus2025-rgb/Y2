'use client';

import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <nav className="bg-gradient-to-r from-terracotta-700 to-warm-600 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <span className="text-2xl">💰</span>
            </div>
            <span className="text-white text-xl font-bold hidden sm:block">TaskFlow Africa</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {user ? (
              <>
                <Link href="/dashboard" className="text-white/90 hover:text-white transition font-medium">
                  Tableau de bord
                </Link>
                <Link href="/tasks" className="text-white/90 hover:text-white transition font-medium">
                  Tâches
                </Link>
                <Link href="/referrals" className="text-white/90 hover:text-white transition font-medium">
                  Parrainage
                </Link>
                {user.isAdmin && (
                  <Link href="/admin" className="text-yellow-300 hover:text-yellow-200 transition font-medium">
                    Admin
                  </Link>
                )}
                <div className="flex items-center gap-3 ml-4">
                  <div className="bg-white/20 px-4 py-1.5 rounded-full">
                    <span className="text-white font-medium text-sm">
                      {(user.balance || 0).toLocaleString()} FCFA
                    </span>
                  </div>
                  {user.profileImage ? (
                    <img
                      src={user.profileImage}
                      alt={user.firstName}
                      className="w-9 h-9 rounded-full border-2 border-white/30"
                    />
                  ) : (
                    <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center text-white font-bold">
                      {user.firstName?.[0]}
                    </div>
                  )}
                  <button
                    onClick={handleLogout}
                    className="text-white/80 hover:text-white text-sm transition"
                  >
                    Déconnexion
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  href="/auth/login"
                  className="text-white/90 hover:text-white transition font-medium"
                >
                  Connexion
                </Link>
                <Link
                  href="/auth/login"
                  className="bg-white text-terracotta-600 px-6 py-2 rounded-xl font-bold hover:bg-warm-50 transition shadow-lg"
                >
                  Commencer
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {user ? (
              <>
                <div className="bg-white/10 rounded-xl p-4 mb-4">
                  <div className="flex items-center gap-3">
                    {user.profileImage ? (
                      <img src={user.profileImage} alt={user.firstName} className="w-12 h-12 rounded-full" />
                    ) : (
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white text-xl font-bold">
                        {user.firstName?.[0]}
                      </div>
                    )}
                    <div>
                      <p className="text-white font-bold">{user.firstName}</p>
                      <p className="text-white/70 text-sm">{(user.balance || 0).toLocaleString()} FCFA</p>
                    </div>
                  </div>
                </div>
                <Link href="/dashboard" className="block text-white py-2 px-4 rounded-lg hover:bg-white/10">
                  📊 Tableau de bord
                </Link>
                <Link href="/tasks" className="block text-white py-2 px-4 rounded-lg hover:bg-white/10">
                  📋 Tâches
                </Link>
                <Link href="/referrals" className="block text-white py-2 px-4 rounded-lg hover:bg-white/10">
                  👥 Parrainage
                </Link>
                <Link href="/dashboard/withdraw" className="block text-white py-2 px-4 rounded-lg hover:bg-white/10">
                  💸 Retirer
                </Link>
                {user.isAdmin && (
                  <Link href="/admin" className="block text-yellow-300 py-2 px-4 rounded-lg hover:bg-white/10">
                    ⚙️ Admin
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full text-left text-red-300 py-2 px-4 rounded-lg hover:bg-white/10"
                >
                  🚪 Déconnexion
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="block text-white py-2 px-4 rounded-lg hover:bg-white/10">
                  Connexion
                </Link>
                <Link
                  href="/auth/login"
                  className="block bg-white text-terracotta-600 py-3 px-4 rounded-xl font-bold text-center"
                >
                  Commencer maintenant
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

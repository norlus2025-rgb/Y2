'use client';

import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <nav className="bg-gradient-to-r from-terracotta-600 to-warm-500 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <span className="text-white text-2xl font-bold">EarnHub</span>
          </Link>

          <div className="flex items-center gap-6">
            {user ? (
              <>
                <Link href="/dashboard" className="text-white hover:text-warm-100">
                  Dashboard
                </Link>
                <Link href="/tasks" className="text-white hover:text-warm-100">
                  Tasks
                </Link>
                <Link href="/referrals" className="text-white hover:text-warm-100">
                  Referrals
                </Link>
                <div className="flex items-center gap-3">
                  {user.profileImage && (
                    <img
                      src={user.profileImage}
                      alt={user.firstName}
                      className="w-8 h-8 rounded-full"
                    />
                  )}
                  <span className="text-white">{user.firstName}</span>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <Link
                href="/auth/login"
                className="bg-white text-terracotta-600 px-6 py-2 rounded-lg font-semibold hover:bg-warm-50 transition"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

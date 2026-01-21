'use client';

import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-terracotta-50 via-warm-50 to-orange-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-terracotta-900 mb-6 leading-tight">
              Earn Money Simple & Easy
            </h1>
            <p className="text-xl text-terracotta-700 mb-8 leading-relaxed">
              Complete simple tasks on social media and get paid instantly. Join thousands of Africans already earning with EarnHub.
            </p>
            <div className="flex gap-4">
              <Link
                href="/auth/login"
                className="bg-gradient-to-r from-terracotta-600 to-warm-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:shadow-lg transition"
              >
                Get Started
              </Link>
              <Link
                href="#how-it-works"
                className="border-2 border-terracotta-600 text-terracotta-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-terracotta-50 transition"
              >
                Learn More
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="bg-gradient-to-br from-terracotta-300 to-warm-300 rounded-3xl p-1">
              <div className="bg-white rounded-3xl p-8">
                <div className="space-y-4">
                  <div className="h-12 bg-terracotta-100 rounded-lg animate-pulse"></div>
                  <div className="h-12 bg-terracotta-100 rounded-lg animate-pulse"></div>
                  <div className="h-12 bg-warm-100 rounded-lg animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-terracotta-900 mb-16">
            Why Choose EarnHub?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Easy Tasks',
                desc: 'Simple social media tasks that take minutes to complete',
                icon: '📱',
              },
              {
                title: 'Fast Payouts',
                desc: 'Get paid instantly via Mobile Money or Crypto',
                icon: '💰',
              },
              {
                title: 'Earn More',
                desc: 'Refer friends and earn 5% commission on their earnings',
                icon: '🤝',
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-terracotta-50 to-warm-50 rounded-2xl p-8 text-center hover:shadow-lg transition"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-terracotta-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-terracotta-700">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

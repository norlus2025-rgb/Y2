'use client';

import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-terracotta-900 via-terracotta-800 to-warm-900">
        {/* African Pattern Background */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="africanPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M10 0L20 10L10 20L0 10Z" fill="currentColor" className="text-warm-500"/>
              <circle cx="10" cy="10" r="3" fill="currentColor" className="text-terracotta-400"/>
            </pattern>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#africanPattern)"/>
          </svg>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-warm-500/20 text-warm-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                +10,000 utilisateurs actifs
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
                Gagne de l'argent<br/>
                <span className="bg-gradient-to-r from-warm-400 to-orange-400 bg-clip-text text-transparent">
                  en quelques clics
                </span>
              </h1>
              
              <p className="text-xl text-terracotta-100 mb-8 leading-relaxed max-w-xl">
                Complete des tâches simples sur les réseaux sociaux et reçois tes paiements 
                via Mobile Money (MTN, Orange, Wave) ou crypto.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/auth/login"
                  className="group relative overflow-hidden bg-gradient-to-r from-warm-500 to-orange-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-warm-500/30 hover:shadow-xl hover:shadow-warm-500/40 transition-all duration-300 hover:scale-105"
                >
                  <span className="relative z-10">Commencer à gagner</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-warm-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </Link>
                <Link
                  href="#comment-ca-marche"
                  className="flex items-center justify-center gap-2 border-2 border-warm-400/50 text-warm-300 px-8 py-4 rounded-xl font-bold text-lg hover:bg-warm-500/10 transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Comment ça marche
                </Link>
              </div>
              
              {/* Trust Badges */}
              <div className="mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-8">
                <div className="flex items-center gap-2 text-warm-300/80">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">Paiements rapides</span>
                </div>
                <div className="flex items-center gap-2 text-warm-300/80">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">100% gratuit</span>
                </div>
                <div className="flex items-center gap-2 text-warm-300/80">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">Parrainage 5%</span>
                </div>
              </div>
            </div>
            
            {/* Stats Card */}
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-warm-500/30 to-orange-500/30 blur-3xl rounded-3xl"></div>
                <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8">
                  <h3 className="text-warm-300 text-lg font-medium mb-6">Statistiques en temps réel</h3>
                  <div className="space-y-6">
                    <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl">
                      <span className="text-white/70">Total distribué</span>
                      <span className="text-2xl font-bold text-warm-400">2,450,000 FCFA</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl">
                      <span className="text-white/70">Utilisateurs actifs</span>
                      <span className="text-2xl font-bold text-green-400">12,847</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl">
                      <span className="text-white/70">Tâches aujourd'hui</span>
                      <span className="text-2xl font-bold text-orange-400">156</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Wave Decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-24 text-warm-50" viewBox="0 0 1440 74" fill="currentColor" preserveAspectRatio="none">
            <path d="M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,42.7C960,43,1056,53,1152,53.3C1248,53,1344,43,1392,37.3L1440,32L1440,74L1392,74C1344,74,1248,74,1152,74C1056,74,960,74,864,74C768,74,672,74,576,74C480,74,384,74,288,74C192,74,96,74,48,74L0,74Z"/>
          </svg>
        </div>
      </section>

      {/* How It Works */}
      <section id="comment-ca-marche" className="py-24 bg-warm-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-terracotta-900 mb-4">
              Comment ça marche ?
            </h2>
            <p className="text-xl text-terracotta-600 max-w-2xl mx-auto">
              3 étapes simples pour commencer à gagner de l'argent
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Créer un compte',
                desc: 'Inscris-toi gratuitement avec ton compte Google en 30 secondes',
                icon: '👤',
                color: 'from-terracotta-500 to-terracotta-600',
              },
              {
                step: '02',
                title: 'Complète des tâches',
                desc: 'Like, partage et abonne-toi à des pages sur Facebook, TikTok, YouTube, Instagram',
                icon: '📱',
                color: 'from-warm-500 to-warm-600',
              },
              {
                step: '03',
                title: 'Reçois tes gains',
                desc: 'Retire ton argent via MTN Money, Orange Money, Wave ou crypto',
                icon: '💰',
                color: 'from-orange-500 to-orange-600',
              },
            ].map((item, idx) => (
              <div key={idx} className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-terracotta-500/20 to-warm-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-terracotta-100">
                  <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center text-3xl mb-6 shadow-lg`}>
                    {item.icon}
                  </div>
                  <span className="text-terracotta-300 font-bold text-sm">{item.step}</span>
                  <h3 className="text-xl font-bold text-terracotta-900 mt-2 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-terracotta-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-terracotta-900 mb-4">
              Pourquoi nous choisir ?
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '⚡', title: 'Paiements rapides', desc: 'Reçois tes gains en 24-48h max' },
              { icon: '🔒', title: '100% sécurisé', desc: 'Tes données sont protégées' },
              { icon: '📈', title: 'Gagne plus', desc: 'Nouvelles tâches chaque jour' },
              { icon: '🤝', title: 'Parrainage 5%', desc: 'Invite tes amis et gagne' },
            ].map((feature, idx) => (
              <div key={idx} className="text-center p-6 rounded-2xl hover:bg-terracotta-50 transition-colors">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold text-terracotta-900 mb-2">{feature.title}</h3>
                <p className="text-terracotta-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="py-24 bg-gradient-to-br from-terracotta-50 to-warm-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-terracotta-900 mb-4">
              Méthodes de paiement
            </h2>
            <p className="text-terracotta-600">Retire tes gains comme tu veux</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8">
            {[
              { name: 'MTN Mobile Money', color: 'bg-yellow-500' },
              { name: 'Orange Money', color: 'bg-orange-500' },
              { name: 'Wave', color: 'bg-blue-500' },
              { name: 'PayPal', color: 'bg-blue-600' },
              { name: 'USDT', color: 'bg-green-500' },
            ].map((method, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-white px-6 py-4 rounded-xl shadow-md">
                <div className={`w-10 h-10 ${method.color} rounded-full flex items-center justify-center text-white font-bold`}>
                  {method.name[0]}
                </div>
                <span className="font-semibold text-terracotta-800">{method.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-terracotta-800 to-warm-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Prêt à commencer ?
          </h2>
          <p className="text-xl text-terracotta-200 mb-8">
            Rejoins des milliers d'Africains qui gagnent de l'argent chaque jour
          </p>
          <Link
            href="/auth/login"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-warm-500 to-orange-500 text-white px-10 py-5 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Créer mon compte gratuit
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-terracotta-900 text-terracotta-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">TaskFlow Africa</h3>
              <p className="text-sm">La plateforme #1 pour gagner de l'argent sur les réseaux sociaux en Afrique.</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Liens</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/auth/login" className="hover:text-warm-400 transition">Se connecter</Link></li>
                <li><Link href="#comment-ca-marche" className="hover:text-warm-400 transition">Comment ça marche</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Légal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-warm-400 transition">Conditions d'utilisation</a></li>
                <li><a href="#" className="hover:text-warm-400 transition">Politique de confidentialité</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li>support@taskflow.africa</li>
                <li>WhatsApp: +229 XX XX XX XX</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-terracotta-800 mt-8 pt-8 text-center text-sm">
            <p>&copy; 2024 TaskFlow Africa. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

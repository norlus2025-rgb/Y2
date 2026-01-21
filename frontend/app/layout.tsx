import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TaskFlow Africa - Gagne de l\'argent sur les réseaux sociaux',
  description: 'Complete des tâches simples sur Facebook, YouTube, TikTok et Instagram. Reçois tes paiements via MTN Money, Orange Money ou Wave.',
  keywords: 'gagner argent, réseaux sociaux, MTN Money, Orange Money, Wave, Afrique, tâches rémunérées',
  openGraph: {
    title: 'TaskFlow Africa',
    description: 'Gagne de l\'argent en likant des pages et en t\'abonnant à des chaînes',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="theme-color" content="#d67c3e" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="TaskFlow Africa" />
      </head>
      <body className={`${inter.className} bg-warm-50 antialiased`}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}

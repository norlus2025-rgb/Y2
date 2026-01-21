# EarnHub - User Earning Platform

Une plateforme complète pour que les utilisateurs gagnent de l'argent en complétant des tâches simples sur les réseaux sociaux, avec système de parrainage et paiements en Mobile Money et Crypto.

## 🌟 Fonctionnalités Principales

### Pour les Utilisateurs
- ✅ **Authentification Google OAuth2** - Connexion rapide et sécurisée
- ✅ **Dashboard Personnel** - Suivi des gains en temps réel
- ✅ **Tâches Variées** - Like pages Facebook, abonner YouTube, partager contenu
- ✅ **Système de Parrainage** - Gagnez 5% de commissions
- ✅ **Paiements Flexibles** - Mobile Money (MTN, Orange, Vodafone) et Crypto (USDC, ETH, BTC)
- ✅ **Historique de Transactions** - Suivi complet des gains et retraits

### Pour l'Admin
- ✅ **Gestion des Tâches** - Créer, modifier, supprimer des tâches
- ✅ **Modération** - Approuver/Rejeter les soumissions utilisateurs
- ✅ **Paramétrage Flexible** - Prix, catégories, images, instructions
- ✅ **Analytics** - Dashboard avec statistiques en temps réel

## 🏗️ Architecture Technique

```
parrainage/
├── backend/                 # API Node.js/Express
│   ├── src/
│   │   ├── config/         # Configuration database, JWT
│   │   ├── entities/       # Modèles TypeORM (User, Task, Payment)
│   │   ├── controllers/    # Logique métier
│   │   ├── services/       # Services (UserService, TaskService, PaymentService)
│   │   ├── routes/         # Endpoints API
│   │   ├── middleware/     # Auth, validation
│   │   └── utils/          # JWT, helpers
│   └── package.json
│
├── frontend/                # Next.js/React
│   ├── app/
│   │   ├── auth/           # Pages d'authentification
│   │   ├── dashboard/      # Dashboard utilisateur
│   │   ├── tasks/          # Lister les tâches
│   │   ├── referrals/      # Système de parrainage
│   │   └── admin/          # Panneau d'administration
│   ├── components/         # Composants réutilisables
│   ├── store/              # Zustand state management
│   ├── utils/              # API client
│   └── package.json
│
└── docs/                    # Documentation
```

## 🛠️ Stack Technologique

**Backend:**
- Node.js + Express
- TypeScript
- PostgreSQL (TypeORM)
- Passport (Google OAuth)
- JWT pour authentification
- Ethers.js pour Crypto
- Axios pour API calls

**Frontend:**
- Next.js 14
- React 18
- TypeScript
- Zustand (State Management)
- Tailwind CSS
- Responsive design

**Intégrations:**
- Google OAuth2
- Mobile Money APIs (MTN, Orange, Vodafone)
- Ethereum/USDC Smart Contracts
- Bitcoin Blockchain APIs

## 📋 Configuration & Installation

### Prérequis
- Node.js 18+
- PostgreSQL 12+
- Git

### Backend Setup

```bash
cd backend

# Installer les dépendances
npm install

# Créer le fichier .env
cp .env.example .env

# Configurer les variables d'environnement
# - DATABASE_URL (PostgreSQL)
# - JWT_SECRET
# - GOOGLE_CLIENT_ID & GOOGLE_CLIENT_SECRET
# - MTN_API_KEY, ORANGE_API_KEY, VODAFONE_API_KEY
# - ETHEREUM_RPC_URL, ETHEREUM_PRIVATE_KEY
# - etc.

# Lancer le serveur développement
npm run dev

# Build pour production
npm run build
npm start
```

### Frontend Setup

```bash
cd frontend

# Installer les dépendances
npm install

# Créer le fichier .env.local
cp .env.example .env.local

# Configurer les URLs
# NEXT_PUBLIC_API_URL=http://localhost:3001
# NEXT_PUBLIC_CLIENT_URL=http://localhost:3000

# Lancer en développement
npm run dev

# Build pour production
npm run build
npm start
```

## 📚 API Endpoints

### Authentication
- `GET /auth/google` - Initier connexion Google
- `GET /auth/google/callback` - Callback OAuth
- `POST /auth/logout` - Déconnexion

### Users
- `GET /users/profile` - Récupérer profil
- `PUT /users/profile` - Mettre à jour profil
- `GET /users/referrals` - Stats parrainage
- `POST /users/referrals/add` - Ajouter parrainage
- `POST /users/withdraw` - Demander retrait

### Tasks
- `GET /tasks` - Lister tâches disponibles
- `POST /tasks/:taskId/submit` - Soumettre une tâche
- `GET /tasks/my-submissions` - Mes soumissions
- `POST /tasks` (Admin) - Créer tâche
- `POST /tasks/admin/:submissionId/approve` (Admin) - Approuver
- `POST /tasks/admin/:submissionId/reject` (Admin) - Rejeter

### Payments
- `GET /payments` - Historique paiements
- `POST /payments/initiate` - Initier paiement
- `POST /payments/:paymentId/complete` - Finaliser paiement

## 💡 Utilisation

### Pour les Utilisateurs

1. **Inscription**
   - Cliquer "Login"
   - Choisir "Sign in with Google"
   - Accepter les permissions

2. **Compléter des Tâches**
   - Aller sur "Tasks"
   - Filtrer par catégorie si souhaité
   - Cliquer "Submit Task"
   - Gagner les points !

3. **Gagner Plus avec Parrainage**
   - Aller sur "Referrals"
   - Copier le lien de parrainage
   - Partager avec amis
   - Gagner 5% de leurs gains

4. **Retirer ses Gains**
   - Aller sur "Dashboard"
   - Cliquer "Withdraw Now"
   - Choisir méthode de paiement
   - Saisir adresse Mobile Money ou Wallet Crypto
   - Confirmer

### Pour l'Admin

1. **Accéder l'Admin Dashboard**
   - URL: `/admin` (nécessite isAdmin=true)
   - Compte admin créé manuellement en BD

2. **Créer des Tâches**
   - Remplir le formulaire
   - Ajouter image, description, instructions
   - Définir récompense et devise
   - Définir date d'expiration
   - Cliquer "Create Task"

3. **Modérer les Soumissions**
   - Aller sur "Review Submissions"
   - Vérifier les soumissions en attente
   - Approuver ou rejeter avec raison
   - Les utilisateurs sont crédités automatiquement

## 🎨 Design & UX

### Palette de Couleurs Terracotta
- **Primaire**: Terracotta (#d67c3e)
- **Secondaire**: Warm (#f59840)
- **Gradients**: Blend naturel pour atmosphère africaine accueillante
- **Accessibilité**: Contraste élevé, lisibilité optimisée

### Responsive Design
- Mobile-first approach
- Breakpoints: sm(640px), md(768px), lg(1024px)
- Navigation adaptée par écran

## 🔒 Sécurité

- JWT pour authentification
- HTTPS obligatoire en production
- Validation des inputs côté client et serveur
- Hachage des passwords avec bcrypt
- Protection CSRF
- Rate limiting sur endpoints sensibles
- Variablesd'environnement pour secrets

## 📈 Cas d'Usage Africain

- **Langues**: Français + Anglais
- **Devises**: USDC, BTC, ETH + Mobile Money locales
- **Accessibilité**: Optimisé pour connexions faibles (3G)
- **Paiements**: Intégration Mobile Money pour faciliter accès bancaire

## 🚀 Déploiement

### Backend (Render/Railway)
```bash
npm run build
# Push vers Git repo
# Connecter à Render/Railway
# ENV variables configurées
```

### Frontend (Vercel)
```bash
# Push vers Git repo
# Connecter à Vercel
# ENV variables: NEXT_PUBLIC_API_URL
```

### Database (ElephantSQL/Neon)
- PostgreSQL managed hosting
- Backups automatiques
- Scaling simplifié

## 📞 Support & Contributions

Pour questions ou bugs, contactez l'équipe de développement.

## 📄 License

Propriétaire - Tous droits réservés

---

**Made with ❤️ for African entrepreneurs**

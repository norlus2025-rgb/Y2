# EarnHub - Setup & Deployment Guide

## 🚀 Démarrage Rapide Local

### 1️⃣ Installer PostgreSQL

**Windows:**
```bash
# Via Chocolatey
choco install postgresql

# Ou télécharger depuis https://www.postgresql.org/download/
```

**Mac:**
```bash
brew install postgresql
brew services start postgresql
```

**Linux:**
```bash
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql
```

### 2️⃣ Créer la Base de Données

```bash
psql -U postgres
CREATE DATABASE earn_platform;
\q
```

### 3️⃣ Cloner et Configurer Backend

```bash
cd backend

# Installer les dépendances
npm install

# Copier et configurer .env
cp .env.example .env
# Éditer .env avec vos paramètres
```

**Variables .env importantes:**

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/earn_platform
JWT_SECRET=your_super_secret_key_change_this

# Google OAuth (https://console.cloud.google.com)
GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=xxx

# Mobile Money (contacter les providers)
MTN_API_KEY=your_mtn_key
ORANGE_API_KEY=your_orange_key
VODAFONE_API_KEY=your_vodafone_key

# Crypto (Alchemy for Ethereum, IPFS for storage)
ETHEREUM_RPC_URL=https://eth-mainnet.g.alchemy.com/v2/your-key
ETHEREUM_PRIVATE_KEY=0x... (wallet private key)
USDC_CONTRACT_ADDRESS=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48

CLIENT_URL=http://localhost:3000
PORT=3001
NODE_ENV=development
```

### 4️⃣ Lancer le Backend

```bash
npm run dev
# Serveur lancé sur http://localhost:3001
```

### 5️⃣ Configurer le Frontend

```bash
cd ../frontend

npm install

# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_CLIENT_URL=http://localhost:3000
```

### 6️⃣ Lancer le Frontend

```bash
npm run dev
# App lancée sur http://localhost:3000
```

## 🔧 Créer un Compte Admin

```bash
# Se connecter via Google d'abord
# Puis en BD:

psql -U postgres -d earn_platform

UPDATE users SET "isAdmin" = true WHERE email = 'your-email@gmail.com';

# Rafraîchir la page
```

## 📦 Configuration Production

### Backend - Render/Railway/Heroku

**1. Connecter Git Repository**
```bash
git init
git add .
git commit -m "Initial commit"
git push origin main
```

**2. Configuration sur Render**
- Créer nouveau "Web Service"
- Connecter GitHub repo
- Build Command: `npm install && npm run build`
- Start Command: `npm start`
- Ajouter Environment Variables

**3. Database - Neon/ElephantSQL**
- Créer instance PostgreSQL managée
- Copier DATABASE_URL
- Ajouter dans Environment Variables

### Frontend - Vercel

**1. Push vers GitHub**
```bash
cd frontend
git push origin main
```

**2. Importer dans Vercel**
- Aller sur vercel.com
- "New Project" → Sélectionner repo
- Framework: Next.js
- Environment: `NEXT_PUBLIC_API_URL=https://your-backend-url.com`
- Deploy

## 💳 Intégrations Paiements

### Mobile Money Setup

#### MTN (Orange Cameroun, Senegal, etc.)
1. Créer compte MTN Developer: https://developer.mtn.com
2. Créer application
3. Générer API Key
4. Tester endpoints en Sandbox d'abord

#### Orange Money
1. Portail: https://www.orangemoney.com
2. Demander accès API
3. Documentation: https://orange-money-api.readthedocs.io

#### Vodafone Cash
1. Contact: https://www.vodafone.com
2. Demander partenariat
3. Intégration WhatsApp for Business

### Ethereum/USDC

1. **Créer Wallet**
   ```bash
   # Node.js script
   const ethers = require('ethers');
   const wallet = ethers.Wallet.createRandom();
   console.log('Private Key:', wallet.privateKey);
   console.log('Address:', wallet.address);
   ```

2. **Configuration Alchemy** (Free RPC)
   - Signup: https://www.alchemy.com
   - Créer app Ethereum Mainnet
   - Copier URL dans ETHEREUM_RPC_URL

3. **Funding Wallet** (pour frais)
   - Envoyer ETH petit montant
   - Pour tests: utiliser Sepolia Testnet

## 🧪 Testing

### Backend Tests
```bash
# À implémenter
npm test
```

### API Testing - Postman Collection

```json
{
  "info": {
    "name": "EarnHub API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Auth",
      "item": [
        {
          "name": "Google OAuth",
          "request": {
            "url": "{{base_url}}/auth/google",
            "method": "GET"
          }
        }
      ]
    },
    {
      "name": "Tasks",
      "item": [
        {
          "name": "Get Tasks",
          "request": {
            "url": "{{base_url}}/tasks",
            "method": "GET",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{token}}"
              }
            ]
          }
        },
        {
          "name": "Submit Task",
          "request": {
            "url": "{{base_url}}/tasks/{{taskId}}/submit",
            "method": "POST",
            "body": {
              "raw": "{\"screenshotUrl\": null}"
            }
          }
        }
      ]
    }
  ]
}
```

## 🐛 Troubleshooting

### "Cannot find module" Error
```bash
# Supprimer node_modules et package-lock.json
rm -rf node_modules package-lock.json

# Réinstaller
npm install
```

### Database Connection Error
```bash
# Vérifier PostgreSQL tourne
sudo systemctl status postgresql

# Vérifier credentials
psql -U postgres -d earn_platform
```

### CORS Error
```javascript
// Backend - Vérifier CORS config
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
```

### Payment Integration Issues
- Vérifier API Keys sont correctes
- Tester endpoints en Sandbox d'abord
- Voir logs pour détails d'erreur

## 📊 Monitoring & Logging

### Backend Logging
```typescript
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});
```

### Frontend Error Tracking
- Intégrer Sentry: `npm install @sentry/nextjs`
- Configurer NEXT.config.js
- Dashboard monitoring à https://sentry.io

## 📈 Scaling Checklist

- [ ] CDN configuré (CloudFlare, CloudFront)
- [ ] Database replicated & backed up
- [ ] Load balancing mis en place
- [ ] Caching (Redis) pour session/data
- [ ] SMS notifications intégrées
- [ ] Email service (SendGrid, Mailgun)
- [ ] Analytics dashboards (Mixpanel, Segment)
- [ ] Rate limiting & DDoS protection

## 🎯 Next Steps

1. Configurer Google OAuth en production
2. Obtenir certifications Mobile Money
3. Déployer smart contracts Ethereum
4. Tester avec small user group
5. Lancer marketing campaign

---

**Support**: Pour help contactez l'équipe dev

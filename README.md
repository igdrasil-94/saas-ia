# SaaS Marketing IA - Guide de Démarrage Rapide

## 📋 Vue d'ensemble du projet

Ce projet est une plateforme SaaS d'automatisation marketing basée sur l'IA pour les PME. Il comprend :

- **Frontend Next.js** (`apps/web/`) - Interface utilisateur moderne
- **Backend NestJS** (à créer) - API REST sécurisée
- **Base de données** - PostgreSQL avec Prisma ORM
- **Services IA** - Intégration OpenAI pour la génération de contenu

## 🚀 Démarrage rapide

### 1. Prérequis

- Node.js 18+ 
- Docker & Docker Compose
- npm ou pnpm

### 2. Installation

```bash
# Installer les dépendances racines
npm install

# Lancer l'infrastructure (PostgreSQL + Redis)
docker-compose up -d

# Frontend
cd apps/web
npm install
cp .env.example .env.local
npm run dev
```

### 3. Accéder à l'application

- **Frontend** : http://localhost:3000
- **Backend** : http://localhost:3001 (à démarrer)
- **PostgreSQL** : localhost:5432
- **Redis** : localhost:6379

## 📁 Architecture du projet

```
/workspace/
├── apps/
│   ├── web/                    # Frontend Next.js
│   │   ├── app/               # Pages et layout
│   │   ├── components/        # Composants UI
│   │   └── package.json
│   └── api/                   # Backend NestJS (à créer)
├── packages/
│   └── database/              # Schéma Prisma (à créer)
├── docker-compose.yml         # Infrastructure Docker
├── package.json               # Configuration monorepo
└── turbo.json                 # Turborepo config
```

## 🔧 Fonctionnalités actuelles

### Frontend (apps/web/)
✅ Page d'accueil avec générateur de contenu
✅ Interface TailwindCSS moderne et responsive
✅ Formulaire de génération (sujet, format, ton)
✅ Affichage des résultats en temps réel
✅ Design professionnel avec animations

### À implémenter
⏳ Authentication (NextAuth.js)
⏳ Dashboard utilisateur
⏳ Historique des générations
⏳ Planificateur éditorial
⏳ Gestion des abonnements (Stripe)
⏳ Backend API complet
⏳ Intégration OpenAI

## 🔐 Variables d'environnement

### Frontend (.env.local)
```bash
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Backend (.env.local - à créer)
```bash
DATABASE_URL="postgresql://user:password@localhost:5432/saas_marketing_ia"
REDIS_URL="redis://localhost:6379"
JWT_SECRET="votre-secret-key"
OPENAI_API_KEY="sk-..."
```

## 📊 Prochaines étapes recommandées

1. **Backend NestJS** - Créer l'API REST complète
2. **Database** - Configurer Prisma et les migrations
3. **Authentication** - Implémenter JWT auth
4. **IA Integration** - Connecter OpenAI API
5. **Dashboard** - Pages de gestion et statistiques
6. **Billing** - Intégration Stripe pour les abonnements

## 🛠️ Commandes utiles

```bash
# Développer le frontend
npm run dev --workspace=apps/web

# Build de production
npm run build --workspace=apps/web

# Lancer tous les services
docker-compose up

# Nettoyer
docker-compose down -v
```

## 📞 Support

Pour toute question ou problème, consultez la documentation dans le dossier racine.

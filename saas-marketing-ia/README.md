# 🚀 SaaS Marketing IA - Setup Guide

## Architecture du Projet

```
saas-marketing-ia/
├── apps/
│   ├── api/                 # NestJS Backend (port 3333)
│   ├── web/                 # Next.js Frontend (port 3000)
│   └── workers/             # Background jobs (BullMQ)
├── packages/
│   ├── database/            # Prisma ORM & Schema
│   ├── shared/              # Types et utilitaires partagés
│   ├── ai/                  # Logique IA (OpenAI, prompts)
│   └── ui/                  # Composants UI React
├── docker-compose.yml       # PostgreSQL + Redis
└── turbo.json               # Turborepo config
```

## 📋 Prérequis

- Node.js >= 18.x
- npm >= 10.x
- Docker & Docker Compose
- Git

## ⚡ Démarrage Rapide

### 1. Installer les dépendances

```bash
cd saas-marketing-ia
npm install
```

### 2. Configuration des variables d'environnement

```bash
# Copier le fichier d'exemple
cp .env.example .env

# Éditer avec vos clés API
nano .env
```

**Variables critiques à configurer :**
- `DATABASE_URL` : URL de connexion PostgreSQL
- `JWT_SECRET` : Clé secrète pour JWT (min 32 caractères)
- `OPENAI_API_KEY` : Votre clé OpenAI
- `STRIPE_SECRET_KEY` : Clé Stripe pour les paiements

### 3. Lancer les services (Docker)

```bash
# PostgreSQL + Redis
docker-compose up -d
```

### 4. Initialiser la base de données

```bash
# Générer le client Prisma
npm run db:generate

# Appliquer les migrations
npm run db:migrate

# (Optionnel) Seeder la base avec des données de test
npm run db:seed
```

### 5. Lancer l'application en développement

```bash
# Tout lancer (API + Web + Workers)
npm run dev
```

L'API sera disponible sur : http://localhost:3333
Le frontend sur : http://localhost:3000

## 🗄️ Base de Données

### Commandes utiles

```bash
# Ouvrir Prisma Studio (GUI)
npm run db:studio

# Créer une nouvelle migration
cd packages/database
npx prisma migrate dev --name nom_de_la_migration

# Reset complet de la DB
npx prisma migrate reset
```

### Schéma de la base

Le projet inclut les modèles suivants :
- **User** : Utilisateurs avec authentification OAuth
- **Project** : Projets collaboratifs
- **Campaign** : Campagnes marketing
- **Content** : Contenu généré par IA
- **Subscription** : Abonnements Stripe
- **AuditLog** : Logs de sécurité

## 🔐 Sécurité (OWASP API Top 10)

Le projet implémente nativement :
- ✅ Authentification JWT avec refresh tokens
- ✅ Authorization RBAC (roles: USER, ADMIN, OWNER)
- ✅ Rate limiting sur tous les endpoints
- ✅ Input validation avec class-validator
- ✅ CORS restrictif
- ✅ Security headers (helmet)
- ✅ Audit logging
- ✅ BOLA protection (vérification ownership)

## 📦 Structure des Modules API

### Auth Module
- Inscription/Connexion
- OAuth (Google, GitHub)
- Refresh tokens
- Password reset

### Users Module
- Gestion profil
- Rôles et permissions
- Préférences utilisateur

### Content Module
- Génération IA (OpenAI)
- Templates de prompts
- Versions et historique
- Workflow d'approbation

### Campaign Module
- CRUD campagnes
- Planning éditorial
- Métriques et analytics

### Projects Module
- Collaboration équipe
- Permissions granulaires
- Partage de ressources

## 🎨 Frontend (Next.js)

### Pages principales

- `/` : Landing page
- `/dashboard` : Vue d'ensemble
- `/campaigns` : Liste des campagnes
- `/content` : Générateur IA
- `/calendar` : Calendrier éditorial
- `/settings` : Paramètres
- `/billing` : Facturation

### Composants UI

Le package `@saas/ui` fournit :
- Layout responsive
- DataTables
- Forms validés
- Charts (Recharts)
- Notifications toast

## 🤖 Intelligence Artificielle

### Fonctionnalités IA

- **Génération de contenu** : Posts LinkedIn, Tweets, Articles
- **Optimisation SEO** : Suggestions de mots-clés
- **Analyse de ton** : Adaptation au style de marque
- **Traduction** : Multi-langue (FR, EN, ES, DE)
- **Reformulation** : Variantes de contenu

### Templates de prompts

Le système inclut des templates prédéfinis :
- Post LinkedIn engageant
- Thread Twitter viral
- Article de blog SEO
- Email de newsletter
- Copy publicitaire

## 💳 Monétisation

### Plans disponibles

| Plan | Prix | Crédits IA | Utilisateurs |
|------|------|------------|--------------|
| FREE | 0€ | 10/mois | 1 |
| STARTER | 29€ | 50/mois | 1 |
| PRO | 79€ | 200/mois | 5 |
| AGENCY | 199€ | Illimité | Illimité |

### Intégration Stripe

- Checkout sessions
- Customer portal
- Webhooks (upgrade/downgrade/cancel)
- Factures automatiques

## 🧪 Tests

```bash
# Tests unitaires
npm run test

# Tests E2E
npm run test:e2e

# Couverture de code
npm run test:cov
```

## 🚀 Déploiement

### Production

```bash
# Build complet
npm run build

# Lancer en production
npm run start
```

### Docker (optionnel)

```bash
docker build -t saas-marketing-api ./apps/api
docker build -t saas-marketing-web ./apps/web
```

### Variables de production

- `NODE_ENV=production`
- `DATABASE_URL` : URL de prod avec SSL
- `JWT_SECRET` : Clé forte générée aléatoirement
- Activer HTTPS obligatoire

## 🛠️ Dépannage

### Problèmes courants

**Port déjà utilisé :**
```bash
lsof -ti:3333 | xargs kill -9
lsof -ti:3000 | xargs kill -9
```

**Erreur Prisma :**
```bash
npm run db:generate
npm run db:push
```

**Docker ne démarre pas :**
```bash
docker-compose down -v
docker-compose up -d
```

## 📚 Ressources

- [Documentation NestJS](https://docs.nestjs.com)
- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [OpenAI API](https://platform.openai.com/docs)
- [Stripe Docs](https://stripe.com/docs)

## 👥 Contribution

1. Fork le projet
2. Créez une branche feature (`git checkout -b feature/amazing`)
3. Committez (`git commit -m 'feat: add amazing feature'`)
4. Push (`git push origin feature/amazing`)
5. Ouvrez une Pull Request

## 📄 License

MIT License - voir LICENSE

---

**Développé avec ❤️ par votre équipe**

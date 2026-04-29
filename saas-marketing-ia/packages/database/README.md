# Database & Prisma Setup

## Installation

```bash
cd packages/database
npm install
```

## Configuration

1. Copiez `.env.example` vers `.env` dans le dossier `packages/database`
2. Mettez à jour `DATABASE_URL` avec vos identifiants PostgreSQL

```env
DATABASE_URL="postgresql://user:password@localhost:5432/saas_marketing_ia?schema=public"
```

## Commandes disponibles

```bash
# Générer le client Prisma
npm run db:generate

# Pousser le schema à la DB (dev only)
npm run db:push

# Créer et appliquer une migration
npm run db:migrate

# Ouvrir Prisma Studio (GUI)
npm run db:studio

# Seeder la base de données
npm run db:seed
```

## Schema Overview

Le schema inclut les modèles suivants :

- **User** : Utilisateurs avec rôles (USER, ADMIN, OWNER)
- **Account/Session** : Authentification OAuth et sessions
- **Project** : Projets avec membres et permissions
- **Campaign** : Campagnes marketing avec statuts et budgets
- **Content** : Contenu généré par IA avec versions et approbations
- **PromptTemplate** : Templates de prompts réutilisables
- **Subscription** : Abonnements Stripe (FREE, STARTER, PRO, AGENCY)
- **Notification** : Notifications utilisateur
- **AuditLog** : Logs d'audit pour la sécurité
- **Integration** : Intégrations réseaux sociaux (Buffer, LinkedIn, etc.)

## Development

Pour le développement local avec Docker :

```bash
# Depuis la racine du projet
docker-compose up -d postgres
```

Puis lancez les migrations :

```bash
npm run db:migrate
```

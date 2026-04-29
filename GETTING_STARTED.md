# SaaS Marketing IA - Guide de Démarrage

## 🚀 Architecture du Projet

```
/workspace
├── apps/
│   └── web/              # Frontend Next.js
├── backend/              # Backend NestJS
├── docker-compose.yml    # PostgreSQL + Redis
└── README.md
```

## 📋 Prérequis

- Node.js 18+ 
- Docker & Docker Compose
- npm ou yarn

## 🔧 Installation & Démarrage

### Étape 1 : Lancer l'infrastructure (Docker)

```bash
cd /workspace
docker-compose up -d
```

Cela démarre :
- **PostgreSQL** sur le port 5432
- **Redis** sur le port 6379

### Étape 2 : Configurer le Backend

```bash
cd /workspace/backend

# Copier le fichier d'environnement
cp .env.example .env

# Installer les dépendances
npm install

# Générer Prisma Client
npx prisma generate

# Appliquer les migrations
npx prisma migrate dev --name init
```

### Étape 3 : Lancer le Backend

```bash
# Toujours dans /workspace/backend
npm run start:dev
```

Le backend est maintenant accessible sur :
- **API** : http://localhost:3001
- **Swagger Docs** : http://localhost:3001/api/docs

### Étape 4 : Configurer le Frontend

```bash
cd /workspace/apps/web

# Copier le fichier d'environnement
cp .env.example .env.local

# Installer les dépendances
npm install

# Lancer le frontend
npm run dev
```

Le frontend est maintenant accessible sur :
- **App** : http://localhost:3000

## 🎯 Tester l'API

### 1. Créer un compte (Register)

```bash
curl -X POST http://localhost:3001/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Password123!",
    "name": "Test User"
  }'
```

### 2. Se connecter (Login)

```bash
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Password123!"
  }'
```

Copiez le `access_token` retourné.

### 3. Accéder au profil (protégé)

```bash
curl -X GET http://localhost:3001/users/me \
  -H "Authorization: Bearer VOTRE_TOKEN_ICI"
```

### 4. Générer du contenu (protégé)

```bash
curl -X POST http://localhost:3001/content/generate \
  -H "Authorization: Bearer VOTRE_TOKEN_ICI" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Mon premier post",
    "type": "LINKEDIN_POST",
    "prompt": "Parle de l'IA dans le marketing"
  }'
```

## 📚 Endpoints API

| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| POST | `/auth/register` | Inscription | ❌ |
| POST | `/auth/login` | Connexion | ❌ |
| GET | `/users/me` | Profil utilisateur | ✅ |
| PUT | `/users/me` | MAJ profil | ✅ |
| POST | `/content/generate` | Générer contenu IA | ✅ |
| GET | `/content` | Liste contenus | ✅ |
| GET | `/content/:id` | Détail contenu | ✅ |
| PUT | `/content/:id/status` | Changer statut | ✅ |
| DELETE | `/content/:id` | Supprimer contenu | ✅ |

## 🔐 Sécurité Implémentée

✅ **Helmet** - Security headers HTTP  
✅ **Rate Limiting** - 100 requêtes / 15min  
✅ **CORS** - Origines restreintes  
✅ **JWT** - Authentication par token  
✅ **bcrypt** - Hash des mots de passe  
✅ **Class Validator** - Validation des inputs  
✅ **Prisma** - Protection contre SQL injection  

## 🛠️ Commandes Utiles

### Backend

```bash
# Développement
npm run start:dev

# Build production
npm run build

# Lancer en production
npm run start:prod

# Tests
npm run test

# Prisma Studio (GUI pour DB)
npx prisma studio

# Nouvelles migrations
npx prisma migrate dev --name nom_migration
```

### Docker

```bash
# Démarrer les services
docker-compose up -d

# Arrêter les services
docker-compose down

# Voir les logs
docker-compose logs -f

# Reset complet
docker-compose down -v
docker-compose up -d
```

## 📝 Prochaines Étapes

1. **Intégrer OpenAI** pour la génération de contenu réel
2. **Ajouter Stripe** pour la gestion des abonnements
3. **Implémenter Redis** pour le cache et les files d'attente
4. **Créer les tests** unitaires et e2e
5. **Configurer CI/CD** avec GitHub Actions
6. **Ajouter le planning éditorial** avec calendrier
7. **Implémenter les workflows** d'approbation

## 🆘 Dépannage

### Port déjà utilisé

```bash
# Tuer le processus sur le port 3001
lsof -ti:3001 | xargs kill -9

# Ou changer le port dans .env
PORT=3002
```

### Erreur de connexion DB

```bash
# Vérifier que PostgreSQL tourne
docker-compose ps

# Redémarrer
docker-compose restart postgres
```

### Problème de migrations Prisma

```bash
# Reset DB (attention: efface tout!)
npx prisma migrate reset

# Ou supprimer et recréer
docker-compose down -v
docker-compose up -d
npx prisma migrate dev
```

## 📞 Support

Pour toute question ou problème, consultez la documentation Swagger ou ouvrez une issue.

# NestJS Backend - SaaS Marketing IA

## Installation

```bash
cd /workspace/backend
npm install
```

## Configuration

Créez un fichier `.env` à la racine du backend :

```env
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/saas_marketing_ia?schema=public"

# JWT
JWT_SECRET="votre-secret-jwt-tres-securise-changez-moi"

# Frontend URL
FRONTEND_URL="http://localhost:3000"

# Port
PORT=3001

# OpenAI (à configurer plus tard)
OPENAI_API_KEY=""
```

## Base de données

```bash
# Générer le client Prisma
npx prisma generate

# Appliquer les migrations
npx prisma migrate dev --name init

# Ouvrir Prisma Studio (optionnel)
npx prisma studio
```

## Lancement

```bash
# Mode développement
npm run start:dev

# Mode production
npm run build
npm run start:prod
```

## API Documentation

Une fois le serveur lancé, accédez à :
- **Swagger UI** : http://localhost:3001/api/docs
- **API Base URL** : http://localhost:3001

## Endpoints disponibles

### Authentication
- `POST /auth/register` - Inscription
- `POST /auth/login` - Connexion

### Users (protégé)
- `GET /users/me` - Profil utilisateur
- `PUT /users/me` - Mise à jour profil

### Content (protégé)
- `POST /content/generate` - Générer contenu IA
- `GET /content` - Liste des contenus
- `GET /content/:id` - Détail contenu
- `PUT /content/:id/status` - Changer statut
- `DELETE /content/:id` - Supprimer contenu

## Sécurité implémentée

✅ Helmet (security headers)
✅ Rate limiting (100 req/15min)
✅ CORS configuré
✅ JWT authentication
✅ Password hashing (bcrypt)
✅ Input validation (class-validator)
✅ Swagger documentation

## Prochaines étapes

1. Configurer Docker pour PostgreSQL
2. Intégrer OpenAI pour la génération de contenu
3. Ajouter les tests unitaires et e2e
4. Implémenter le système de crédits/quotas
5. Ajouter Redis pour le cache

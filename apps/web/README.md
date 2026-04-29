# Frontend Next.js - SaaS Marketing IA

## Structure

```
apps/web/
├── app/
│   ├── layout.tsx          # Layout root avec metadata
│   ├── page.tsx            # Page d'accueil avec générateur de contenu
│   └── globals.css         # Styles globaux Tailwind
├── components/             # Composants réutilisables
├── package.json
├── next.config.js
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
└── .env.example
```

## Installation

```bash
cd apps/web
npm install
```

## Développement

```bash
npm run dev
```

L'application sera accessible sur http://localhost:3000

## Fonctionnalités incluses

- ✅ Interface moderne avec TailwindCSS
- ✅ Générateur de contenu IA (connecté à l'API backend)
- ✅ Sélecteurs de format (LinkedIn, Twitter, Blog, Email)
- ✅ Sélecteurs de ton (Professionnel, Amical, Persuasif, Informatif)
- ✅ Affichage des résultats en temps réel
- ✅ Design responsive et accessible
- ✅ Animations et transitions fluides

## Prochaines étapes recommandées

1. **Authentication** : Ajouter NextAuth.js pour la connexion
2. **Dashboard** : Créer une page dashboard avec statistiques
3. **Historique** : Afficher l'historique des générations
4. **Planificateur** : Intégrer un calendrier éditorial
5. **Paramètres** : Page de configuration du compte

## Variables d'environnement

Copiez `.env.example` vers `.env.local` :

```bash
cp .env.example .env.local
```

Ajustez `NEXT_PUBLIC_API_URL` selon votre environnement.

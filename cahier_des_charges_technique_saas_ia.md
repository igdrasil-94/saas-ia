
# **Cahier des Charges Technique : Plateforme SaaS d'Automatisation Marketing Propulsée par l'IA**

## **Table des Matières**
1. [Résumé du Projet](#résumé-du-projet)
2. [Architecture Globale](#architecture-globale)
   - [Frontend](#frontend)
   - [Backend](#backend)
   - [Base de Données](#base-de-données)
   - [IA et Traitement Asynchrone](#ia-et-traitement-asynchrone)
   - [Stockage et Analytics](#stockage-et-analytics)
3. [Schémas de la Base de Données](#schémas-de-la-base-de-données)
4. [API Endpoints](#api-endpoints)
5. [Exemples de Prompts IA](#exemples-de-prompts-ia)
6. [Workflow Technique](#workflow-technique)
7. [Sécurité](#sécurité)
8. [Optimisation des Coûts IA](#optimisation-des-coûts-ia)
9. [Exemples de Code](#exemples-de-code)
   - [Service de Génération de Contenu](#service-de-génération-de-contenu)
   - [Modèle Prisma](#modèle-prisma)
10. [Déploiement](#déploiement)
11. [Prochaines Étapes](#prochaines-étapes)

---

## **Résumé du Projet**
Cette plateforme SaaS permet aux entreprises de transformer leurs informations métier en contenus marketing automatisés et adaptés à plusieurs canaux. Elle utilise l'IA pour générer des calendriers éditoriaux, des posts, des emails, et bien plus, tout en offrant un workflow de validation et des analytics.

---

## **Architecture Globale**

### **Frontend**
- **Framework** : Next.js (App Router)
- **Langage** : TypeScript
- **UI** : Tailwind CSS + shadcn/ui
- **État Global** : Zustand ou Redux Toolkit
- **Formulaires** : React Hook Form + Zod
- **Authentification** : NextAuth.js (JWT/OAuth)
- **Internationalisation** : next-i18next

### **Backend**
- **Framework** : NestJS
- **Langage** : TypeScript
- **Base de Données** : PostgreSQL (JSONB, pgvector)
- **ORM** : Prisma
- **API** : RESTful + GraphQL (Apollo Server)
- **Files d’Attente** : Redis + BullMQ
- **Stockage** : Cloudflare R2 / Amazon S3

### **Base de Données**
- **PostgreSQL** avec extensions JSONB et pgvector pour la recherche contextuelle.
- **Modèles Principaux** : User, Business, Memory, Content, Subscription.

### **IA et Traitement Asynchrone**
- **Modèles IA** : OpenAI, Claude, Gemini (via API).
- **Speech-to-Text** : Whisper ou Deepgram.
- **Files d’Attente** : BullMQ pour les tâches asynchrones (ex : génération de contenu en batch).

### **Stockage et Analytics**
- **Stockage de Fichiers** : Cloudflare R2 ou Amazon S3.
- **Analytics** : PostHog pour le suivi des événements utilisateurs.

---

## **Schémas de la Base de Données**
```prisma
model User {
  id            String    @id @default(uuid())
  email         String    @unique
  password      String
  name          String
  role          Role      @default(USER)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  business      Business?
  subscriptions Subscription[]
}

model Business {
  id            String    @id @default(uuid())
  name          String
  sector        String
  targetAudience String
  goals         String[]
  tone          String
  userId        String
  user          User      @relation(fields: [userId], references: [id])
  memories      Memory[]
  contents      Content[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model Memory {
  id            String    @id @default(uuid())
  data          Json
  version       Int
  businessId    String
  business      Business  @relation(fields: [businessId], references: [id])
  createdAt     DateTime  @default(now())
}

model Content {
  id            String    @id @default(uuid())
  type          ContentType
  title         String
  body          String
  status        Status    @default(DRAFT)
  channel       Channel
  businessId    String
  business      Business  @relation(fields: [businessId], references: [id])
  createdAt     DateTime  @default(now())
  publishedAt   DateTime?
  metrics       Json?
}

enum Role {
  USER
  ADMIN
  AGENCY
}

enum ContentType {
  POST
  EMAIL
  BLOG
  VIDEO_SCRIPT
}

enum Status {
  DRAFT
  APPROVED
  REJECTED
}

enum Channel {
  LINKEDIN
  INSTAGRAM
  FACEBOOK
  WHATSAPP
}
```

---

## **API Endpoints**

| **Module**               | **Endpoint**                          | **Méthode** | **Description**                                  |
|--------------------------|---------------------------------------|-------------|------------------------------------------------|
| Authentification         | `/api/auth/signup`                    | POST        | Inscription utilisateur                        |
| Authentification         | `/api/auth/login`                     | POST        | Connexion utilisateur                          |
| Business                 | `/api/business`                       | POST        | Créer un profil entreprise                      |
| Business                 | `/api/business/memory`                | POST        | Ajouter une mémoire métier                     |
| Content                  | `/api/content/generate`               | POST        | Générer un contenu (batch)                      |
| Content                  | `/api/content`                        | GET         | Lister les contenus                            |
| Content                  | `/api/content/:id/approve`            | PATCH       | Approuver un contenu                            |
| Analytics                | `/api/analytics`                      | GET         | Récupérer les métriques                        |
| Subscription             | `/api/subscription`                   | POST        | Souscrire à un plan                            |

---

## **Exemples de Prompts IA**

### **Post LinkedIn**
```plaintext
Contexte : {business.sector}, cible : {business.targetAudience}, ton : {business.tone}
Objectif : Post LinkedIn pour {goal} (ex: visibilité)
Structure :
1. Accroche percutante (1 phrase)
2. Développement (3 points clés)
3. Call-to-action (lien ou question)
Exemple de ton : Professionnel mais accessible
Longueur : 200-300 mots
```

### **Email Marketing**
```plaintext
Contexte : {business.sector}, offre : {business.goals[0]}
Objectif : Email pour promouvoir {goal}
Structure :
1. Objet accrocheur
2. Introduction personnalisée
3. Corps (avantages + CTA)
4. Pied de page avec liens
Ton : {business.tone}
Longueur : 150-200 mots
```

---

## **Workflow Technique**

1. **Collecte des Données** :
   - L’utilisateur remplit le questionnaire ou upload des fichiers.
   - Les données sont stockées dans `Business` et `Memory`.

2. **Génération du Calendrier** :
   - L’IA utilise les données de `Business` pour générer un calendrier.

3. **Génération de Contenu** :
   - Pour chaque entrée du calendrier, l’IA génère un contenu.
   - Les contenus sont stockés dans `Content` avec le statut `DRAFT`.

4. **Validation** :
   - L’utilisateur approuve ou rejette via l’interface.

5. **Publication** :
   - Contenus approuvés disponibles pour copie ou programmation.

6. **Analytics** :
   - Suivi des métriques (nombre de contenus, taux d’approbation).

---

## **Sécurité**
- **Authentification** : JWT avec rafraîchissement de token.
- **RBAC** : Rôles `USER`, `ADMIN`, `AGENCY`.
- **Chiffrement** : Données sensibles chiffrées (AES-256).
- **Logs** : Audit trail pour les actions critiques.

---

## **Optimisation des Coûts IA**
- **Quotas** : Limiter le nombre de tokens par utilisateur/mois.
- **Cache** : Stocker les résultats fréquents en Redis.
- **Batch Processing** : Générer plusieurs contenus en une seule requête.
- **Fallback** : Utiliser des modèles moins chers si le quota est dépassé.

---

## **Exemples de Code**

### **Service de Génération de Contenu (NestJS)**
```typescript
// content.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OpenAIService } from '../openai/openai.service';

@Injectable()
export class ContentService {
  constructor(
    private prisma: PrismaService,
    private openai: OpenAIService,
  ) {}

  async generateMonthlyContent(businessId: string) {
    const business = await this.prisma.business.findUnique({
      where: { id: businessId },
      include: { memories: true },
    });

    const calendar = this.generateCalendar(business.goals);

    const contents = await Promise.all(
      calendar.map(async (entry) => {
        const prompt = this.buildPrompt(business, entry);
        const aiResponse = await this.openai.generateContent(prompt);
        return this.prisma.content.create({
          data: {
            type: entry.type,
            title: aiResponse.title,
            body: aiResponse.body,
            channel: entry.channel,
            businessId,
          },
        });
      }),
    );

    return contents;
  }

  private generateCalendar(goals: string[]) {
    return [
      { type: 'POST', channel: 'LINKEDIN', goal: goals[0] },
      { type: 'EMAIL', channel: 'EMAIL', goal: goals[1] },
    ];
  }

  private buildPrompt(business: any, entry: any) {
    return `
      Contexte : ${business.sector}, cible : ${business.targetAudience}, ton : ${business.tone}
      Objectif : ${entry.type} pour ${entry.goal}
      Structure : [Accroche, Développement, Call-to-action]
      Longueur : 200-300 mots
    `;
  }
}
```

---

## **Déploiement**
- **Conteneurs** : Docker
- **Orchestration** : Docker Compose ou Kubernetes
- **CI/CD** : GitHub Actions
- **Hébergement** : VPS (Hetzner/DigitalOcean) ou Cloud (AWS/GCP)

---

## **Prochaines Étapes**
1. **Générer le code** pour chaque module (frontend, backend, base de données).
2. **Configurer l’infrastructure** (Docker, CI/CD).
3. **Tester et itérer** sur les fonctionnalités.
4. **Déployer** en environnement de production.

---

Ce document fournit une base complète pour développer la plateforme SaaS avec une IA comme Claude. Pour toute question ou besoin de précisions, n'hésitez pas à demander !

# Isaac Koffi – Portfolio

Portfolio personnel développé avec **Next.js 16**, **React 19**, **TypeScript** et **Tailwind CSS 4**.

---

## 🤖 Chatbot IA intelligent — Guide de mise en place

### Vue d'ensemble

Le portfolio intègre un chatbot IA qui **analyse dynamiquement les données du site** et répond aux recruteurs/visiteurs comme s'il était Isaac lui-même, de manière professionnelle et naturelle.

**Stack technique du chatbot :**

- **Vercel AI SDK** (`ai` + `@ai-sdk/openai` + `@ai-sdk/react`) — streaming, hooks React
- **OpenAI GPT-4o-mini** — modèle de langage rapide et économique
- **Next.js App Router** — API route avec streaming natif
- **Framer Motion** — animations du panneau de chat et de l'icône flottante

---

### Architecture

```
lib/
  chatbot-context.ts      ← Couche de données : extrait TOUT le contenu du portfolio
                            depuis translations.ts et construit le prompt système

app/api/chat/
  route.ts                ← API Route : endpoint POST avec streaming via Vercel AI SDK
                            Reçoit les messages + la langue, retourne un flux de texte

components/
  ChatPanel.tsx           ← Interface de chat : messages, suggestions, indicateur de frappe
  ChatBotIcon.tsx         ← Icône flottante animée + gestion ouverture/fermeture

app/
  layout.tsx              ← Intégration globale : <ChatBotIcon /> rendu sur toutes les pages
```

---

### Fonctionnement détaillé

#### 1. Couche de données (`lib/chatbot-context.ts`)

La fonction `buildPortfolioContext(lang)` compile **toutes les données** de `translations.ts` en un document structuré :

- Identité (nom, rôle, localisation)
- À propos / Présentation
- Compétences techniques (frontend, backend, base de données)
- Expériences professionnelles (freelance, stage, détails des missions)
- Formation / Éducation
- Projets réalisés (descriptions complètes)
- Pourquoi travailler avec moi (FAQ)
- Contact (email, GitHub, LinkedIn)

La fonction `getSystemPrompt(lang)` encapsule ce contexte dans un prompt système qui définit :

- Le **rôle** : répondre comme Isaac, de manière professionnelle
- Les **règles** : répondre uniquement à partir des données du portfolio
- Le **ton** : confiant, accessible, pas de formalisme excessif
- La **langue** : FR ou EN selon le contexte de l'utilisateur

#### 2. API Route (`app/api/chat/route.ts`)

```typescript
POST /api/chat
Body: { messages: Message[], lang: "fr" | "en" }
Response: ReadableStream (Server-Sent Events)
```

- Validation des messages entrants
- Limitation à **20 derniers messages** pour éviter le dépassement de tokens
- Streaming via `streamText()` du Vercel AI SDK
- Timeout configuré à 30 secondes (`maxDuration = 30`)

#### 3. Interface Chat (`components/ChatPanel.tsx`)

- **`useChat`** hook (Vercel AI SDK) — gère l'état des messages, l'envoi, le streaming
- **Message d'accueil** automatique en FR ou EN
- **Bulles de message** : utilisateur à droite (sombre), assistant à gauche (clair)
- **Suggestions cliquables** affichées au début de la conversation
- **Indicateur de frappe** animé avec 3 points rebondissants
- **Auto-scroll** vers le dernier message
- **Responsive** : pleine largeur sur mobile, 448px max sur desktop
- **Glass morphism** : fond flou, bordures subtiles, ombres profondes

#### 4. Icône flottante (`components/ChatBotIcon.tsx`)

- Bouton rond fixé en bas à droite de l'écran
- **Dégradé bleu → cyan → violet** avec ombre colorée
- **Animation pulse** (ring qui s'étend) pour attirer l'attention
- **Transitions spring** (Framer Motion) à l'ouverture/fermeture
- Bascule entre icône message ↔ icône fermer

---

### Installation et configuration

#### 1. Installer les dépendances

```bash
npm install ai @ai-sdk/openai @ai-sdk/react
```

#### 2. Configurer la clé API OpenAI

Créer un fichier `.env.local` à la racine du projet :

```env
OPENAI_API_KEY=sk-your-openai-api-key-here
```

> 💡 Obtenez une clé sur [platform.openai.com/api-keys](https://platform.openai.com/api-keys)

#### 3. Lancer le serveur de développement

```bash
npm run dev
```

Le chatbot apparaîtra automatiquement en bas à droite de toutes les pages.

---

### Choix techniques

| Choix                        | Justification                                                                                                                           |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **GPT-4o-mini**              | Rapide, économique (~15x moins cher que GPT-4), suffisant pour du Q&A portfolio                                                         |
| **Vercel AI SDK**            | Streaming natif, hooks React optimisés, compatible Next.js App Router                                                                   |
| **Données dynamiques**       | Le contexte est extrait de `translations.ts` — toute mise à jour du portfolio est automatiquement reflétée dans les réponses du chatbot |
| **Prompt système structuré** | Le chatbot ne peut répondre que sur les données du portfolio — pas d'hallucination hors sujet                                           |
| **Streaming**                | Les réponses s'affichent mot par mot — UX fluide, pas d'attente                                                                         |
| **Bilingue**                 | Le chatbot détecte la langue active (FR/EN) et adapte tout : prompt, UI, suggestions                                                    |

---

### Pistes d'amélioration

- **Historique persistant** : sauvegarder les conversations dans localStorage
- **Analytics** : logger les questions fréquentes pour améliorer le portfolio
- **Rate limiting** : limiter le nombre de requêtes par IP
- **RAG avancé** : indexer des documents PDF (CV, lettres de motivation) avec des embeddings
- **Voice input** : ajouter la reconnaissance vocale via Web Speech API
- **Feedback** : boutons 👍/👎 sur chaque réponse pour améliorer le prompt

---

## Développement

```bash
npm run dev      # Serveur de développement (Turbopack)
npm run build    # Build de production
npm run start    # Serveur de production
npm run lint     # Linting ESLint
```

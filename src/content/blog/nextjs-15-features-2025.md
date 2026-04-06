---
title: "Next.js 15 en production : ce qui change vraiment"
excerpt: "App Router, Turbopack stable, caching inversé — ce que les développeurs seniors doivent savoir avant de migrer."
category: "Développement"
tags: ["Next.js", "React", "Performance", "SSR"]
publishedAt: "2025-03-15T09:00:00Z"
featured: true
coverGradient: "from-indigo-600/25 to-violet-600/15"
authorName: "Dorian Gosselin"
authorRole: "Founder @ FStudios"
---

Next.js 15 est sorti avec des changements structurants qui impactent directement la façon dont on architecure une application en production. Voici ce que j'ai retenu après plusieurs semaines d'usage intensif sur des projets réels.

## Turbopack enfin stable

Le bundler Rust-based est désormais stable en développement (`next dev --turbopack`). Les gains sont mesurables : démarrage 3x plus rapide, HMR quasi-instantané sur des projets de 200+ composants.

> En pratique sur RouteMaster Pro (12 modules, ~180 composants), le cold start est passé de 8s à 2.4s. Non-négligeable quand on passe 8h/jour à coder.

Ce qui n'a pas changé : Turbopack ne gère pas encore le build production. On reste sur Webpack pour `next build`. La migration complète est prévue pour Next.js 16.

## Caching : le grand reset

C'est le changement le plus important. Next.js 15 a **inversé les defaults du cache** :

- `fetch()` n'est plus mis en cache par défaut
- Les route handlers ne sont plus statiques par défaut
- Les layouts clients ne préservent plus le scroll par défaut

Ce changement casse beaucoup d'applications migrées naïvement depuis Next.js 14.

```javascript
// Next.js 14 — cachait automatiquement
const data = await fetch('/api/products')

// Next.js 15 — requête fresh à chaque fois
// Pour forcer le cache :
const data = await fetch('/api/products', { cache: 'force-cache' })

// Revalidation ISR
const data = await fetch('/api/products', { next: { revalidate: 3600 } })
```

## Server Actions : maturité atteinte

Les Server Actions sont désormais stables. Le pattern que j'utilise en production :

```typescript
"use server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const schema = z.object({ name: z.string().min(2), email: z.string().email() });

export async function createUser(formData: FormData) {
  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.flatten() };
  await db.users.create(parsed.data);
  revalidatePath("/dashboard/users");
}
```

## Ce que je recommande pour 2025

App Router obligatoire, Server Components par défaut, Client Components uniquement pour l'interactivité réelle, Server Actions pour les mutations. Le Pages Router n'est pas mort mais toute nouvelle feature Next.js cible l'App Router.

---

**Questions sur une migration Next.js 14 → 15 ?** Contactez-moi, je réponds sous 24h.

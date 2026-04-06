---
title: "SaaS MVP en 3 semaines avec React & Firebase"
excerpt: "Architecture, auth, billing Stripe, emails transactionnels — le stack complet pour lancer un produit rapidement sans sacrifier la qualité."
category: "SaaS & Produit"
tags: ["SaaS", "Firebase", "Stripe", "Architecture", "MVP"]
publishedAt: "2025-01-20T09:00:00Z"
featured: true
coverGradient: "from-violet-600/25 to-purple-600/15"
authorName: "Dorian Gosselin"
authorRole: "Founder @ FStudios"
---

Après avoir lancé Flowly et RouteMaster Pro, j'ai itéré sur un stack SaaS que je peux déployer en 3 semaines de bout en bout. Voici l'architecture exacte, les choix techniques et les pièges à éviter.

## Les 5 briques fondamentales

Un SaaS a besoin de : Auth, Data, Billing, Emails, Analytics. Choisir les bons outils pour chacune fait la différence entre un MVP qui scale et un prototype bloqué à 100 users.

## Auth — Firebase Authentication

Firebase Auth pour un SaaS, c'est le choix pragmatique. OAuth Google/GitHub en 15 minutes, 2FA natif, sessions zero-config.

```typescript
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export async function signInWithGoogle() {
  const result = await signInWithPopup(auth, provider);
  return result.user;
}
```

Pour les SaaS B2B qui ont besoin de SSO (SAML, OIDC), regardez Clerk ou Auth0.

## Billing — Stripe avec Webhooks

Le piège classique : gérer l'état du subscription côté client. **Ne faites jamais ça.** L'état doit vivre dans Firestore, mis à jour par les webhooks :

```typescript
export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature")!;
  const event = stripe.webhooks.constructEvent(
    await req.text(), sig, process.env.STRIPE_WEBHOOK_SECRET!
  );

  if (event.type === "customer.subscription.updated") {
    const sub = event.data.object;
    await updateDoc(doc(db, "users", sub.metadata.userId), {
      plan: sub.items.data[0].price.lookup_key,
      subscriptionStatus: sub.status,
    });
  }
  return new Response("ok");
}
```

## Emails — Resend + React Email

Resend pour l'envoi, React Email pour les templates :

```typescript
await resend.emails.send({
  from: "App <hello@monapp.fr>",
  to: user.email,
  subject: "Bienvenue 🎉",
  react: <WelcomeEmail userName={user.name} />,
});
```

## Le planning 3 semaines

**Semaine 1** : Auth + data model + UI shell
**Semaine 2** : Features core + Stripe billing
**Semaine 3** : Emails, analytics, polishing, deploy

Le secret : ne pas builder ce qui n'est pas dans la semaine en cours. La discipline sur le scope fait la différence entre 3 semaines et 3 mois.

## Les erreurs classiques

- **Over-engineering dès le départ** — pas besoin de microservices pour 100 users
- **Règles Firestore bâclées** — `allow read, write: if true` en prod est une faille
- **State Stripe côté client** — toujours les webhooks, toujours
- **Pas de loading/error states** — les users abandonnent un produit cassé silencieusement

---

Vous avez un projet SaaS à lancer ? [Devis en 2 minutes sur FStudios](/devis).

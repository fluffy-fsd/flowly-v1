---
title: "Tailwind CSS v4 : guide complet de migration"
excerpt: "Nouvelle engine Rust, fin de tailwind.config.js, configuration via CSS — tout ce qu'il faut savoir pour migrer sans casse."
category: "Design & CSS"
tags: ["Tailwind", "CSS", "Frontend", "Performance"]
publishedAt: "2025-02-28T09:00:00Z"
featured: true
coverGradient: "from-cyan-600/25 to-teal-600/15"
authorName: "Dorian Gosselin"
authorRole: "Founder @ FStudios"
---

Tailwind v4 est une réécriture complète. Pas une évolution — une refonte. Le moteur CSS est en Rust via Lightning CSS, et la philosophie de configuration a radicalement changé.

## La fin de tailwind.config.js

La configuration ne se fait plus dans un fichier JavaScript — elle se fait dans votre CSS via `@theme` :

```css
/* Avant — tailwind.config.js */
module.exports = {
  theme: {
    extend: {
      colors: { brand: '#6366f1' },
    }
  }
}

/* Après — globals.css */
@import "tailwindcss";

@theme {
  --color-brand: #6366f1;
  --font-display: 'Syne', sans-serif;
}
```

## Nouveautés CSS natives

**Container queries** sans plugin :

```html
<div class="@container">
  <p class="@sm:text-lg @lg:text-2xl">Responsive au conteneur</p>
</div>
```

**Logical properties** pour le RTL automatique :

```html
<div class="ms-4 pe-6">
  <!-- margin-inline-start, padding-inline-end -->
</div>
```

## Performances

Les chiffres sont réels : Tailwind v4 est **5x plus rapide** en build initial et **100x plus rapide** en rebuilds incrémentaux. Sur FStudios, le CSS build est passé de 340ms à 12ms. Les fichiers CSS finaux sont 30% plus petits.

## Checklist de migration

1. Remplacer `tailwindcss` par `@tailwindcss/postcss`
2. Mettre à jour `postcss.config.mjs`
3. Remplacer `@tailwind base/components/utilities` par `@import "tailwindcss"`
4. Migrer le config JS vers `@theme` dans le CSS
5. Tester les `@apply` — certains utilitaires ont changé de nom

> ⚠️ Les classes `border-border`, `bg-background` de shadcn/ui ne fonctionnent plus avec v4 sans adaptation. Utilisez les CSS variables directes.

La migration demande 1 à 3h selon la taille du projet. Le gain en performance le justifie largement.

import type { QuoteProduct, QuoteAddOn, Project, Service, Testimonial, FAQItem } from "@/types";

export const SITE_CONFIG = {
  name: "FStudios",
  tagline: "SaaS & Automatisation — Marchés premium.",
  description: "FStudios conçoit et déploie des SaaS sur mesure pour entreprises exigeantes. Automatisation complète, refonte digitale, systèmes métier. Genève, Zurich, Dubaï, Doha.",
  url: "https://fstudios.fr",
  email: "doriangosselin6@gmail.com",
  whatsapp: "https://wa.me/33XXXXXXXXX",
  linkedin: "https://linkedin.com/in/dorian-gosselin",
  siren: "952 303 832",
  ape: "6201Z",
  location: "France — Suisse — Émirats — Qatar",
  tva: "TVA non applicable — Art. 293B du CGI",
  tjm: 280,
} as const;

export const DELIVERY_SPEEDS = {
  standard: { label: "Standard", multiplier: 1, badge: null },
  express: { label: "Express", multiplier: 1.4, badge: "+40%" },
  urgent: { label: "Urgent", multiplier: 2.0, badge: "×2" },
} as const;

export const QUOTE_PRODUCTS: QuoteProduct[] = [
  {
    id: "saas",
    name: "SaaS Métier Complet",
    description: "Plateforme SaaS sur mesure pour votre secteur. Multi-tenant, billing, analytics, onboarding.",
    basePrice: 8500,
    estimatedDays: 35,
    icon: "zap",
    tag: "Premium",
    popular: true,
  },
  {
    id: "web-app",
    name: "Application Web Métier",
    description: "Outil interne ou client-facing. Auth, BDD temps réel, dashboard, API complète.",
    basePrice: 3800,
    estimatedDays: 20,
    icon: "monitor",
  },
  {
    id: "ecommerce",
    name: "Système de Commande Automatisé",
    description: "Click & collect, commande en ligne, gestion cuisine, fidélité. Prêt à déployer.",
    basePrice: 2800,
    estimatedDays: 14,
    icon: "shopping-bag",
  },
  {
    id: "mobile-app",
    name: "Application Mobile / PWA",
    description: "Cross-platform iOS & Android. UX native, offline-first, push notifications.",
    basePrice: 4500,
    estimatedDays: 28,
    icon: "smartphone",
  },
  {
    id: "ai-integration",
    name: "Automatisation IA",
    description: "Workflows intelligents, agents autonomes, traitement de données, chatbot métier.",
    basePrice: 2500,
    estimatedDays: 12,
    icon: "cpu",
  },
  {
    id: "dashboard",
    name: "Dashboard & Reporting",
    description: "Tableaux de bord temps réel, KPIs, exports, multi-utilisateurs.",
    basePrice: 2200,
    estimatedDays: 12,
    icon: "bar-chart-2",
  },
  {
    id: "landing-page",
    name: "Site Vitrine Premium",
    description: "Site institutionnel haut de gamme, SEO international, multilingue.",
    basePrice: 1200,
    estimatedDays: 7,
    icon: "layout",
  },
  {
    id: "design-only",
    name: "Design System / UI",
    description: "Identité digitale, maquettes Figma, système de design scalable.",
    basePrice: 1400,
    estimatedDays: 8,
    icon: "pen-tool",
  },
];

export const QUOTE_ADDONS: QuoteAddOn[] = [
  { id: "seo-advanced", name: "SEO International", description: "Multilingue, schema.org, Google Search Console, Core Web Vitals", price: 600, days: 3 },
  { id: "auth-system", name: "Authentification avancée", description: "SSO, 2FA, OAuth, gestion rôles enterprise", price: 550, days: 3 },
  { id: "payment-integration", name: "Paiements & Billing", description: "Stripe, subscriptions, factures auto, portail client", price: 700, days: 3 },
  { id: "admin-dashboard", name: "Panel Admin complet", description: "CRUD, analytics, gestion utilisateurs, exports", price: 800, days: 4 },
  { id: "cms", name: "CMS Headless", description: "Sanity.io — édition de contenu sans développeur", price: 500, days: 3 },
  { id: "api-integration", name: "Intégrations métier", description: "ERP, CRM, API partenaires, webhooks", price: 480, days: 3 },
  { id: "analytics", name: "Analytics & Heatmaps", description: "Posthog, funnels, session replay, dashboards", price: 350, days: 2 },
  { id: "multilingual", name: "Multilingue (i18n)", description: "FR / EN / AR — SEO hreflang, détection auto", price: 550, days: 3 },
  { id: "ai-chatbot", name: "Assistant IA intégré", description: "Chatbot RAG entraîné sur vos données métier", price: 950, days: 5 },
  { id: "performance-audit", name: "Audit & Optimisation", description: "Lighthouse 100, vitesse, accessibilité WCAG", price: 380, days: 2 },
  { id: "maintenance-1y", name: "Maintenance 12 mois", description: "Mises à jour, sécurité, 3h d'évolutions/mois", price: 1800, days: 0 },
];

export const PROJECTS: Project[] = [
  {
    id: "routemaster",
    title: "RouteMaster Pro",
    category: "SaaS B2B · Transport · Compliance EU",
    description:
      "Plateforme SaaS complète pour sociétés de transport autocar. Gestion conducteurs, flotte, conformité EU 561/2006, espace mobile dédié conducteurs, facturation automatisée.",
    stack: ["Next.js 15", "TypeScript", "Tailwind v4", "Firebase", "PWA"],
    status: "ongoing",
    accentColor: "#6366f1",
    metrics: [
      { label: "Modules métier", value: "12+" },
      { label: "Conformité EU", value: "100%" },
    ],
  },
  {
    id: "fastorder",
    title: "FastOrder",
    category: "SaaS · Restauration Rapide · Commande automatisée",
    description:
      "Système de commande en ligne et click & collect pour friteries et fast food. Gestion cuisine Kanban, programme fidélité, caisse intégrée, dashboard propriétaire temps réel.",
    stack: ["React", "Firebase", "PWA", "Stripe", "Tailwind"],
    status: "delivered",
    accentColor: "#f97316",
    metrics: [
      { label: "Commandes/jour", value: "+120" },
      { label: "Temps de déploiement", value: "2 sem." },
    ],
  },
];

export const SERVICES: Service[] = [
  {
    id: "saas",
    title: "SaaS Métier sur mesure",
    description:
      "Nous concevons des plateformes SaaS complètes pour votre secteur — de l'architecture à la mise en production. Multi-tenant, billing intégré, analytics, onboarding automatisé.",
    icon: "zap",
    popular: true,
    features: [
      "Architecture multi-tenant scalable",
      "Stripe Subscriptions & portail client",
      "Analytics produit & funnels",
      "Onboarding & emails automatisés",
    ],
    stack: ["Next.js", "TypeScript", "Firebase", "Stripe", "Resend"],
  },
  {
    id: "automation",
    title: "Automatisation & Refonte digitale",
    description:
      "Transformation complète de vos processus métier. Pas une page — un système. Workflows intelligents, intégrations ERP/CRM, réduction des tâches manuelles.",
    icon: "cpu",
    features: [
      "Audit & cartographie des processus",
      "Intégrations ERP / CRM / API",
      "Agents IA sur vos données",
      "Dashboards de pilotage temps réel",
    ],
    stack: ["OpenAI", "Anthropic", "Zapier", "Firebase", "tRPC"],
  },
  {
    id: "web",
    title: "Applications Web & Mobile",
    description:
      "Interfaces performantes conçues pour convertir et retenir. Next.js App Router, React Native, PWA — une expérience premium sur tous les devices.",
    icon: "monitor",
    features: [
      "Next.js 15 + Server Components",
      "React Native / PWA cross-platform",
      "Core Web Vitals 100/100",
      "SEO technique international",
    ],
    stack: ["Next.js", "React Native", "Tailwind", "TypeScript"],
  },
  {
    id: "international",
    title: "Déploiement marché premium",
    description:
      "Sites et produits adaptés aux marchés suisses, émiratis et qataris. Multilingue, conformité locale, positionnement haut de gamme.",
    icon: "bar-chart-2",
    features: [
      "Multilingue FR / EN / AR",
      "SEO hreflang international",
      "Conformité RGPD & locale",
      "Design adapté marchés premium",
    ],
    stack: ["next-intl", "Vercel", "Sanity", "Tailwind"],
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Mehdi Z.",
    role: "Gérant",
    company: "MZ LOC",
    content:
      "Livraison en 3 semaines d'un système complet. Interface professionnelle, back-office solide. Le niveau d'un vrai senior — exactement ce qu'on cherchait.",
    rating: 5,
  },
  {
    id: "2",
    name: "Karim B.",
    role: "Propriétaire",
    company: "FastFood / Nord",
    content:
      "Depuis le déploiement du système de commande, on a gagné 40% de CA. Les clients commandent seuls, la cuisine gère tout depuis le Kanban. Zéro friction.",
    rating: 5,
  },
  {
    id: "3",
    name: "Thomas R.",
    role: "CTO",
    company: "Startup B2B",
    content:
      "Architecture impeccable, code maintenable, livré avant la deadline. C'est rare de trouver quelqu'un qui pense produit autant que technique.",
    rating: 5,
  },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "Vous travaillez uniquement en France ?",
    answer:
      "Non. Nous opérons à distance sur l'ensemble des marchés francophones et anglophones — Suisse, France, Émirats Arabes Unis, Qatar. Les projets se gèrent entièrement en remote, avec des points de suivi réguliers en visio.",
  },
  {
    question: "Quelle est la différence avec une agence web classique ?",
    answer:
      "On ne vend pas des sites. On construit des systèmes qui fonctionnent sans vous : automatisation des commandes, des paiements, des notifications, du reporting. Le résultat c'est moins de travail manuel et plus de revenus, pas juste une belle page.",
  },
  {
    question: "Quels sont vos délais ?",
    answer:
      "Système de commande ou dashboard : 2 semaines. Application web complète : 3-4 semaines. SaaS multi-tenant : 6-8 semaines. Chaque projet démarre par un cadrage de 48h qui fixe le périmètre exact et le planning.",
  },
  {
    question: "Comment se passe le démarrage d'un projet ?",
    answer:
      "1. Devis en ligne (2 min). 2. Appel de cadrage (30 min) pour aligner les objectifs. 3. Acompte 40% et démarrage sous 72h. 4. Livraisons partielles toutes les semaines. 5. Solde et transfert complet des sources à la mise en production.",
  },
  {
    question: "Le code nous appartient ?",
    answer:
      "À 100%. Vous recevez l'intégralité des sources à la livraison. Aucune dépendance propriétaire à FStudios, aucune licence cachée. Vous pouvez faire évoluer le produit avec n'importe quelle autre équipe.",
  },
  {
    question: "Vous acceptez les paiements en CHF, AED ou QAR ?",
    answer:
      "Oui. Les devis peuvent être établis en EUR, CHF, AED ou QAR selon votre marché. Paiement par virement bancaire international, Wise ou Stripe.",
  },
];

export const TECH_STACK = [
  "Next.js 15", "React 19", "TypeScript 5", "React Native", "Tailwind v4",
  "Firebase", "Supabase", "PostgreSQL", "OpenAI API", "Anthropic Claude",
  "Stripe", "Vercel", "Framer Motion", "Prisma", "tRPC", "Zod", "Resend", "GSAP",
] as const;

export const NAV_ITEMS = [
  { label: "Services", href: "#services" },
  { label: "Projets", href: "#projects" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "#faq" },
] as const;

export const MARKETS = [
  { name: "Suisse", cities: "Genève · Zurich · Lausanne · Zug", flag: "🇨🇭" },
  { name: "France", cities: "Paris · Lyon · Bordeaux", flag: "🇫🇷" },
  { name: "Émirats Arabes Unis", cities: "Dubaï · Abu Dhabi", flag: "🇦🇪" },
  { name: "Qatar", cities: "Doha", flag: "🇶🇦" },
] as const;

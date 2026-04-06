import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";

export const baseMetadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name} — SaaS & Automatisation pour marchés premium`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    "SaaS sur mesure Suisse",
    "développeur SaaS Genève",
    "automatisation entreprise Dubai",
    "refonte digitale Qatar",
    "application métier Zurich",
    "développeur Next.js freelance",
    "SaaS restaurant commande en ligne",
    "système commande fast food",
    "logiciel transport autocar",
    "développeur full stack senior",
    "FStudios",
    "agence digitale premium",
    "application web B2B Suisse",
    "digital transformation UAE",
  ],
  authors: [{ name: "Dorian Gosselin", url: SITE_CONFIG.url }],
  creator: "Dorian Gosselin — FStudios",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: `${SITE_CONFIG.name} — SaaS & Automatisation pour marchés premium`,
    description: SITE_CONFIG.description,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: `${SITE_CONFIG.name} — SaaS & Automatisation` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.name} — SaaS & Automatisation`,
    description: SITE_CONFIG.description,
    images: ["/og-image.jpg"],
  },
  alternates: { canonical: SITE_CONFIG.url },
  category: "technology",
};

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_CONFIG.url}/#organization`,
  name: SITE_CONFIG.name,
  url: SITE_CONFIG.url,
  description: SITE_CONFIG.description,
  email: SITE_CONFIG.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Valenciennes",
    addressRegion: "Nord",
    postalCode: "59300",
    addressCountry: "FR",
  },
  areaServed: [
    { "@type": "Country", name: "France" },
    { "@type": "Country", name: "Switzerland" },
    { "@type": "Country", name: "United Arab Emirates" },
    { "@type": "Country", name: "Qatar" },
  ],
  serviceType: [
    "SaaS Development",
    "Digital Automation",
    "Web Application",
    "Mobile Application",
    "Business Software",
  ],
  sameAs: [SITE_CONFIG.linkedin],
  foundingDate: "2023",
  priceRange: "€€€",
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_CONFIG.url}/#website`,
  url: SITE_CONFIG.url,
  name: SITE_CONFIG.name,
  description: SITE_CONFIG.description,
  inLanguage: "fr-FR",
};

import type { Metadata } from "next";
import "@fontsource/outfit/300.css";
import "@fontsource/outfit/400.css";
import "@fontsource/outfit/500.css";
import "@fontsource/outfit/600.css";
import "@fontsource/outfit/700.css";
import "@fontsource/outfit/800.css";
import "@fontsource/outfit/900.css";
import "@fontsource/sora/300.css";
import "@fontsource/sora/400.css";
import "@fontsource/sora/500.css";
import "@fontsource/sora/600.css";
import "@fontsource/sora/700.css";
import "@fontsource/sora/800.css";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

export const metadata: Metadata = {
  title: "Flowly — Agence Digitale Premium | Sites Web, SaaS & Applications",
  description:
    "Flowly conçoit des solutions digitales sur-mesure : sites vitrines, SaaS, applications mobiles. Portée par FStudios & Volostudios. Devis gratuit en ligne.",
  keywords: [
    "agence web",
    "agence digitale",
    "création site internet",
    "développement web",
    "SaaS",
    "application mobile",
    "France",
    "Flowly",
  ],
  openGraph: {
    title: "Flowly — Agence Digitale Premium",
    description:
      "Sites web, SaaS & applications sur-mesure. L'excellence digitale par FStudios & Volostudios.",
    url: "https://theflowly.fr",
    siteName: "Flowly",
    locale: "fr_FR",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}

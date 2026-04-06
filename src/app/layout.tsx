import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "sonner";
import { AuthProvider } from "@/lib/auth-context";
import "@/styles/globals.css";
import { baseMetadata, organizationJsonLd, websiteJsonLd } from "@/lib/metadata";

export const metadata: Metadata = baseMetadata;
export const viewport = { width: "device-width", initialScale: 1, maximumScale: 5, themeColor: "#07090f" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="manifest" href="/manifest.webmanifest" />
      </head>
      <body className="noise" style={{ fontFamily: "system-ui,-apple-system,'Segoe UI',sans-serif", backgroundColor: "#07090f", color: "white" }}>
        <AuthProvider>
          <div className="page-wrapper">
            {children}
          </div>
        </AuthProvider>
        <Toaster position="bottom-right" toastOptions={{ style: { background: "#0f1220", border: "1px solid rgba(255,255,255,0.1)", color: "white" } }} />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SITE_CONFIG } from "@/lib/constants";
export const metadata: Metadata = { title: "Mentions légales — FStudios", robots: { index: false } };

export default function LegalPage() {
  return (
    <>
      <Navbar />
      <main className="pt-28 pb-24 min-h-screen">
        <div className="max-w-2xl mx-auto px-5 sm:px-8 space-y-12">
          <div className="space-y-3">
            <Link href="/" className="text-indigo-400 text-sm hover:text-indigo-300 transition-colors">← Retour</Link>
            <h1 className="text-4xl font-extrabold text-white" style={{ fontFamily: "var(--font-syne)" }}>Mentions légales</h1>
          </div>
          {[
            { title: "Éditeur du site", items: [`Raison sociale : ${SITE_CONFIG.name}`, "Statut : Micro-entreprise (Entreprise Individuelle)", `SIREN : ${SITE_CONFIG.siren}`, `Code APE : ${SITE_CONFIG.ape} — Programmation informatique`, `Régime TVA : ${SITE_CONFIG.tva}`, `Localisation : ${SITE_CONFIG.location}`, `Email : ${SITE_CONFIG.email}`] },
            { title: "Responsable de publication", items: ["Dorian Gosselin", `Email : ${SITE_CONFIG.email}`] },
            { title: "Hébergement", items: ["Vercel Inc.", "440 N Barranca Ave #4133, Covina, CA 91723, USA", "https://vercel.com"] },
            { title: "Propriété intellectuelle", items: [`L'ensemble du contenu de ce site est la propriété exclusive de ${SITE_CONFIG.name}. Toute reproduction sans autorisation écrite est interdite.`] },
            { title: "Protection des données (RGPD)", items: ["Les données collectées via le formulaire de devis sont utilisées uniquement pour établir et envoyer le devis demandé. Elles ne sont ni vendues ni partagées avec des tiers.", `Droits d'accès, rectification, suppression : ${SITE_CONFIG.email}`] },
          ].map(s => (
            <section key={s.title} className="space-y-3">
              <h2 className="text-white font-semibold text-lg border-b border-white/[0.07] pb-2" style={{ fontFamily: "var(--font-syne)" }}>{s.title}</h2>
              <div className="space-y-1.5">{s.items.map((l, i) => <p key={i} className="text-white/45 text-sm leading-relaxed">{l}</p>)}</div>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}

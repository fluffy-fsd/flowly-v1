import Link from "next/link";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "Page introuvable — FStudios", robots: { index: false } };
export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#07090f] flex items-center justify-center px-6">
      <div className="text-center space-y-6 max-w-md">
        <p className="text-[7rem] font-extrabold text-white/[0.04] leading-none" style={{ fontFamily: "var(--font-syne)" }}>404</p>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-syne)" }}>Page introuvable</h1>
          <p className="text-white/38 text-sm">Cette page n&apos;existe pas ou a été déplacée.</p>
        </div>
        <Link href="/" className="inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-400 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm">
          ← Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}

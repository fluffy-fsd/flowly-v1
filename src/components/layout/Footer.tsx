import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

const cols = {
  Services: [
    { label: "Sites & Landing Pages", href: "/#services" },
    { label: "Applications Web", href: "/#services" },
    { label: "Mobile & PWA", href: "/#services" },
    { label: "Intégration IA", href: "/#services" },
  ],
  Projets: [
    { label: "N'Snack", href: "/#projects" },
    { label: "MZ LOC × DMZ", href: "/#projects" },
    { label: "RouteMaster Pro", href: "/#projects" },
    { label: "Flowly", href: "/#projects" },
  ],
  Ressources: [
    { label: "Blog tech", href: "/blog" },
    { label: "Devis gratuit", href: "/#quote" },
    { label: "FAQ", href: "/#faq" },
    { label: "Mentions légales", href: "/legal" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#050710]" role="contentinfo">
      <div className="fs-container py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <p className="text-white font-bold text-2xl tracking-tight" style={{ fontFamily: "var(--font-syne)" }}>
                F<span className="text-indigo-400">Studios</span>
              </p>
              <p className="text-white/38 text-sm leading-relaxed mt-3 max-w-xs">Agence de développement web, mobile et IA. Niveau senior, livraison garantie.</p>
            </div>
            <div className="space-y-2.5">
              <a href={`mailto:${SITE_CONFIG.email}`} className="flex items-center gap-2 text-white/45 hover:text-white text-sm transition-colors group">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>{SITE_CONFIG.email}</span>
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a href={SITE_CONFIG.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/45 hover:text-white text-sm transition-colors group">
                <div className="w-4 h-4 shrink-0 flex items-center justify-center">
                  <svg className="w-4 h-4 text-indigo-400" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </div>
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
            <div className="flex flex-wrap gap-2">
              {["Next.js Expert", "Firebase Dev", "Vercel Ready"].map((b) => (
                <span key={b} className="bg-white/[0.04] border border-white/[0.07] text-white/35 text-xs px-3 py-1 rounded-full">{b}</span>
              ))}
            </div>
          </div>

          {Object.entries(cols).map(([cat, links]) => (
            <div key={cat} className="space-y-4">
              <p className="text-white/60 font-semibold text-sm" style={{ fontFamily: "var(--font-syne)" }}>{cat}</p>
              <ul className="space-y-2.5">
                {links.map((l) => (
                  <li key={l.label}><Link href={l.href} className="text-white/35 hover:text-white/65 text-sm transition-colors">{l.label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-white/[0.05]">
        <div className="fs-container py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/22">
          <p>© {new Date().getFullYear()} FStudios — SIREN {SITE_CONFIG.siren} · APE {SITE_CONFIG.ape}</p>
          <p className="hidden sm:block">{SITE_CONFIG.tva}</p>
          <p>{SITE_CONFIG.location}</p>
        </div>
      </div>
    </footer>
  );
}

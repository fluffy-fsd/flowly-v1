"use client";

export default function Footer() {
  return (
    <footer style={{ background: "#0f172a" }} className="text-white overflow-hidden">
      {/* CTA band */}
      <div style={{ borderBottom: "1px solid #1e293b" }}>
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 py-16 sm:py-20">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{ fontFamily: "var(--font-sora)" }}>Prêt à lancer votre projet ?</h2>
              <p className="text-slate-400 text-base max-w-lg">Discutons de votre vision. Premier appel découverte gratuit et sans engagement.</p>
            </div>
            <a href="#devis" className="inline-flex items-center gap-2.5 px-7 py-3.5 text-base font-semibold bg-white rounded-2xl shadow-xl transition-all duration-300 hover:-translate-y-0.5 flex-shrink-0" style={{ color: "#4263eb" }}>
              Démarrer maintenant
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 py-12 sm:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="col-span-2 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #5c7cfa, #4263eb)" }}>
                <span className="text-white font-bold text-sm">F</span>
              </div>
              <span className="font-bold text-lg" style={{ fontFamily: "var(--font-sora)" }}>Flowly</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-4 max-w-xs">Agence digitale premium portée par FStudios &amp; Volostudios. Sites web, SaaS et applications mobiles sur-mesure.</p>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-[0.15em] text-white mb-4" style={{ fontFamily: "var(--font-sora)" }}>Services</h4>
            <ul className="space-y-2.5">
              {["Sites vitrines", "Applications SaaS", "Apps mobiles", "E-commerce", "Refonte & redesign", "SEO & Performance"].map((s) => (
                <li key={s}><a href="#services" className="text-sm text-slate-400 hover:text-white transition-colors">{s}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-[0.15em] text-white mb-4" style={{ fontFamily: "var(--font-sora)" }}>Agence</h4>
            <ul className="space-y-2.5">
              {[{ label: "Réalisations", href: "#realisations" }, { label: "Processus", href: "#processus" }, { label: "Tarifs", href: "#tarifs" }, { label: "Contact", href: "#devis" }].map((l) => (
                <li key={l.label}><a href={l.href} className="text-sm text-slate-400 hover:text-white transition-colors">{l.label}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-[0.15em] text-white mb-4" style={{ fontFamily: "var(--font-sora)" }}>Légal</h4>
            <ul className="space-y-2.5">
              {[{ label: "Mentions légales", href: "/mentions-legales" }, { label: "Politique de confidentialité", href: "/politique-confidentialite" }, { label: "CGU", href: "/conditions-utilisation" }].map((l) => (
                <li key={l.label}><a href={l.href} className="text-sm text-slate-400 hover:text-white transition-colors">{l.label}</a></li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div style={{ borderTop: "1px solid #1e293b" }}>
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">© {new Date().getFullYear()} Flowly — Propulsé par FStudios &amp; Volostudios</p>
          <p className="text-xs text-slate-600">Fait avec passion à Valenciennes 🇫🇷</p>
        </div>
      </div>
    </footer>
  );
}

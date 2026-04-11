"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const services = [
  {
    id: "sites",
    number: "01",
    title: "Sites & Landing Pages",
    subtitle: "Votre vitrine digitale",
    desc: "On ne fait pas de sites « jolis ». On crée des machines à convertir. Chaque pixel est pensé pour capter l'attention, raconter votre histoire et transformer vos visiteurs en clients.",
    features: [
      { label: "Design sur-mesure", detail: "Aucun template. Chaque site est unique." },
      { label: "SEO natif", detail: "Structure, performance et contenu optimisés dès le jour 1." },
      { label: "Mobile-first", detail: "60% du trafic est mobile. On design pour ça." },
      { label: "Livraison rapide", detail: "2 à 4 semaines, clé en main." },
    ],
    visual: (
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Browser mockup */}
        <div className="w-[85%] max-w-[500px] rounded-2xl overflow-hidden" style={{ background: "#1e293b", boxShadow: "0 25px 60px rgba(0,0,0,0.3)" }}>
          <div className="flex items-center gap-2 px-4 py-3" style={{ background: "#334155" }}>
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full" style={{ background: "#f43f5e" }} />
              <div className="w-3 h-3 rounded-full" style={{ background: "#fbbf24" }} />
              <div className="w-3 h-3 rounded-full" style={{ background: "#34d399" }} />
            </div>
            <div className="flex-1 mx-4">
              <div className="px-3 py-1.5 rounded-lg text-[11px] text-white/40 text-center" style={{ background: "#1e293b" }}>
                www.votre-site.fr
              </div>
            </div>
          </div>
          <div className="p-6 space-y-4" style={{ background: "#0f172a" }}>
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-xl" style={{ background: "linear-gradient(135deg, #4c6ef5, #4263eb)" }} />
              <div className="flex-1 space-y-1.5">
                <div className="h-2.5 rounded-full w-24" style={{ background: "#334155" }} />
                <div className="h-2 rounded-full w-16" style={{ background: "#1e293b" }} />
              </div>
            </div>
            <div className="h-32 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #4c6ef5, #7c3aed)" }}>
              <span className="text-white/30 text-sm font-medium">Hero Section</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-16 rounded-lg" style={{ background: "#1e293b" }} />
              ))}
            </div>
            <div className="space-y-2">
              <div className="h-2 rounded-full w-full" style={{ background: "#1e293b" }} />
              <div className="h-2 rounded-full w-3/4" style={{ background: "#1e293b" }} />
            </div>
          </div>
        </div>
      </div>
    ),
    gradient: "linear-gradient(135deg, #4c6ef5, #3b5bdb)",
    bgAccent: "rgba(76,110,245,0.06)",
  },
  {
    id: "saas",
    number: "02",
    title: "Applications SaaS",
    subtitle: "Votre produit digital",
    desc: "Dashboard, authentification, paiement, API — on construit des plateformes SaaS complètes, prêtes à scaler. Architecture robuste, code propre, performances optimales.",
    features: [
      { label: "Architecture scalable", detail: "Conçu pour supporter la croissance." },
      { label: "Paiement intégré", detail: "Stripe, abonnements, facturation auto." },
      { label: "Dashboard complet", detail: "Analytics, gestion users, admin panel." },
      { label: "Support continu", detail: "Maintenance, évolutions, monitoring." },
    ],
    visual: (
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Dashboard mockup */}
        <div className="w-[85%] max-w-[500px] rounded-2xl overflow-hidden" style={{ background: "#0f172a", boxShadow: "0 25px 60px rgba(0,0,0,0.3)" }}>
          <div className="flex">
            {/* Sidebar */}
            <div className="w-14 py-4 flex flex-col items-center gap-3" style={{ background: "#1e293b" }}>
              <div className="w-8 h-8 rounded-lg" style={{ background: "linear-gradient(135deg, #10b981, #059669)" }} />
              <div className="w-6 h-6 rounded-md" style={{ background: "#334155" }} />
              <div className="w-6 h-6 rounded-md" style={{ background: "#334155" }} />
              <div className="w-6 h-6 rounded-md" style={{ background: "#4c6ef530" }} />
              <div className="w-6 h-6 rounded-md" style={{ background: "#334155" }} />
            </div>
            {/* Main */}
            <div className="flex-1 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="h-3 w-20 rounded-full" style={{ background: "#334155" }} />
                <div className="w-6 h-6 rounded-full" style={{ background: "#334155" }} />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: "2.4k", label: "Users", color: "#4c6ef5" },
                  { value: "€12k", label: "MRR", color: "#10b981" },
                  { value: "98%", label: "Uptime", color: "#fbbf24" },
                ].map((s) => (
                  <div key={s.label} className="p-2.5 rounded-lg" style={{ background: "#1e293b" }}>
                    <p className="text-white font-bold text-sm">{s.value}</p>
                    <p className="text-white/30 text-[9px]">{s.label}</p>
                    <div className="mt-1.5 h-1 rounded-full" style={{ background: "#0f172a" }}>
                      <div className="h-full rounded-full" style={{ background: s.color, width: "70%" }} />
                    </div>
                  </div>
                ))}
              </div>
              {/* Chart area */}
              <div className="h-24 rounded-lg p-3 flex items-end gap-1" style={{ background: "#1e293b" }}>
                {[40, 65, 45, 80, 55, 70, 90, 60, 75, 85, 50, 95].map((h, i) => (
                  <div key={i} className="flex-1 rounded-t" style={{ height: `${h}%`, background: i === 11 ? "#4c6ef5" : "#334155" }} />
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="h-10 rounded-lg" style={{ background: "#1e293b" }} />
                <div className="h-10 rounded-lg" style={{ background: "#1e293b" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    gradient: "linear-gradient(135deg, #10b981, #059669)",
    bgAccent: "rgba(16,185,129,0.06)",
  },
  {
    id: "mobile",
    number: "03",
    title: "Applications Mobiles",
    subtitle: "Dans la poche de vos clients",
    desc: "iOS, Android, PWA — on développe des applications mobiles natives et hybrides qui offrent une expérience utilisateur irréprochable, même offline.",
    features: [
      { label: "iOS & Android", detail: "React Native pour les deux plateformes." },
      { label: "PWA performante", detail: "Installable, rapide, fonctionne offline." },
      { label: "Push notifications", detail: "Réengagez vos utilisateurs au bon moment." },
      { label: "UX mobile native", detail: "Gestures, animations fluides, haptics." },
    ],
    visual: (
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Two phones */}
        <div className="relative">
          {/* Phone back */}
          <div className="absolute -right-8 top-4 w-[160px] rounded-[2rem] p-2 opacity-60" style={{ background: "#334155", boxShadow: "0 15px 40px rgba(0,0,0,0.2)" }}>
            <div className="rounded-[1.6rem] h-[300px]" style={{ background: "linear-gradient(to bottom, #1e293b, #0f172a)" }}>
              <div className="p-4 pt-8 space-y-3">
                <div className="h-3 rounded-full w-16" style={{ background: "#334155" }} />
                <div className="h-20 rounded-xl" style={{ background: "#334155" }} />
                <div className="h-3 rounded-full w-24" style={{ background: "#334155" }} />
                <div className="h-3 rounded-full w-16" style={{ background: "#334155" }} />
              </div>
            </div>
          </div>
          {/* Phone front */}
          <div className="relative w-[180px] rounded-[2.2rem] p-2.5 z-10" style={{ background: "#1e293b", boxShadow: "0 25px 60px rgba(0,0,0,0.35)" }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 rounded-b-xl z-20" style={{ background: "#1e293b" }} />
            <div className="rounded-[1.8rem] h-[340px] overflow-hidden" style={{ background: "linear-gradient(to bottom, #f59e0b, #ea580c)" }}>
              <div className="p-4 pt-10">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 rounded-full" style={{ background: "rgba(255,255,255,0.2)" }} />
                  <div>
                    <div className="h-2 w-16 rounded-full" style={{ background: "rgba(255,255,255,0.4)" }} />
                    <div className="h-1.5 w-10 rounded-full mt-1" style={{ background: "rgba(255,255,255,0.2)" }} />
                  </div>
                </div>
                <div className="space-y-2.5">
                  {[1, 2, 3].map((n) => (
                    <div key={n} className="p-3 rounded-xl flex items-center gap-3" style={{ background: "rgba(255,255,255,0.12)" }}>
                      <div className="w-10 h-10 rounded-lg" style={{ background: "rgba(255,255,255,0.15)" }} />
                      <div className="flex-1 space-y-1">
                        <div className="h-2 w-20 rounded-full" style={{ background: "rgba(255,255,255,0.3)" }} />
                        <div className="h-1.5 w-12 rounded-full" style={{ background: "rgba(255,255,255,0.15)" }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 py-2.5 rounded-xl text-center" style={{ background: "rgba(255,255,255,0.2)" }}>
                  <div className="h-2 w-16 rounded-full mx-auto" style={{ background: "rgba(255,255,255,0.4)" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    gradient: "linear-gradient(135deg, #f59e0b, #ea580c)",
    bgAccent: "rgba(245,158,11,0.06)",
  },
];

export default function Services() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsInView(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const current = services[active];

  return (
    <section id="services" className="relative py-20 sm:py-28 overflow-hidden" ref={sectionRef}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center mb-16"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: "#4c6ef5" }}>
            Nos expertises
          </p>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900"
            style={{ fontFamily: "var(--font-sora)" }}
          >
            Tout ce qu&apos;il faut pour{" "}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, #4c6ef5, #3b5bdb)" }}>
              dominer le digital
            </span>
          </h2>
        </motion.div>

        {/* Service Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex items-center gap-1 p-1.5 rounded-2xl" style={{ background: "#f1f5f9" }}>
            {services.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setActive(i)}
                className="relative px-5 py-2.5 text-sm font-medium rounded-xl transition-all duration-300"
                style={{
                  background: active === i ? "#ffffff" : "transparent",
                  color: active === i ? "#0f172a" : "#64748b",
                  boxShadow: active === i ? "0 2px 8px rgba(0,0,0,0.06)" : "none",
                }}
              >
                <span className="hidden sm:inline">{s.title}</span>
                <span className="sm:hidden">{s.number}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Main Card — Full Width */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
            className="relative rounded-[2rem] overflow-hidden"
            style={{
              background: current.bgAccent,
              border: "1px solid #e2e8f0",
              boxShadow: "0 20px 60px rgba(0,0,0,0.04)",
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px] sm:min-h-[560px]">
              {/* Left: Content */}
              <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center order-2 lg:order-1">
                {/* Number + subtitle */}
                <div className="flex items-center gap-3 mb-6">
                  <span
                    className="text-5xl sm:text-6xl font-black"
                    style={{
                      fontFamily: "var(--font-sora)",
                      backgroundImage: current.gradient,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      opacity: 0.2,
                    }}
                  >
                    {current.number}
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "#94a3b8" }}>
                      {current.subtitle}
                    </p>
                  </div>
                </div>

                <h3
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-4"
                  style={{ fontFamily: "var(--font-sora)" }}
                >
                  {current.title}
                </h3>

                <p className="text-slate-500 text-base sm:text-lg leading-relaxed mb-8 max-w-lg">
                  {current.desc}
                </p>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  {current.features.map((f, i) => (
                    <motion.div
                      key={f.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.08 }}
                      className="flex items-start gap-3"
                    >
                      <div
                        className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ background: current.gradient }}
                      >
                        <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{f.label}</p>
                        <p className="text-sm text-slate-400 mt-0.5">{f.detail}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* CTA */}
                <a
                  href="#devis"
                  className="inline-flex items-center gap-2.5 px-6 py-3 text-sm font-semibold text-white rounded-xl transition-all duration-300 hover:-translate-y-0.5 w-fit"
                  style={{ background: current.gradient, boxShadow: "0 8px 25px rgba(0,0,0,0.12)" }}
                >
                  Lancer mon projet
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </a>
              </div>

              {/* Right: Visual */}
              <div className="relative p-8 sm:p-12 flex items-center justify-center order-1 lg:order-2 min-h-[300px] lg:min-h-0">
                {/* Background glow */}
                <div
                  className="absolute inset-0 opacity-[0.07]"
                  style={{ background: `radial-gradient(circle at 60% 50%, ${current.gradient.includes("#4c6ef5") ? "#4c6ef5" : current.gradient.includes("#10b981") ? "#10b981" : "#f59e0b"}, transparent 70%)` }}
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="relative w-full h-full min-h-[280px] flex items-center justify-center"
                >
                  {current.visual}
                </motion.div>
              </div>
            </div>

            {/* Bottom navigation dots */}
            <div className="flex items-center justify-center gap-2 pb-6">
              {services.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className="transition-all duration-300 rounded-full"
                  style={{
                    width: active === i ? "24px" : "8px",
                    height: "8px",
                    background: active === i ? current.gradient : "#cbd5e1",
                  }}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Swipe hint on mobile */}
        <p className="text-center text-xs text-slate-400 mt-4 lg:hidden">
          ← Naviguez entre les services →
        </p>
      </div>
    </section>
  );
}

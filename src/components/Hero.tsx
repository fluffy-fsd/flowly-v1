"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PhoneScreen {
  id: string;
  label: string;
  bg: string;
  content: React.ReactNode;
}

const phoneScreens: PhoneScreen[] = [
  {
    id: "accueil",
    label: "Accueil",
    bg: "linear-gradient(to bottom, #5c7cfa, #4263eb)",
    content: (
      <div className="p-5 flex flex-col h-full">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "rgba(255,255,255,0.2)" }}>
            <span className="text-white text-xs font-bold">F</span>
          </div>
          <span className="text-white/90 text-xs font-semibold tracking-wide">Flowly</span>
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <p className="text-white/50 text-[10px] uppercase tracking-[0.2em] mb-3">Agence web</p>
          <h3 className="text-white font-bold text-xl leading-tight mb-3" style={{ fontFamily: "var(--font-sora)" }}>
            Votre vision,<br />notre code.
          </h3>
          <p className="text-white/60 text-xs leading-relaxed mb-6">
            Sites web, SaaS &amp; apps mobiles conçus pour convertir et impressionner.
          </p>
          <div className="flex gap-2.5">
            <div className="px-4 py-2 bg-white rounded-xl text-[11px] font-semibold" style={{ color: "#4263eb" }}>
              Voir nos offres
            </div>
            <div className="px-4 py-2 rounded-xl text-[11px] text-white border" style={{ borderColor: "rgba(255,255,255,0.25)", background: "rgba(255,255,255,0.08)" }}>
              En savoir +
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-6 pt-4 mt-auto" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          {["🏠", "📋", "💬", "👤"].map((e, i) => (
            <span key={i} className="text-sm opacity-50">{e}</span>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "services",
    label: "Services",
    bg: "linear-gradient(to bottom, #1e293b, #0f172a)",
    content: (
      <div className="p-5 flex flex-col h-full">
        <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] mb-4">Nos services</p>
        <div className="space-y-3 flex-1">
          {[
            { icon: "🌐", name: "Site Vitrine", price: "495€ HT", recommended: false },
            { icon: "⚡", name: "Solution Business", price: "2 490€ HT", recommended: true },
            { icon: "🚀", name: "Sur-mesure", price: "Sur devis", recommended: false },
          ].map((s, i) => (
            <div
              key={i}
              className="rounded-xl p-3.5 flex items-center gap-3"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
                style={{ background: "rgba(255,255,255,0.08)" }}
              >
                {s.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-white text-xs font-semibold">{s.name}</span>
                  {s.recommended && (
                    <span
                      className="text-[8px] px-1.5 py-0.5 rounded-full font-medium"
                      style={{ background: "rgba(92,124,250,0.3)", color: "#91a7ff" }}
                    >
                      Recommandé
                    </span>
                  )}
                </div>
                <span className="text-white/40 text-[10px]">À partir de {s.price}</span>
              </div>
              <svg className="w-4 h-4 text-white/20 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </div>
          ))}
        </div>
        <div className="mt-4 p-3.5 rounded-xl" style={{ background: "rgba(92,124,250,0.1)", border: "1px solid rgba(92,124,250,0.2)" }}>
          <p className="text-xs font-medium" style={{ color: "#91a7ff" }}>✨ Devis gratuit en 2 min</p>
          <p className="text-white/30 text-[10px] mt-0.5">Recevez votre estimation personnalisée</p>
        </div>
      </div>
    ),
  },
  {
    id: "portfolio",
    label: "Portfolio",
    bg: "linear-gradient(to bottom, #4c6ef5, #3730a3)",
    content: (
      <div className="p-5 flex flex-col h-full">
        <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] mb-4">Réalisations</p>
        <div className="space-y-3 flex-1">
          {[
            { name: "LuxDrive", type: "App PWA", color: "#fbbf24" },
            { name: "FastOrder", type: "SaaS", color: "#34d399" },
            { name: "SportElite", type: "Site vitrine", color: "#fb7185" },
          ].map((p, i) => (
            <div key={i} className="rounded-xl overflow-hidden" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div
                className="h-[72px] flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.1))" }}
              >
                <span className="text-white/15 text-4xl font-black" style={{ fontFamily: "var(--font-sora)" }}>
                  {p.name[0]}{p.name[1]}
                </span>
              </div>
              <div className="p-3 flex items-center justify-between">
                <span className="text-white text-xs font-medium">{p.name}</span>
                <span
                  className="text-[9px] px-2 py-0.5 rounded-full font-medium"
                  style={{ background: `${p.color}20`, color: p.color }}
                >
                  {p.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "contact",
    label: "Contact",
    bg: "linear-gradient(to bottom, #4263eb, #364fc7)",
    content: (
      <div className="p-5 flex flex-col h-full">
        <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] mb-2">Contact</p>
        <h3 className="text-white font-bold text-sm mb-5" style={{ fontFamily: "var(--font-sora)" }}>
          Parlons de votre projet
        </h3>
        <div className="space-y-2.5 flex-1">
          {[
            { label: "Nom", value: "Jean Dupont" },
            { label: "Email", value: "jean@example.com" },
            { label: "Projet", value: "SaaS - Gestion RH" },
            { label: "Budget", value: "2 000€ - 5 000€" },
          ].map((field, i) => (
            <div key={i} className="rounded-lg p-3" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <p className="text-white/25 text-[10px] mb-0.5">{field.label}</p>
              <p className="text-white/70 text-xs">{field.value}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 w-full py-3 bg-white rounded-xl text-center text-xs font-semibold" style={{ color: "#4263eb" }}>
          Envoyer ma demande
        </div>
      </div>
    ),
  },
];

export default function Hero() {
  const [activeScreen, setActiveScreen] = useState(0);

  return (
    <section className="relative isolate overflow-hidden bg-white min-h-screen flex items-center">
      {/* Background pattern */}
      <svg
        className="absolute inset-0 -z-10 h-full w-full"
        style={{ stroke: "rgba(226,232,240,0.6)", maskImage: "radial-gradient(100% 100% at top right, white, transparent)" }}
        aria-hidden="true"
      >
        <defs>
          <pattern id="hero-grid" width="200" height="200" x="50%" y="-1" patternUnits="userSpaceOnUse">
            <path d="M100 200V.5M.5 .5H200" fill="none" />
          </pattern>
        </defs>
        <svg x="50%" y="-1" className="overflow-visible" style={{ fill: "rgba(240,244,255,0.4)" }}>
          <path d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z" strokeWidth="0" />
        </svg>
        <rect width="100%" height="100%" strokeWidth="0" fill="url(#hero-grid)" />
      </svg>

      {/* Gradient blobs */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-3xl -z-10"
        style={{ background: "radial-gradient(circle, rgba(219,228,255,0.5), transparent)" }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-3xl -z-10"
        style={{ background: "radial-gradient(circle, rgba(250,240,224,0.4), transparent)" }}
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-20 lg:pb-16 w-full">
        <div className="lg:flex lg:items-center lg:gap-x-16">
          {/* Left Content */}
          <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
            {/* Badge */}
            

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="mt-8 max-w-xl text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-[3.5rem] !leading-[1.1]"
              style={{ fontFamily: "var(--font-sora)" }}
            >
              On crée des{" "}
              <span className="relative inline-block">
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(135deg, #4c6ef5, #3b5bdb)" }}
                >
                  solutions digitales
                </span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                  <path d="M2 8c50-6 100-6 150-2s100 2 146-4" stroke="url(#ug)" strokeWidth="3" strokeLinecap="round" />
                  <defs>
                    <linearGradient id="ug" x1="0" y1="0" x2="300" y2="0">
                      <stop stopColor="#4c6ef5" />
                      <stop offset="1" stopColor="#3b5bdb" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>{" "}
              qui convertissent.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="mt-6 text-lg leading-relaxed text-slate-500 max-w-lg"
            >
              Sites vitrines, SaaS, applications mobiles — nous concevons et développons
              des produits digitaux performants qui génèrent des leads et boostent votre chiffre d&apos;affaires.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              <a
                href="#devis"
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 text-base font-semibold text-white rounded-2xl shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                style={{ background: "linear-gradient(135deg, #4c6ef5, #4263eb)", boxShadow: "0 10px 40px rgba(76,110,245,0.25)" }}
              >
                Obtenir mon devis gratuit
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
              <a href="#realisations" className="inline-flex items-center gap-2 text-base font-semibold text-slate-700 hover:text-flowly-600 transition-colors">
                Créer un compte <span>→</span>
              </a>
              
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-400"
            >
              {["🇫🇷 Basés en France", "⚡ Livraison rapide", "💎 Code premium", "📱 Mobile-first"].map((item) => (
                <span key={item}>{item}</span>
              ))}
            </motion.div>
          </div>

          {/* Right: Phone */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            className="mt-16 sm:mt-24 lg:mt-0 lg:flex-shrink-0 flex flex-col items-center"
          >
            <div className="animate-phone-float">
              <div className="relative mx-auto" style={{ width: "290px" }}>
                {/* Phone frame */}
                <div
                  className="relative rounded-[3rem] p-3 shadow-2xl"
                  style={{
                    background: "#1e293b",
                    boxShadow: "0 25px 80px rgba(15,23,42,0.35), 0 0 0 1px rgba(51,65,85,0.5)",
                  }}
                >
                  {/* Notch */}
                  <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 rounded-b-2xl z-20"
                    style={{ background: "#1e293b" }}
                  >
                    <div
                      className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-1 rounded-full"
                      style={{ background: "#334155" }}
                    />
                  </div>

                  {/* Screen */}
                  <div className="relative rounded-[2.3rem] overflow-hidden" style={{ height: "540px", background: "#0f172a" }}>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeScreen}
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -40 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="absolute inset-0"
                        style={{ background: phoneScreens[activeScreen].bg }}
                      >
                        {/* Status bar */}
                        <div className="flex items-center justify-between px-7 pt-10 pb-1">
                          <span className="text-white/50 text-[11px] font-medium">9:41</span>
                          <div className="flex items-center gap-1.5">
                            <div className="flex gap-0.5">
                              {[1, 2, 3, 4].map((b) => (
                                <div key={b} className="w-1 rounded-full" style={{ height: `${6 + b * 2}px`, background: b < 4 ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.2)" }} />
                              ))}
                            </div>
                            <div className="w-5 h-2.5 rounded-sm relative" style={{ border: "1.5px solid rgba(255,255,255,0.35)" }}>
                              <div className="absolute inset-0.5 rounded-[1px]" style={{ background: "rgba(255,255,255,0.5)", width: "65%" }} />
                            </div>
                          </div>
                        </div>
                        {phoneScreens[activeScreen].content}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>

            {/* Phone Navigation Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="mt-6 flex items-center gap-1.5 p-1.5 rounded-2xl"
              style={{ background: "#f1f5f9" }}
            >
              {phoneScreens.map((screen, i) => (
                <button
                  key={screen.id}
                  onClick={() => setActiveScreen(i)}
                  className="px-3.5 py-2 text-xs font-medium rounded-xl transition-all duration-300"
                  style={{
                    background: activeScreen === i ? "#ffffff" : "transparent",
                    color: activeScreen === i ? "#4263eb" : "#64748b",
                    boxShadow: activeScreen === i ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                  }}
                >
                  {screen.label}
                </button>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

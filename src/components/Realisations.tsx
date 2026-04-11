"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const projects = [
  {
    title: "PowerRide",
    type: "Application PWA",
    desc: "Plateforme de location de véhicules premium avec réservation en temps réel, paiement sécurisé et tableau de bord propriétaire.",
    tags: ["React", "Firebase", "Stripe", "PWA"],
    gradient: "linear-gradient(135deg, #f59e0b, #ea580c)",
    stats: { metric: "+340%", label: "de réservations" },
  },
  {
    title: "FastOrder",
    type: "SaaS Click & Collect",
    desc: "Système de commande en ligne pour la restauration rapide. Gestion des stocks, notifications push et analytics en temps réel.",
    tags: ["Next.js", "TypeScript", "Firebase", "Tailwind"],
    gradient: "linear-gradient(135deg, #10b981, #0d9488)",
    stats: { metric: "2.4s", label: "temps de chargement" },
  },
  {
    title: "RouteMaster Pro",
    type: "SaaS Transport",
    desc: "Solution complète pour entreprises de transport : gestion de flotte, conformité RSE EU 561/2006, paie et messagerie conducteurs.",
    tags: ["Next.js", "TypeScript", "Firebase", "PWA"],
    gradient: "linear-gradient(135deg, #5c7cfa, #4f46e5)",
    stats: { metric: "-60%", label: "temps admin" },
  },
];

export default function Realisations() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="realisations" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10" ref={ref}>
        <div className="max-w-2xl mx-auto text-center mb-16 lg:mb-20">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="text-sm font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: "#4c6ef5" }}>Portfolio</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }} className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900" style={{ fontFamily: "var(--font-sora)" }}>
            Des projets qui <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, #4c6ef5, #3b5bdb)" }}>parlent d&apos;eux-mêmes</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }} className="mt-4 text-lg text-slate-500">Chaque projet est un défi unique. Voici quelques-unes de nos réalisations récentes.</motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, i) => (
            <motion.div key={project.title} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.15 + i * 0.1, duration: 0.5 }} className="group relative bg-white rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-500" style={{ border: "1px solid #e2e8f0" }}>
              <div className="relative h-48 sm:h-56 overflow-hidden" style={{ background: project.gradient }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white/15 font-black group-hover:scale-110 transition-transform duration-500" style={{ fontSize: "5rem", fontFamily: "var(--font-sora)" }}>{project.title[0]}{project.title[1]}</div>
                </div>
                <div className="absolute top-4 right-4 px-3 py-2 rounded-xl" style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.2)" }}>
                  <p className="text-white font-bold text-lg leading-none">{project.stats.metric}</p>
                  <p className="text-white/70 text-[10px] mt-0.5">{project.stats.label}</p>
                </div>
                <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full" style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.2)" }}>
                  <p className="text-white text-xs font-medium">{project.type}</p>
                </div>
              </div>
              <div className="p-6 sm:p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-2" style={{ fontFamily: "var(--font-sora)" }}>{project.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-5">{project.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (<span key={tag} className="px-2.5 py-1 text-xs font-medium text-slate-600 bg-slate-100 rounded-lg">{tag}</span>))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

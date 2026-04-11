"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  { num: "01", title: "Découverte", desc: "On analyse vos besoins, votre marché et vos objectifs. Un brief complet pour poser les fondations.", duration: "1-2 jours",
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
  { num: "02", title: "Conception", desc: "Maquettes, wireframes et prototypes interactifs. Vous visualisez le résultat avant la première ligne de code.", duration: "3-5 jours",
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" /></svg> },
  { num: "03", title: "Développement", desc: "Code propre, performant et scalable. Suivi en temps réel via un accès dédié à l'avancement.", duration: "1-4 semaines",
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg> },
  { num: "04", title: "Lancement", desc: "Tests rigoureux, déploiement et mise en production. Formation incluse pour votre autonomie.", duration: "1-2 jours",
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" /></svg> },
];

export default function Processus() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="processus" className="relative py-24 sm:py-32 overflow-hidden" style={{ background: "linear-gradient(to bottom, #f8fafc80, #ffffff)" }}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10" ref={ref}>
        <div className="max-w-2xl mx-auto text-center mb-16 lg:mb-20">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="text-sm font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: "#4c6ef5" }}>Notre méthode</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }} className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900" style={{ fontFamily: "var(--font-sora)" }}>
            De l&apos;idée au <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, #4c6ef5, #3b5bdb)" }}>lancement</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }} className="mt-4 text-lg text-slate-500">Un processus éprouvé en 4 étapes pour livrer un produit qui dépasse vos attentes.</motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
          {steps.map((step, i) => (
            <motion.div key={step.num} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 + i * 0.12, duration: 0.5 }} className="group relative">
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[calc(50%+2rem)] right-0 h-px" style={{ background: "linear-gradient(to right, #bac8ff, #e2e8f0)" }} />
              )}
              <div className="relative bg-white rounded-2xl p-6 sm:p-7 hover:shadow-lg transition-all duration-500 h-full" style={{ border: "1px solid #e2e8f0" }}>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300" style={{ background: "#f0f4ff", border: "1px solid #dbe4ff", color: "#4c6ef5" }}>
                    {step.icon}
                  </div>
                  <span className="text-3xl font-extrabold" style={{ fontFamily: "var(--font-sora)", color: "#f1f5f9" }}>{step.num}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2" style={{ fontFamily: "var(--font-sora)" }}>{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-4">{step.desc}</p>
                <div className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg w-fit" style={{ color: "#4c6ef5", background: "#f0f4ff" }}>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  {step.duration}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

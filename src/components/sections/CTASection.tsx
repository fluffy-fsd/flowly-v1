"use client";
import { motion } from "framer-motion";
import { ArrowRight, Mail, MessageCircle } from "lucide-react";
import { SITE_CONFIG, MARKETS } from "@/lib/constants";

export function CTASection() {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 64, behavior: "smooth" });
  };

  return (
    <section id="contact" className="py-20 sm:py-28" aria-labelledby="cta-title">
      <div className="fs-container">
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-3xl bg-indigo-500/[0.055] border border-indigo-500/18 px-6 py-16 sm:px-12 sm:py-20 text-center">
          <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(550px,90vw)] h-[350px] bg-indigo-600/[0.07] rounded-full blur-[90px] pointer-events-none" />
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

          <div className="relative space-y-5 max-w-lg mx-auto">
            <div className="flex flex-wrap justify-center gap-2 mb-2">
              {MARKETS.map(m => (
                <span key={m.name} className="text-lg" title={m.name}>{m.flag}</span>
              ))}
            </div>

            <h2 id="cta-title"
              className="text-[clamp(1.75rem,7vw,3rem)] font-extrabold tracking-[-0.025em] text-white leading-[1.12]"
              style={{ fontFamily: "var(--font-syne)" }}>
              Votre prochain système<br /><span className="gradient-text">commence ici.</span>
            </h2>

            <p className="text-white/38 text-sm sm:text-base leading-relaxed">
              Devis gratuit en 2 minutes. Réponse sous 24h.<br className="hidden sm:block" />
              On travaille en EUR, CHF, AED et QAR.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 pt-2">
              <button onClick={() => scrollTo("#quote")}
                className="group inline-flex items-center justify-center gap-2 bg-white text-[#07090f] font-bold px-7 py-4 rounded-2xl hover:bg-indigo-50 active:scale-[0.98] transition-all shadow-2xl shadow-white/8 text-sm sm:text-base">
                Obtenir un devis
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
              <div className="flex gap-2.5">
                <a href={`mailto:${SITE_CONFIG.email}`}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.09] text-white/65 hover:text-white font-medium px-5 py-4 rounded-2xl transition-all text-sm">
                  <Mail className="w-4 h-4 shrink-0" />Email
                </a>
                <a href={SITE_CONFIG.whatsapp} target="_blank" rel="noopener noreferrer"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-green-500/10 hover:bg-green-500/15 border border-green-500/18 text-green-400 font-medium px-5 py-4 rounded-2xl transition-all text-sm">
                  <MessageCircle className="w-4 h-4 shrink-0" />WhatsApp
                </a>
              </div>
            </div>

            <p className="text-white/20 text-xs pt-1">
              Paiement en EUR · CHF · AED · QAR
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

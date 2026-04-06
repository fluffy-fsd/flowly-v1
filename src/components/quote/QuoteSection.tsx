"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import { QuoteProvider, useQuote } from "./QuoteContext";
import { Step1, Step2, Step3, Step4 } from "./QuoteSteps";

const STEPS = [{ n: 1, l: "Produit" }, { n: 2, l: "Délai" }, { n: 3, l: "Contexte" }, { n: 4, l: "Contact" }];

function Stepper() {
  const { state } = useQuote();
  return (
    <div className="flex items-center mb-8 sm:mb-10">
      {STEPS.map(({ n, l }, i) => {
        const done = state.step > n, active = state.step === n;
        return (
          <div key={n} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1">
              <div className={cn(
                "w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300",
                done ? "bg-indigo-500 border-indigo-500 text-white"
                  : active ? "bg-indigo-500/10 border-indigo-500 text-indigo-400"
                  : "bg-white/[0.035] border-white/[0.09] text-white/22"
              )}>
                {done ? <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5" strokeWidth={3} /> : n}
              </div>
              <span className={cn("text-[10px] sm:text-xs font-medium hidden sm:block",
                active ? "text-white" : done ? "text-white/42" : "text-white/18")}>
                {l}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className="flex-1 mx-1.5 sm:mx-2.5 h-px relative" style={{ marginBottom: done || active ? "14px" : "14px" }}>
                <div className="absolute inset-0 bg-white/[0.055]" />
                <motion.div className="absolute inset-0 bg-indigo-500" initial={{ scaleX: 0 }}
                  animate={{ scaleX: state.step > n ? 1 : 0 }}
                  style={{ transformOrigin: "left" }} transition={{ duration: 0.35 }} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function EstimatePill() {
  const { state } = useQuote();
  if (!state.data.product) return null;
  return (
    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-3 bg-indigo-500/10 border border-indigo-500/22 rounded-xl px-4 py-2.5 mb-5">
      <div>
        <p className="text-indigo-300/55 text-xs">Estimation</p>
        <p className="text-indigo-200 font-bold text-lg" style={{ fontFamily: "var(--font-syne)" }}>
          {formatCurrency(state.estimate.total)}
        </p>
      </div>
      <div className="border-l border-indigo-500/18 pl-3">
        <p className="text-indigo-300/55 text-xs">Livraison</p>
        <p className="text-indigo-200 text-sm font-medium">~{state.estimate.estimatedDays}j ouvrés</p>
      </div>
    </motion.div>
  );
}

function QuoteInner() {
  const { state } = useQuote();
  const steps = { 1: <Step1 />, 2: <Step2 />, 3: <Step3 />, 4: <Step4 /> };
  return (
    <div className="w-full">
      <Stepper />
      <EstimatePill />
      <AnimatePresence mode="wait">
        <motion.div key={state.step}
          initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}>
          {steps[state.step]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export function QuoteSection() {
  return (
    <section id="quote" className="py-20 sm:py-28" aria-labelledby="quote-title">
      <div className="fs-container">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14 space-y-3">
          <div className="flex items-center justify-center gap-2">
            <div className="w-px h-5 bg-indigo-400" />
            <p className="text-indigo-400 text-xs font-semibold tracking-[0.18em] uppercase">Devis instantané</p>
            <div className="w-px h-5 bg-indigo-400" />
          </div>
          <h2 id="quote-title"
            className="text-[clamp(1.75rem,6vw,3.2rem)] font-extrabold tracking-[-0.025em] text-white leading-[1.12]"
            style={{ fontFamily: "var(--font-syne)" }}>
            Configurez votre projet,<br />
            <span className="gradient-text">recevez votre devis.</span>
          </h2>
          <p className="text-white/32 max-w-sm mx-auto text-sm leading-relaxed">
            Estimation temps réel. Email en 2 minutes.
          </p>
        </motion.div>

        {/* Form card — full width mobile, max-w-2xl centered desktop */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}
          className="bg-white/[0.022] border border-white/[0.065] rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 max-w-2xl mx-auto shadow-2xl shadow-black/35">
          <QuoteProvider><QuoteInner /></QuoteProvider>
        </motion.div>

        {/* Trust indicators */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-8 sm:mt-10 text-white/22 text-xs">
          {["✓ Aucun engagement", "✓ Réponse sous 24h", "✓ Valable 30 jours", "✓ Confidentiel"].map(t => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

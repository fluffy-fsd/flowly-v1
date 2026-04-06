"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { FAQ_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-20 sm:py-28" aria-labelledby="faq-title">
      <div className="fs-container">
        {/* 1 col mobile, 5-col grid desktop */}
        <div className="flex flex-col lg:grid lg:grid-cols-5 gap-10 lg:gap-16">
          {/* Left label */}
          <div className="lg:col-span-2 space-y-4">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }} className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-px h-5 bg-indigo-400 shrink-0" />
                <p className="text-indigo-400 text-xs font-semibold tracking-[0.18em] uppercase">FAQ</p>
              </div>
              <h2 id="faq-title"
                className="text-[clamp(2rem,7vw,3.2rem)] font-extrabold tracking-[-0.025em] text-white leading-[1.1]"
                style={{ fontFamily: "var(--font-syne)" }}>
                Questions<br /><span className="text-white/22">fréquentes.</span>
              </h2>
            </motion.div>
            <p className="text-white/35 text-sm">Pas de réponse ici ?</p>
            <a href="mailto:doriangosselin6@gmail.com" className="inline-flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors">
              Contactez-nous →
            </a>
          </div>

          {/* Accordion */}
          <div className="lg:col-span-3">
            {FAQ_ITEMS.map((item, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}
                className="border-b border-white/[0.065] last:border-0">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 py-5 text-left group"
                  aria-expanded={open === i}
                >
                  <span className={cn("font-medium text-sm sm:text-[15px] transition-colors leading-snug",
                    open === i ? "text-white" : "text-white/60 group-hover:text-white/82")}>
                    {item.question}
                  </span>
                  <div className={cn("shrink-0 w-7 h-7 rounded-full flex items-center justify-center border transition-all",
                    open === i ? "bg-indigo-500/18 border-indigo-500/38 text-indigo-400" : "border-white/10 text-white/28")}>
                    {open === i ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </div>
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden">
                      <p className="text-white/42 text-sm leading-relaxed pb-5">{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

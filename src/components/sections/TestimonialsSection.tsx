"use client";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/constants";

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 sm:py-28 bg-white/[0.014] border-y border-white/[0.055]" aria-labelledby="testimonials-title">
      <div className="fs-container">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="flex flex-col gap-3 mb-10 sm:mb-14">
          <div className="flex items-center gap-2">
            <div className="w-px h-5 bg-indigo-400 shrink-0" />
            <p className="text-indigo-400 text-xs font-semibold tracking-[0.18em] uppercase">Témoignages</p>
          </div>
          <h2 id="testimonials-title"
            className="text-[clamp(2rem,7vw,3.2rem)] font-extrabold tracking-[-0.025em] text-white leading-[1.1]"
            style={{ fontFamily: "var(--font-syne)" }}>
            Ils nous font<br /><span className="text-white/22">confiance.</span>
          </h2>
        </motion.div>

        {/* 1 col mobile, 3 col lg+ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {TESTIMONIALS.map((t, i) => (
            <motion.blockquote key={t.id}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="fs-card rounded-2xl p-5 sm:p-7 flex flex-col gap-4">
              <div className="flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-white/55 text-sm leading-relaxed flex-1">&ldquo;{t.content}&rdquo;</p>
              <footer className="flex items-center gap-3 pt-4 border-t border-white/[0.055]">
                <div className="w-9 h-9 rounded-full bg-indigo-500/18 border border-indigo-500/28 flex items-center justify-center text-indigo-300 text-sm font-bold shrink-0">
                  {t.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="text-white font-semibold text-sm truncate">{t.name}</p>
                  <p className="text-white/32 text-xs truncate">{t.role} · {t.company}</p>
                </div>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

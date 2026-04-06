"use client";
import { motion } from "framer-motion";
import { Monitor, Smartphone, Cpu, Zap, ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { SERVICES } from "@/lib/constants";

const icons: Record<string, React.ElementType> = { monitor: Monitor, smartphone: Smartphone, cpu: Cpu, zap: Zap };
const techColors: Record<string, string> = {
  "Next.js": "bg-white/[0.07] text-white/55", "React": "bg-sky-500/10 text-sky-400",
  "TypeScript": "bg-blue-500/10 text-blue-400", "Tailwind": "bg-cyan-500/10 text-cyan-400",
  "React Native": "bg-sky-500/10 text-sky-400", "Expo": "bg-white/[0.07] text-white/55",
  "Firebase": "bg-amber-500/10 text-amber-400", "OpenAI": "bg-emerald-500/10 text-emerald-400",
  "Anthropic": "bg-orange-500/10 text-orange-400", "Pinecone": "bg-teal-500/10 text-teal-400",
  "LangChain": "bg-green-500/10 text-green-400", "Stripe": "bg-violet-500/10 text-violet-400",
  "Supabase": "bg-emerald-500/10 text-emerald-400", "Resend": "bg-pink-500/10 text-pink-400",
};

export function ServicesSection() {
  return (
    <section id="services" className="py-20 sm:py-28" aria-labelledby="services-title">
      <div className="fs-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="flex flex-col gap-3 mb-10 sm:mb-14"
        >
          <div className="flex items-center gap-2">
            <div className="w-px h-5 bg-indigo-400 shrink-0" />
            <p className="text-indigo-400 text-xs font-semibold tracking-[0.18em] uppercase">Services</p>
          </div>
          <h2
            id="services-title"
            className="text-[clamp(2rem,7vw,3.2rem)] font-extrabold tracking-[-0.025em] text-white leading-[1.1]"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Ce qu&apos;on construit<br />
            <span className="text-white/22">ensemble.</span>
          </h2>
          <p className="text-white/38 text-sm leading-relaxed max-w-sm">
            Chaque projet est architecturé sur mesure. Pas de templates.
          </p>
        </motion.div>

        {/* Grid — 1 col mobile, 2 col tablet+ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {SERVICES.map((s, i) => {
            const Icon = icons[s.icon] ?? Monitor;
            return (
              <motion.article
                key={s.id}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={cn("relative group fs-card rounded-2xl p-5 sm:p-7 flex flex-col gap-4 overflow-hidden", s.popular && "glow-border")}
              >
                {s.popular && (
                  <span className="absolute top-4 right-4 bg-indigo-500/18 border border-indigo-500/28 text-indigo-300 text-xs font-medium px-2.5 py-1 rounded-full">
                    Le + demandé
                  </span>
                )}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 to-indigo-500/0 group-hover:from-indigo-500/[0.03] group-hover:to-violet-500/[0.02] transition-all duration-500 pointer-events-none rounded-2xl" />

                <div className="w-10 h-10 sm:w-11 sm:h-11 bg-indigo-500/10 rounded-xl flex items-center justify-center">
                  <Icon className="w-5 h-5 text-indigo-400" strokeWidth={1.5} />
                </div>

                <div className="flex-1 space-y-2">
                  <h3 className="text-white font-bold text-base sm:text-lg leading-tight" style={{ fontFamily: "var(--font-syne)" }}>
                    {s.title}
                  </h3>
                  <p className="text-white/42 text-sm leading-relaxed">{s.description}</p>
                </div>

                <ul className="space-y-2">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-white/52">
                      <Check className="w-3.5 h-3.5 text-indigo-400/70 shrink-0 mt-0.5" strokeWidth={2.5} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5 pt-1 border-t border-white/[0.055]">
                  {s.stack.map((t) => (
                    <span key={t} className={cn("text-xs px-2.5 py-1 rounded-full font-medium", techColors[t] ?? "bg-white/[0.05] text-white/38")}>
                      {t}
                    </span>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 sm:mt-10 text-center"
        >
          <p className="text-white/28 text-sm mb-3">Besoin d&apos;une solution spécifique ?</p>
          <a href="mailto:doriangosselin6@gmail.com" className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-medium text-sm transition-colors group">
            Discutons de votre projet
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

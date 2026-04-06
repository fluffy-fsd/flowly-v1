"use client";
import { motion } from "framer-motion";
import { CheckCircle2, Clock, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";
import { PROJECTS } from "@/lib/constants";

const statusCfg = {
  delivered: { label: "Livré", icon: CheckCircle2, cls: "bg-green-500/10 text-green-400 border-green-500/20" },
  ongoing: { label: "En cours", icon: Clock, cls: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20" },
  "coming-soon": { label: "À venir", icon: Rocket, cls: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
};

export function ProjectsSection() {
  return (
    <section id="projects" className="py-20 sm:py-28 bg-white/[0.014] border-y border-white/[0.055]" aria-labelledby="projects-title">
      <div className="fs-container">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="flex flex-col gap-3 mb-10 sm:mb-14">
          <div className="flex items-center gap-2">
            <div className="w-px h-5 bg-indigo-400 shrink-0" />
            <p className="text-indigo-400 text-xs font-semibold tracking-[0.18em] uppercase">Réalisations</p>
          </div>
          <h2 id="projects-title" className="text-[clamp(2rem,7vw,3.2rem)] font-extrabold tracking-[-0.025em] text-white leading-[1.1]"
            style={{ fontFamily: "var(--font-syne)" }}>
            Projets récents.
          </h2>
        </motion.div>

        <div className="space-y-3">
          {PROJECTS.map((p, i) => {
            const st = statusCfg[p.status];
            const Icon = st.icon;
            return (
              <motion.article key={p.id}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="group fs-card rounded-2xl overflow-hidden">

                <div className="p-5 sm:p-8 flex flex-col gap-5">
                  {/* Meta + title */}
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={cn("inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border", st.cls)}>
                        <Icon className="w-3 h-3" />{st.label}
                      </span>
                      <span className="text-white/25 text-xs">{p.category}</span>
                    </div>
                    <h3 className="text-white font-bold text-xl sm:text-2xl" style={{ fontFamily: "var(--font-syne)" }}>{p.title}</h3>
                    <p className="text-white/42 text-sm leading-relaxed">{p.description}</p>
                  </div>

                  {/* Stack tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {p.stack.map((t) => (
                      <span key={t} className="bg-white/[0.04] text-white/38 text-xs px-3 py-1 rounded-full">{t}</span>
                    ))}
                  </div>

                  {/* Metrics row */}
                  {p.metrics && (
                    <div className="flex items-center gap-6 pt-2 border-t border-white/[0.055]">
                      {p.metrics.map((m) => (
                        <div key={m.label}>
                          <p className="font-bold text-xl sm:text-2xl" style={{ fontFamily: "var(--font-syne)", color: p.accentColor }}>
                            {m.value}
                          </p>
                          <p className="text-white/28 text-xs mt-0.5">{m.label}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Accent line on hover */}
                <div className="h-px w-0 group-hover:w-full transition-all duration-700 ease-out"
                  style={{ background: `linear-gradient(to right, transparent, ${p.accentColor}55, transparent)` }} />
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

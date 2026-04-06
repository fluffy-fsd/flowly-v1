"use client";
import { motion } from "framer-motion";
import { TECH_STACK } from "@/lib/constants";

const rows = [
  ["Next.js 15","React 19","TypeScript 5","Tailwind v4","React Native","Firebase","Supabase","PostgreSQL"],
  ["OpenAI API","Anthropic Claude","Stripe","Vercel","Framer Motion","Prisma","tRPC","Zod","Resend"],
];

export function StackSection() {
  return (
    <section id="stack" className="py-20 sm:py-28 overflow-hidden" aria-labelledby="stack-title">
      {/* Header */}
      <div className="fs-container mb-10 sm:mb-14">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <div className="w-px h-5 bg-indigo-400 shrink-0" />
            <p className="text-indigo-400 text-xs font-semibold tracking-[0.18em] uppercase">Stack technique</p>
          </div>
          <h2 id="stack-title"
            className="text-[clamp(2rem,7vw,3.2rem)] font-extrabold tracking-[-0.025em] text-white leading-[1.1]"
            style={{ fontFamily: "var(--font-syne)" }}>
            Technologies<br /><span className="text-white/22">de production.</span>
          </h2>
          <p className="text-white/35 text-sm">{TECH_STACK.length}+ technos maîtrisées.</p>
        </motion.div>
      </div>

      {/* Marquee rows */}
      <div className="space-y-3">
        {rows.map((row, ri) => {
          const doubled = [...row, ...row];
          return (
            <div key={ri} className="marquee-outer">
              <div className="marquee-track flex gap-3 w-max"
                style={{ animationDirection: ri === 1 ? "reverse" : "normal" }}>
                {doubled.map((t, i) => (
                  <div key={`${t}-${i}`}
                    className="flex items-center gap-2 bg-white/[0.03] border border-white/[0.065] rounded-xl px-3.5 sm:px-4 py-2 sm:py-2.5 whitespace-nowrap group hover:border-indigo-500/28 hover:bg-indigo-500/[0.04] transition-all duration-200 cursor-default">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400/45 group-hover:bg-indigo-400 transition-colors shrink-0" />
                    <span className="text-white/45 group-hover:text-white/75 text-xs sm:text-sm font-medium transition-colors">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Expertise cards — 1 col mobile, 3 col md+ */}
      <div className="fs-container mt-10 sm:mt-14">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {[
            { label: "Frontend", level: "Expert", desc: "React, Next.js, animations avancées, performance maximale", color: "#6366f1", pct: 95 },
            { label: "Backend & BDD", level: "Senior", desc: "Firebase, Supabase, PostgreSQL, API REST & tRPC", color: "#06b6d4", pct: 88 },
            { label: "IA & Agents", level: "Avancé", desc: "LLMs, RAG, fine-tuning, agents autonomes", color: "#10b981", pct: 82 },
          ].map((item, i) => (
            <motion.div key={item.label}
              initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              className="fs-card rounded-2xl p-5 sm:p-6 group">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-white/32 text-xs uppercase tracking-wider mb-1">{item.label}</p>
                  <p className="font-bold text-xl sm:text-2xl" style={{ fontFamily: "var(--font-syne)", color: item.color }}>{item.level}</p>
                </div>
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl opacity-15 group-hover:opacity-28 transition-opacity" style={{ background: item.color }} />
              </div>
              <p className="text-white/38 text-sm mb-4">{item.desc}</p>
              <div className="h-1 bg-white/[0.055] rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} whileInView={{ width: `${item.pct}%` }}
                  viewport={{ once: true }} transition={{ duration: 1.1, delay: 0.3 + i * 0.08, ease: "easeOut" }}
                  className="h-full rounded-full" style={{ background: `linear-gradient(to right, ${item.color}70, ${item.color})` }} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

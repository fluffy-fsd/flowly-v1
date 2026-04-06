"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, Sparkles, Globe, TrendingUp } from "lucide-react";
import { MARKETS } from "@/lib/constants";

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - t0) / 1800, 1);
          setVal(Math.round((1 - Math.pow(1 - p, 3)) * to));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref}>{val}{suffix}</span>;
}

export function HeroSection() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const [isCoarse, setIsCoarse] = useState(true);

  useEffect(() => {
    setIsCoarse(window.matchMedia("(pointer: coarse)").matches);
    const h = (e: MouseEvent) => { mx.set(e.clientX); my.set(e.clientY); };
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, [mx, my]);

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 64, behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-[100svh] flex items-center dot-grid overflow-hidden" aria-labelledby="hero-heading">
      {!isCoarse && <motion.div className="cursor-glow" style={{ left: sx, top: sy }} />}

      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-2/3 w-[min(900px,140vw)] h-[min(600px,100vw)] bg-indigo-600/[0.07] rounded-full blur-[110px]" />
        <div className="absolute bottom-0 right-0 w-[min(400px,60vw)] h-[min(300px,50vw)] bg-violet-600/[0.04] rounded-full blur-[90px]" />
      </div>

      <div className="fs-container relative w-full pt-28 pb-20">
        {/* Eyebrow */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-3.5 py-1.5 mb-7">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-400" />
          </span>
          <span className="text-indigo-300 text-xs sm:text-sm font-medium">Suisse · Émirats · Qatar · France</span>
        </motion.div>

        {/* H1 — unique */}
        <motion.h1 id="hero-heading"
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
          className="text-[clamp(2.4rem,9vw,5rem)] font-extrabold leading-[1.05] tracking-[-0.03em] mb-5"
          style={{ fontFamily: "var(--font-syne)" }}>
          <span className="gradient-text">SaaS &amp; Systèmes</span>
          <br />
          <span className="text-white">automatisés pour</span>
          <br />
          <span className="text-white/18">marchés exigeants.</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.22 }}
          className="text-base sm:text-lg text-white/45 leading-relaxed max-w-xl mb-10">
          Pas des sites vitrines — des systèmes qui fonctionnent sans vous. Commandes automatisées, gestion métier, SaaS complets. Déployés et rentables en semaines.
        </motion.p>

        {/* CTAs */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.35 }}
          className="flex flex-col sm:flex-row gap-3">
          <button onClick={() => scrollTo("#quote")}
            className="group inline-flex items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-400 active:scale-[0.98] text-white font-semibold px-6 py-3.5 rounded-2xl transition-all shadow-xl shadow-indigo-500/20 text-sm sm:text-base w-full sm:w-auto">
            <Sparkles className="w-4 h-4 shrink-0" />
            Devis gratuit
            <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-0.5 transition-transform" />
          </button>
          <button onClick={() => scrollTo("#projects")}
            className="inline-flex items-center justify-center gap-2 bg-white/[0.05] hover:bg-white/[0.09] active:scale-[0.98] text-white/65 hover:text-white font-medium px-6 py-3.5 rounded-2xl border border-white/[0.09] transition-all text-sm sm:text-base w-full sm:w-auto">
            <TrendingUp className="w-4 h-4 shrink-0" />
            Voir nos réalisations
          </button>
        </motion.div>

        {/* Markets strip */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-10 flex flex-wrap gap-2">
          {MARKETS.map((m) => (
            <div key={m.name} className="inline-flex items-center gap-2 bg-white/[0.04] border border-white/[0.07] rounded-xl px-3.5 py-2 text-sm">
              <span>{m.flag}</span>
              <div>
                <span className="text-white/70 font-medium text-xs">{m.name}</span>
                <span className="text-white/25 text-xs hidden sm:inline"> · {m.cities}</span>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-14 pt-8 border-t border-white/[0.065] grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[
            { to: 15, suffix: "+", label: "Projets déployés" },
            { to: 4, suffix: " pays", label: "Marchés couverts" },
            { to: 3, suffix: " ans", label: "D'expertise" },
            { to: 100, suffix: "%", label: "Code propriétaire" },
          ].map((s) => (
            <div key={s.label} className="space-y-1">
              <p className="font-extrabold text-3xl sm:text-[2.2rem] text-white tabular-nums" style={{ fontFamily: "var(--font-syne)" }}>
                <Counter to={s.to} suffix={s.suffix} />
              </p>
              <p className="text-xs sm:text-sm text-white/32">{s.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Floating badge — desktop */}
        <motion.div initial={{ opacity: 0, scale: 0.85, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
          className="absolute top-24 right-4 xl:right-14 hidden lg:flex items-center gap-3 bg-[#0e1220]/92 backdrop-blur-xl border border-white/[0.09] rounded-2xl px-4 py-3 shadow-2xl">
          <div className="w-8 h-8 bg-indigo-500/18 rounded-lg flex items-center justify-center">
            <Globe className="w-4 h-4 text-indigo-400" />
          </div>
          <div>
            <p className="text-white text-xs font-semibold">Marchés premium</p>
            <p className="text-white/32 text-xs">🇨🇭 🇫🇷 🇦🇪 🇶🇦</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.85, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
          className="absolute top-48 right-0 xl:right-8 hidden lg:flex items-center gap-3 bg-[#0e1220]/92 backdrop-blur-xl border border-white/[0.09] rounded-2xl px-4 py-3 shadow-2xl">
          <div className="w-8 h-8 bg-orange-500/18 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-orange-400" />
          </div>
          <div>
            <p className="text-white text-xs font-semibold">ROI mesuré</p>
            <p className="text-white/32 text-xs">+40% CA moyen client</p>
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2" aria-hidden>
        <span className="text-white/18 text-[10px] tracking-[0.2em] uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 7, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          className="w-px h-7 bg-gradient-to-b from-white/18 to-transparent" />
      </motion.div>
    </section>
  );
}

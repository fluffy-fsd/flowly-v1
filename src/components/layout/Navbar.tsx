"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_ITEMS, SITE_CONFIG } from "@/lib/constants";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const lastY = useRef(0);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > lastY.current && y > 100);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isHome) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    document.querySelectorAll("section[id]").forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, [isHome]);

  const handleAnchorClick = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("#") && isHome) {
      const el = document.querySelector(href);
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: hidden ? -80 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300",
          scrolled ? "bg-[#07090f]/88 backdrop-blur-xl border-b border-white/[0.06] shadow-2xl shadow-black/30" : "bg-transparent"
        )}
      >
        <nav className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between" role="navigation" aria-label="Navigation principale">
          <Link href="/" className="flex items-center gap-2.5 group" aria-label="FStudios — Accueil">
            <div className="w-8 h-8 bg-indigo-500/15 group-hover:bg-indigo-500/25 rounded-lg flex items-center justify-center transition-colors duration-200">
              <span className="text-indigo-400 font-extrabold text-base leading-none" style={{ fontFamily: "var(--font-syne)" }}>F</span>
            </div>
            <span className="text-white font-bold text-xl tracking-tight" style={{ fontFamily: "var(--font-syne)" }}>Studios</span>
          </Link>

          <ul className="hidden md:flex items-center gap-0.5" role="list">
            {NAV_ITEMS.map((item) => {
              const sectionId = item.href.replace("#", "");
              const isActive = isHome ? activeSection === sectionId : pathname.startsWith(item.href);
              const isExternal = item.href.startsWith("/");
              return (
                <li key={item.href}>
                  {isExternal ? (
                    <Link href={item.href} className={cn("relative px-4 py-2 text-sm rounded-lg transition-colors", isActive ? "text-white" : "text-white/48 hover:text-white/85")}>
                      {isActive && <motion.span layoutId="nav-pill" className="absolute inset-0 bg-white/[0.07] rounded-lg" transition={{ type: "spring", bounce: 0.2, duration: 0.5 }} />}
                      <span className="relative">{item.label}</span>
                    </Link>
                  ) : (
                    <button onClick={() => handleAnchorClick(item.href)} className={cn("relative px-4 py-2 text-sm rounded-lg transition-colors", isActive ? "text-white" : "text-white/48 hover:text-white/85")}>
                      {isActive && <motion.span layoutId="nav-pill" className="absolute inset-0 bg-white/[0.07] rounded-lg" transition={{ type: "spring", bounce: 0.2, duration: 0.5 }} />}
                      <span className="relative">{item.label}</span>
                    </button>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3">
            <button onClick={() => handleAnchorClick("#quote")} className="hidden sm:inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-400 active:scale-[0.97] text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all shadow-lg shadow-indigo-500/20">
              Devis gratuit <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button onClick={() => setMobileOpen((p) => !p)} className="md:hidden p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/[0.06] transition-colors" aria-label="Menu">
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-black/65 backdrop-blur-sm md:hidden" onClick={() => setMobileOpen(false)} />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 28, stiffness: 300 }} className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-[#0c1018] border-l border-white/[0.07] flex flex-col md:hidden">
              <div className="h-16 px-5 flex items-center justify-between border-b border-white/[0.07]">
                <span className="text-white font-bold text-lg" style={{ fontFamily: "var(--font-syne)" }}>F<span className="text-indigo-400">Studios</span></span>
                <button onClick={() => setMobileOpen(false)} className="p-1.5 rounded-lg text-white/40 hover:text-white"><X className="w-5 h-5" /></button>
              </div>
              <nav className="flex-1 p-5 space-y-1">
                {NAV_ITEMS.map((item, i) => (
                  <motion.div key={item.href} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                    {item.href.startsWith("/") ? (
                      <Link href={item.href} onClick={() => setMobileOpen(false)} className="block px-4 py-3 text-white/65 hover:text-white hover:bg-white/[0.05] rounded-xl text-sm font-medium transition-colors">{item.label}</Link>
                    ) : (
                      <button onClick={() => handleAnchorClick(item.href)} className="w-full text-left px-4 py-3 text-white/65 hover:text-white hover:bg-white/[0.05] rounded-xl text-sm font-medium transition-colors">{item.label}</button>
                    )}
                  </motion.div>
                ))}
              </nav>
              <div className="p-5 border-t border-white/[0.07] space-y-3">
                <button onClick={() => { setMobileOpen(false); handleAnchorClick("#quote"); }} className="w-full bg-indigo-500 hover:bg-indigo-400 text-white font-semibold py-3 rounded-xl text-sm flex items-center justify-center gap-2 transition-colors">
                  Devis gratuit <ArrowRight className="w-4 h-4" />
                </button>
                <a href={`mailto:${SITE_CONFIG.email}`} className="w-full block text-center bg-white/[0.04] text-white/50 py-3 rounded-xl text-sm transition-colors hover:bg-white/[0.07]">{SITE_CONFIG.email}</a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

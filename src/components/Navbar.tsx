"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/context/LanguageContext";

export default function Navbar() {
  const { t } = useLang();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [notifIndex, setNotifIndex] = useState(0);

  const navLinks = [
    { label: t.nav.services, href: "#services" },
    { label: t.nav.realisations, href: "#realisations" },
    { label: t.nav.processus, href: "#processus" },
    { label: t.nav.blog, href: "/blog" },
  ];

  // Scroll effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Notification rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setNotifIndex((prev) => (prev + 1) % t.notifications.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [t.notifications.length]);

  return (
    <>
      {/* Top Notification Bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-blue-50 via-white to-blue-50 backdrop-blur-xl border-b border-blue-100 text-blue-700 text-sm">
        <div className="flex items-center justify-center h-9 px-4">
          <AnimatePresence mode="wait">
            <motion.span
              key={notifIndex}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.4 }}
              className="whitespace-nowrap font-medium"
            >
              {t.notifications[notifIndex]}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      {/* Navbar */}
      <nav
        className={`fixed top-9 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/70 backdrop-blur-xl shadow-sm border-b border-blue-100"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* Logo */}
            <a href="/" className="flex items-center gap-2.5 group">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center shadow-md"
                style={{ background: "linear-gradient(135deg, #3b82f6, #2563eb)" }}
              >
                <span
                  className="text-white font-bold text-sm"
                  style={{ fontFamily: "var(--font-sora)" }}
                >
                  F
                </span>
              </div>
              <span
                className="font-bold text-lg tracking-tight text-slate-900"
                style={{ fontFamily: "var(--font-sora)" }}
              >
                Flowly
              </span>
            </a>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-slate-500 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Devis gratuit */}
              <a
                href="#devis"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-xl shadow-md hover:shadow-blue-200 transition-all duration-300 hover:-translate-y-0.5"
                style={{ background: "linear-gradient(135deg, #3b82f6, #2563eb)" }}
              >
                {t.nav.devis}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>

              {/* Se connecter */}
              <a
                href="/auth"
                className="px-4 py-2.5 text-sm font-semibold text-slate-700 hover:text-blue-600 rounded-xl hover:bg-blue-50 transition-all duration-200"
              >
                {t.nav.signin}
              </a>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-xl hover:bg-slate-100 transition-colors"
              aria-label="Menu"
            >
              <div className="w-5 flex flex-col gap-1.5">
                <span className={`block h-0.5 bg-slate-700 transition-all ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
                <span className={`block h-0.5 bg-slate-700 transition-all ${isOpen ? "opacity-0" : ""}`} />
                <span className={`block h-0.5 bg-slate-700 transition-all ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-blue-100"
            >
              <div className="px-5 py-6 space-y-1">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="block px-4 py-3 text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl"
                  >
                    {link.label}
                  </motion.a>
                ))}

                <motion.a
                  href="#devis"
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="block mt-4 px-4 py-3 text-center text-white font-semibold rounded-xl shadow-md"
                  style={{ background: "linear-gradient(135deg, #3b82f6, #2563eb)" }}
                >
                  {t.nav.devis} →
                </motion.a>

                {/* Mobile Se connecter */}
                <motion.a
                  href="/auth"
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="block mt-2 px-4 py-3 text-center text-blue-600 font-semibold rounded-xl border border-blue-200 hover:bg-blue-50 transition-colors"
                >
                  {t.nav.signin}
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/context/LanguageContext";

type Tab = "login" | "signup";

export default function AuthPage() {
  const { t } = useLang();
  const [tab, setTab] = useState<Tab>("login");
  const [agreed, setAgreed] = useState(false);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #f0f4ff 0%, #ffffff 50%, #f0f4ff 100%)" }}
    >
      {/* Background blobs */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl -z-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(219,228,255,0.6), transparent)" }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-3xl -z-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(224,242,254,0.5), transparent)" }}
      />

      {/* Grid pattern */}
      <svg
        className="absolute inset-0 -z-10 h-full w-full"
        style={{ stroke: "rgba(226,232,240,0.5)" }}
        aria-hidden="true"
      >
        <defs>
          <pattern id="auth-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M60 0V60M0 60H60" fill="none" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" strokeWidth="0" fill="url(#auth-grid)" />
      </svg>

      {/* Back + Language switcher row */}
      <div className="w-full max-w-md flex items-center justify-between mb-8">
        <a
          href="/"
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 transition-colors font-medium"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          {t.auth.backHome.replace("← ", "")}
        </a>

      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <a href="/" className="flex items-center gap-2.5 mb-6">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
              style={{ background: "linear-gradient(135deg, #4c6ef5, #3b5bdb)" }}
            >
              <span className="text-white font-bold text-base" style={{ fontFamily: "var(--font-sora)" }}>
                F
              </span>
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900" style={{ fontFamily: "var(--font-sora)" }}>
              Flowly
            </span>
          </a>

          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <h1
                className="text-2xl font-bold text-slate-900 mb-1"
                style={{ fontFamily: "var(--font-sora)" }}
              >
                {tab === "login" ? t.auth.loginTitle : t.auth.signupTitle}
              </h1>
              <p className="text-slate-500 text-sm">
                {tab === "login" ? t.auth.loginSubtitle : t.auth.signupSubtitle}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Card body */}
        <div
          className="rounded-3xl p-8 shadow-xl"
          style={{
            background: "#ffffff",
            border: "1px solid rgba(226,232,240,0.8)",
            boxShadow: "0 20px 60px rgba(76,110,245,0.08), 0 4px 16px rgba(0,0,0,0.04)",
          }}
        >
          {/* Tabs */}
          <div
            className="flex gap-1 p-1 rounded-2xl mb-8"
            style={{ background: "#f1f5f9" }}
          >
            {(["login", "signup"] as Tab[]).map((t_tab) => (
              <button
                key={t_tab}
                onClick={() => setTab(t_tab)}
                className="flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300"
                style={{
                  background: tab === t_tab ? "#ffffff" : "transparent",
                  color: tab === t_tab ? "#4263eb" : "#64748b",
                  boxShadow: tab === t_tab ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
                }}
              >
                {t_tab === "login" ? t.auth.loginTab : t.auth.signupTab}
              </button>
            ))}
          </div>

          {/* Form */}
          <AnimatePresence mode="wait">
            <motion.form
              key={tab}
              initial={{ opacity: 0, x: tab === "login" ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: tab === "login" ? 20 : -20 }}
              transition={{ duration: 0.3 }}
              onSubmit={(e) => e.preventDefault()}
              className="space-y-5"
            >
              {/* Name (signup only) */}
              {tab === "signup" && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    {t.auth.nameLabel}
                  </label>
                  <input
                    type="text"
                    placeholder={t.auth.namePlaceholder}
                    className="w-full px-4 py-3 rounded-xl text-sm text-slate-900 placeholder-slate-400 outline-none transition-all duration-200"
                    style={{
                      border: "1.5px solid #e2e8f0",
                      background: "#f8fafc",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#4c6ef5";
                      e.target.style.background = "#fff";
                      e.target.style.boxShadow = "0 0 0 3px rgba(76,110,245,0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#e2e8f0";
                      e.target.style.background = "#f8fafc";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>
              )}

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  {t.auth.emailLabel}
                </label>
                <input
                  type="email"
                  placeholder={t.auth.emailPlaceholder}
                  className="w-full px-4 py-3 rounded-xl text-sm text-slate-900 placeholder-slate-400 outline-none transition-all duration-200"
                  style={{
                    border: "1.5px solid #e2e8f0",
                    background: "#f8fafc",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#4c6ef5";
                    e.target.style.background = "#fff";
                    e.target.style.boxShadow = "0 0 0 3px rgba(76,110,245,0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#e2e8f0";
                    e.target.style.background = "#f8fafc";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-sm font-medium text-slate-700">
                    {t.auth.passwordLabel}
                  </label>
                  {tab === "login" && (
                    <a href="#" className="text-xs text-blue-600 hover:underline font-medium">
                      {t.auth.forgotPassword}
                    </a>
                  )}
                </div>
                <input
                  type="password"
                  placeholder={t.auth.passwordPlaceholder}
                  className="w-full px-4 py-3 rounded-xl text-sm text-slate-900 placeholder-slate-400 outline-none transition-all duration-200"
                  style={{
                    border: "1.5px solid #e2e8f0",
                    background: "#f8fafc",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#4c6ef5";
                    e.target.style.background = "#fff";
                    e.target.style.boxShadow = "0 0 0 3px rgba(76,110,245,0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#e2e8f0";
                    e.target.style.background = "#f8fafc";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              {/* Terms (signup only) */}
              {tab === "signup" && (
                <label className="flex items-start gap-3 cursor-pointer">
                  <div className="relative mt-0.5 flex-shrink-0">
                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      className="sr-only"
                    />
                    <div
                      className="w-4.5 h-4.5 rounded flex items-center justify-center transition-all duration-200"
                      style={{
                        width: "18px",
                        height: "18px",
                        background: agreed ? "linear-gradient(135deg, #4c6ef5, #3b5bdb)" : "#f1f5f9",
                        border: agreed ? "none" : "1.5px solid #cbd5e1",
                      }}
                    >
                      {agreed && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <span className="text-xs text-slate-500 leading-relaxed">
                    {t.auth.agreeTerms}{" "}
                    <a href="/conditions-utilisation" className="text-blue-600 hover:underline">
                      {t.auth.termsLink}
                    </a>{" "}
                    {t.auth.andThe}{" "}
                    <a href="/politique-confidentialite" className="text-blue-600 hover:underline">
                      {t.auth.privacyLink}
                    </a>
                  </span>
                </label>
              )}

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-3.5 text-sm font-semibold text-white rounded-xl transition-all duration-300 hover:-translate-y-0.5 mt-2"
                style={{
                  background: "linear-gradient(135deg, #4c6ef5, #4263eb)",
                  boxShadow: "0 8px 30px rgba(76,110,245,0.3)",
                }}
              >
                {tab === "login" ? t.auth.loginBtn : t.auth.signupBtn}
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3 my-2">
                <div className="flex-1 h-px" style={{ background: "#e2e8f0" }} />
                <span className="text-xs text-slate-400">{t.auth.orContinueWith}</span>
                <div className="flex-1 h-px" style={{ background: "#e2e8f0" }} />
              </div>

              {/* Google OAuth placeholder */}
              <button
                type="button"
                className="w-full py-3 text-sm font-semibold text-slate-700 rounded-xl transition-all duration-200 hover:bg-slate-50 flex items-center justify-center gap-3"
                style={{ border: "1.5px solid #e2e8f0" }}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Google
              </button>

              {/* Switch tab */}
              <p className="text-center text-sm text-slate-500 mt-4">
                {tab === "login" ? t.auth.noAccount : t.auth.hasAccount}{" "}
                <button
                  type="button"
                  onClick={() => setTab(tab === "login" ? "signup" : "login")}
                  className="font-semibold text-blue-600 hover:underline"
                >
                  {tab === "login" ? t.auth.signupTab : t.auth.loginTab}
                </button>
              </p>
            </motion.form>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

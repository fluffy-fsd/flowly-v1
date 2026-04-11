"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const projectTypes = [
  { id: "vitrine", label: "Site vitrine", icon: "🌐", desc: "1 à 10 pages" },
  { id: "saas", label: "Application SaaS", icon: "⚡", desc: "Dashboard, API, auth" },
  { id: "mobile", label: "App mobile", icon: "📱", desc: "iOS & Android" },
  { id: "ecommerce", label: "E-commerce", icon: "🛒", desc: "Boutique en ligne" },
  { id: "refonte", label: "Refonte", icon: "🔄", desc: "Site existant" },
  { id: "autre", label: "Autre", icon: "✨", desc: "Projet spécifique" },
];

const budgets = [
  { id: "starter", label: "< 1 000€", range: "Pack Starter" },
  { id: "medium", label: "1 000€ – 3 000€", range: "Business" },
  { id: "high", label: "3 000€ – 8 000€", range: "Premium" },
  { id: "custom", label: "8 000€ +", range: "Sur-mesure" },
  { id: "unknown", label: "Je ne sais pas", range: "On en discute" },
];

const timelines = [
  { id: "urgent", label: "< 2 semaines", emoji: "🔥" },
  { id: "normal", label: "2 – 4 semaines", emoji: "📅" },
  { id: "relaxed", label: "1 – 2 mois", emoji: "🌿" },
  { id: "flexible", label: "Pas de deadline", emoji: "♾️" },
];

export default function DevisForm() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({ projectType: "", budget: "", timeline: "", name: "", email: "", company: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const totalSteps = 4;

  const updateField = (field: string, value: string) => setFormData((prev) => ({ ...prev, [field]: value }));
  const nextStep = () => { if (step < totalSteps - 1) setStep(step + 1); };
  const prevStep = () => { if (step > 0) setStep(step - 1); };
  const handleSubmit = () => setSubmitted(true);

  const canProceed = () => {
    switch (step) {
      case 0: return formData.projectType !== "";
      case 1: return formData.budget !== "";
      case 2: return formData.timeline !== "";
      case 3: return formData.name !== "" && formData.email !== "";
      default: return false;
    }
  };

  const selectedStyle = { border: "2px solid #4c6ef5", background: "#f0f4ff", boxShadow: "0 4px 12px rgba(76,110,245,0.12)" };
  const unselectedStyle = { border: "2px solid #e2e8f0", background: "#ffffff" };

  return (
    <section id="devis" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: "#4c6ef5" }}>Devis gratuit</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900" style={{ fontFamily: "var(--font-sora)" }}>
            Estimez votre projet en <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, #4c6ef5, #3b5bdb)" }}>2 minutes</span>
          </h2>
          <p className="mt-4 text-lg text-slate-500">Répondez à quelques questions et recevez une estimation personnalisée.</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden" style={{ border: "1px solid #e2e8f0", boxShadow: "0 20px 60px rgba(0,0,0,0.06)" }}>
          {/* Progress */}
          <div className="px-8 pt-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-slate-400">Étape {step + 1} / {totalSteps}</span>
              <span className="text-xs font-medium" style={{ color: "#4c6ef5" }}>{Math.round(((step + 1) / totalSteps) * 100)}%</span>
            </div>
            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <motion.div className="h-full rounded-full" style={{ background: "linear-gradient(90deg, #5c7cfa, #4c6ef5)" }} initial={{ width: "0%" }} animate={{ width: `${((step + 1) / totalSteps) * 100}%` }} transition={{ duration: 0.4 }} />
            </div>
          </div>

          <div className="p-8 min-h-[400px] flex flex-col">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex-1 flex flex-col items-center justify-center text-center py-12">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6" style={{ background: "#ecfdf5" }}>
                    <svg className="w-10 h-10" style={{ color: "#10b981" }} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2" style={{ fontFamily: "var(--font-sora)" }}>Demande envoyée !</h3>
                  <p className="text-slate-500 max-w-md">Merci {formData.name}. Notre équipe revient vers vous sous 24h avec une proposition détaillée.</p>
                </motion.div>
              ) : (
                <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }} className="flex-1">
                  {step === 0 && (
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-1" style={{ fontFamily: "var(--font-sora)" }}>Quel type de projet ?</h3>
                      <p className="text-sm text-slate-500 mb-6">Sélectionnez le type de solution qui correspond à votre besoin.</p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {projectTypes.map((t) => (
                          <button key={t.id} onClick={() => updateField("projectType", t.id)} className="p-4 rounded-2xl text-left transition-all duration-200 hover:shadow-md" style={formData.projectType === t.id ? selectedStyle : unselectedStyle}>
                            <span className="text-2xl mb-2 block">{t.icon}</span>
                            <p className="font-semibold text-sm text-slate-900">{t.label}</p>
                            <p className="text-xs text-slate-400 mt-0.5">{t.desc}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  {step === 1 && (
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-1" style={{ fontFamily: "var(--font-sora)" }}>Quel est votre budget ?</h3>
                      <p className="text-sm text-slate-500 mb-6">Donnez-nous une idée pour vous orienter vers l&apos;offre adaptée.</p>
                      <div className="space-y-3">
                        {budgets.map((b) => (
                          <button key={b.id} onClick={() => updateField("budget", b.id)} className="w-full p-4 rounded-2xl text-left flex items-center justify-between transition-all duration-200 hover:shadow-md" style={formData.budget === b.id ? selectedStyle : unselectedStyle}>
                            <span className="font-semibold text-sm text-slate-900">{b.label}</span>
                            <span className="text-xs px-2.5 py-1 rounded-lg font-medium" style={{ background: formData.budget === b.id ? "#dbe4ff" : "#f1f5f9", color: formData.budget === b.id ? "#4263eb" : "#64748b" }}>{b.range}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  {step === 2 && (
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-1" style={{ fontFamily: "var(--font-sora)" }}>Quel délai souhaitez-vous ?</h3>
                      <p className="text-sm text-slate-500 mb-6">Cela nous aide à planifier et prioriser votre projet.</p>
                      <div className="grid grid-cols-2 gap-3">
                        {timelines.map((t) => (
                          <button key={t.id} onClick={() => updateField("timeline", t.id)} className="p-5 rounded-2xl text-center transition-all duration-200 hover:shadow-md" style={formData.timeline === t.id ? selectedStyle : unselectedStyle}>
                            <span className="text-3xl mb-2 block">{t.emoji}</span>
                            <p className="font-semibold text-sm text-slate-900">{t.label}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  {step === 3 && (
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-1" style={{ fontFamily: "var(--font-sora)" }}>Vos coordonnées</h3>
                      <p className="text-sm text-slate-500 mb-6">Pour vous envoyer votre estimation personnalisée.</p>
                      <div className="space-y-4">
                        {[
                          { label: "Nom complet *", field: "name", type: "text", placeholder: "Jean Dupont" },
                          { label: "Email professionnel *", field: "email", type: "email", placeholder: "jean@entreprise.com" },
                          { label: "Entreprise", field: "company", type: "text", placeholder: "Mon Entreprise SAS (optionnel)" },
                        ].map((input) => (
                          <div key={input.field}>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">{input.label}</label>
                            <input type={input.type} value={(formData as Record<string, string>)[input.field]} onChange={(e) => updateField(input.field, e.target.value)} className="w-full px-4 py-3 rounded-xl text-sm transition-all outline-none" style={{ border: "2px solid #e2e8f0" }} onFocus={(e) => { e.target.style.borderColor = "#4c6ef5"; e.target.style.boxShadow = "0 0 0 3px rgba(76,110,245,0.1)"; }} onBlur={(e) => { e.target.style.borderColor = "#e2e8f0"; e.target.style.boxShadow = "none"; }} placeholder={input.placeholder} />
                          </div>
                        ))}
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1.5">Décrivez votre projet</label>
                          <textarea value={formData.message} onChange={(e) => updateField("message", e.target.value)} rows={3} className="w-full px-4 py-3 rounded-xl text-sm transition-all outline-none resize-none" style={{ border: "2px solid #e2e8f0" }} onFocus={(e) => { e.target.style.borderColor = "#4c6ef5"; e.target.style.boxShadow = "0 0 0 3px rgba(76,110,245,0.1)"; }} onBlur={(e) => { e.target.style.borderColor = "#e2e8f0"; e.target.style.boxShadow = "none"; }} placeholder="Décrivez brièvement votre projet..." />
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {!submitted && (
              <div className="flex items-center justify-between mt-8 pt-6" style={{ borderTop: "1px solid #f1f5f9" }}>
                <button onClick={prevStep} className={`flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-slate-600 rounded-xl hover:bg-slate-50 transition-all ${step === 0 ? "opacity-0 pointer-events-none" : ""}`}>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
                  Retour
                </button>
                {step < totalSteps - 1 ? (
                  <button onClick={nextStep} disabled={!canProceed()} className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white rounded-xl transition-all duration-300 hover:-translate-y-0.5" style={{ background: canProceed() ? "linear-gradient(135deg, #4c6ef5, #4263eb)" : "#e2e8f0", color: canProceed() ? "#ffffff" : "#94a3b8", cursor: canProceed() ? "pointer" : "not-allowed", boxShadow: canProceed() ? "0 8px 25px rgba(76,110,245,0.2)" : "none" }}>
                    Continuer
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                  </button>
                ) : (
                  <button onClick={handleSubmit} disabled={!canProceed()} className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white rounded-xl transition-all duration-300 hover:-translate-y-0.5" style={{ background: canProceed() ? "linear-gradient(135deg, #10b981, #059669)" : "#e2e8f0", color: canProceed() ? "#ffffff" : "#94a3b8", cursor: canProceed() ? "pointer" : "not-allowed" }}>
                    Envoyer ma demande
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                  </button>
                )}
              </div>
            )}
          </div>

          {!submitted && (
            <div className="px-8 pb-6">
              <p className="text-[11px] text-slate-400 leading-relaxed">
                En soumettant ce formulaire, vous acceptez que vos données soient traitées par Flowly (FStudios &amp; Volostudios) conformément à notre <a href="/politique-confidentialite" className="underline hover:text-slate-600">politique de confidentialité</a>. Vos données sont utilisées uniquement pour répondre à votre demande de devis. Vous disposez d&apos;un droit d&apos;accès, de rectification et de suppression (RGPD, art. 15-17).
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

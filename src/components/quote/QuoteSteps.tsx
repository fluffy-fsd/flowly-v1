"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowLeft, ArrowRight, Monitor, Smartphone, Cpu, Zap, ShoppingBag, BarChart2, PenTool, Clock, Zap as ZapIcon, Flame, Send, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { cn, formatCurrency, formatDate } from "@/lib/utils";
import { QUOTE_PRODUCTS, QUOTE_ADDONS, DELIVERY_SPEEDS } from "@/lib/constants";
import { useQuote } from "./QuoteContext";
import type { ProductCategory, ProductAddOn, DeliverySpeed } from "@/types";

const icons: Record<string, React.ElementType> = {
  layout: Monitor, monitor: Monitor, smartphone: Smartphone,
  cpu: Cpu, zap: Zap, "shopping-bag": ShoppingBag, "bar-chart-2": BarChart2, "pen-tool": PenTool
};

/* ─── STEP 1 — Product + Add-ons ─── */
export function Step1() {
  const { state, setProduct, toggleAddOn, next } = useQuote();
  const { data } = state;

  return (
    <div className="space-y-6">
      <div>
        <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-3">
          Quel type de projet ? <span className="text-indigo-400 normal-case tracking-normal font-normal">*</span>
        </p>
        {/* 1 col mobile, 2 col sm+ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {QUOTE_PRODUCTS.map((p) => {
            const Icon = icons[p.icon] ?? Monitor;
            const sel = data.product === p.id;
            return (
              <button key={p.id} onClick={() => setProduct(p.id as ProductCategory)}
                className={cn(
                  "relative text-left p-4 rounded-xl border transition-all duration-200",
                  sel ? "bg-indigo-500/10 border-indigo-500/45 glow-border" : "bg-white/[0.025] border-white/[0.065] hover:border-white/14 active:border-indigo-500/30"
                )}>
                {p.tag && (
                  <span className={cn("absolute top-3 right-3 text-xs font-medium px-2 py-0.5 rounded-full",
                    sel ? "bg-indigo-500/28 text-indigo-200" : "bg-white/[0.06] text-white/38")}>
                    {p.tag}
                  </span>
                )}
                <div className="flex items-start gap-3">
                  <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors",
                    sel ? "bg-indigo-500/18" : "bg-white/[0.05]")}>
                    <Icon className={cn("w-4 h-4", sel ? "text-indigo-400" : "text-white/38")} strokeWidth={1.5} />
                  </div>
                  <div className="flex-1 min-w-0 pr-6 sm:pr-8">
                    <p className={cn("font-semibold text-sm leading-snug mb-0.5", sel ? "text-white" : "text-white/65")}>
                      {p.name}
                    </p>
                    <p className="text-white/30 text-xs leading-relaxed line-clamp-2">{p.description}</p>
                    <p className={cn("font-bold text-sm mt-1.5", sel ? "text-indigo-300" : "text-white/45")}>
                      {formatCurrency(p.basePrice)}{" "}
                      <span className="font-normal text-white/22 text-xs">~{p.estimatedDays}j</span>
                    </p>
                  </div>
                  {sel && (
                    <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" strokeWidth={3} />
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {data.product && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
            <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-3">
              Options{" "}<span className="text-white/22 font-normal normal-case tracking-normal">(optionnel)</span>
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {QUOTE_ADDONS.map((a) => {
                const chk = (data.addOns ?? []).includes(a.id as ProductAddOn);
                return (
                  <button key={a.id} onClick={() => toggleAddOn(a.id as ProductAddOn)}
                    className={cn(
                      "flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all",
                      chk ? "bg-indigo-500/[0.07] border-indigo-500/32" : "bg-white/[0.02] border-white/[0.055] hover:border-white/11 active:border-indigo-500/25"
                    )}>
                    <div className={cn("w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all",
                      chk ? "bg-indigo-500 border-indigo-500" : "border-white/18")}>
                      {chk && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={cn("font-medium text-sm leading-snug", chk ? "text-white" : "text-white/52")}>{a.name}</p>
                      <p className="text-white/28 text-xs mt-0.5 truncate">{a.description}</p>
                    </div>
                    <span className={cn("text-sm font-semibold shrink-0 ml-2", chk ? "text-indigo-300" : "text-white/32")}>
                      +{formatCurrency(a.price)}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-end pt-1">
        <button onClick={next} disabled={!data.product}
          className={cn("inline-flex items-center gap-2 font-semibold px-6 py-3.5 rounded-xl transition-all text-sm",
            data.product ? "bg-indigo-500 hover:bg-indigo-400 text-white shadow-lg shadow-indigo-500/18 active:scale-[0.98]"
              : "bg-white/[0.04] text-white/22 cursor-not-allowed")}>
          Continuer <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

/* ─── STEP 2 — Delivery ─── */
const speeds = [
  { id: "standard" as DeliverySpeed, label: "Standard", desc: "Meilleur tarif", icon: Clock, color: "text-white/55" },
  { id: "express" as DeliverySpeed, label: "Express", desc: "+40% de délai en moins", icon: ZapIcon, color: "text-amber-400" },
  { id: "urgent" as DeliverySpeed, label: "Urgent", desc: "Priorité absolue — ×2", icon: Flame, color: "text-red-400" },
];

export function Step2() {
  const { state, setDelivery, next, prev } = useQuote();
  const { data, estimate } = state;
  const product = QUOTE_PRODUCTS.find(p => p.id === data.product);
  const addOnsTotal = (data.addOns ?? []).reduce((a, id) => a + (QUOTE_ADDONS.find(x => x.id === id)?.price ?? 0), 0);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-3">Délai souhaité</p>
        {/* 3 col always — they're short enough */}
        <div className="grid grid-cols-3 gap-2">
          {speeds.map(({ id, label, desc, icon: Icon, color }) => {
            const sel = data.delivery === id;
            return (
              <button key={id} onClick={() => setDelivery(id)}
                className={cn("text-left p-3.5 sm:p-4 rounded-xl border transition-all duration-200",
                  sel ? "bg-indigo-500/10 border-indigo-500/45" : "bg-white/[0.025] border-white/[0.065] hover:border-white/14")}>
                <Icon className={cn("w-4 h-4 mb-2", sel ? "text-indigo-400" : color)} />
                <p className={cn("font-semibold text-xs sm:text-sm mb-0.5", sel ? "text-white" : "text-white/65")}>{label}</p>
                <p className="text-white/30 text-xs leading-relaxed">{desc}</p>
                {id !== "standard" && (
                  <p className={cn("text-xs font-bold mt-1", sel ? "text-indigo-300" : "text-white/28")}>
                    {DELIVERY_SPEEDS[id].badge}
                  </p>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Live estimate */}
      <div className="rounded-2xl border border-white/[0.07] bg-white/[0.022] overflow-hidden">
        <div className="p-4 sm:p-5 space-y-2">
          <p className="text-white/35 text-xs uppercase tracking-widest mb-3">Estimation</p>
          {product && (
            <div className="flex justify-between text-sm gap-2">
              <span className="text-white/52 truncate">{product.name}</span>
              <span className="text-white/65 font-medium shrink-0">{formatCurrency(product.basePrice)}</span>
            </div>
          )}
          {addOnsTotal > 0 && (
            <div className="flex justify-between text-sm gap-2">
              <span className="text-white/52">Options ({data.addOns?.length})</span>
              <span className="text-white/65 font-medium shrink-0">+{formatCurrency(addOnsTotal)}</span>
            </div>
          )}
          {data.delivery !== "standard" && (
            <div className="flex justify-between text-sm gap-2">
              <span className="text-amber-400/65">Supplément {data.delivery}</span>
              <span className="text-amber-400 font-medium shrink-0">+{formatCurrency(estimate.total - estimate.subtotal)}</span>
            </div>
          )}
          <div className="pt-3 border-t border-white/[0.07] flex items-end justify-between gap-2">
            <div>
              <p className="text-white/30 text-xs">Total estimé HT</p>
              <p className="text-white/18 text-[10px] mt-0.5">TVA non applicable</p>
            </div>
            <motion.p key={estimate.total} initial={{ scale: 1.06 }} animate={{ scale: 1 }} transition={{ duration: 0.22 }}
              className="font-extrabold text-2xl sm:text-[1.75rem] text-white shrink-0" style={{ fontFamily: "var(--font-syne)" }}>
              {formatCurrency(estimate.total)}
            </motion.p>
          </div>
          <div className="flex flex-wrap justify-between text-xs text-white/28 pt-1 gap-2">
            <span>Livraison estimée</span>
            <span className="text-indigo-300/65 font-medium">{formatDate(estimate.deliveryDate)} (~{estimate.estimatedDays}j)</span>
          </div>
        </div>
        <div className="h-0.5 bg-white/[0.04]">
          <motion.div className="h-full bg-gradient-to-r from-indigo-500 to-violet-500" initial={{ width: 0 }}
            animate={{ width: `${Math.min((estimate.total / 8000) * 100, 100)}%` }}
            transition={{ duration: 0.55, ease: "easeOut" }} />
        </div>
      </div>

      <div className="flex items-center justify-between pt-1">
        <button onClick={prev} className="inline-flex items-center gap-1.5 text-white/35 hover:text-white/65 text-sm transition-colors">
          <ArrowLeft className="w-4 h-4" />Retour
        </button>
        <button onClick={next} className="inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-400 text-white font-semibold px-6 py-3.5 rounded-xl transition-all text-sm shadow-lg shadow-indigo-500/18 active:scale-[0.98]">
          Continuer <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

/* ─── STEP 3 — Context ─── */
export function Step3() {
  const { state, update, next, prev } = useQuote();
  const { data } = state;
  const canGo = (data.projectName?.length ?? 0) >= 2 && (data.description?.length ?? 0) >= 20;
  const inputCls = "w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-indigo-500/55 transition-all duration-200";

  return (
    <div className="space-y-4 sm:space-y-5">
      <div className="space-y-1.5">
        <label className="text-white/52 text-xs font-semibold uppercase tracking-wider" htmlFor="pname">
          Nom du projet <span className="text-indigo-400">*</span>
        </label>
        <input id="pname" type="text" value={data.projectName ?? ""} onChange={e => update({ projectName: e.target.value })}
          placeholder="ex: App de réservation restaurant" className={inputCls} />
      </div>

      <div className="space-y-1.5">
        <label className="text-white/52 text-xs font-semibold uppercase tracking-wider" htmlFor="pdesc">
          Description <span className="text-indigo-400">*</span>
        </label>
        <textarea id="pdesc" value={data.description ?? ""} onChange={e => update({ description: e.target.value })}
          placeholder="Contexte, objectifs, fonctionnalités clés, public cible..." rows={4}
          className={`${inputCls} resize-none`} />
        <p className="text-white/18 text-xs text-right">{data.description?.length ?? 0}/2000</p>
      </div>

      <div className="space-y-1.5">
        <label className="text-white/52 text-xs font-semibold uppercase tracking-wider" htmlFor="refs">
          Sites de référence <span className="text-white/22 font-normal normal-case tracking-normal">(optionnel)</span>
        </label>
        <input id="refs" type="text" value={data.referenceUrls ?? ""} onChange={e => update({ referenceUrls: e.target.value })}
          placeholder="https://..." className={inputCls} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {[
          { k: "hasDesign" as const, l: "J'ai des maquettes Figma" },
          { k: "hasCopy" as const, l: "J'ai les textes/contenus" }
        ].map(({ k, l }) => (
          <button key={k} onClick={() => update({ [k]: !data[k] })}
            className={cn("flex items-center gap-2.5 p-3.5 rounded-xl border text-left transition-all",
              data[k] ? "bg-indigo-500/[0.07] border-indigo-500/30" : "bg-white/[0.02] border-white/[0.055] hover:border-white/10")}>
            <div className={cn("w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all",
              data[k] ? "bg-indigo-500 border-indigo-500" : "border-white/18")}>
              {data[k] && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
            </div>
            <span className={cn("text-sm font-medium leading-snug", data[k] ? "text-white" : "text-white/42")}>{l}</span>
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between pt-1">
        <button onClick={prev} className="inline-flex items-center gap-1.5 text-white/35 hover:text-white/65 text-sm transition-colors">
          <ArrowLeft className="w-4 h-4" />Retour
        </button>
        <button onClick={next} disabled={!canGo}
          className={cn("inline-flex items-center gap-2 font-semibold px-6 py-3.5 rounded-xl transition-all text-sm",
            canGo ? "bg-indigo-500 hover:bg-indigo-400 text-white shadow-lg shadow-indigo-500/18 active:scale-[0.98]"
              : "bg-white/[0.04] text-white/22 cursor-not-allowed")}>
          Continuer <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

/* ─── STEP 4 — Contact ─── */
export function Step4() {
  const { state, update, prev, dispatch } = useQuote();
  const { data, estimate, isSubmitting, isSuccess } = state;
  const [terms, setTerms] = useState(false);
  const product = QUOTE_PRODUCTS.find(p => p.id === data.product);
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email ?? "");
  const canSend = (data.firstName?.length ?? 0) >= 2 && (data.lastName?.length ?? 0) >= 2 && emailOk && terms;
  const inputCls = "w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-indigo-500/55 transition-all duration-200";

  if (isSuccess) return (
    <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8 space-y-5">
      <div className="w-16 h-16 rounded-full bg-green-500/14 border border-green-500/28 flex items-center justify-center mx-auto">
        <CheckCircle2 className="w-8 h-8 text-green-400" />
      </div>
      <div className="space-y-2">
        <p className="text-white font-bold text-xl" style={{ fontFamily: "var(--font-syne)" }}>Devis envoyé !</p>
        <p className="text-white/42 text-sm max-w-xs mx-auto leading-relaxed">
          Email de confirmation envoyé à <strong className="text-white">{data.email}</strong>. Réponse sous 24h.
        </p>
      </div>
      <div className="bg-white/[0.025] border border-white/[0.065] rounded-2xl p-5 max-w-[200px] mx-auto">
        <p className="text-white/28 text-xs mb-1.5">Estimation</p>
        <p className="text-white font-bold text-2xl" style={{ fontFamily: "var(--font-syne)" }}>{formatCurrency(estimate.total)}</p>
        <p className="text-indigo-300/60 text-xs mt-1">~{formatDate(estimate.deliveryDate)}</p>
      </div>
      <button onClick={() => dispatch({ type: "RESET" })} className="text-white/28 hover:text-white/55 text-sm transition-colors underline underline-offset-2">
        Nouveau devis
      </button>
    </motion.div>
  );

  const handleSubmit = async () => {
    if (!canSend) return;
    dispatch({ type: "SUBMITTING", p: true });
    try {
      const r = await fetch("/api/quote", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, acceptTerms: true, budget: 0 }),
      });
      if (!r.ok) throw new Error();
      dispatch({ type: "SUCCESS" });
      toast.success("Devis envoyé ! Vérifiez votre email.");
    } catch {
      dispatch({ type: "SUBMITTING", p: false });
      toast.error("Erreur. Réessayez ou contactez-nous par email.");
    }
  };

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Mini summary */}
      <div className="bg-indigo-500/[0.055] border border-indigo-500/18 rounded-xl p-4 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-white/42 text-xs truncate">{product?.name}</p>
          <p className="text-white font-bold text-lg" style={{ fontFamily: "var(--font-syne)" }}>{formatCurrency(estimate.total)}</p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-white/28 text-xs">Livraison</p>
          <p className="text-indigo-300 text-sm font-medium">~{estimate.estimatedDays}j</p>
        </div>
      </div>

      {/* Contact fields — 2 col grid */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { k: "firstName" as const, l: "Prénom", p: "Jean", req: true },
          { k: "lastName" as const, l: "Nom", p: "Dupont", req: true }
        ].map(({ k, l, p, req }) => (
          <div key={k} className="space-y-1.5">
            <label className="text-white/50 text-xs font-semibold uppercase tracking-wider">
              {l} {req && <span className="text-indigo-400">*</span>}
            </label>
            <input type="text" value={(data[k] as string) ?? ""} onChange={e => update({ [k]: e.target.value })}
              placeholder={p} className={inputCls} />
          </div>
        ))}
        <div className="col-span-2 space-y-1.5">
          <label className="text-white/50 text-xs font-semibold uppercase tracking-wider">
            Email <span className="text-indigo-400">*</span>
          </label>
          <input type="email" value={data.email ?? ""} onChange={e => update({ email: e.target.value })}
            placeholder="jean@entreprise.fr" className={inputCls} />
        </div>
        <div className="space-y-1.5">
          <label className="text-white/50 text-xs font-semibold uppercase tracking-wider">Téléphone</label>
          <input type="tel" value={data.phone ?? ""} onChange={e => update({ phone: e.target.value })}
            placeholder="+33 6 00 00 00" className={inputCls} />
        </div>
        <div className="space-y-1.5">
          <label className="text-white/50 text-xs font-semibold uppercase tracking-wider">Entreprise</label>
          <input type="text" value={data.company ?? ""} onChange={e => update({ company: e.target.value })}
            placeholder="Acme SAS" className={inputCls} />
        </div>
      </div>

      {/* Terms */}
      <button onClick={() => setTerms(t => !t)}
        className={cn("flex items-start gap-3 p-4 rounded-xl border w-full text-left transition-all",
          terms ? "bg-indigo-500/[0.07] border-indigo-500/30" : "bg-white/[0.02] border-white/[0.055] hover:border-white/10")}>
        <div className={cn("w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all",
          terms ? "bg-indigo-500 border-indigo-500" : "border-white/18")}>
          {terms && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
        </div>
        <p className="text-white/40 text-sm leading-relaxed">
          J&apos;accepte que mes données soient traitées pour l&apos;établissement de ce devis. Aucun engagement.
        </p>
      </button>

      <div className="flex items-center justify-between pt-1">
        <button onClick={prev} disabled={isSubmitting}
          className="inline-flex items-center gap-1.5 text-white/35 hover:text-white/65 text-sm transition-colors disabled:opacity-40">
          <ArrowLeft className="w-4 h-4" />Retour
        </button>
        <button onClick={handleSubmit} disabled={!canSend || isSubmitting}
          className={cn("inline-flex items-center gap-2 font-semibold px-6 py-3.5 rounded-xl transition-all text-sm",
            canSend && !isSubmitting ? "bg-indigo-500 hover:bg-indigo-400 text-white shadow-lg shadow-indigo-500/18 active:scale-[0.98]"
              : "bg-white/[0.04] text-white/22 cursor-not-allowed")}>
          {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" />Envoi...</>
            : <><Send className="w-4 h-4" />Envoyer le devis</>}
        </button>
      </div>
    </div>
  );
}

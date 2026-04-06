"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { Eye, EyeOff, UserPlus, Loader2 } from "lucide-react";

export const dynamic = "force-dynamic";

export default function RegisterPage() {
  const { signUp, user, loading, authError, clearError } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ name: "", company: "", email: "", password: "", confirm: "" });
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [localError, setLocalError] = useState("");

  useEffect(() => {
    if (!loading && user) router.push("/dashboard");
  }, [user, loading, router]);

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(""); clearError();
    if (form.password !== form.confirm) { setLocalError("Les mots de passe ne correspondent pas."); return; }
    if (form.password.length < 6) { setLocalError("Mot de passe trop court (min. 6 caractères)."); return; }
    setBusy(true);
    try { await signUp(form.email, form.password, form.name, form.company); }
    catch { /* handled */ } finally { setBusy(false); }
  };

  const inp = "w-full bg-white/[0.05] border border-white/[0.09] rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-indigo-500/60 transition-all";
  const error = localError || authError;

  return (
    <div className="min-h-screen bg-[#07090f] flex items-center justify-center px-4 py-10 dot-grid">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-indigo-600/[0.06] rounded-full blur-[100px] pointer-events-none" />
      <div className="relative w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/"><p className="text-white font-bold text-2xl" style={{ fontFamily: "var(--font-syne)" }}>F<span className="text-indigo-400">Studios</span></p></Link>
          <p className="text-white/35 text-sm mt-1">Créez votre espace client</p>
        </div>
        <div className="bg-white/[0.025] border border-white/[0.07] rounded-2xl p-7">
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5 col-span-2">
                <label className="text-white/45 text-xs font-semibold uppercase tracking-wider">Nom complet *</label>
                <input type="text" value={form.name} onChange={e => set("name", e.target.value)} placeholder="Jean Dupont" required className={inp} />
              </div>
              <div className="space-y-1.5 col-span-2">
                <label className="text-white/45 text-xs font-semibold uppercase tracking-wider">Entreprise</label>
                <input type="text" value={form.company} onChange={e => set("company", e.target.value)} placeholder="Acme SA" className={inp} />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-white/45 text-xs font-semibold uppercase tracking-wider">Email *</label>
              <input type="email" value={form.email} onChange={e => set("email", e.target.value)} placeholder="jean@acme.com" required className={inp} />
            </div>
            <div className="space-y-1.5">
              <label className="text-white/45 text-xs font-semibold uppercase tracking-wider">Mot de passe *</label>
              <div className="relative">
                <input type={show ? "text" : "password"} value={form.password} onChange={e => set("password", e.target.value)} placeholder="Min. 6 caractères" required className={`${inp} pr-11`} />
                <button type="button" onClick={() => setShow(p => !p)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
                  {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-white/45 text-xs font-semibold uppercase tracking-wider">Confirmer *</label>
              <input type="password" value={form.confirm} onChange={e => set("confirm", e.target.value)} placeholder="••••••••" required className={inp} />
            </div>
            {error && <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3"><p className="text-red-400 text-sm">{error}</p></div>}
            <button type="submit" disabled={busy}
              className="w-full inline-flex items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-400 disabled:bg-white/[0.06] disabled:text-white/25 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition-all text-sm">
              {busy ? <><Loader2 className="w-4 h-4 animate-spin" />Création...</> : <><UserPlus className="w-4 h-4" />Créer mon compte</>}
            </button>
          </form>
          <div className="mt-5 pt-5 border-t border-white/[0.07] text-center">
            <p className="text-white/35 text-sm">Déjà un compte ?{" "}
              <Link href="/auth/login" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">Se connecter</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

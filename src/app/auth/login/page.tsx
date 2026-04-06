"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { Eye, EyeOff, LogIn, Loader2 } from "lucide-react";

export const dynamic = "force-dynamic";

export default function LoginPage() {
  const { signIn, user, role, loading, authError, clearError } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && user) router.push(role === "admin" ? "/admin" : "/dashboard");
  }, [user, loading, role, router]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true); clearError();
    try { await signIn(email, password); } catch { /* handled */ } finally { setBusy(false); }
  };

  const inp = "w-full bg-white/[0.05] border border-white/[0.09] rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-indigo-500/60 transition-all";

  return (
    <div className="min-h-screen bg-[#07090f] flex items-center justify-center px-4 dot-grid">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-indigo-600/[0.06] rounded-full blur-[100px] pointer-events-none" />
      <div className="relative w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/"><p className="text-white font-bold text-2xl" style={{ fontFamily: "var(--font-syne)" }}>F<span className="text-indigo-400">Studios</span></p></Link>
          <p className="text-white/35 text-sm mt-1">Connectez-vous à votre espace</p>
        </div>
        <div className="bg-white/[0.025] border border-white/[0.07] rounded-2xl p-7">
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-white/45 text-xs font-semibold uppercase tracking-wider">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="votre@email.com" required className={inp} />
            </div>
            <div className="space-y-1.5">
              <label className="text-white/45 text-xs font-semibold uppercase tracking-wider">Mot de passe</label>
              <div className="relative">
                <input type={show ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required className={`${inp} pr-11`} />
                <button type="button" onClick={() => setShow(p => !p)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
                  {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            {authError && <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3"><p className="text-red-400 text-sm">{authError}</p></div>}
            <button type="submit" disabled={busy || !email || !password}
              className="w-full inline-flex items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-400 disabled:bg-white/[0.06] disabled:text-white/25 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition-all text-sm">
              {busy ? <><Loader2 className="w-4 h-4 animate-spin" />Connexion...</> : <><LogIn className="w-4 h-4" />Se connecter</>}
            </button>
          </form>
          <div className="mt-5 pt-5 border-t border-white/[0.07] text-center">
            <p className="text-white/35 text-sm">Pas encore de compte ?{" "}
              <Link href="/auth/register" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">S&apos;inscrire</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

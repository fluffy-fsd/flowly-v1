"use client";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { updateUser } from "@/lib/db";
import { Save, Loader2, CheckCircle2 } from "lucide-react";

export const dynamic = "force-dynamic";

export default function DashboardProfilePage() {
  const { profile, user } = useAuth();
  const [form, setForm] = useState({
    displayName: profile?.displayName ?? "",
    company: profile?.company ?? "",
    phone: profile?.phone ?? "",
    country: profile?.country ?? "FR",
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const inp = "w-full bg-white/[0.05] border border-white/[0.09] rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-indigo-500/55 transition-all";

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    const initials = form.displayName.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
    await updateUser(user.uid, { ...form, avatarInitials: initials });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-lg">
      <div className="mb-6">
        <h1 className="text-white font-bold text-xl sm:text-2xl" style={{ fontFamily: "var(--font-syne)" }}>Mon profil</h1>
        <p className="text-white/35 text-sm mt-1">Vos informations personnelles.</p>
      </div>

      {/* Avatar */}
      <div className="flex items-center gap-4 mb-6 p-5 bg-white/[0.025] border border-white/[0.07] rounded-2xl">
        <div className="w-14 h-14 rounded-full bg-indigo-500/20 border-2 border-indigo-500/30 flex items-center justify-center text-indigo-200 text-xl font-bold">
          {profile?.avatarInitials ?? "?"}
        </div>
        <div>
          <p className="text-white font-semibold">{profile?.displayName}</p>
          <p className="text-white/35 text-sm">{profile?.email}</p>
          <span className="text-xs bg-indigo-500/15 border border-indigo-500/25 text-indigo-300 px-2 py-0.5 rounded-full mt-1 inline-block">Client</span>
        </div>
      </div>

      <form onSubmit={handleSave} className="bg-white/[0.025] border border-white/[0.07] rounded-2xl p-5 sm:p-6 space-y-4">
        <div className="space-y-1.5">
          <label className="text-white/45 text-xs font-semibold uppercase tracking-wider">Nom complet</label>
          <input type="text" value={form.displayName} onChange={e => setForm(f => ({ ...f, displayName: e.target.value }))} className={inp} />
        </div>
        <div className="space-y-1.5">
          <label className="text-white/45 text-xs font-semibold uppercase tracking-wider">Entreprise</label>
          <input type="text" value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} placeholder="Acme SA" className={inp} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-white/45 text-xs font-semibold uppercase tracking-wider">Téléphone</label>
            <input type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="+41 79 000 00 00" className={inp} />
          </div>
          <div className="space-y-1.5">
            <label className="text-white/45 text-xs font-semibold uppercase tracking-wider">Pays</label>
            <select value={form.country} onChange={e => setForm(f => ({ ...f, country: e.target.value }))}
              className={inp + " appearance-none cursor-pointer"}>
              {[["CH","🇨🇭 Suisse"],["FR","🇫🇷 France"],["AE","🇦🇪 Émirats"],["QA","🇶🇦 Qatar"],["OTHER","🌍 Autre"]].map(([v,l]) => (
                <option key={v} value={v}>{l}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="text-white/45 text-xs font-semibold uppercase tracking-wider">Email</label>
          <input type="email" value={profile?.email ?? ""} disabled className={inp + " opacity-40 cursor-not-allowed"} />
          <p className="text-white/20 text-xs">L&apos;email ne peut pas être modifié.</p>
        </div>
        <div className="flex items-center gap-3 pt-2">
          <button type="submit" disabled={saving}
            className="inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-400 disabled:opacity-50 text-white font-semibold px-6 py-2.5 rounded-xl transition-all text-sm">
            {saving ? <><Loader2 className="w-4 h-4 animate-spin" />Sauvegarde...</> : <><Save className="w-4 h-4" />Enregistrer</>}
          </button>
          {saved && <span className="text-green-400 text-sm flex items-center gap-1"><CheckCircle2 className="w-4 h-4" />Sauvegardé !</span>}
        </div>
      </form>
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { getClients, getAllUsers, getAllProjects } from "@/lib/db";
import type { Client } from "@/types/client";
import type { UserProfile, Project } from "@/types/user";
import { STATUS_CONFIG, COUNTRY_CONFIG } from "@/types/client";
import { PROJECT_STATUS_CONFIG } from "@/types/user";
import { Users, FolderKanban, TrendingUp, UserCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function AdminPage() {
  const { user } = useAuth();
  const [clients, setClients] = useState<Client[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    Promise.all([getClients(), getAllUsers(), getAllProjects()])
      .then(([c, u, p]) => { setClients(c); setUsers(u.filter(u => u.role === "client")); setProjects(p); })
      .finally(() => setLoading(false));
  }, [user]);

  const activeProjects = projects.filter(p => p.status === "in_progress").length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="text-white font-bold text-xl sm:text-2xl" style={{ fontFamily: "var(--font-syne)" }}>Dashboard Admin</h1>
        <p className="text-white/35 text-sm mt-1">Vue d&apos;ensemble de FStudios.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Prospects CRM", value: clients.length, icon: UserCircle, color: "text-indigo-400", bg: "bg-indigo-500/10", href: "/admin/clients" },
          { label: "Comptes clients", value: users.length, icon: Users, color: "text-blue-400", bg: "bg-blue-500/10", href: "/admin/users" },
          { label: "Projets actifs", value: activeProjects, icon: FolderKanban, color: "text-amber-400", bg: "bg-amber-500/10", href: "/admin/projects" },
          { label: "Projets total", value: projects.length, icon: TrendingUp, color: "text-green-400", bg: "bg-green-500/10", href: "/admin/projects" },
        ].map(s => (
          <Link key={s.label} href={s.href} className="bg-white/[0.025] border border-white/[0.07] hover:border-white/[0.12] rounded-2xl p-4 sm:p-5 transition-all group">
            <div className="flex items-start justify-between mb-3">
              <p className="text-white/40 text-xs sm:text-sm leading-snug">{s.label}</p>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${s.bg}`}>
                <s.icon className={`w-4 h-4 ${s.color}`} strokeWidth={1.75} />
              </div>
            </div>
            <p className="text-white font-bold text-2xl sm:text-3xl" style={{ fontFamily: "var(--font-syne)" }}>
              {loading ? "—" : s.value}
            </p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* CRM par marché */}
        <div className="bg-white/[0.025] border border-white/[0.07] rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-white/[0.065] flex items-center justify-between">
            <h2 className="text-white font-semibold text-sm" style={{ fontFamily: "var(--font-syne)" }}>Prospects par marché</h2>
            <Link href="/admin/clients" className="inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300 text-xs transition-colors">Voir CRM <ArrowRight className="w-3 h-3" /></Link>
          </div>
          <div className="p-5 space-y-3">
            {loading ? [...Array(5)].map((_, i) => <div key={i} className="h-8 bg-white/[0.04] rounded-lg animate-pulse" />) :
              (Object.entries(COUNTRY_CONFIG) as [string, { label: string; flag: string }][]).map(([code, cfg]) => {
                const count = clients.filter(c => c.country === code).length;
                const pct = clients.length > 0 ? Math.round((count / clients.length) * 100) : 0;
                return (
                  <div key={code} className="flex items-center gap-3">
                    <span className="text-base shrink-0">{cfg.flag}</span>
                    <span className="text-white/55 text-sm flex-1">{cfg.label}</span>
                    <span className="text-white font-semibold text-sm w-6 text-right">{count}</span>
                    <div className="w-20 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-indigo-400" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Projets récents */}
        <div className="bg-white/[0.025] border border-white/[0.07] rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-white/[0.065] flex items-center justify-between">
            <h2 className="text-white font-semibold text-sm" style={{ fontFamily: "var(--font-syne)" }}>Projets récents</h2>
            <Link href="/admin/projects" className="inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300 text-xs transition-colors">Tous <ArrowRight className="w-3 h-3" /></Link>
          </div>
          <div className="divide-y divide-white/[0.055]">
            {loading ? [...Array(4)].map((_, i) => <div key={i} className="h-14 mx-5 my-2 bg-white/[0.04] rounded-lg animate-pulse" />) :
              projects.length === 0 ? (
                <div className="p-8 text-center text-white/30 text-sm">Aucun projet</div>
              ) :
              projects.slice(0, 5).map(p => {
                const st = PROJECT_STATUS_CONFIG[p.status];
                return (
                  <div key={p.id} className="px-5 py-3.5 flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium truncate">{p.title}</p>
                      <p className="text-white/30 text-xs truncate">{p.clientName}</p>
                    </div>
                    <span className={`text-xs px-2.5 py-1 rounded-full border font-medium shrink-0 ${st.bg} ${st.color}`}>{st.label}</span>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      {/* CRM status overview */}
      <div className="bg-white/[0.025] border border-white/[0.07] rounded-2xl p-5">
        <h2 className="text-white font-semibold text-sm mb-4" style={{ fontFamily: "var(--font-syne)" }}>Pipeline CRM</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {(Object.entries(STATUS_CONFIG) as [string, typeof STATUS_CONFIG[keyof typeof STATUS_CONFIG]][]).map(([key, cfg]) => {
            const count = clients.filter(c => c.status === key).length;
            return (
              <div key={key} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3 text-center">
                <div className={`w-2.5 h-2.5 rounded-full ${cfg.dot} mx-auto mb-2`} />
                <p className="text-white font-bold text-xl" style={{ fontFamily: "var(--font-syne)" }}>{loading ? "—" : count}</p>
                <p className="text-white/35 text-xs mt-0.5 leading-snug">{cfg.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

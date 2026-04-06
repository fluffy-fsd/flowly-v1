"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { getAllUsers, getAllProjects } from "@/lib/db";
import type { UserProfile, Project } from "@/types/user";
import { COUNTRY_CONFIG } from "@/types/client";
import type { ClientCountry } from "@/types/client";
import { Users, FolderKanban, Mail, ArrowRight, RefreshCw, Search } from "lucide-react";
import Link from "next/link";
import { formatDateShort } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default function AdminUsersPage() {
  const { user } = useAuth();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const load = async () => {
    if (!user) return;
    const [u, p] = await Promise.all([getAllUsers(), getAllProjects()]);
    setUsers(u.filter(x => x.role === "client"));
    setProjects(p);
    setLoading(false);
  };

  useEffect(() => { load(); }, [user]); // eslint-disable-line

  const filtered = users.filter(u => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return `${u.displayName} ${u.email} ${u.company}`.toLowerCase().includes(q);
  });

  const getProjectCount = (uid: string) => projects.filter(p => p.clientUid === uid).length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-white font-bold text-xl sm:text-2xl" style={{ fontFamily: "var(--font-syne)" }}>Comptes clients</h1>
          <p className="text-white/35 text-sm mt-0.5">{users.length} compte{users.length > 1 ? "s" : ""} inscrits</p>
        </div>
        <button onClick={() => { setLoading(true); load(); }}
          className="w-10 h-10 bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.08] rounded-xl flex items-center justify-center text-white/50 transition-all self-end sm:self-auto">
          <RefreshCw className={cn("w-4 h-4", loading && "animate-spin")} />
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher un client..."
          className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-10 pr-4 py-2.5 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-indigo-500/50 transition-all" />
      </div>

      {/* Cards grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[...Array(6)].map((_, i) => <div key={i} className="h-36 bg-white/[0.04] rounded-2xl animate-pulse" />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white/[0.025] border border-white/[0.07] rounded-2xl p-10 text-center">
          <Users className="w-8 h-8 text-white/15 mx-auto mb-2" />
          <p className="text-white/30 text-sm">{users.length === 0 ? "Aucun compte client inscrit." : "Aucun résultat."}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map(u => {
            const countryCode = u.country as ClientCountry;
            const countryCfg = COUNTRY_CONFIG[countryCode] ?? { flag: "🌍", label: u.country };
            const projectCount = getProjectCount(u.uid);
            return (
              <div key={u.uid} className="bg-white/[0.025] border border-white/[0.07] hover:border-white/[0.12] rounded-2xl p-5 transition-all space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-500/20 border border-indigo-500/28 flex items-center justify-center text-indigo-300 text-sm font-bold shrink-0">
                      {u.avatarInitials}
                    </div>
                    <div className="min-w-0">
                      <p className="text-white font-semibold text-sm truncate">{u.displayName}</p>
                      <p className="text-white/35 text-xs truncate">{u.company || "—"}</p>
                    </div>
                  </div>
                  <span className="text-lg shrink-0" title={countryCfg.label}>{countryCfg.flag}</span>
                </div>

                <div className="flex flex-wrap gap-3 text-xs text-white/35">
                  <span className="flex items-center gap-1"><FolderKanban className="w-3.5 h-3.5" />{projectCount} projet{projectCount > 1 ? "s" : ""}</span>
                  {u.createdAt && <span>Inscrit le {formatDateShort(u.createdAt)}</span>}
                </div>

                <div className="flex items-center gap-2 pt-1 border-t border-white/[0.055]">
                  <a href={`mailto:${u.email}`}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 bg-white/[0.04] hover:bg-white/[0.08] text-white/50 hover:text-white text-xs py-2 rounded-lg transition-all">
                    <Mail className="w-3.5 h-3.5" />{u.email.length > 18 ? u.email.slice(0, 18) + "…" : u.email}
                  </a>
                  <Link href={`/admin/projects?client=${u.uid}`}
                    className="w-8 h-8 flex items-center justify-center bg-indigo-500/15 hover:bg-indigo-500/25 text-indigo-400 rounded-lg transition-all">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function cn(...args: (string | boolean | undefined)[]) {
  return args.filter(Boolean).join(" ");
}

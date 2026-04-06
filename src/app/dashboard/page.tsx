"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { getProjectsByClient, getInvoicesByClient } from "@/lib/db";
import type { Project, Invoice } from "@/types/user";
import { PROJECT_STATUS_CONFIG } from "@/types/user";
import { ArrowRight, FolderKanban, FileText, MessageSquare, CheckCircle2, Clock } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function DashboardPage() {
  const { user, profile } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    Promise.all([getProjectsByClient(user.uid), getInvoicesByClient(user.uid)])
      .then(([p, i]) => { setProjects(p); setInvoices(i); })
      .finally(() => setLoading(false));
  }, [user]);

  const latestProject = projects[0];
  const pendingInvoices = invoices.filter(i => i.status === "pending");
  const totalDue = pendingInvoices.reduce((a, i) => a + i.amount, 0);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Welcome */}
      <div>
        <h1 className="text-white font-bold text-xl sm:text-2xl" style={{ fontFamily: "var(--font-syne)" }}>
          Bonjour, {profile?.displayName?.split(" ")[0] ?? "—"} 👋
        </h1>
        <p className="text-white/35 text-sm mt-1">Voici l&apos;état de votre espace client FStudios.</p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Projets", value: projects.length, icon: FolderKanban, color: "text-indigo-400", bg: "bg-indigo-500/10" },
          { label: "En cours", value: projects.filter(p => p.status === "in_progress").length, icon: Clock, color: "text-blue-400", bg: "bg-blue-500/10" },
          { label: "Livrés", value: projects.filter(p => p.status === "completed" || p.status === "delivered").length, icon: CheckCircle2, color: "text-green-400", bg: "bg-green-500/10" },
          { label: "Factures en attente", value: pendingInvoices.length, icon: FileText, color: "text-amber-400", bg: "bg-amber-500/10" },
        ].map(s => (
          <div key={s.label} className="bg-white/[0.025] border border-white/[0.07] rounded-2xl p-4 sm:p-5">
            <div className="flex items-start justify-between mb-3">
              <p className="text-white/40 text-xs sm:text-sm leading-snug">{s.label}</p>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${s.bg}`}>
                <s.icon className={`w-4 h-4 ${s.color}`} strokeWidth={1.75} />
              </div>
            </div>
            <p className="text-white font-bold text-2xl sm:text-3xl" style={{ fontFamily: "var(--font-syne)" }}>
              {loading ? "—" : s.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Latest project */}
        <div className="bg-white/[0.025] border border-white/[0.07] rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-white/[0.065] flex items-center justify-between">
            <h2 className="text-white font-semibold text-sm" style={{ fontFamily: "var(--font-syne)" }}>Projet actif</h2>
            <Link href="/dashboard/project" className="inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300 text-xs transition-colors">
              Voir <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="p-5">
            {loading ? (
              <div className="space-y-2">{[...Array(3)].map((_, i) => <div key={i} className="h-4 bg-white/[0.04] rounded animate-pulse" />)}</div>
            ) : !latestProject ? (
              <div className="text-center py-6">
                <FolderKanban className="w-8 h-8 text-white/15 mx-auto mb-2" />
                <p className="text-white/30 text-sm">Aucun projet pour l&apos;instant</p>
                <p className="text-white/20 text-xs mt-1">FStudios vous contactera bientôt</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <p className="text-white font-semibold">{latestProject.title}</p>
                  <p className="text-white/35 text-sm mt-1 line-clamp-2">{latestProject.description}</p>
                </div>
                {/* Progress steps */}
                <div className="space-y-2">
                  {latestProject.steps?.map((step) => (
                    <div key={step.id} className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full shrink-0 ${step.status === "done" ? "bg-green-400" : step.status === "current" ? "bg-indigo-400 animate-pulse" : "bg-white/[0.12]"}`} />
                      <span className={`text-sm ${step.status === "done" ? "text-white/50 line-through" : step.status === "current" ? "text-white font-medium" : "text-white/28"}`}>
                        {step.label}
                      </span>
                      {step.status === "current" && <span className="ml-auto text-indigo-400 text-xs font-medium">En cours</span>}
                      {step.status === "done" && <CheckCircle2 className="w-3.5 h-3.5 text-green-400 ml-auto shrink-0" />}
                    </div>
                  ))}
                </div>
                {/* Status badge */}
                <div className="pt-1">
                  <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${PROJECT_STATUS_CONFIG[latestProject.status].bg} ${PROJECT_STATUS_CONFIG[latestProject.status].color}`}>
                    {PROJECT_STATUS_CONFIG[latestProject.status].label}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Invoices + quick actions */}
        <div className="space-y-4">
          {/* Invoices */}
          <div className="bg-white/[0.025] border border-white/[0.07] rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-white/[0.065] flex items-center justify-between">
              <h2 className="text-white font-semibold text-sm" style={{ fontFamily: "var(--font-syne)" }}>Factures en attente</h2>
              <Link href="/dashboard/documents" className="inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300 text-xs transition-colors">
                Tout voir <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="p-5">
              {loading ? <div className="h-8 bg-white/[0.04] rounded animate-pulse" />
                : pendingInvoices.length === 0 ? (
                  <p className="text-white/30 text-sm text-center py-3">Aucune facture en attente ✓</p>
                ) : (
                  <div className="space-y-3">
                    {pendingInvoices.slice(0, 3).map(inv => (
                      <div key={inv.id} className="flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-white text-sm font-medium truncate">{inv.title}</p>
                          <p className="text-white/30 text-xs">Échéance : {new Date(inv.dueDate).toLocaleDateString("fr-FR")}</p>
                        </div>
                        <span className="text-amber-400 font-bold text-sm shrink-0">{inv.amount} {inv.currency}</span>
                      </div>
                    ))}
                    {totalDue > 0 && (
                      <div className="pt-2 border-t border-white/[0.065] flex justify-between text-sm">
                        <span className="text-white/45">Total dû</span>
                        <span className="text-white font-bold">{totalDue} EUR</span>
                      </div>
                    )}
                  </div>
                )}
            </div>
          </div>

          {/* Quick actions */}
          <div className="grid grid-cols-2 gap-3">
            <Link href="/dashboard/messages"
              className="bg-white/[0.025] border border-white/[0.07] hover:border-indigo-500/30 hover:bg-indigo-500/[0.04] rounded-2xl p-4 flex flex-col gap-2 transition-all group">
              <MessageSquare className="w-5 h-5 text-indigo-400" strokeWidth={1.75} />
              <p className="text-white/65 text-sm font-medium group-hover:text-white transition-colors">Messages</p>
              <p className="text-white/25 text-xs">Contacter FStudios</p>
            </Link>
            <Link href="/dashboard/documents"
              className="bg-white/[0.025] border border-white/[0.07] hover:border-indigo-500/30 hover:bg-indigo-500/[0.04] rounded-2xl p-4 flex flex-col gap-2 transition-all group">
              <FileText className="w-5 h-5 text-indigo-400" strokeWidth={1.75} />
              <p className="text-white/65 text-sm font-medium group-hover:text-white transition-colors">Documents</p>
              <p className="text-white/25 text-xs">Devis et factures</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

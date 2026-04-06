"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { getProjectsByClient } from "@/lib/db";
import type { Project } from "@/types/user";
import { PROJECT_STATUS_CONFIG } from "@/types/user";
import { CheckCircle2, Circle, Clock, FolderKanban } from "lucide-react";

export const dynamic = "force-dynamic";

export default function DashboardProjectPage() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Project | null>(null);

  useEffect(() => {
    if (!user) return;
    getProjectsByClient(user.uid).then(p => {
      setProjects(p);
      if (p.length > 0) setSelected(p[0]);
    }).finally(() => setLoading(false));
  }, [user]);

  if (loading) return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-4">
      {[...Array(3)].map((_, i) => <div key={i} className="h-20 bg-white/[0.04] rounded-2xl animate-pulse" />)}
    </div>
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="text-white font-bold text-xl sm:text-2xl" style={{ fontFamily: "var(--font-syne)" }}>Mon projet</h1>
        <p className="text-white/35 text-sm mt-1">Suivez l&apos;avancement de votre projet en temps réel.</p>
      </div>

      {projects.length === 0 ? (
        <div className="bg-white/[0.025] border border-white/[0.07] rounded-2xl p-12 text-center">
          <FolderKanban className="w-10 h-10 text-white/15 mx-auto mb-3" />
          <p className="text-white/40 font-medium">Aucun projet actif</p>
          <p className="text-white/22 text-sm mt-1">FStudios configurera votre espace après le démarrage du projet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Project list */}
          {projects.length > 1 && (
            <div className="lg:col-span-1 space-y-2">
              {projects.map(p => {
                const st = PROJECT_STATUS_CONFIG[p.status];
                return (
                  <button key={p.id} onClick={() => setSelected(p)}
                    className={`w-full text-left p-4 rounded-xl border transition-all ${selected?.id === p.id ? "bg-indigo-500/10 border-indigo-500/30" : "bg-white/[0.025] border-white/[0.07] hover:border-white/[0.12]"}`}>
                    <p className="text-white text-sm font-semibold truncate">{p.title}</p>
                    <span className={`text-xs mt-1 inline-block px-2 py-0.5 rounded-full border ${st.bg} ${st.color}`}>{st.label}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Project detail */}
          {selected && (
            <div className={`${projects.length > 1 ? "lg:col-span-2" : "lg:col-span-3"} space-y-4`}>
              {/* Header */}
              <div className="bg-white/[0.025] border border-white/[0.07] rounded-2xl p-5 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                  <div>
                    <h2 className="text-white font-bold text-lg" style={{ fontFamily: "var(--font-syne)" }}>{selected.title}</h2>
                    <p className="text-white/40 text-sm mt-1">{selected.description}</p>
                  </div>
                  <span className={`text-xs px-3 py-1.5 rounded-full border font-medium shrink-0 ${PROJECT_STATUS_CONFIG[selected.status].bg} ${PROJECT_STATUS_CONFIG[selected.status].color}`}>
                    {PROJECT_STATUS_CONFIG[selected.status].label}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-white/[0.065]">
                  {[
                    { label: "Budget", value: `${selected.budget} ${selected.currency}` },
                    { label: "Démarrage", value: selected.startDate ? new Date(selected.startDate).toLocaleDateString("fr-FR") : "—" },
                    { label: "Livraison", value: selected.deliveryDate ? new Date(selected.deliveryDate).toLocaleDateString("fr-FR") : "—" },
                  ].map(item => (
                    <div key={item.label}>
                      <p className="text-white/30 text-xs">{item.label}</p>
                      <p className="text-white font-semibold text-sm mt-0.5">{item.value || "—"}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Steps */}
              <div className="bg-white/[0.025] border border-white/[0.07] rounded-2xl p-5 sm:p-6">
                <h3 className="text-white font-semibold text-sm mb-5" style={{ fontFamily: "var(--font-syne)" }}>Étapes du projet</h3>
                <div className="relative space-y-0">
                  {selected.steps?.map((step, i) => (
                    <div key={step.id} className="flex gap-4 pb-6 last:pb-0">
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 ${
                          step.status === "done" ? "bg-green-500 border-green-500" :
                          step.status === "current" ? "bg-indigo-500/20 border-indigo-500" :
                          "bg-white/[0.04] border-white/[0.12]"
                        }`}>
                          {step.status === "done" ? <CheckCircle2 className="w-4 h-4 text-white" /> :
                           step.status === "current" ? <Clock className="w-4 h-4 text-indigo-400 animate-pulse" /> :
                           <Circle className="w-4 h-4 text-white/20" />}
                        </div>
                        {i < (selected.steps?.length ?? 0) - 1 && (
                          <div className={`w-0.5 flex-1 mt-1 ${step.status === "done" ? "bg-green-500/40" : "bg-white/[0.07]"}`} />
                        )}
                      </div>
                      <div className="flex-1 pt-1 min-w-0 pb-1">
                        <p className={`font-medium text-sm ${step.status === "done" ? "text-white/45 line-through" : step.status === "current" ? "text-white" : "text-white/35"}`}>
                          {step.label}
                        </p>
                        {step.status === "current" && <p className="text-indigo-400 text-xs mt-0.5">En cours actuellement</p>}
                        {step.completedAt && <p className="text-white/25 text-xs mt-0.5">Terminé le {new Date(step.completedAt).toLocaleDateString("fr-FR")}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech stack */}
              {selected.techStack?.length > 0 && (
                <div className="bg-white/[0.025] border border-white/[0.07] rounded-2xl p-5">
                  <h3 className="text-white font-semibold text-sm mb-3" style={{ fontFamily: "var(--font-syne)" }}>Stack technique</h3>
                  <div className="flex flex-wrap gap-2">
                    {selected.techStack.map(t => (
                      <span key={t} className="bg-white/[0.05] border border-white/[0.08] text-white/55 text-xs px-3 py-1 rounded-full">{t}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

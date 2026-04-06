"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { getAllProjects, getAllUsers, createProject, updateProject, deleteProject } from "@/lib/db";
import type { Project, UserProfile } from "@/types/user";
import { PROJECT_STATUS_CONFIG } from "@/types/user";
import type { ProjectStatus } from "@/types/user";
import { Plus, Pencil, Trash2, RefreshCw, X, Save, Loader2, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDateShort } from "@/lib/utils";

export const dynamic = "force-dynamic";

const STATUSES = Object.entries(PROJECT_STATUS_CONFIG) as [ProjectStatus, typeof PROJECT_STATUS_CONFIG[ProjectStatus]][];
const DEFAULT_STEPS = [
  { id: "1", label: "Cadrage & spécifications", status: "done" as const },
  { id: "2", label: "Design & maquettes", status: "upcoming" as const },
  { id: "3", label: "Développement", status: "upcoming" as const },
  { id: "4", label: "Tests & corrections", status: "upcoming" as const },
  { id: "5", label: "Livraison & déploiement", status: "upcoming" as const },
];

type StepStatus = "done" | "current" | "upcoming";

function ProjectFormModal({ project, users, onSave, onClose }: {
  project?: Project | null;
  users: UserProfile[];
  onSave: () => void;
  onClose: () => void;
}) {
  const [f, setF] = useState({
    clientUid: project?.clientUid ?? "",
    title: project?.title ?? "",
    description: project?.description ?? "",
    status: project?.status ?? "pending" as ProjectStatus,
    budget: project?.budget ?? "",
    currency: project?.currency ?? "EUR",
    startDate: project?.startDate?.slice(0, 10) ?? "",
    deliveryDate: project?.deliveryDate?.slice(0, 10) ?? "",
    techStack: project?.techStack?.join(", ") ?? "",
    adminNotes: project?.adminNotes ?? "",
  });
  const [steps, setSteps] = useState(project?.steps ?? DEFAULT_STEPS);
  const [saving, setSaving] = useState(false);

  const inp = "w-full bg-white/[0.05] border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-indigo-500/55 transition-all";
  const sel = `${inp} appearance-none cursor-pointer`;
  const client = users.find(u => u.uid === f.clientUid);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!f.clientUid || !f.title) return;
    setSaving(true);
    const data = {
      ...f,
      clientName: client?.displayName ?? "",
      clientEmail: client?.email ?? "",
      techStack: f.techStack.split(",").map(t => t.trim()).filter(Boolean),
      steps,
    };
    if (project) {
      await updateProject(project.id, data);
    } else {
      await createProject(data);
    }
    onSave();
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 py-8">
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-[#0c101c] border border-white/[0.08] rounded-2xl shadow-2xl">
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.07]">
          <h2 className="text-white font-bold text-lg" style={{ fontFamily: "var(--font-syne)" }}>
            {project ? "Modifier le projet" : "Nouveau projet"}
          </h2>
          <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.07] transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="p-6 space-y-5">
          {/* Client */}
          <div className="space-y-1.5">
            <label className="text-white/45 text-xs font-semibold uppercase tracking-wider">Client *</label>
            <select value={f.clientUid} onChange={e => setF(p => ({ ...p, clientUid: e.target.value }))} required className={sel}>
              <option value="">Sélectionner un client</option>
              {users.map(u => <option key={u.uid} value={u.uid}>{u.displayName} {u.company ? `· ${u.company}` : ""}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="sm:col-span-2 space-y-1.5">
              <label className="text-white/45 text-xs font-semibold uppercase tracking-wider">Titre du projet *</label>
              <input type="text" value={f.title} onChange={e => setF(p => ({ ...p, title: e.target.value }))} required placeholder="RouteMaster Pro..." className={inp} />
            </div>
            <div className="sm:col-span-2 space-y-1.5">
              <label className="text-white/45 text-xs font-semibold uppercase tracking-wider">Description</label>
              <textarea value={f.description} onChange={e => setF(p => ({ ...p, description: e.target.value }))} rows={3} placeholder="Description du projet..." className={`${inp} resize-none`} />
            </div>
            <div className="space-y-1.5">
              <label className="text-white/45 text-xs font-semibold uppercase tracking-wider">Statut</label>
              <select value={f.status} onChange={e => setF(p => ({ ...p, status: e.target.value as ProjectStatus }))} className={sel}>
                {STATUSES.map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-white/45 text-xs font-semibold uppercase tracking-wider">Stack technique</label>
              <input type="text" value={f.techStack} onChange={e => setF(p => ({ ...p, techStack: e.target.value }))} placeholder="Next.js, Firebase, Stripe..." className={inp} />
            </div>
            <div className="space-y-1.5">
              <label className="text-white/45 text-xs font-semibold uppercase tracking-wider">Budget</label>
              <input type="text" value={f.budget} onChange={e => setF(p => ({ ...p, budget: e.target.value }))} placeholder="5 000" className={inp} />
            </div>
            <div className="space-y-1.5">
              <label className="text-white/45 text-xs font-semibold uppercase tracking-wider">Devise</label>
              <select value={f.currency} onChange={e => setF(p => ({ ...p, currency: e.target.value }))} className={sel}>
                {["EUR","CHF","AED","QAR"].map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-white/45 text-xs font-semibold uppercase tracking-wider">Démarrage</label>
              <input type="date" value={f.startDate} onChange={e => setF(p => ({ ...p, startDate: e.target.value }))} className={inp} />
            </div>
            <div className="space-y-1.5">
              <label className="text-white/45 text-xs font-semibold uppercase tracking-wider">Livraison prévue</label>
              <input type="date" value={f.deliveryDate} onChange={e => setF(p => ({ ...p, deliveryDate: e.target.value }))} className={inp} />
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-2">
            <p className="text-white/45 text-xs font-semibold uppercase tracking-wider">Étapes du projet</p>
            {steps.map((step, i) => (
              <div key={step.id} className="flex items-center gap-2">
                <input type="text" value={step.label} onChange={e => setSteps(prev => prev.map((s, j) => j === i ? { ...s, label: e.target.value } : s))}
                  className="flex-1 bg-white/[0.04] border border-white/[0.07] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-indigo-500/50 transition-all" />
                <select value={step.status} onChange={e => setSteps(prev => prev.map((s, j) => j === i ? { ...s, status: e.target.value as StepStatus } : s))}
                  className="appearance-none bg-white/[0.04] border border-white/[0.07] rounded-lg px-2.5 py-2 text-white/65 text-xs focus:outline-none cursor-pointer">
                  <option value="done">✓ Fait</option>
                  <option value="current">▶ En cours</option>
                  <option value="upcoming">○ À venir</option>
                </select>
              </div>
            ))}
          </div>

          <div className="space-y-1.5">
            <label className="text-white/45 text-xs font-semibold uppercase tracking-wider">Notes admin</label>
            <textarea value={f.adminNotes} onChange={e => setF(p => ({ ...p, adminNotes: e.target.value }))} rows={2} placeholder="Notes internes..." className={`${inp} resize-none`} />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2 border-t border-white/[0.07]">
            <button type="button" onClick={onClose} className="px-5 py-2.5 text-white/45 hover:text-white/70 text-sm transition-colors">Annuler</button>
            <button type="submit" disabled={saving || !f.clientUid || !f.title}
              className="inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-400 disabled:opacity-40 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-all active:scale-[0.98]">
              {saving ? <><Loader2 className="w-4 h-4 animate-spin" />Sauvegarde...</> : <><Save className="w-4 h-4" />{project ? "Mettre à jour" : "Créer"}</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AdminProjectsPage() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editProject, setEditProject] = useState<Project | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const load = async () => {
    if (!user) return;
    const [p, u] = await Promise.all([getAllProjects(), getAllUsers()]);
    setProjects(p);
    setUsers(u.filter(x => x.role === "client"));
    setLoading(false);
  };

  useEffect(() => { load(); }, [user]); // eslint-disable-line

  const handleDelete = async () => {
    if (!deleteId) return;
    await deleteProject(deleteId);
    setProjects(prev => prev.filter(p => p.id !== deleteId));
    setDeleteId(null);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-white font-bold text-xl sm:text-2xl" style={{ fontFamily: "var(--font-syne)" }}>Projets</h1>
          <p className="text-white/35 text-sm mt-0.5">{projects.length} projet{projects.length > 1 ? "s" : ""}</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => { setLoading(true); load(); }}
            className="w-10 h-10 bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.08] rounded-xl flex items-center justify-center text-white/50 transition-all">
            <RefreshCw className={cn("w-4 h-4", loading && "animate-spin")} />
          </button>
          <button onClick={() => { setEditProject(null); setModal(true); }}
            className="inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-400 text-white font-semibold px-4 py-2.5 rounded-xl text-sm transition-all shadow-lg shadow-indigo-500/20 active:scale-[0.98]">
            <Plus className="w-4 h-4" />Nouveau projet
          </button>
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">{[...Array(4)].map((_, i) => <div key={i} className="h-20 bg-white/[0.04] rounded-2xl animate-pulse" />)}</div>
      ) : projects.length === 0 ? (
        <div className="bg-white/[0.025] border border-white/[0.07] rounded-2xl p-10 text-center">
          <p className="text-white/30 text-sm">Aucun projet. Créez-en un en cliquant sur « Nouveau projet ».</p>
        </div>
      ) : (
        <div className="space-y-3">
          {projects.map(p => {
            const st = PROJECT_STATUS_CONFIG[p.status];
            return (
              <div key={p.id} className="bg-white/[0.025] border border-white/[0.07] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-white font-semibold text-sm" style={{ fontFamily: "var(--font-syne)" }}>{p.title}</h3>
                    <span className={cn("text-xs px-2.5 py-0.5 rounded-full border font-medium", st.bg, st.color)}>{st.label}</span>
                  </div>
                  <p className="text-white/35 text-xs">{p.clientName} · {p.budget} {p.currency}</p>
                  {p.deliveryDate && <p className="text-white/22 text-xs">Livraison : {formatDateShort(p.deliveryDate)}</p>}
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button onClick={() => { setEditProject(p); setModal(true); }}
                    className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/[0.04] hover:bg-indigo-500/20 text-white/35 hover:text-indigo-400 transition-all">
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => setDeleteId(p.id)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/[0.04] hover:bg-red-500/20 text-white/35 hover:text-red-400 transition-all">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {modal && <ProjectFormModal project={editProject} users={users} onSave={() => { setModal(false); load(); }} onClose={() => setModal(false)} />}

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setDeleteId(null)} />
          <div className="relative bg-[#0c101c] border border-white/[0.08] rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <h3 className="text-white font-bold text-base mb-2" style={{ fontFamily: "var(--font-syne)" }}>Supprimer ce projet ?</h3>
            <p className="text-white/45 text-sm mb-5">Cette action est irréversible.</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setDeleteId(null)} className="px-4 py-2 text-white/45 hover:text-white/70 text-sm transition-colors">Annuler</button>
              <button onClick={handleDelete} className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-400 text-white font-semibold px-5 py-2 rounded-xl text-sm">Supprimer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

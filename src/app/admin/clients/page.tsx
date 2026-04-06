"use client";
import { useEffect, useState, useMemo } from "react";
import { useAuth } from "@/lib/auth-context";
import { getClients, createClient, updateClient, deleteClient, exportClientsCSV } from "@/lib/db";
import type { Client, ClientFormData, ClientStatus, ClientCountry } from "@/types/client";
import { STATUS_CONFIG, COUNTRY_CONFIG, SECTOR_LABELS, SOURCE_OPTIONS } from "@/types/client";
import { Plus, Search, Download, Trash2, Pencil, ChevronDown, ChevronUp, Phone, Mail, Linkedin, ExternalLink, RefreshCw, Check, X, Save, Loader2, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

const EMPTY_FORM: ClientFormData = {
  firstName: "", lastName: "", company: "", role: "",
  email: "", phone: "", linkedin: "", website: "",
  country: "CH", city: "", sector: "autre", status: "prospect",
  budget: "", projectType: "", source: "LinkedIn",
  notes: "", lastContactAt: "",
};

// ── Inline Client Form ──────────────────────────────────────
function ClientForm({ initial, onSave, onCancel }: {
  initial: ClientFormData;
  onSave: (data: ClientFormData) => Promise<void>;
  onCancel: () => void;
}) {
  const [f, setF] = useState<ClientFormData>(initial);
  const [saving, setSaving] = useState(false);
  const set = (k: keyof ClientFormData, v: string) => setF(prev => ({ ...prev, [k]: v }));
  const inp = "w-full bg-white/[0.05] border border-white/[0.08] rounded-lg px-3 py-2 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-indigo-500/55 transition-all";
  const sel = `${inp} appearance-none cursor-pointer`;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!f.firstName || !f.lastName) return;
    setSaving(true);
    await onSave(f);
    setSaving(false);
  };

  return (
    <form onSubmit={onSubmit} className="bg-[#0c1020] border border-indigo-500/25 rounded-2xl p-4 sm:p-5 space-y-4">
      {/* Section labels */}
      {[
        {
          title: "Identité",
          fields: [
            { k: "firstName", l: "Prénom *", p: "Jean", t: "text", w: 1 },
            { k: "lastName", l: "Nom *", p: "Dupont", t: "text", w: 1 },
            { k: "company", l: "Entreprise", p: "Acme SA", t: "text", w: 1 },
            { k: "role", l: "Rôle", p: "CEO, DG...", t: "text", w: 1 },
          ]
        },
        {
          title: "Contact",
          fields: [
            { k: "email", l: "Email", p: "jean@acme.com", t: "email", w: 2 },
            { k: "phone", l: "Téléphone", p: "+41 79 000 00 00", t: "tel", w: 1 },
            { k: "linkedin", l: "LinkedIn", p: "https://linkedin.com/in/...", t: "url", w: 1 },
          ]
        },
      ].map(section => (
        <div key={section.title}>
          <p className="text-indigo-400/60 text-xs font-semibold uppercase tracking-widest mb-2">{section.title}</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {section.fields.map(field => (
              <div key={field.k} className={cn("space-y-1", field.w === 2 && "col-span-2")}>
                <label className="text-white/35 text-xs">{field.l}</label>
                <input type={field.t} value={(f as Record<string, string>)[field.k] ?? ""} onChange={e => set(field.k as keyof ClientFormData, e.target.value)}
                  placeholder={field.p} className={inp} />
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* CRM fields */}
      <div>
        <p className="text-indigo-400/60 text-xs font-semibold uppercase tracking-widest mb-2">CRM</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <div className="space-y-1">
            <label className="text-white/35 text-xs">Pays</label>
            <select value={f.country} onChange={e => set("country", e.target.value)} className={sel}>
              {(Object.entries(COUNTRY_CONFIG) as [string, { label: string; flag: string }][]).map(([k, v]) => (
                <option key={k} value={k}>{v.flag} {v.label}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-white/35 text-xs">Ville</label>
            <input type="text" value={f.city} onChange={e => set("city", e.target.value)} placeholder="Genève, Dubaï..." className={inp} />
          </div>
          <div className="space-y-1">
            <label className="text-white/35 text-xs">Statut</label>
            <select value={f.status} onChange={e => set("status", e.target.value)} className={sel}>
              {(Object.entries(STATUS_CONFIG) as [string, typeof STATUS_CONFIG[keyof typeof STATUS_CONFIG]][]).map(([k, v]) => (
                <option key={k} value={k}>{v.label}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-white/35 text-xs">Secteur</label>
            <select value={f.sector} onChange={e => set("sector", e.target.value)} className={sel}>
              {(Object.entries(SECTOR_LABELS) as [string, string][]).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-white/35 text-xs">Budget estimé</label>
            <input type="text" value={f.budget} onChange={e => set("budget", e.target.value)} placeholder="5 000 CHF" className={inp} />
          </div>
          <div className="space-y-1">
            <label className="text-white/35 text-xs">Source</label>
            <select value={f.source} onChange={e => set("source", e.target.value)} className={sel}>
              {SOURCE_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="space-y-1 col-span-2">
            <label className="text-white/35 text-xs">Type de projet</label>
            <input type="text" value={f.projectType} onChange={e => set("projectType", e.target.value)} placeholder="SaaS, App mobile, Refonte..." className={inp} />
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="space-y-1">
        <label className="text-white/35 text-xs">Notes</label>
        <textarea value={f.notes} onChange={e => set("notes", e.target.value)} rows={3} placeholder="Contexte, besoins, prochain suivi..." className={`${inp} resize-none`} />
      </div>

      <div className="flex items-center gap-2 pt-1">
        <button type="submit" disabled={saving || !f.firstName || !f.lastName}
          className="inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-400 disabled:opacity-40 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-all active:scale-[0.98]">
          {saving ? <><Loader2 className="w-4 h-4 animate-spin" />Sauvegarde...</> : <><Save className="w-4 h-4" />Enregistrer</>}
        </button>
        <button type="button" onClick={onCancel} className="px-4 py-2.5 text-white/40 hover:text-white/70 text-sm transition-colors">Annuler</button>
      </div>
    </form>
  );
}

// ── Country Section ──────────────────────────────────────────
function CountrySection({ country, clients, onEdit, onDelete, onAdd }: {
  country: string;
  clients: Client[];
  onEdit: (c: Client) => void;
  onDelete: (id: string) => void;
  onAdd: (country: string) => void;
}) {
  const [open, setOpen] = useState(true);
  const cfg = COUNTRY_CONFIG[country as ClientCountry] ?? { label: country, flag: "🌍" };

  return (
    <div className="bg-white/[0.02] border border-white/[0.065] rounded-2xl overflow-hidden">
      {/* Section header */}
      <button onClick={() => setOpen(o => !o)}
        className="w-full px-4 sm:px-5 py-4 flex items-center gap-3 hover:bg-white/[0.02] transition-colors">
        <span className="text-2xl shrink-0">{cfg.flag}</span>
        <div className="flex-1 text-left">
          <p className="text-white font-semibold text-sm" style={{ fontFamily: "var(--font-syne)" }}>{cfg.label}</p>
          <p className="text-white/35 text-xs">{clients.length} prospect{clients.length > 1 ? "s" : ""}</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={(e) => { e.stopPropagation(); onAdd(country); }}
            className="inline-flex items-center gap-1.5 bg-indigo-500/15 hover:bg-indigo-500/25 border border-indigo-500/25 text-indigo-300 text-xs font-medium px-3 py-1.5 rounded-lg transition-all">
            <Plus className="w-3 h-3" />Ajouter
          </button>
          {open ? <ChevronUp className="w-4 h-4 text-white/30 shrink-0" /> : <ChevronDown className="w-4 h-4 text-white/30 shrink-0" />}
        </div>
      </button>

      {open && clients.length > 0 && (
        <div className="border-t border-white/[0.055]">
          {/* Desktop table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.055]">
                  {["Contact", "Entreprise", "Secteur", "Statut", "Budget", "Liens", "Actions"].map(h => (
                    <th key={h} className="px-4 py-2.5 text-left text-xs font-semibold text-white/30 uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {clients.map(c => {
                  const st = STATUS_CONFIG[c.status];
                  return (
                    <tr key={c.id} className="hover:bg-white/[0.025] transition-colors group">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center text-indigo-300 text-xs font-bold shrink-0">
                            {c.firstName?.charAt(0)}{c.lastName?.charAt(0)}
                          </div>
                          <div className="min-w-0">
                            <p className="text-white text-sm font-medium truncate max-w-[120px]">{c.firstName} {c.lastName}</p>
                            <p className="text-white/28 text-xs truncate max-w-[120px]">{c.city || c.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-white/55 text-sm max-w-[120px]"><p className="truncate">{c.company || "—"}</p></td>
                      <td className="px-4 py-3 text-white/40 text-xs">{SECTOR_LABELS[c.sector] ?? c.sector}</td>
                      <td className="px-4 py-3">
                        <span className={cn("text-xs px-2 py-0.5 rounded-full border font-medium whitespace-nowrap", st.bg, st.color)}>{st.label}</span>
                      </td>
                      <td className="px-4 py-3 text-white/45 text-sm whitespace-nowrap">{c.budget || "—"}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          {c.email && <a href={`mailto:${c.email}`} className="w-6 h-6 rounded-md flex items-center justify-center bg-white/[0.04] hover:bg-white/[0.1] text-white/30 hover:text-white transition-all"><Mail className="w-3 h-3" /></a>}
                          {c.phone && <a href={`tel:${c.phone}`} className="w-6 h-6 rounded-md flex items-center justify-center bg-white/[0.04] hover:bg-white/[0.1] text-white/30 hover:text-white transition-all"><Phone className="w-3 h-3" /></a>}
                          {c.linkedin && <a href={c.linkedin} target="_blank" rel="noopener noreferrer" className="w-6 h-6 rounded-md flex items-center justify-center bg-white/[0.04] hover:bg-blue-500/20 text-white/30 hover:text-blue-400 transition-all"><Linkedin className="w-3 h-3" /></a>}
                          {c.website && <a href={c.website} target="_blank" rel="noopener noreferrer" className="w-6 h-6 rounded-md flex items-center justify-center bg-white/[0.04] hover:bg-white/[0.1] text-white/30 hover:text-white transition-all"><ExternalLink className="w-3 h-3" /></a>}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => onEdit(c)} className="w-7 h-7 rounded-lg flex items-center justify-center bg-white/[0.04] hover:bg-indigo-500/20 text-white/35 hover:text-indigo-400 transition-all"><Pencil className="w-3.5 h-3.5" /></button>
                          <button onClick={() => onDelete(c.id)} className="w-7 h-7 rounded-lg flex items-center justify-center bg-white/[0.04] hover:bg-red-500/20 text-white/35 hover:text-red-400 transition-all"><Trash2 className="w-3.5 h-3.5" /></button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="sm:hidden divide-y divide-white/[0.055]">
            {clients.map(c => {
              const st = STATUS_CONFIG[c.status];
              return (
                <div key={c.id} className="p-4 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-white text-sm font-semibold">{c.firstName} {c.lastName}</p>
                      <p className="text-white/35 text-xs">{c.company || c.email}</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className={cn("text-xs px-2 py-0.5 rounded-full border font-medium", st.bg, st.color)}>{st.label}</span>
                      <button onClick={() => onEdit(c)} className="w-7 h-7 rounded-lg flex items-center justify-center bg-white/[0.04] text-white/35 hover:text-indigo-400 transition-all"><Pencil className="w-3.5 h-3.5" /></button>
                      <button onClick={() => onDelete(c.id)} className="w-7 h-7 rounded-lg flex items-center justify-center bg-white/[0.04] text-white/35 hover:text-red-400 transition-all"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </div>
                  {c.notes && <p className="text-white/30 text-xs line-clamp-2">{c.notes}</p>}
                  <div className="flex items-center gap-2">
                    {c.email && <a href={`mailto:${c.email}`} className="text-indigo-400/70 hover:text-indigo-400 transition-colors"><Mail className="w-4 h-4" /></a>}
                    {c.phone && <a href={`tel:${c.phone}`} className="text-indigo-400/70 hover:text-indigo-400 transition-colors"><Phone className="w-4 h-4" /></a>}
                    {c.linkedin && <a href={c.linkedin} target="_blank" rel="noopener noreferrer" className="text-indigo-400/70 hover:text-indigo-400 transition-colors"><Linkedin className="w-4 h-4" /></a>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main CRM Page ────────────────────────────────────────────
export default function AdminClientsPage() {
  const { user } = useAuth();
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Form state
  const [showForm, setShowForm] = useState(false);
  const [editClient, setEditClient] = useState<Client | null>(null);
  const [defaultCountry, setDefaultCountry] = useState<string>("CH");

  // Delete confirm
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Filters
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<ClientStatus | "all">("all");

  const load = async () => {
    if (!user) return;
    const data = await getClients();
    setClients(data);
    setLoading(false);
    setRefreshing(false);
  };

  useEffect(() => { load(); }, [user]); // eslint-disable-line

  const filtered = useMemo(() => {
    let res = [...clients];
    if (search.trim()) {
      const q = search.toLowerCase();
      res = res.filter(c => `${c.firstName} ${c.lastName} ${c.company} ${c.email} ${c.city}`.toLowerCase().includes(q));
    }
    if (filterStatus !== "all") res = res.filter(c => c.status === filterStatus);
    return res;
  }, [clients, search, filterStatus]);

  // Group by country in defined order
  const countryOrder = ["CH", "FR", "AE", "QA", "OTHER"];
  const grouped = countryOrder.reduce((acc, code) => {
    const list = filtered.filter(c => c.country === code);
    if (list.length > 0) acc[code] = list;
    return acc;
  }, {} as Record<string, Client[]>);

  const handleSave = async (data: ClientFormData) => {
    if (editClient) {
      await updateClient(editClient.id, data);
    } else {
      await createClient({ ...data, country: (defaultCountry || data.country) as ClientFormData["country"] });
    }
    setShowForm(false);
    setEditClient(null);
    await load();
  };

  const handleEdit = (c: Client) => {
    setEditClient(c);
    setDefaultCountry(c.country);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAddInCountry = (country: string) => {
    setEditClient(null);
    setDefaultCountry(country);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    await deleteClient(deleteId);
    setClients(prev => prev.filter(c => c.id !== deleteId));
    setDeleteId(null);
    setDeleting(false);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-white font-bold text-xl sm:text-2xl" style={{ fontFamily: "var(--font-syne)" }}>CRM Prospects</h1>
          <p className="text-white/35 text-sm mt-0.5">{clients.length} prospect{clients.length > 1 ? "s" : ""} · {filtered.length} affiché{filtered.length > 1 ? "s" : ""}</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => exportClientsCSV(filtered)}
            className="inline-flex items-center gap-2 bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.08] text-white/60 hover:text-white text-sm font-medium px-3.5 py-2.5 rounded-xl transition-all">
            <Download className="w-4 h-4" />CSV
          </button>
          <button onClick={() => { setRefreshing(true); load(); }} disabled={refreshing}
            className="w-10 h-10 bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.08] rounded-xl flex items-center justify-center text-white/50 transition-all">
            <RefreshCw className={cn("w-4 h-4", refreshing && "animate-spin")} />
          </button>
          <button onClick={() => { setEditClient(null); setDefaultCountry("CH"); setShowForm(true); }}
            className="inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-400 text-white font-semibold px-4 py-2.5 rounded-xl text-sm transition-all shadow-lg shadow-indigo-500/20 active:scale-[0.98]">
            <Plus className="w-4 h-4" />Ajouter
          </button>
        </div>
      </div>

      {/* Inline form */}
      {showForm && (
        <ClientForm
          initial={editClient ? { ...editClient } : { ...EMPTY_FORM, country: defaultCountry as ClientFormData["country"] }}
          onSave={handleSave}
          onCancel={() => { setShowForm(false); setEditClient(null); }}
        />
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <div className="relative flex-1 min-w-44">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher..."
            className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-10 pr-4 py-2.5 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-indigo-500/50 transition-all" />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/25 pointer-events-none" />
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value as ClientStatus | "all")}
            className="appearance-none bg-white/[0.04] border border-white/[0.08] rounded-xl pl-8 pr-7 py-2.5 text-white/65 text-sm focus:outline-none focus:border-indigo-500/50 transition-all cursor-pointer">
            <option value="all">Tous les statuts</option>
            {(Object.entries(STATUS_CONFIG) as [string, typeof STATUS_CONFIG[keyof typeof STATUS_CONFIG]][]).map(([k, v]) => (
              <option key={k} value={k}>{v.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Country sections */}
      {loading ? (
        <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="h-32 bg-white/[0.04] rounded-2xl animate-pulse" />)}</div>
      ) : Object.keys(grouped).length === 0 ? (
        <div className="bg-white/[0.025] border border-white/[0.07] rounded-2xl p-10 text-center">
          <p className="text-white/30 text-sm">{clients.length === 0 ? "Aucun prospect. Cliquez sur « Ajouter » pour commencer." : "Aucun résultat."}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {Object.entries(grouped).map(([country, list]) => (
            <CountrySection
              key={country}
              country={country}
              clients={list}
              onEdit={handleEdit}
              onDelete={id => setDeleteId(id)}
              onAdd={handleAddInCountry}
            />
          ))}
        </div>
      )}

      {/* Delete confirm */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setDeleteId(null)} />
          <div className="relative bg-[#0c101c] border border-white/[0.08] rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <h3 className="text-white font-bold text-base mb-2" style={{ fontFamily: "var(--font-syne)" }}>Supprimer ce prospect ?</h3>
            <p className="text-white/45 text-sm mb-5">Cette action est irréversible.</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setDeleteId(null)} className="px-4 py-2 text-white/45 hover:text-white/70 text-sm transition-colors">Annuler</button>
              <button onClick={handleDelete} disabled={deleting}
                className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-400 disabled:opacity-50 text-white font-semibold px-5 py-2 rounded-xl transition-all text-sm">
                {deleting ? "Suppression..." : "Supprimer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

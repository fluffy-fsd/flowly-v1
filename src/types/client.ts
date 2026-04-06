export type ClientStatus =
  | "prospect"
  | "contact"
  | "proposal"
  | "negotiation"
  | "client"
  | "lost";

export type ClientCountry = "CH" | "FR" | "AE" | "QA" | "OTHER";

export type ClientSector =
  | "restauration"
  | "transport"
  | "immobilier"
  | "finance"
  | "hotellerie"
  | "retail"
  | "sante"
  | "tech"
  | "industrie"
  | "autre";

export interface Client {
  id: string;
  // Identité
  firstName: string;
  lastName: string;
  company: string;
  role: string;
  // Contact
  email: string;
  phone: string;
  linkedin: string;
  website: string;
  // Localisation
  country: ClientCountry;
  city: string;
  // Métier
  sector: ClientSector;
  // CRM
  status: ClientStatus;
  budget: string;
  projectType: string;
  source: string;
  // Notes
  notes: string;
  // Dates
  createdAt: string;
  updatedAt: string;
  lastContactAt: string;
}

export type ClientFormData = Omit<Client, "id" | "createdAt" | "updatedAt">;

// ============================================
// LABELS & COLORS
// ============================================
export const STATUS_CONFIG: Record<ClientStatus, { label: string; color: string; bg: string; dot: string }> = {
  prospect: { label: "Prospect", color: "text-slate-400", bg: "bg-slate-500/10 border-slate-500/20", dot: "bg-slate-400" },
  contact: { label: "Contacté", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20", dot: "bg-blue-400" },
  proposal: { label: "Proposition envoyée", color: "text-indigo-400", bg: "bg-indigo-500/10 border-indigo-500/20", dot: "bg-indigo-400" },
  negotiation: { label: "En négociation", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20", dot: "bg-amber-400" },
  client: { label: "Client", color: "text-green-400", bg: "bg-green-500/10 border-green-500/20", dot: "bg-green-400" },
  lost: { label: "Perdu", color: "text-red-400", bg: "bg-red-500/10 border-red-500/20", dot: "bg-red-400" },
};

export const COUNTRY_CONFIG: Record<ClientCountry, { label: string; flag: string }> = {
  CH: { label: "Suisse", flag: "🇨🇭" },
  FR: { label: "France", flag: "🇫🇷" },
  AE: { label: "Émirats", flag: "🇦🇪" },
  QA: { label: "Qatar", flag: "🇶🇦" },
  OTHER: { label: "Autre", flag: "🌍" },
};

export const SECTOR_LABELS: Record<ClientSector, string> = {
  restauration: "Restauration",
  transport: "Transport",
  immobilier: "Immobilier",
  finance: "Finance",
  hotellerie: "Hôtellerie",
  retail: "Retail",
  sante: "Santé",
  tech: "Tech",
  industrie: "Industrie",
  autre: "Autre",
};

export const SOURCE_OPTIONS = [
  "LinkedIn",
  "Recommandation",
  "Site web",
  "Cold email",
  "Cold call",
  "Réseau",
  "Événement",
  "Autre",
];

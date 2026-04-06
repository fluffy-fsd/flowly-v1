// ============================================
// USER TYPES
// ============================================
export type UserRole = "admin" | "client";

export type ProjectStatus =
  | "pending"      // En attente de démarrage
  | "in_progress"  // En cours
  | "review"       // En revue / validation
  | "delivered"    // Livré
  | "completed";   // Terminé et payé

export type ProjectStep = {
  id: string;
  label: string;
  status: "done" | "current" | "upcoming";
  completedAt?: string;
};

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  company: string;
  phone: string;
  country: string;
  role: UserRole;
  createdAt: string;
  lastLoginAt: string;
  avatarInitials: string;
}

export interface Project {
  id: string;
  clientUid: string;
  clientName: string;
  clientEmail: string;
  title: string;
  description: string;
  status: ProjectStatus;
  steps: ProjectStep[];
  budget: string;
  currency: string;
  startDate: string;
  deliveryDate: string;
  techStack: string[];
  adminNotes: string;
  createdAt: string;
  updatedAt: string;
}

export interface Invoice {
  id: string;
  clientUid: string;
  projectId: string;
  title: string;
  amount: number;
  currency: string;
  status: "pending" | "paid" | "overdue";
  dueDate: string;
  paidAt?: string;
  fileUrl?: string;
  createdAt: string;
}

export interface Message {
  id: string;
  projectId: string;
  senderUid: string;
  senderName: string;
  senderRole: UserRole;
  content: string;
  read: boolean;
  createdAt: string;
}

export const PROJECT_STATUS_CONFIG: Record<ProjectStatus, { label: string; color: string; bg: string; dot: string; step: number }> = {
  pending:     { label: "En attente",   color: "text-slate-400",  bg: "bg-slate-500/10 border-slate-500/20",  dot: "bg-slate-400",  step: 1 },
  in_progress: { label: "En cours",     color: "text-blue-400",   bg: "bg-blue-500/10 border-blue-500/20",    dot: "bg-blue-400",   step: 2 },
  review:      { label: "En revue",     color: "text-amber-400",  bg: "bg-amber-500/10 border-amber-500/20",  dot: "bg-amber-400",  step: 3 },
  delivered:   { label: "Livré",        color: "text-indigo-400", bg: "bg-indigo-500/10 border-indigo-500/20", dot: "bg-indigo-400", step: 4 },
  completed:   { label: "Terminé",      color: "text-green-400",  bg: "bg-green-500/10 border-green-500/20",  dot: "bg-green-400",  step: 5 },
};

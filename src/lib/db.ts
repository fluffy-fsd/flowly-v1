import {
  collection, doc, addDoc, updateDoc, deleteDoc,
  getDocs, getDoc, query, orderBy, where,
  serverTimestamp, Timestamp, setDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Project, UserProfile, Message, Invoice, ProjectStep } from "@/types/user";
import type { Client, ClientFormData } from "@/types/client";

// ── helpers ─────────────────────────────────────
function ts(data: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(data)) {
    out[k] = v instanceof Timestamp ? v.toDate().toISOString() : v;
  }
  return out;
}

// ============================================
// USERS
// ============================================
export async function getAllUsers(): Promise<UserProfile[]> {
  const q = query(collection(db, "users"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map(d => ts(d.data()) as unknown as UserProfile);
}

export async function getUserById(uid: string): Promise<UserProfile | null> {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? ts(snap.data()) as unknown as UserProfile : null;
}

export async function updateUser(uid: string, data: Partial<UserProfile>): Promise<void> {
  await updateDoc(doc(db, "users", uid), { ...data, updatedAt: serverTimestamp() });
}

// ============================================
// CLIENTS (CRM prospection)
// ============================================
export async function getClients(): Promise<Client[]> {
  const q = query(collection(db, "clients"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...ts(d.data()) } as Client));
}

export async function createClient(data: ClientFormData): Promise<string> {
  const ref = await addDoc(collection(db, "clients"), { ...data, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
  return ref.id;
}

export async function updateClient(id: string, data: Partial<ClientFormData>): Promise<void> {
  await updateDoc(doc(db, "clients", id), { ...data, updatedAt: serverTimestamp() });
}

export async function deleteClient(id: string): Promise<void> {
  await deleteDoc(doc(db, "clients", id));
}

// ============================================
// PROJECTS
// ============================================
export async function getAllProjects(): Promise<Project[]> {
  const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...ts(d.data()) } as Project));
}

export async function getProjectsByClient(uid: string): Promise<Project[]> {
  const q = query(collection(db, "projects"), where("clientUid", "==", uid), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...ts(d.data()) } as Project));
}

export async function createProject(data: Omit<Project, "id" | "createdAt" | "updatedAt">): Promise<string> {
  const defaultSteps: ProjectStep[] = [
    { id: "1", label: "Cadrage & spécifications", status: "done" },
    { id: "2", label: "Design & maquettes", status: "upcoming" },
    { id: "3", label: "Développement", status: "upcoming" },
    { id: "4", label: "Tests & corrections", status: "upcoming" },
    { id: "5", label: "Livraison & déploiement", status: "upcoming" },
  ];
  const ref = await addDoc(collection(db, "projects"), {
    ...data,
    steps: data.steps?.length ? data.steps : defaultSteps,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateProject(id: string, data: Partial<Project>): Promise<void> {
  await updateDoc(doc(db, "projects", id), { ...data, updatedAt: serverTimestamp() });
}

export async function deleteProject(id: string): Promise<void> {
  await deleteDoc(doc(db, "projects", id));
}

// ============================================
// MESSAGES
// ============================================
export async function getMessages(projectId: string): Promise<Message[]> {
  const q = query(
    collection(db, "messages"),
    where("projectId", "==", projectId),
    orderBy("createdAt", "asc")
  );
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...ts(d.data()) } as Message));
}

export async function sendMessage(data: Omit<Message, "id" | "createdAt">): Promise<void> {
  await addDoc(collection(db, "messages"), { ...data, createdAt: serverTimestamp() });
}

export async function markMessagesRead(projectId: string, readerUid: string): Promise<void> {
  const q = query(
    collection(db, "messages"),
    where("projectId", "==", projectId),
    where("read", "==", false)
  );
  const snap = await getDocs(q);
  await Promise.all(
    snap.docs
      .filter(d => d.data().senderUid !== readerUid)
      .map(d => updateDoc(d.ref, { read: true }))
  );
}

export async function getUnreadCount(projectId: string, readerUid: string): Promise<number> {
  const msgs = await getMessages(projectId);
  return msgs.filter(m => !m.read && m.senderUid !== readerUid).length;
}

// ============================================
// INVOICES
// ============================================
export async function getInvoicesByClient(uid: string): Promise<Invoice[]> {
  const q = query(collection(db, "invoices"), where("clientUid", "==", uid), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...ts(d.data()) } as Invoice));
}

export async function getAllInvoices(): Promise<Invoice[]> {
  const q = query(collection(db, "invoices"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...ts(d.data()) } as Invoice));
}

export async function createInvoice(data: Omit<Invoice, "id" | "createdAt">): Promise<string> {
  const ref = await addDoc(collection(db, "invoices"), { ...data, createdAt: serverTimestamp() });
  return ref.id;
}

export async function updateInvoice(id: string, data: Partial<Invoice>): Promise<void> {
  await updateDoc(doc(db, "invoices", id), data);
}

// ============================================
// EXPORT CSV clients
// ============================================
export function exportClientsCSV(clients: Client[]): void {
  const headers = ["Prénom","Nom","Entreprise","Rôle","Email","Tel","Pays","Ville","Secteur","Statut","Budget","Source","Notes","Créé le"];
  const rows = clients.map(c => [
    c.firstName, c.lastName, c.company, c.role, c.email, c.phone,
    c.country, c.city, c.sector, c.status, c.budget, c.source,
    c.notes?.replace(/\n/g," "),
    c.createdAt ? new Date(c.createdAt).toLocaleDateString("fr-FR") : "",
  ]);
  const csv = [headers, ...rows].map(r => r.map(v => `"${String(v ?? "").replace(/"/g,'""')}"`).join(",")).join("\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob(["\uFEFF"+csv], { type: "text/csv;charset=utf-8;" }));
  a.download = `clients_${new Date().toISOString().slice(0,10)}.csv`;
  a.click();
}

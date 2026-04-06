"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { getInvoicesByClient } from "@/lib/db";
import type { Invoice } from "@/types/user";
import { FileText, Download, CheckCircle2, Clock, AlertCircle } from "lucide-react";

export const dynamic = "force-dynamic";

const STATUS = {
  pending: { label: "En attente", icon: Clock, color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
  paid: { label: "Payée", icon: CheckCircle2, color: "text-green-400", bg: "bg-green-500/10 border-green-500/20" },
  overdue: { label: "En retard", icon: AlertCircle, color: "text-red-400", bg: "bg-red-500/10 border-red-500/20" },
};

export default function DashboardDocumentsPage() {
  const { user } = useAuth();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    getInvoicesByClient(user.uid).then(i => setInvoices(i)).finally(() => setLoading(false));
  }, [user]);

  const totalPaid = invoices.filter(i => i.status === "paid").reduce((a, i) => a + i.amount, 0);
  const totalPending = invoices.filter(i => i.status === "pending").reduce((a, i) => a + i.amount, 0);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="text-white font-bold text-xl sm:text-2xl" style={{ fontFamily: "var(--font-syne)" }}>Documents</h1>
        <p className="text-white/35 text-sm mt-1">Vos devis et factures.</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {[
          { label: "Total facturé", value: `${totalPaid + totalPending} EUR`, color: "text-white" },
          { label: "Payé", value: `${totalPaid} EUR`, color: "text-green-400" },
          { label: "En attente", value: `${totalPending} EUR`, color: "text-amber-400" },
        ].map(s => (
          <div key={s.label} className="bg-white/[0.025] border border-white/[0.07] rounded-2xl p-4">
            <p className="text-white/35 text-xs mb-1">{s.label}</p>
            <p className={`font-bold text-lg ${s.color}`} style={{ fontFamily: "var(--font-syne)" }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Invoice list */}
      <div className="bg-white/[0.025] border border-white/[0.07] rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-white/[0.065]">
          <h2 className="text-white font-semibold text-sm" style={{ fontFamily: "var(--font-syne)" }}>Factures</h2>
        </div>

        {loading ? (
          <div className="p-5 space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="h-14 bg-white/[0.04] rounded-xl animate-pulse" />)}</div>
        ) : invoices.length === 0 ? (
          <div className="p-10 text-center">
            <FileText className="w-8 h-8 text-white/15 mx-auto mb-2" />
            <p className="text-white/30 text-sm">Aucun document pour l&apos;instant.</p>
          </div>
        ) : (
          <div className="divide-y divide-white/[0.055]">
            {invoices.map(inv => {
              const st = STATUS[inv.status];
              const Icon = st.icon;
              return (
                <div key={inv.id} className="px-5 py-4 flex items-center gap-4">
                  <div className="w-9 h-9 rounded-xl bg-white/[0.05] flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4 text-white/40" strokeWidth={1.75} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{inv.title}</p>
                    <p className="text-white/30 text-xs mt-0.5">
                      Échéance : {new Date(inv.dueDate).toLocaleDateString("fr-FR")}
                      {inv.paidAt && ` · Payée le ${new Date(inv.paidAt).toLocaleDateString("fr-FR")}`}
                    </p>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full border font-medium shrink-0 flex items-center gap-1 ${st.bg} ${st.color}`}>
                    <Icon className="w-3 h-3" />{st.label}
                  </span>
                  <span className="text-white font-bold text-sm shrink-0">{inv.amount} {inv.currency}</span>
                  {inv.fileUrl && (
                    <a href={inv.fileUrl} target="_blank" rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg bg-white/[0.04] hover:bg-white/[0.09] flex items-center justify-center text-white/40 hover:text-white transition-all shrink-0">
                      <Download className="w-4 h-4" />
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

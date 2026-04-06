import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { calculateQuote, formatCurrency, formatDate } from "@/lib/utils";
import type { QuoteFormData } from "@/types";
import { QUOTE_PRODUCTS, QUOTE_ADDONS } from "@/lib/constants";

const schema = z.object({
  product: z.string().min(1), addOns: z.array(z.string()).default([]),
  delivery: z.enum(["standard", "express", "urgent"]).default("standard"),
  projectName: z.string().min(2).max(100), description: z.string().min(20).max(2000),
  referenceUrls: z.string().max(500).optional().default(""),
  hasDesign: z.boolean().default(false), hasCopy: z.boolean().default(false),
  firstName: z.string().min(2).max(50), lastName: z.string().min(2).max(50),
  email: z.string().email(), phone: z.string().max(20).optional().default(""),
  company: z.string().max(100).optional().default(""), linkedin: z.string().max(200).optional().default(""),
  acceptTerms: z.boolean().refine(v => v === true), budget: z.number().default(0),
});

const rateMap = new Map<string, { count: number; reset: number }>();
function isRateLimited(ip: string): boolean {
  const now = Date.now(), e = rateMap.get(ip);
  if (!e || now > e.reset) { rateMap.set(ip, { count: 1, reset: now + 60000 }); return false; }
  if (e.count >= 5) return true;
  e.count++; return false;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  if (isRateLimited(ip)) return NextResponse.json({ error: "Rate limit dépassé." }, { status: 429 });
  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "JSON invalide" }, { status: 400 }); }
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Données invalides", details: parsed.error.flatten() }, { status: 422 });
  const data = { ...parsed.data, budget: 0 } as QuoteFormData;
  const estimate = calculateQuote(data);
  const ref = `FS-${Date.now().toString(36).toUpperCase()}`;
  const product = QUOTE_PRODUCTS.find(p => p.id === data.product);
  const addOns = (data.addOns ?? []).map(id => QUOTE_ADDONS.find(a => a.id === id)).filter(Boolean);

  const RESEND_KEY = process.env.RESEND_API_KEY;
  if (RESEND_KEY) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(RESEND_KEY);
      const html = `<!DOCTYPE html><html><body style="font-family:sans-serif;background:#f9fafb;padding:40px 20px"><div style="max-width:580px;margin:0 auto;background:white;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08)"><div style="background:linear-gradient(135deg,#07090f,#1e1b4b);padding:36px;text-align:center"><p style="color:white;margin:0;font-size:26px;font-weight:800">F<span style="color:#818cf8">Studios</span></p><p style="color:rgba(255,255,255,0.4);margin:6px 0 0;font-size:13px">Référence : ${ref}</p></div><div style="padding:36px"><h2 style="margin:0 0 8px;color:#111">Bonjour ${data.firstName},</h2><p style="color:#6b7280;margin:0 0 28px;line-height:1.6">Voici le détail de votre devis pour <strong style="color:#111">${data.projectName}</strong>.</p><div style="background:#f9fafb;border-radius:10px;padding:22px;margin-bottom:22px"><p style="color:#9ca3af;font-size:12px;text-transform:uppercase;letter-spacing:.5px;margin:0 0 14px">Détail</p>${product ? `<div style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid #e5e7eb"><span style="color:#374151">${product.name}</span><span style="font-weight:600;color:#111">${formatCurrency(product.basePrice)}</span></div>` : ""}${addOns.map(a => `<div style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid #e5e7eb"><span style="color:#374151">+ ${a?.name}</span><span style="color:#111">${formatCurrency(a?.price ?? 0)}</span></div>`).join("")}${data.delivery !== "standard" ? `<div style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid #e5e7eb"><span style="color:#f59e0b">Supplément ${data.delivery}</span><span style="color:#f59e0b;font-weight:500">${formatCurrency(estimate.total - estimate.subtotal)}</span></div>` : ""}<div style="display:flex;justify-content:space-between;padding:14px 0 0"><span style="font-weight:700;font-size:18px;color:#111">Total HT</span><span style="font-weight:800;font-size:24px;color:#6366f1">${formatCurrency(estimate.total)}</span></div><p style="color:#9ca3af;font-size:11px;margin:4px 0 0">TVA non applicable — Art. 293B CGI</p></div><div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:14px 18px;margin-bottom:22px"><p style="margin:0;color:#1d4ed8;font-size:13px">📅 Livraison estimée : <strong>${formatDate(estimate.deliveryDate)}</strong> (~${estimate.estimatedDays} jours ouvrés)</p></div><p style="color:#6b7280;font-size:13px;line-height:1.6;margin:0 0 28px">Ce devis est valable 30 jours. Je vous contacte sous 24h pour les prochaines étapes.</p><a href="mailto:doriangosselin6@gmail.com" style="display:inline-block;background:linear-gradient(135deg,#6366f1,#4f46e5);color:white;text-decoration:none;padding:13px 26px;border-radius:10px;font-weight:600;font-size:14px">Confirmer votre projet →</a></div><div style="background:#f9fafb;padding:22px 36px;border-top:1px solid #e5e7eb;text-align:center"><p style="color:#9ca3af;font-size:11px;margin:0">FStudios · SIREN 952 303 832 · doriangosselin6@gmail.com</p></div></div></body></html>`;
      await resend.emails.send({ from: "FStudios <devis@fstudios.fr>", to: data.email, subject: `[${ref}] Votre devis FStudios — ${data.projectName}`, html });
      await resend.emails.send({ from: "FStudios Bot <devis@fstudios.fr>", to: process.env.ADMIN_EMAIL ?? "doriangosselin6@gmail.com", subject: `🔔 Nouveau devis [${ref}] — ${data.firstName} ${data.lastName} · ${data.projectName}`, text: `Ref: ${ref}\nClient: ${data.firstName} ${data.lastName} (${data.email})\nSociété: ${data.company}\nProjet: ${data.projectName}\nProduit: ${data.product}\nOptions: ${data.addOns?.join(", ")}\nDélai: ${data.delivery}\nEstimation: ${estimate.total}€ (~${estimate.estimatedDays}j)\nTél: ${data.phone}\n\n${data.description}` });
    } catch (err) { console.error("[RESEND]", err); }
  }
  return NextResponse.json({ success: true, ref, estimate: { total: estimate.total, estimatedDays: estimate.estimatedDays, deliveryDate: estimate.deliveryDate } });
}

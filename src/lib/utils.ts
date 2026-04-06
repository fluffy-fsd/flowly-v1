import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { QuoteFormData, QuoteEstimate, DeliverySpeed } from "@/types";
import { QUOTE_PRODUCTS, QUOTE_ADDONS, DELIVERY_SPEEDS } from "@/lib/constants";

export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }

export function calculateQuote(data: Partial<QuoteFormData>): QuoteEstimate {
  const product = data.product ? QUOTE_PRODUCTS.find((p) => p.id === data.product) : null;
  const basePrice = product?.basePrice ?? 0;
  const baseDays = product?.estimatedDays ?? 0;
  const addOnsTotal = (data.addOns ?? []).reduce((acc, id) => acc + (QUOTE_ADDONS.find((a) => a.id === id)?.price ?? 0), 0);
  const addOnsDays = (data.addOns ?? []).reduce((acc, id) => acc + (QUOTE_ADDONS.find((a) => a.id === id)?.days ?? 0), 0);
  const subtotal = basePrice + addOnsTotal;
  const speed = (data.delivery as DeliverySpeed) ?? "standard";
  const multiplier = DELIVERY_SPEEDS[speed].multiplier;
  const total = Math.round(subtotal * multiplier);
  const estimatedDays = Math.ceil((baseDays + addOnsDays) / (speed === "urgent" ? 1.8 : speed === "express" ? 1.35 : 1));
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + estimatedDays + 2);
  return { subtotal, deliveryMultiplier: multiplier, total, estimatedDays, deliveryDate };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount);
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" }).format(new Date(date));
}

export function formatDateShort(date: Date | string): string {
  return new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "short", year: "numeric" }).format(new Date(date));
}

"use client";
import { createContext, useContext, useReducer, useCallback, type ReactNode } from "react";
import type { QuoteFormData, QuoteEstimate, ProductCategory, ProductAddOn, DeliverySpeed } from "@/types";
import { calculateQuote } from "@/lib/utils";

interface QuoteState { step: 1|2|3|4; data: Partial<QuoteFormData>; estimate: QuoteEstimate; isSubmitting: boolean; isSuccess: boolean; }
type Action = { type: "SET_STEP"; p: 1|2|3|4 } | { type: "SET_PRODUCT"; p: ProductCategory } | { type: "TOGGLE_ADDON"; p: ProductAddOn } | { type: "SET_DELIVERY"; p: DeliverySpeed } | { type: "UPDATE"; p: Partial<QuoteFormData> } | { type: "SUBMITTING"; p: boolean } | { type: "SUCCESS" } | { type: "RESET" };

const init: Partial<QuoteFormData> = { product: null, addOns: [], delivery: "standard", budget: 0, projectName: "", description: "", referenceUrls: "", hasDesign: false, hasCopy: false, firstName: "", lastName: "", email: "", phone: "", company: "", linkedin: "" };
const initialState: QuoteState = { step: 1, data: init, estimate: calculateQuote(init), isSubmitting: false, isSuccess: false };

function reducer(s: QuoteState, a: Action): QuoteState {
  switch (a.type) {
    case "SET_STEP": return { ...s, step: a.p };
    case "SET_PRODUCT": { const d = { ...s.data, product: a.p }; return { ...s, data: d, estimate: calculateQuote(d) }; }
    case "TOGGLE_ADDON": { const cur = s.data.addOns ?? []; const addOns = cur.includes(a.p) ? cur.filter(x => x !== a.p) : [...cur, a.p]; const d = { ...s.data, addOns }; return { ...s, data: d, estimate: calculateQuote(d) }; }
    case "SET_DELIVERY": { const d = { ...s.data, delivery: a.p }; return { ...s, data: d, estimate: calculateQuote(d) }; }
    case "UPDATE": { const d = { ...s.data, ...a.p }; return { ...s, data: d, estimate: calculateQuote(d) }; }
    case "SUBMITTING": return { ...s, isSubmitting: a.p };
    case "SUCCESS": return { ...s, isSuccess: true, isSubmitting: false };
    case "RESET": return initialState;
    default: return s;
  }
}

interface Ctx { state: QuoteState; setProduct(p: ProductCategory): void; toggleAddOn(p: ProductAddOn): void; setDelivery(p: DeliverySpeed): void; update(p: Partial<QuoteFormData>): void; next(): void; prev(): void; dispatch: React.Dispatch<Action>; }
const QuoteCtx = createContext<Ctx | null>(null);

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const setProduct = useCallback((p: ProductCategory) => dispatch({ type: "SET_PRODUCT", p }), []);
  const toggleAddOn = useCallback((p: ProductAddOn) => dispatch({ type: "TOGGLE_ADDON", p }), []);
  const setDelivery = useCallback((p: DeliverySpeed) => dispatch({ type: "SET_DELIVERY", p }), []);
  const update = useCallback((p: Partial<QuoteFormData>) => dispatch({ type: "UPDATE", p }), []);
  const next = useCallback(() => dispatch({ type: "SET_STEP", p: Math.min(state.step + 1, 4) as 1|2|3|4 }), [state.step]);
  const prev = useCallback(() => dispatch({ type: "SET_STEP", p: Math.max(state.step - 1, 1) as 1|2|3|4 }), [state.step]);
  return <QuoteCtx.Provider value={{ state, setProduct, toggleAddOn, setDelivery, update, next, prev, dispatch }}>{children}</QuoteCtx.Provider>;
}
export const useQuote = () => { const c = useContext(QuoteCtx); if (!c) throw new Error("QuoteProvider missing"); return c; };

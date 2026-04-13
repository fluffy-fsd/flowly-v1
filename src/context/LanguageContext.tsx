"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";
import { translations, Lang } from "@/lib/translations";

type T = typeof translations;

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: T["fr"];
}

export const LanguageContext = createContext<LanguageContextType>({
  lang: "fr",
  setLang: () => {},
  t: translations.fr,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("fr");

  return (
    <LanguageContext.Provider
      // Both "fr" and "en" share the same shape; cast to silence the
      // literal-string mismatch introduced by `as const`.
      value={{ lang, setLang, t: translations[lang] as T["fr"] }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}

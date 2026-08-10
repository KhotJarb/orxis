"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

// ── Supported Languages ──────────────────────────────────────────────────────

export const LANGUAGES = {
  en: { name: "English", nativeName: "English", flag: "🇺🇸" },
  th: { name: "Thai", nativeName: "ไทย", flag: "🇹🇭" },
  zh: { name: "Chinese", nativeName: "中文", flag: "🇨🇳" },
  ja: { name: "Japanese", nativeName: "日本語", flag: "🇯🇵" },
  es: { name: "Spanish", nativeName: "Español", flag: "🇪🇸" },
  ko: { name: "Korean", nativeName: "한국어", flag: "🇰🇷" },
  id: { name: "Indonesian", nativeName: "Bahasa", flag: "🇮🇩" },
} as const;

export type Locale = keyof typeof LANGUAGES;
export type Namespace = "common" | "home" | "generate" | "docs" | "gallery" | "legal" | "pages" | "data";

const DEFAULT_LOCALE: Locale = "en";
const STORAGE_KEY = "orxis_language";

// ── Types ────────────────────────────────────────────────────────────────────

// Nested translation object: keys can be strings or nested objects
type TranslationValue = string | { [key: string]: TranslationValue };
type TranslationMap = { [key: string]: TranslationValue };

// All loaded translations keyed by locale then namespace
type LoadedTranslations = {
  [locale in Locale]?: {
    [ns in Namespace]?: TranslationMap;
  };
};

// ── Context ──────────────────────────────────────────────────────────────────

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (namespace: Namespace, key: string, vars?: Record<string, string | number>) => string;
  tArray: (namespace: Namespace, key: string) => string[];
  isLoaded: boolean;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

// ── Resolver: dot-notation key → value ───────────────────────────────────────

function resolve(obj: TranslationMap, path: string): string | undefined {
  const keys = path.split(".");
  let current: TranslationValue = obj;

  for (const key of keys) {
    if (current === undefined || current === null || typeof current === "string") {
      return undefined;
    }
    current = (current as TranslationMap)[key];
  }

  return typeof current === "string" ? current : undefined;
}

// Resolve to any value (string, array, nested object)
function resolveRaw(obj: TranslationMap, path: string): TranslationValue | undefined {
  const keys = path.split(".");
  let current: TranslationValue = obj;

  for (const key of keys) {
    if (current === undefined || current === null || typeof current === "string") {
      return undefined;
    }
    current = (current as TranslationMap)[key];
  }

  return current;
}

// ── Interpolation: replace {{var}} with values ───────────────────────────────

function interpolate(text: string, vars?: Record<string, string | number>): string {
  if (!vars) return text;
  return text.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    return vars[key] !== undefined ? String(vars[key]) : `{{${key}}}`;
  });
}

// ── Dynamic loader ───────────────────────────────────────────────────────────

const translationCache: LoadedTranslations = {};

async function loadNamespace(locale: Locale, ns: Namespace): Promise<TranslationMap> {
  // Check cache first
  if (translationCache[locale]?.[ns]) {
    return translationCache[locale]![ns]!;
  }

  try {
    // Dynamic import of JSON file
    const mod = await import(`./locales/${locale}/${ns}.json`);
    const data = mod.default || mod;

    // Cache it
    if (!translationCache[locale]) {
      translationCache[locale] = {};
    }
    translationCache[locale]![ns] = data;

    return data;
  } catch {
    // Fallback to English if translation file is missing
    if (locale !== "en") {
      console.warn(`[i18n] Missing ${locale}/${ns}.json — falling back to English`);
      return loadNamespace("en", ns);
    }
    console.warn(`[i18n] Missing en/${ns}.json`);
    return {};
  }
}

// Preload all namespaces for a locale
async function preloadLocale(locale: Locale): Promise<void> {
  const namespaces: Namespace[] = ["common", "home", "generate", "docs", "gallery", "legal", "pages", "data"];
  await Promise.all(namespaces.map((ns) => loadNamespace(locale, ns)));
}

// ── Provider ─────────────────────────────────────────────────────────────────

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
  const [isLoaded, setIsLoaded] = useState(false);
  const [, setRenderKey] = useState(0); // Force re-render after translations load

  // Read saved locale from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
    const initial = saved && saved in LANGUAGES ? saved : DEFAULT_LOCALE;

    setLocaleState(initial);

    // Preload translations
    preloadLocale(initial).then(() => {
      setIsLoaded(true);
      setRenderKey((k) => k + 1);
    });
  }, []);

  // Change locale
  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem(STORAGE_KEY, newLocale);

    // Load translations for new locale
    setIsLoaded(false);
    preloadLocale(newLocale).then(() => {
      setIsLoaded(true);
      setRenderKey((k) => k + 1);
    });
  }, []);

  // Translation function
  const t = useCallback(
    (namespace: Namespace, key: string, vars?: Record<string, string | number>): string => {
      // Try current locale
      const nsData = translationCache[locale]?.[namespace];
      if (nsData) {
        const value = resolve(nsData, key);
        if (value !== undefined) return interpolate(value, vars);
      }

      // Fallback to English
      if (locale !== "en") {
        const enData = translationCache["en"]?.[namespace];
        if (enData) {
          const value = resolve(enData, key);
          if (value !== undefined) return interpolate(value, vars);
        }
      }

      // Return key as last resort (makes missing translations visible)
      if (process.env.NODE_ENV === "development") {
        console.warn(`[i18n] Missing key: ${namespace}.${key} (${locale})`);
      }
      return key;
    },
    [locale]
  );

  // Translation function for arrays
  const tArray = useCallback(
    (namespace: Namespace, key: string): string[] => {
      const nsData = translationCache[locale]?.[namespace];
      if (nsData) {
        const value = resolveRaw(nsData, key);
        if (Array.isArray(value)) return value as string[];
      }
      // Fallback to English
      if (locale !== "en") {
        const enData = translationCache["en"]?.[namespace];
        if (enData) {
          const value = resolveRaw(enData, key);
          if (Array.isArray(value)) return value as string[];
        }
      }
      return [];
    },
    [locale]
  );

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, tArray, isLoaded }}>
      {children}
    </LanguageContext.Provider>
  );
}

// ── Hooks ────────────────────────────────────────────────────────────────────

/** Get the full i18n context */
export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within <LanguageProvider>");
  return ctx;
}

/** Shorthand: get `t(key)` and `tArray(key)` scoped to a namespace */
export function useT(namespace: Namespace) {
  const { t, tArray } = useLanguage();
  const tScoped = useCallback(
    (key: string, vars?: Record<string, string | number>) => t(namespace, key, vars),
    [t, namespace]
  );
  const tArrayScoped = useCallback(
    (key: string) => tArray(namespace, key),
    [tArray, namespace]
  );
  return Object.assign(tScoped, { array: tArrayScoped });
}

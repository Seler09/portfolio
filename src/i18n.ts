import { createContext, useContext } from 'react';
import type { Content, Lang } from './content';

export type LangCtx = { lang: Lang; setLang: (l: Lang) => void; t: Content };
export const LangContext = createContext<LangCtx | null>(null);

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used inside LangProvider');
  return ctx;
}

/** English by default; Polish only via ?lang=pl or the visitor's earlier explicit choice. */
export function initialLang(): Lang {
  const fromUrl = new URLSearchParams(location.search).get('lang');
  if (fromUrl === 'pl' || fromUrl === 'en') return fromUrl;
  try {
    const saved = localStorage.getItem('lang');
    if (saved === 'pl' || saved === 'en') return saved;
  } catch {
    /* storage blocked: fall through */
  }
  return 'en';
}


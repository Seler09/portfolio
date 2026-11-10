import { useEffect, useState, type ReactNode } from 'react';
import { content, type Lang } from './content';
import { initialLang, LangContext } from './i18n';

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem('lang', l);
    } catch {
      /* ignore */
    }
  };

  return <LangContext.Provider value={{ lang, setLang, t: content[lang] }}>{children}</LangContext.Provider>;
}


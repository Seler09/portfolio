import { useEffect, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react';
import { profile } from '../content';
import { useLang } from '../i18n';
import { copyEmail, isMac, scrollToId } from '../utils';
import { Icon, type IconName } from './Icon';

const SECTIONS = ['about', 'experience', 'projects', 'skills', 'contact'] as const;

/* ---------- top scroll progress ---------- */

export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      ref.current?.style.setProperty('--p', String(max > 0 ? window.scrollY / max : 0));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <div className="progress" ref={ref} aria-hidden="true" />;
}

/* ---------- nav ---------- */

export function Nav({ onPalette }: { onPalette: () => void }) {
  const { t, lang, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    ['home', ...SECTIONS, 'beyond'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.classList.toggle('no-scroll', open);
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''} ${open ? 'open' : ''}`}>
      <div className="container nav-inner">
        <button className="logo" onClick={() => go('home')} aria-label={profile.name}>
          <span className="logo-mark">BK</span>
          <span className="logo-text">
            bartosz<span className="logo-dot">.</span>kalinka
          </span>
        </button>

        <nav className="nav-links" aria-label="Main">
          {SECTIONS.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className={active === id ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault();
                go(id);
              }}
            >
              {t.nav[id]}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <button className="kbd-btn" onClick={onPalette} aria-label="Command palette">
            <Icon name="search" size={15} />
            <kbd>{isMac() ? '⌘' : 'Ctrl'} K</kbd>
          </button>
          <div className="lang-toggle" role="group" aria-label="Language">
            {(['en', 'pl'] as const).map((l) => (
              <button key={l} className={lang === l ? 'on' : ''} onClick={() => setLang(l)} aria-pressed={lang === l}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <button className="burger" onClick={() => setOpen((o) => !o)} aria-label={t.nav.menu} aria-expanded={open}>
            <Icon name={open ? 'close' : 'menu'} size={22} />
          </button>
        </div>
      </div>

      <div className="mobile-menu" hidden={!open}>
        {SECTIONS.map((id, i) => (
          <a
            key={id}
            href={`#${id}`}
            style={{ animationDelay: `${i * 50}ms` }}
            onClick={(e) => {
              e.preventDefault();
              go(id);
            }}
          >
            <span className="muted">0{i + 1}</span> {t.nav[id]}
          </a>
        ))}
      </div>
    </header>
  );
}

/* ---------- command palette ---------- */

type Cmd = { id: string; label: string; group: string; icon: IconName; run: () => void };

export function CommandPalette({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  // global shortcut
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = (e.target as HTMLElement)?.closest('input, textarea, [contenteditable]');
      if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!open);
      } else if (e.key === '/' && !typing && !open) {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, setOpen]);

  useEffect(() => {
    document.body.classList.toggle('no-scroll', open);
  }, [open]);

  // Mounted fresh on every open, so query and selection always start empty.
  return open ? <PaletteDialog close={() => setOpen(false)} /> : null;
}

function PaletteDialog({ close }: { close: () => void }) {
  const { t, lang, setLang } = useLang();
  const [q, setQ] = useState('');
  const [sel, setSel] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const cmds = useMemo<Cmd[]>(
    () => [
      ...(['home', ...SECTIONS, 'beyond'] as const).map((id) => ({
        id,
        group: t.palette.groupNav,
        icon: 'hash' as IconName,
        label: id === 'home' ? 'Home' : id === 'beyond' ? t.beyond.kicker : t.nav[id],
        run: () => scrollToId(id),
      })),
      { id: 'copy', group: t.palette.groupActions, icon: 'copy', label: t.palette.copyEmail, run: () => copyEmail(t.contact.copied) },
      { id: 'mail', group: t.palette.groupActions, icon: 'mail', label: profile.email, run: () => (location.href = `mailto:${profile.email}`) },
      { id: 'li', group: t.palette.groupActions, icon: 'linkedin', label: t.palette.openLinkedIn, run: () => window.open(profile.linkedin, '_blank', 'noopener') },
      { id: 'lang', group: t.palette.groupActions, icon: 'globe', label: t.palette.switchLang, run: () => setLang(lang === 'en' ? 'pl' : 'en') },
    ],
    [t, lang, setLang],
  );

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    return s ? cmds.filter((c) => c.label.toLowerCase().includes(s) || c.id.includes(s)) : cmds;
  }, [cmds, q]);


  useEffect(() => {
    listRef.current?.querySelector('.cmd.sel')?.scrollIntoView({ block: 'nearest' });
  }, [sel]);

  const run = (c: Cmd | undefined) => {
    if (!c) return;
    close();
    // let the overlay close before scrolling
    requestAnimationFrame(() => c.run());
  };

  const onKeyDown = (e: ReactKeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSel((s) => (s + 1) % Math.max(1, filtered.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSel((s) => (s - 1 + filtered.length) % Math.max(1, filtered.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      run(filtered[sel]);
    } else if (e.key === 'Escape') {
      close();
    }
  };

  let lastGroup = '';
  return (
    <div className="palette-overlay" onMouseDown={close}>
      <div className="palette" role="dialog" aria-modal="true" aria-label="Command palette" onMouseDown={(e) => e.stopPropagation()}>
        <div className="palette-input">
          <Icon name="search" />
          <input
            ref={inputRef}
            autoFocus
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setSel(0);
            }}
            onKeyDown={onKeyDown}
            placeholder={t.palette.placeholder}
            aria-label={t.palette.placeholder}
          />
          <kbd>Esc</kbd>
        </div>
        <div className="palette-list" ref={listRef} role="listbox">
          {filtered.length === 0 && <div className="palette-empty">{t.palette.empty}</div>}
          {filtered.map((c, i) => {
            const header = c.group !== lastGroup ? c.group : null;
            lastGroup = c.group;
            return (
              <div key={c.id}>
                {header && <div className="palette-group">{header}</div>}
                <button
                  className={`cmd ${i === sel ? 'sel' : ''}`}
                  role="option"
                  aria-selected={i === sel}
                  onMouseEnter={() => setSel(i)}
                  onClick={() => run(c)}
                >
                  <Icon name={c.icon} size={16} />
                  <span>{c.label}</span>
                  {i === sel && <span className="cmd-enter">↵</span>}
                </button>
              </div>
            );
          })}
        </div>
        <div className="palette-foot">
          <kbd>↑</kbd>
          <kbd>↓</kbd> {t.palette.hint}
        </div>
      </div>
    </div>
  );
}

/* ---------- toast ---------- */

export function Toast() {
  const [msg, setMsg] = useState<string | null>(null);
  useEffect(() => {
    let id = 0;
    const onToast = (e: Event) => {
      setMsg((e as CustomEvent<string>).detail);
      clearTimeout(id);
      id = window.setTimeout(() => setMsg(null), 2200);
    };
    window.addEventListener('toast', onToast);
    return () => window.removeEventListener('toast', onToast);
  }, []);
  return (
    <div className={`toast ${msg ? 'show' : ''}`} role="status" aria-live="polite">
      <Icon name="check" size={16} /> {msg}
    </div>
  );
}

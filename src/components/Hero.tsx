import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from 'react';
import { profile } from '../content';
import { useLang } from '../i18n';
import { reducedMotion, scrollToId } from '../utils';
import { Icon } from './Icon';

/* ---------- C# snippet, tokenised for highlighting ---------- */

type Tok = [cls: string, text: string];
const I = '    ';
const CODE: Tok[][] = [
  [['kw', 'var'], ['', ' '], ['id', 'me'], ['p', ' = '], ['kw', 'new'], ['', ' '], ['ty', 'Developer']],
  [['p', '{']],
  [['', I], ['pr', 'Name'], ['p', ' = '], ['st', '"Bartosz Kalinka"'], ['p', ',']],
  [['', I], ['pr', 'Role'], ['p', ' = '], ['st', '"Senior .NET Developer"'], ['p', ',']],
  [['', I], ['pr', 'YearsOfExperience'], ['p', ' = '], ['nu', '8'], ['p', ',']],
  [['', I], ['pr', 'Stack'], ['p', ' = ['], ['st', '"C#"'], ['p', ', '], ['st', '".NET 10"'], ['p', ', '], ['st', '"Angular"'], ['p', ', '], ['st', '"Azure"'], ['p', '],']],
  [['', I], ['pr', 'Sectors'], ['p', ' = ['], ['st', '"Energy"'], ['p', ', '], ['st', '"Telecom"'], ['p', '],']],
  [['', I], ['pr', 'OpenToWork'], ['p', ' = '], ['kw', 'true']],
  [['p', '};']],
  [],
  [['kw', 'await'], ['', ' '], ['id', 'me'], ['p', '.'], ['fn', 'ShipAsync'], ['p', '('], ['id', 'yourNextProduct'], ['p', ');']],
];
// Precompute where every line and token starts in the "typed characters" stream.
type PlacedTok = { cls: string; text: string; start: number };
const PLACED: { start: number; toks: PlacedTok[] }[] = [];
let cursor = 0;
for (const line of CODE) {
  const lineStart = cursor;
  const toks = line.map(([cls, text]) => {
    const tok = { cls, text, start: cursor };
    cursor += text.length;
    return tok;
  });
  PLACED.push({ start: lineStart, toks });
  cursor += 1; // newline
}
const TOTAL = cursor;

function CodeCard({ terminal }: { terminal: string[] }) {
  const [typed, setTyped] = useState(() => (reducedMotion() ? TOTAL : 0));
  const [out, setOut] = useState(() => (reducedMotion() ? 3 : 0));
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typed >= TOTAL) return;
    const id = window.setTimeout(() => setTyped((n) => Math.min(TOTAL, n + 2)), typed === 0 ? 900 : 18);
    return () => clearTimeout(id);
  }, [typed]);

  useEffect(() => {
    if (typed < TOTAL || out >= 3) return;
    const id = window.setTimeout(() => setOut((n) => n + 1), out === 0 ? 350 : 650);
    return () => clearTimeout(id);
  }, [typed, out]);

  const lines = PLACED.map((line, li) => ({
    li,
    visible: typed > line.start,
    parts: line.toks
      .filter((tok) => typed > tok.start)
      .map((tok, ti) => (
        <span key={ti} className={tok.cls ? `tk-${tok.cls}` : undefined}>
          {tok.text.slice(0, typed - tok.start)}
        </span>
      )),
  }));
  const caretLine = lines.filter((l) => l.visible).length - 1;
  const done = typed >= TOTAL;

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || reducedMotion()) return;
    const el = cardRef.current!;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty('--rx', `${(-y * 8).toFixed(2)}deg`);
    el.style.setProperty('--ry', `${(x * 10).toFixed(2)}deg`);
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };
  const onLeave = () => {
    const el = cardRef.current!;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  };

  return (
    <div className="code-wrap" onPointerMove={onMove} onPointerLeave={onLeave}>
      <div className="code-card" ref={cardRef} aria-label="C# code snippet describing Bartosz Kalinka" role="img">
        <div className="code-bar">
          <span className="dot red" />
          <span className="dot yellow" />
          <span className="dot green" />
          <span className="code-tab">Program.cs</span>
        </div>
        <pre className="code-body" aria-hidden="true">
          {lines.map(({ li, parts, visible }) => (
            <div className="code-line" key={li} style={{ opacity: visible ? 1 : 0 }}>
              <span className="ln">{li + 1}</span>
              <span>
                {parts}
                {!done && li === caretLine && <span className="caret" />}
              </span>
            </div>
          ))}
        </pre>
        <div className={`term ${out > 0 ? 'show' : ''}`} aria-hidden="true">
          {out > 0 && (
            <div>
              <span className="tk-fn">$</span> dotnet run
            </div>
          )}
          {out > 1 && <div className="term-ok">✓ {terminal[0]}</div>}
          {out > 2 && (
            <div className="term-hello">
              {terminal[1]}
              <span className="caret" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- rotating role ---------- */

function RotatingRole({ roles }: { roles: string[] }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reducedMotion()) return;
    const id = window.setInterval(() => setI((n) => (n + 1) % roles.length), 2600);
    return () => clearInterval(id);
  }, [roles.length]);
  return (
    <span className="role-rotator" aria-live="polite">
      <span key={i} className="role-word">
        {roles[i % roles.length]}
      </span>
    </span>
  );
}

function SplitName({ text, offset = 0 }: { text: string; offset?: number }) {
  return (
    <span className="split" aria-hidden="true">
      {[...text].map((ch, i) => (
        <span key={i} className="ch" style={{ '--i': i + offset } as CSSProperties}>
          {ch}
        </span>
      ))}
    </span>
  );
}

export function Hero() {
  const { t } = useLang();
  const [first, last] = profile.name.split(' ');

  return (
    <section id="home" className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <div className="badge">
            <span className="pulse" />
            {t.hero.badge}
          </div>
          <p className="hero-greeting">{t.hero.greeting}</p>
          <h1 className="hero-name" aria-label={profile.name}>
            <SplitName text={first} />
            <SplitName text={last} offset={first.length + 1} />
          </h1>
          <p className="hero-role">
            <span className="prompt">&gt;</span> <RotatingRole roles={t.hero.roles} />
          </p>
          <p className="hero-lead">{t.hero.lead}</p>
          <div className="hero-cta">
            <button className="btn btn-primary" onClick={() => scrollToId('contact')}>
              <Icon name="mail" /> {t.hero.ctaContact}
            </button>
            <button className="btn btn-ghost" onClick={() => scrollToId('projects')}>
              {t.hero.ctaProjects} <Icon name="arrow" />
            </button>
            <a className="btn btn-icon" href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <Icon name="linkedin" />
            </a>
          </div>
          <p className="hero-loc">
            <Icon name="pin" /> {t.hero.location}
          </p>
        </div>
        <CodeCard terminal={t.hero.terminal} />
      </div>
      <button className="scroll-hint" onClick={() => scrollToId('about')} aria-label={t.hero.scroll}>
        <span className="mouse">
          <span className="wheel" />
        </span>
        {t.hero.scroll}
      </button>
    </section>
  );
}

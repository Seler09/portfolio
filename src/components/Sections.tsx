import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { profile } from '../content';
import { useLang } from '../i18n';
import { Reveal } from '../Reveal';
import { copyEmail, isMac, reducedMotion, trackPointer, useInView } from '../utils';
import { Icon } from './Icon';

function SectionHead({ kicker, title, subtitle, index }: { kicker: string; title: string; subtitle?: string; index: string }) {
  return (
    <Reveal className="section-head">
      <p className="kicker">
        <span className="kicker-num">{index}</span>
        <span className="kicker-line" />
        {kicker}
      </p>
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-sub">{subtitle}</p>}
    </Reveal>
  );
}

/* ---------- tech marquee ---------- */

const MARQUEE = ['C#', '.NET 10', 'ASP.NET Core', 'Angular', 'TypeScript', 'Azure', 'EF Core', 'MSSQL', 'Blazor', 'CQRS', 'Entra ID', 'Azure DevOps', 'Docker', 'Kubernetes', 'xUnit', 'Event Grid'];

export function Marquee() {
  const row = [...MARQUEE, ...MARQUEE];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {row.map((m, i) => (
          <span key={i} className="marquee-item">
            <span className="marquee-dot" />
            {m}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------- stats ---------- */

function Counter({ value, suffix = '', run }: { value: number; suffix?: string; run: boolean }) {
  const [n, setN] = useState(() => (reducedMotion() ? value : 0));
  useEffect(() => {
    if (!run || reducedMotion()) return;
    const start = performance.now();
    const dur = 1600;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 4);
      setN(Math.round(value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, value]);
  return (
    <>
      {n.toLocaleString('en-US')}
      {suffix}
    </>
  );
}

export function Stats() {
  const { t } = useLang();
  const [ref, inView] = useInView<HTMLDivElement>(0.3);
  return (
    <section className="stats-section">
      <div className="container">
        <div ref={ref} className={`stats ${inView ? 'in' : ''}`}>
          {t.stats.map((s, i) => (
            <div className="stat" key={i} style={{ '--d': `${i * 90}ms` } as CSSProperties}>
              <div className="stat-value">
                <Counter value={s.value} suffix={s.suffix} run={inView} />
              </div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- about ---------- */

export function About() {
  const { t } = useLang();
  return (
    <section id="about" className="section">
      <div className="container">
        <SectionHead index="01" kicker={t.about.kicker} title={t.about.title} />
        <div className="about-grid">
          <div className="about-text">
            {t.about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 100}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
          <div className="traits">
            {t.about.traits.map((tr, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="card trait" onPointerMove={trackPointer}>
                  <span className="trait-num">0{i + 1}</span>
                  <h3>{tr.title}</h3>
                  <p>{tr.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- experience (timeline that fills while scrolling) ---------- */

export function Experience() {
  const { t } = useLang();
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = lineRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (window.innerHeight * 0.65 - r.top) / r.height));
      el.style.setProperty('--progress', p.toFixed(4));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="experience" className="section">
      <div className="container">
        <SectionHead index="02" kicker={t.experience.kicker} title={t.experience.title} />
        <div className="timeline" ref={lineRef}>
          <div className="timeline-rail">
            <div className="timeline-fill" />
          </div>
          {t.experience.jobs.map((job, i) => (
            <Reveal key={job.company} delay={i * 80} className="job">
              <span className="job-node" />
              <div className="card job-card" onPointerMove={trackPointer}>
                <header className="job-head">
                  <div>
                    <h3 className="job-company">{job.company}</h3>
                    <div className="job-roles">
                      {job.roles.map((r) => (
                        <span key={r.title} className="job-role">
                          <strong>{r.title}</strong> <span className="muted">· {r.period}</span>
                        </span>
                      ))}
                    </div>
                    {job.note && <p className="job-note">{job.note}</p>}
                  </div>
                  <span className="job-period">{job.period}</span>
                </header>
                <p className="job-summary">{job.summary}</p>
                {job.bulletsTitle && <h4 className="job-sub">{job.bulletsTitle}</h4>}
                <ul className="bullets">
                  {job.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <div className="chips">
                  {job.tech.map((x) => (
                    <span key={x} className="chip">
                      {x}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- projects (bento grid) ---------- */

export function Projects() {
  const { t } = useLang();
  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionHead index="03" kicker={t.projects.kicker} title={t.projects.title} subtitle={t.projects.subtitle} />
        <div className="bento">
          {t.projects.items.map((p, i) => (
            <Reveal key={p.name} delay={(i % 3) * 90} className={`bento-cell ${p.size === 'lg' ? 'lg' : ''} ${p.award ? 'award' : ''}`}>
              <article className="card project" onPointerMove={trackPointer}>
                <div className="project-top">
                  <span className="project-client">{p.label}</span>
                  {p.award ? (
                    <span className="award-badge">
                      <Icon name="trophy" size={14} /> {t.projects.awardLabel}
                    </span>
                  ) : (
                    p.meta && <span className="project-meta">{p.meta}</span>
                  )}
                </div>
                <h3 className="project-name">{p.name}</h3>
                <ul className="bullets">
                  {p.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <div className="chips">
                  {p.tags.map((x) => (
                    <span key={x} className="chip chip-accent">
                      {x}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- skills + education ---------- */

export function Skills() {
  const { t } = useLang();
  const s = t.skills;
  return (
    <section id="skills" className="section">
      <div className="container">
        <SectionHead index="04" kicker={s.kicker} title={s.title} />
        <div className="skills-grid">
          {s.groups.map((g, i) => (
            <Reveal key={g.title} delay={(i % 3) * 80}>
              <div className="card skill-group" onPointerMove={trackPointer}>
                <h3>
                  <span className="skill-hash">#</span>
                  {g.title}
                </h3>
                <div className="chips">
                  {g.items.map((x) => (
                    <span key={x} className="chip">
                      {x}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="edu-grid">
          <Reveal>
            <div className="card edu" onPointerMove={trackPointer}>
              <h3 className="edu-title">{s.eduTitle}</h3>
              {s.education.map((e) => (
                <div className="edu-row" key={e.title}>
                  <div>
                    <strong>{e.title}</strong>
                    <p className="muted">{e.detail}</p>
                  </div>
                  <span className="edu-period">{e.period}</span>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="card edu" onPointerMove={trackPointer}>
              <h3 className="edu-title">{s.trainingTitle}</h3>
              {s.training.map((e) => (
                <div className="edu-row" key={e.title}>
                  <strong>{e.title}</strong>
                  <span className="edu-period">{e.period}</span>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={160}>
            <div className="card edu" onPointerMove={trackPointer}>
              <h3 className="edu-title">{s.langTitle}</h3>
              {s.languages.map((e) => (
                <div className="edu-row" key={e.title}>
                  <div>
                    <strong>{e.title}</strong>
                    <p className="muted">{e.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- beyond code ---------- */

export function Beyond() {
  const { t } = useLang();
  return (
    <section id="beyond" className="section">
      <div className="container">
        <SectionHead index="05" kicker={t.beyond.kicker} title={t.beyond.title} />
        <div className="beyond-grid">
          {t.beyond.items.filter((b) => !b.hidden).map((b, i) => (
            <Reveal key={b.icon} delay={i * 80} className={`beyond-cell beyond-${b.icon}`}>
              {b.photo ? (
                <figure className="card beyond beyond-photo" onPointerMove={trackPointer}>
                  <img src={b.photo} alt={b.alt ?? ''} loading="lazy" decoding="async" />
                  <figcaption>
                    <span className="beyond-icon small">
                      <Icon name={b.icon} size={18} />
                    </span>
                    <h3>{b.title}</h3>
                    <p>{b.text}</p>
                  </figcaption>
                </figure>
              ) : (
                <div className="card beyond" onPointerMove={trackPointer}>
                  <span className="beyond-icon">
                    <Icon name={b.icon} size={26} />
                  </span>
                  <h3>{b.title}</h3>
                  <p>{b.text}</p>
                </div>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- contact ---------- */

export function Contact() {
  const { t } = useLang();
  const c = t.contact;
  return (
    <section id="contact" className="section contact">
      <div className="container">
        <Reveal>
          <div className="contact-card" onPointerMove={trackPointer}>
            <img className="contact-bg" src={`${import.meta.env.BASE_URL}img/wroclaw.webp`} alt="" loading="lazy" decoding="async" />
            <p className="kicker kicker-center">
              <span className="kicker-num">06</span>
              <span className="kicker-line" />
              {c.kicker}
            </p>
            <h2 className="contact-title">{c.title}</h2>
            <p className="contact-text">{c.text}</p>
            <a className="contact-email" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            <div className="contact-actions">
              <a className="btn btn-primary" href={`mailto:${profile.email}`}>
                <Icon name="mail" /> {c.email}
              </a>
              <button className="btn btn-ghost" onClick={() => copyEmail(c.copied)}>
                <Icon name="copy" /> {c.copy}
              </button>
              <a className="btn btn-ghost" href={profile.linkedin} target="_blank" rel="noreferrer">
                <Icon name="linkedin" /> {c.linkedin}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const YEAR = new Date().getFullYear();

export function Footer({ onPalette }: { onPalette: () => void }) {
  const { t } = useLang();
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span>
          © {YEAR} {profile.name}. {t.footer.built}
        </span>
        <button className="footer-kbd" onClick={onPalette}>
          <kbd>{isMac() ? '⌘' : 'Ctrl'}</kbd>
          <kbd>K</kbd> {t.footer.palette}
        </button>
      </div>
    </footer>
  );
}

import { useEffect, useRef, useState, type PointerEvent } from 'react';
import { profile } from './content';

/* ---------- motion helpers ---------- */

export const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function useInView<T extends Element>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: '0px 0px -60px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return [ref, inView] as const;
}

/** Pointer-following glow for cards: sets --mx / --my on the element. */
export function trackPointer(e: PointerEvent<HTMLElement>) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty('--mx', `${e.clientX - r.left}px`);
  el.style.setProperty('--my', `${e.clientY - r.top}px`);
}

/* ---------- actions ---------- */

export function toast(message: string) {
  window.dispatchEvent(new CustomEvent('toast', { detail: message }));
}

export async function copyEmail(okMessage: string) {
  try {
    await navigator.clipboard.writeText(profile.email);
  } catch {
    const ta = document.createElement('textarea');
    ta.value = profile.email;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
  }
  toast(okMessage);
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'start' });
  history.replaceState(null, '', id === 'home' ? location.pathname + location.search : `#${id}`);
}

export const isMac = () => /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);

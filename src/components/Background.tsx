import { useEffect, useRef } from 'react';
import { reducedMotion } from '../utils';

type P = { x: number; y: number; vx: number; vy: number };

/**
 * Fixed full-screen backdrop: aurora blobs + grid (CSS) and an interactive
 * particle network on canvas that reacts to the pointer.
 */
export function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const still = reducedMotion();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: -9999, y: -9999 };
    let w = 0;
    let h = 0;
    let pts: P[] = [];
    let raf = 0;
    let running = true;

    const seed = () => {
      const n = Math.min(110, Math.floor((w * h) / 15000));
      pts = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
      }));
    };

    const resize = () => {
      const nw = window.innerWidth;
      const nh = window.innerHeight;
      // Mobile browsers resize on scroll (address bar): only reseed on real changes.
      const reseed = Math.abs(nw - w) > 40 || Math.abs(nh - h) > 160;
      w = nw;
      h = nh;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reseed || pts.length === 0) seed();
      if (still) draw();
    };

    const LINK = 130;
    const MOUSE = 190;

    function draw() {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK * LINK) {
            const a = (1 - Math.sqrt(d2) / LINK) * 0.22;
            ctx.strokeStyle = `rgba(148, 163, 255, ${a})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const md = Math.sqrt(mdx * mdx + mdy * mdy);
        if (md < MOUSE) {
          const a = (1 - md / MOUSE) * 0.55;
          ctx.strokeStyle = `rgba(34, 211, 238, ${a})`;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
        ctx.fillStyle = md < MOUSE ? 'rgba(165, 243, 252, 0.9)' : 'rgba(199, 210, 254, 0.55)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, md < MOUSE ? 1.8 : 1.3, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function step() {
      for (const p of pts) {
        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const md2 = mdx * mdx + mdy * mdy;
        if (md2 < 120 * 120 && md2 > 1) {
          // gentle push away from the cursor
          const f = 0.012 * (1 - Math.sqrt(md2) / 120);
          p.vx += mdx * f * 0.05;
          p.vy += mdy * f * 0.05;
        }
        p.vx *= 0.995;
        p.vy *= 0.995;
        // keep a minimum drift so the network never freezes
        if (Math.abs(p.vx) < 0.05) p.vx += (Math.random() - 0.5) * 0.02;
        if (Math.abs(p.vy) < 0.05) p.vy += (Math.random() - 0.5) * 0.02;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;
      }
    }

    const loop = () => {
      if (!running) return;
      step();
      draw();
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      document.documentElement.style.setProperty('--cx', `${e.clientX}px`);
      document.documentElement.style.setProperty('--cy', `${e.clientY}px`);
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    const onVisibility = () => {
      running = !document.hidden;
      cancelAnimationFrame(raf);
      if (running && !still) loop();
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    document.addEventListener('visibilitychange', onVisibility);
    if (!still) loop();

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <div className="bg" aria-hidden="true">
      <div className="bg-aurora">
        <span className="blob b1" />
        <span className="blob b2" />
        <span className="blob b3" />
      </div>
      <div className="bg-grid" />
      <canvas ref={canvasRef} className="bg-canvas" />
      <div className="bg-cursor" />
      <div className="bg-noise" />
    </div>
  );
}

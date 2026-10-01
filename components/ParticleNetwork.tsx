"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  // drift velocity the particle relaxes back to after mouse forces
  bx: number;
  by: number;
  r: number;
};

const MOUSE_RADIUS = 180; // range of mouse links + attraction
const REPEL_RADIUS = 70; // inside this, particles are pushed away
const ALPHA_BUCKETS = 4; // lines grouped by opacity → a handful of stroke() calls per frame

// Tuned for visibility on both themes; dark mode borrows the brand blue
const PALETTE = {
  light: { dot: "51, 65, 85", line: "71, 85, 105", accent: "37, 99, 235", dotA: 0.8, lineA: 0.5 },
  dark: { dot: "147, 197, 253", line: "96, 165, 250", accent: "125, 211, 252", dotA: 0.85, lineA: 0.55 },
};

/**
 * "Particle network" background (particles.js-like) on a single 2D canvas, no dependency.
 * - particle count scales with area (capped), DPR capped at 2
 * - links batched by opacity bucket to keep draw calls low
 * - rAF loop paused off screen; one static frame with prefers-reduced-motion
 * - starts on idle so it never competes with the first paint of the Hero
 */
export default function ParticleNetwork({
  className = "",
  quietSelector,
}: {
  className?: string;
  /** Elements (in the same parent) over which the network fades out, so text stays legible */
  quietSelector?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let colors: (typeof PALETTE)["light"] = PALETTE.light;
    const readTheme = () => {
      colors = document.documentElement.classList.contains("dark") ? PALETTE.dark : PALETTE.light;
    };
    readTheme();

    let width = 0;
    let height = 0;
    let linkDist = 120;
    let particles: Particle[] = [];
    const pointer = { x: 0, y: 0, clientX: 0, clientY: 0, active: false };
    let rafId = 0;
    let inView = true;
    let lastTime = 0;
    // scroll "wind": particles are blown against the scroll direction, then settle
    let wind = 0;
    let lastScrollY = window.scrollY;
    let touchEndTimer: ReturnType<typeof setTimeout> | undefined;
    // reused every frame (no per-frame allocation → no GC hitches)
    const buckets: number[][] = Array.from({ length: ALPHA_BUCKETS }, () => []);

    const createParticles = () => {
      // Phones get a denser field (relative to their area) so the network reads on small screens
      const small = width < 640;
      const count = small
        ? Math.min(50, Math.max(40, Math.round((width * height) / 7500)))
        : Math.min(100, Math.max(40, Math.round((width * height) / 12500)));
      particles = Array.from({ length: count }, () => {
        const angle = Math.random() * Math.PI * 2;
        // reduced motion: no ambient drift, the network only answers touch/pointer
        const speed = reduceMotion ? 0 : (small ? 0.16 : 0.12) + Math.random() * 0.24;
        const bx = Math.cos(angle) * speed;
        const by = Math.sin(angle) * speed;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: bx,
          vy: by,
          bx,
          by,
          r: 1.2 + Math.random() * 1.7,
        };
      });
    };

    // Quiet zones: soft elliptical holes erased under the text block
    let zones: { cx: number; cy: number; rx: number; ry: number }[] = [];
    const zoneEls = quietSelector
      ? Array.from(canvas.parentElement?.querySelectorAll<HTMLElement>(quietSelector) ?? [])
      : [];
    const measureZones = () => {
      const c = canvas.getBoundingClientRect();
      zones = zoneEls.map((el) => {
        const r = el.getBoundingClientRect();
        return {
          cx: r.left - c.left + r.width / 2,
          cy: r.top - c.top + r.height / 2,
          rx: (r.width / 2) * 1.15 + 24,
          ry: (r.height / 2) * 1.15 + 24,
        };
      });
    };

    const resize = () => {
      measureZones();
      const rect = canvas.getBoundingClientRect();
      const prevW = width;
      const prevH = height;
      width = rect.width;
      height = rect.height;
      // phones: 1.5x is visually identical for thin lines and ~45% fewer pixels to clear/draw
      const dpr = Math.min(window.devicePixelRatio || 1, width < 640 ? 1.5 : 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      linkDist = width < 640 ? 115 : 135;

      if (!particles.length) createParticles();
      else if (prevW && prevH) {
        // keep the existing particles, just rescale their positions
        particles.forEach((p) => {
          p.x *= width / prevW;
          p.y *= height / prevH;
        });
      }
      if (reduceMotion) draw();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Links between particles, bucketed by opacity
      buckets.forEach((b) => (b.length = 0));
      const maxD2 = linkDist * linkDist;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          if (dx > linkDist || dx < -linkDist) continue;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > maxD2) continue;
          const strength = 1 - Math.sqrt(d2) / linkDist;
          const bucket = Math.min(ALPHA_BUCKETS - 1, Math.floor(strength * ALPHA_BUCKETS));
          buckets[bucket].push(a.x, a.y, b.x, b.y);
        }
      }
      ctx.lineWidth = 1;
      buckets.forEach((segs, bucket) => {
        if (!segs.length) return;
        ctx.strokeStyle = `rgba(${colors.line}, ${((bucket + 1) / ALPHA_BUCKETS) * colors.lineA})`;
        ctx.beginPath();
        for (let k = 0; k < segs.length; k += 4) {
          ctx.moveTo(segs[k], segs[k + 1]);
          ctx.lineTo(segs[k + 2], segs[k + 3]);
        }
        ctx.stroke();
      });

      // Dynamic links to the cursor
      if (pointer.active) {
        ctx.lineWidth = 1.2;
        for (const p of particles) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const d = Math.hypot(dx, dy);
          if (d > MOUSE_RADIUS) continue;
          ctx.strokeStyle = `rgba(${colors.accent}, ${(1 - d / MOUSE_RADIUS) * 0.6})`;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(pointer.x, pointer.y);
          ctx.stroke();
        }
      }

      // Dots: one path, one fill
      ctx.fillStyle = `rgba(${colors.dot}, ${colors.dotA})`;
      ctx.beginPath();
      for (const p of particles) {
        ctx.moveTo(p.x + p.r, p.y);
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      }
      ctx.fill();

      // Erase most of the network under the text: still there, but never fighting the copy
      if (zones.length) {
        ctx.save();
        ctx.globalCompositeOperation = "destination-out";
        for (const z of zones) {
          ctx.setTransform(1, 0, 0, 1, 0, 0);
          const dpr = canvas.width / width;
          ctx.translate(z.cx * dpr, z.cy * dpr);
          ctx.scale(z.rx * dpr, z.ry * dpr);
          const g = ctx.createRadialGradient(0, 0, 0, 0, 0, 1);
          g.addColorStop(0, "rgba(0,0,0,0.9)");
          g.addColorStop(0.62, "rgba(0,0,0,0.9)");
          g.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = g;
          ctx.fillRect(-1, -1, 2, 2);
        }
        ctx.restore();
      }
    };

    const update = (step: number) => {
      const margin = 20;
      for (const p of particles) {
        if (pointer.active) {
          const dx = pointer.x - p.x;
          const dy = pointer.y - p.y;
          const d = Math.hypot(dx, dy) || 1;
          if (d < REPEL_RADIUS) {
            // repulsion: keep a small clear ring around the cursor
            const f = (1 - d / REPEL_RADIUS) * 0.6;
            p.vx -= (dx / d) * f * step;
            p.vy -= (dy / d) * f * step;
          } else if (d < MOUSE_RADIUS) {
            // gentle attraction toward the cursor
            const f = (1 - d / MOUSE_RADIUS) * 0.025;
            p.vx += (dx / d) * f * step;
            p.vy += (dy / d) * f * step;
          }
        }
        // scroll wind, stronger on bigger (closer) dots → depth
        if (wind) p.vy -= wind * 0.05 * (p.r / 2.6) * step;
        // relax back to the natural drift
        p.vx += (p.bx - p.vx) * 0.02 * step;
        p.vy += (p.by - p.vy) * 0.02 * step;
        p.x += p.vx * step;
        p.y += p.vy * step;

        // wrap around edges
        if (p.x < -margin) p.x = width + margin;
        else if (p.x > width + margin) p.x = -margin;
        if (p.y < -margin) p.y = height + margin;
        else if (p.y > height + margin) p.y = -margin;
      }
    };

    const tick = (now: number) => {
      const step = Math.min(4, (now - (lastTime || now - 16.67)) / 16.67);
      lastTime = now;
      if (pointer.active) {
        // one layout read per frame, before drawing
        const rect = canvas.getBoundingClientRect();
        pointer.x = pointer.clientX - rect.left;
        pointer.y = pointer.clientY - rect.top;
      }
      if (!reduceMotion) {
        update(step);
        wind *= Math.pow(0.9, step);
        if (Math.abs(wind) < 0.01) wind = 0;
      }
      draw();
      // reduced motion: only keep drawing while a finger/pointer is interacting
      const keepGoing = inView && (!reduceMotion || pointer.active);
      rafId = keepGoing ? requestAnimationFrame(tick) : 0;
      if (!rafId) lastTime = 0;
    };

    const start = () => {
      if (!rafId && (!reduceMotion || pointer.active)) rafId = requestAnimationFrame(tick);
    };

    const setPointer = (x: number, y: number) => {
      pointer.clientX = x;
      pointer.clientY = y;
      pointer.active = true;
      start();
    };
    const release = () => {
      pointer.active = false;
      if (reduceMotion) draw(); // clear the finger links
    };
    const onPointerMove = (e: PointerEvent) => setPointer(e.clientX, e.clientY);
    const onPointerLeave = release;
    // Touch: the finger attracts/repels and links to the network while it's down
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      clearTimeout(touchEndTimer);
      setPointer(t.clientX, t.clientY);
    };
    const onTouchEnd = () => {
      clearTimeout(touchEndTimer);
      touchEndTimer = setTimeout(release, 350);
    };
    const onScroll = () => {
      const y = window.scrollY;
      if (!reduceMotion && inView) wind = Math.max(-8, Math.min(8, wind + (y - lastScrollY) * 0.06));
      lastScrollY = y;
    };

    const ro = new ResizeObserver(resize);
    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) start();
    });
    const themeObserver = new MutationObserver(() => {
      readTheme();
      if (reduceMotion) draw();
    });

    // Defer setup until the browser is idle so the Hero's first paint isn't delayed
    const boot = () => {
      resize();
      ro.observe(canvas);
      zoneEls.forEach((el) => ro.observe(el));
      // web fonts can reflow the text block after first measure
      document.fonts?.ready.then(() => measureZones());
      io.observe(canvas);
      themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("touchstart", onTouch, { passive: true });
      window.addEventListener("touchmove", onTouch, { passive: true });
      window.addEventListener("touchend", onTouchEnd, { passive: true });
      window.addEventListener("scroll", onScroll, { passive: true });
      document.documentElement.addEventListener("pointerleave", onPointerLeave);
      canvas.style.opacity = "1";
      start();
    };
    // Safari has no requestIdleCallback
    const hasIdle = typeof window.requestIdleCallback === "function";
    const idleId = hasIdle
      ? window.requestIdleCallback(boot, { timeout: 200 })
      : setTimeout(boot, 120);

    return () => {
      if (hasIdle) window.cancelIdleCallback(idleId as number);
      else clearTimeout(idleId);
      cancelAnimationFrame(rafId);
      ro.disconnect();
      io.disconnect();
      themeObserver.disconnect();
      clearTimeout(touchEndTimer);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("touchstart", onTouch);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("scroll", onScroll);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [quietSelector]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none opacity-0 transition-opacity duration-300 ${className}`}
    />
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

type Category = "frontend" | "backend" | "database";
type Size = "sm" | "md" | "lg" | "xl";

const techs: {
  name: string;
  icon: string;
  cat: Category;
  size: Size;
  /** dark monochrome logos need inverting on dark backgrounds */
  invertDark?: boolean;
}[] = [
  // Sizes follow the CV: core skills are the biggest bubbles, "notions" the smallest
  { name: "PHP", icon: "php", cat: "backend", size: "lg" },
  { name: "JavaScript", icon: "javascript", cat: "frontend", size: "md" },
  { name: "React", icon: "react", cat: "frontend", size: "lg" },
  { name: "MySQL", icon: "mysql", cat: "database", size: "lg" },
  { name: "Symfony", icon: "symfony", cat: "backend", size: "xl" },
  { name: "Git", icon: "git", cat: "database", size: "md" },
  { name: "Node.js", icon: "nodejs", cat: "backend", size: "lg" },
  { name: "HTML5", icon: "html", cat: "frontend", size: "md" },
  { name: "Express", icon: "express", cat: "backend", size: "md", invertDark: true },
  { name: "CSS3", icon: "css", cat: "frontend", size: "md" },
  { name: "MongoDB", icon: "mongodb", cat: "database", size: "md" },
  { name: "Bootstrap", icon: "bootstrap", cat: "frontend", size: "md" },
  { name: "Next.js", icon: "nextjs", cat: "frontend", size: "sm" },
  { name: "Tailwind CSS", icon: "tail", cat: "frontend", size: "sm" },
];

const categories: Category[] = ["frontend", "backend", "database"];

// Magnetic cluster tuning
const CLUSTER_RADIUS = 240; // neighbours within this range get pulled toward the hovered bubble
const CLUSTER_PULL = 0.55; // 0 = stay, 1 = touch
const OVERLAP_ALLOW = 0.55; // fraction of combined radius allowed as overlap
const EASE = 0.28; // lerp per 60fps frame
const CURSOR_RADIUS = 150; // ambient nudge range
const CURSOR_MAX = 8; // px
const GROUP_FOLLOW_MAX = 200; // px — clamp for the cluster following the cursor
const BURST_DISTANCE = 140; // px — radial burst on click
const BURST_HOLD_MS = 220;

/**
 * Bubble physics, adapted from abinash-sharma.pages.dev with fixes:
 * - positions are measured relative to the cloud (offsetLeft/Top), so they stay
 *   correct after scrolling (the original cached viewport coordinates once)
 * - remeasured with a ResizeObserver instead of a window resize listener
 * - the rAF loop sleeps when nothing moves
 */
function useBubbleCloud(cloudRef: React.RefObject<HTMLUListElement | null>) {
  useEffect(() => {
    const cloud = cloudRef.current;
    if (!cloud) return;

    const items = Array.from(cloud.querySelectorAll<HTMLElement>(".tech-item"));
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Bubbles are visible by default (SSR / no JS). Only arm the pop-in entrance
    // when the cloud starts below the fold, so nothing visible ever gets hidden.
    if (!reduceMotion && cloud.getBoundingClientRect().top > window.innerHeight) {
      cloud.setAttribute("data-armed", "");
    }

    let onVisible: (() => void) | null = null;

    // Entrance + pause the idle float loop when off screen
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          cloud.setAttribute("data-visible", "");
          cloud.setAttribute("data-inview", "");
          onVisible?.();
        } else {
          cloud.removeAttribute("data-inview");
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(cloud);

    // Reduced motion keeps the user-driven cluster (feedback), quicker and without
    // the decorative burst / auto tour.
    if (!items.length) return () => io.disconnect();

    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    const state = items.map(() => ({
      current: { x: 0, y: 0 },
      cluster: { x: 0, y: 0 },
      ambient: { x: 0, y: 0 },
      inCluster: false,
    }));

    let base: { cx: number; cy: number; w: number }[] = [];
    let cloudCenter = { cx: 0, cy: 0 };
    // Scale the magnet to the cloud: on phones a desktop-sized radius pulls in
    // half the stack and the labels pile up.
    let radius = CLUSTER_RADIUS;
    let overlap = OVERLAP_ALLOW;
    const measure = () => {
      const narrow = cloud.clientWidth < 640;
      radius = Math.min(CLUSTER_RADIUS, cloud.clientWidth * 0.42);
      overlap = narrow ? 0.9 : OVERLAP_ALLOW;
      base = items.map((el) => ({
        cx: el.offsetLeft + el.offsetWidth / 2,
        cy: el.offsetTop + el.offsetHeight / 2,
        w: el.offsetWidth,
      }));
      cloudCenter = { cx: cloud.clientWidth / 2, cy: cloud.clientHeight / 2 };
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(cloud);

    let anchor = -1;
    let rafId = 0;
    let lastTime = 0;
    const group = { x: 0, y: 0 };
    let burstTimeout: ReturnType<typeof setTimeout> | undefined;

    const animate = (now: number) => {
      const k = 1 - Math.pow(1 - (reduceMotion ? 0.5 : EASE), Math.min(64, now - (lastTime || now - 16.67)) / 16.67);
      lastTime = now;
      let moving = false;
      state.forEach((s, i) => {
        const tx = s.cluster.x + s.ambient.x + (s.inCluster ? group.x : 0);
        const ty = s.cluster.y + s.ambient.y + (s.inCluster ? group.y : 0);
        const dx = tx - s.current.x;
        const dy = ty - s.current.y;
        if (Math.abs(dx) > 0.05 || Math.abs(dy) > 0.05) moving = true;
        s.current.x += dx * k;
        s.current.y += dy * k;
        items[i].style.transform = `translate3d(${s.current.x.toFixed(2)}px, ${s.current.y.toFixed(2)}px, 0)`;
      });
      rafId = moving ? requestAnimationFrame(animate) : 0;
      if (!rafId) lastTime = 0;
    };
    const ensureLoop = () => {
      if (!rafId) rafId = requestAnimationFrame(animate);
    };

    const setCluster = (idx: number) => {
      const a = base[idx];
      state.forEach((s, i) => {
        if (i === idx) {
          s.cluster.x = 0;
          s.cluster.y = 0;
          s.inCluster = true;
          return;
        }
        const c = base[i];
        const dx = c.cx - a.cx;
        const dy = c.cy - a.cy;
        const dist = Math.hypot(dx, dy) || 1;
        if (dist < radius) {
          const minDist = (a.w / 2 + c.w / 2) * overlap;
          const newDist = Math.max(minDist, dist - (dist - minDist) * CLUSTER_PULL);
          s.cluster.x = a.cx + (dx / dist) * newDist - c.cx;
          s.cluster.y = a.cy + (dy / dist) * newDist - c.cy;
          s.inCluster = true;
        } else {
          s.cluster.x = 0;
          s.cluster.y = 0;
          s.inCluster = false;
        }
      });
    };

    const clearCluster = () => {
      state.forEach((s) => {
        s.cluster.x = 0;
        s.cluster.y = 0;
        s.inCluster = false;
      });
      group.x = 0;
      group.y = 0;
    };

    const setClasses = () => {
      items.forEach((el, i) => {
        el.classList.toggle("is-anchor", i === anchor);
        el.classList.toggle("is-clustered", anchor !== -1 && i !== anchor);
      });
    };

    const activate = (idx: number) => {
      anchor = idx;
      setClasses();
      setCluster(idx);
      ensureLoop();
    };
    const deactivate = (idx: number) => {
      if (anchor !== idx) return;
      anchor = -1;
      setClasses();
      clearCluster();
      ensureLoop();
    };

    const cleanups: (() => void)[] = [];
    const on = <K extends keyof HTMLElementEventMap>(
      el: HTMLElement,
      type: K,
      fn: (e: HTMLElementEventMap[K]) => void,
      opts?: AddEventListenerOptions,
    ) => {
      el.addEventListener(type, fn, opts);
      cleanups.push(() => el.removeEventListener(type, fn, opts));
    };

    items.forEach((item, idx) => {
      if (canHover) {
        on(item, "mouseenter", () => activate(idx));
        on(item, "mouseleave", () => deactivate(idx));
      }
    });

    if (canHover) {
      on(
        cloud,
        "mousemove",
        (e) => {
          const rect = cloud.getBoundingClientRect();
          const mx = e.clientX - rect.left;
          const my = e.clientY - rect.top;

          if (anchor !== -1) {
            // Cluster active: the whole group follows the cursor
            const a = base[anchor];
            let gx = mx - a.cx;
            let gy = my - a.cy;
            const d = Math.hypot(gx, gy);
            if (d > GROUP_FOLLOW_MAX) {
              gx *= GROUP_FOLLOW_MAX / d;
              gy *= GROUP_FOLLOW_MAX / d;
            }
            group.x = gx;
            group.y = gy;
          } else {
            // Idle: subtle attraction toward the cursor
            state.forEach((s, i) => {
              const dx = mx - base[i].cx;
              const dy = my - base[i].cy;
              const d = Math.hypot(dx, dy) || 1;
              const strength = d < CURSOR_RADIUS ? (1 - d / CURSOR_RADIUS) * CURSOR_MAX : 0;
              s.ambient.x = (dx / d) * strength;
              s.ambient.y = (dy / d) * strength;
            });
          }
          ensureLoop();
        },
        { passive: true },
      );

      on(cloud, "mouseleave", () => {
        state.forEach((s) => {
          s.ambient.x = 0;
          s.ambient.y = 0;
        });
        ensureLoop();
      });
    }

    // Touch screens have no hover: a short demo tour shows the magnetic effect once,
    // the first time the cloud comes into view. Any touch on the cloud stops it.
    let tourTimers: ReturnType<typeof setTimeout>[] = [];
    let toured = false;
    const stopTour = () => {
      tourTimers.forEach(clearTimeout);
      tourTimers = [];
    };
    onVisible = () => {
      if (toured || canHover || reduceMotion) return;
      toured = true;
      const stops = ["Symfony", "React", "Node.js"]
        .map((name) => items.findIndex((el) => el.textContent?.trim() === name))
        .filter((i) => i >= 0);
      stops.forEach((idx, k) => tourTimers.push(setTimeout(() => activate(idx), 500 + k * 1400)));
      tourTimers.push(
        setTimeout(() => {
          if (anchor !== -1) deactivate(anchor);
        }, 500 + stops.length * 1400),
      );
    };
    on(cloud, "touchstart", stopTour, { passive: true });

    // Touch: tapping outside the cloud releases the cluster
    if (!canHover) {
      on(
        document.documentElement,
        "touchstart",
        (e) => {
          if (anchor !== -1 && !cloud.contains(e.target as Node)) deactivate(anchor);
        },
        { passive: true },
      );
    }

    const burst = () => {
      clearTimeout(burstTimeout);
      anchor = -1;
      setClasses();
      group.x = 0;
      group.y = 0;
      state.forEach((s, i) => {
        const dx = base[i].cx - cloudCenter.cx;
        const dy = base[i].cy - cloudCenter.cy;
        const d = Math.hypot(dx, dy) || 1;
        s.cluster.x = (dx / d) * BURST_DISTANCE;
        s.cluster.y = (dy / d) * BURST_DISTANCE;
        s.inCluster = false;
      });
      ensureLoop();
      burstTimeout = setTimeout(() => {
        clearCluster();
        ensureLoop();
      }, BURST_HOLD_MS);
    };

    // Click / tap. Touch: tap a bubble to gather the stack around it, tap it again
    // to release. Elsewhere (and with a mouse): burst outward, then spring back.
    on(cloud, "click", (e) => {
      stopTour();
      const item = (e.target as HTMLElement).closest<HTMLElement>(".tech-item");
      if (!canHover && item) {
        const idx = items.indexOf(item);
        if (anchor === idx) deactivate(idx);
        else activate(idx);
        return;
      }
      if (!reduceMotion) burst();
    });

    return () => {
      io.disconnect();
      ro.disconnect();
      cancelAnimationFrame(rafId);
      clearTimeout(burstTimeout);
      stopTour();
      cleanups.forEach((fn) => fn());
    };
  }, [cloudRef]);
}

export default function Presentation() {
  const { lang } = useLanguage();
  const t = translations[lang].presentation;
  const cloudRef = useRef<HTMLUListElement>(null);
  // click selects (aria-pressed), hover/focus only previews
  const [selectedCat, setSelectedCat] = useState<Category | null>(null);
  const [previewCat, setPreviewCat] = useState<Category | null>(null);
  const activeCat = previewCat ?? selectedCat;

  useBubbleCloud(cloudRef);

  return (
    <section
      id="competences"
      className="relative isolate scroll-mt-24 overflow-hidden bg-gray-50 px-4 py-20 text-gray-900 transition-colors duration-300 dark:bg-black dark:text-white sm:px-6 md:py-28"
    >
      {/* Ambient glows + particles (static layout, CSS-only motion) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_25%,rgba(59,130,246,0.12),transparent_55%),radial-gradient(circle_at_85%_75%,rgba(168,85,247,0.12),transparent_55%)]"
      />
      {[
        "left-[10%] top-[12%]",
        "right-[15%] top-[20%]",
        "bottom-[15%] left-[20%]",
        "bottom-[25%] right-[10%]",
        "left-[5%] top-1/2",
        "right-[8%] top-[60%]",
      ].map((pos, i) => (
        <span
          key={pos}
          aria-hidden="true"
          className={`tech-particle pointer-events-none absolute -z-10 hidden h-1 w-1 rounded-full bg-blue-400 shadow-[0_0_8px_2px_rgba(96,165,250,0.5)] md:block ${pos}`}
          style={{ animationDelay: `${i * 0.5}s` }}
        />
      ))}

      <div className="mx-auto max-w-6xl">
        <h2 data-reveal="heading" className="mb-4 text-center text-4xl font-extrabold tracking-tight text-balance sm:text-5xl md:text-6xl">
          {t.heading}{" "}
          <span className="text-blue-600 dark:text-blue-400">{t.headingHighlight}</span>
        </h2>
        <p className="mx-auto mb-8 hidden max-w-lg text-center text-sm text-gray-500 dark:text-gray-400 [@media(hover:hover)]:block">
          {t.hint}
        </p>
        <p className="mx-auto mb-8 hidden max-w-xs text-center text-sm text-gray-500 dark:text-gray-400 [@media(hover:none)]:block">
          {t.hintTouch}
        </p>

        {/* Category legend: highlights the matching bubbles */}
        <div
          data-reveal="up"
          className="mb-10 flex flex-wrap justify-center gap-2"
          onMouseLeave={() => setPreviewCat(null)}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              aria-pressed={selectedCat === cat}
              onMouseEnter={() => setPreviewCat(cat)}
              onFocus={() => setPreviewCat(cat)}
              onBlur={() => setPreviewCat(null)}
              onClick={() => {
                setPreviewCat(null);
                setSelectedCat((c) => (c === cat ? null : cat));
              }}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors duration-200 pointer-coarse:min-h-11 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 ${
                activeCat === cat
                  ? "border-blue-500 bg-blue-500 text-white"
                  : "border-gray-300 bg-white text-gray-700 hover:border-blue-400 dark:border-white/15 dark:bg-white/5 dark:text-gray-200"
              }`}
            >
              {t[cat]}
            </button>
          ))}
        </div>

        <ul
          ref={cloudRef}
          className="tech-cloud relative mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-[18px] gap-y-[14px] px-2 py-2 max-md:gap-x-3 max-md:gap-y-2.5"
        >
          {techs.map((tech, i) => {
            const dimmed = activeCat !== null && activeCat !== tech.cat;
            return (
              <li
                key={tech.name}
                // className stays constant: the JS toggles is-anchor / is-clustered on it
                data-dim={dimmed || undefined}
                className={`tech-item size-${tech.size} group relative z-[1] flex cursor-pointer flex-col items-center gap-1.5 data-[dim]:opacity-25 [&.is-anchor]:z-20 [&.is-clustered]:z-[8]`}
                style={{ "--i": i } as React.CSSProperties}
              >
                <div className="tech-pop">
                  <div className="tech-float">
                    {/* Glass bubble — no backdrop-filter: 15 moving blurred layers would cost more than they add */}
                    <div className="tech-bubble flex items-center justify-center rounded-full border border-white/90 bg-[linear-gradient(160deg,rgba(255,255,255,0.95),rgba(255,255,255,0.55))] shadow-[0_8px_22px_rgba(30,64,175,0.14),inset_0_2px_6px_rgba(255,255,255,0.9),inset_0_-6px_10px_rgba(59,130,246,0.1)] transition-[border-color] duration-200 group-[.is-anchor]:border-blue-400 dark:border-white/15 dark:bg-[linear-gradient(160deg,rgba(255,255,255,0.12),rgba(255,255,255,0.03))] dark:shadow-[0_8px_22px_rgba(0,0,0,0.45),inset_0_1px_2px_rgba(255,255,255,0.15)] dark:group-[.is-anchor]:border-blue-400/80">
                      {/* eslint-disable-next-line @next/next/no-img-element -- tiny static SVGs, no optimisation needed */}
                      <img
                        src={`/images/stack/${tech.icon}.svg`}
                        alt=""
                        width={64}
                        height={64}
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                        className={`h-[58%] w-[58%] object-contain ${tech.invertDark ? "dark:invert" : ""}`}
                      />
                    </div>
                  </div>
                </div>
                <span className="text-xs font-semibold text-gray-700 opacity-85 transition-opacity group-[.is-anchor]:opacity-100 dark:text-gray-300 sm:text-[13px]">
                  {tech.name}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

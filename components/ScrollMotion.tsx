"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * One scroll-reveal system for the whole site (no dependency).
 *
 *   data-reveal="heading"  → text rises from behind a mask
 *   data-reveal="up"       → fade + rise
 *   data-reveal="stagger"  → children rise one after another (capped)
 *   data-reveal="image"    → clip-path wipe from the top
 *
 * Content is visible by default: an element is only hidden ("armed") when it starts
 * below the fold, so a failed script or reduced motion never hides anything.
 * Every revealed element gets `data-in`, which CSS can also use for in-view states.
 */
export default function ScrollMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const pendingEls = new Set<Element>();
    const reveal = (el: Element) => {
      el.setAttribute("data-in", "");
      io.unobserve(el);
      pendingEls.delete(el);
    };
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) reveal(entry.target);
      },
      { rootMargin: "0px 0px -4% 0px" },
    );
    // Safety net: a fast fling, the End key or an anchor jump can carry an element
    // past the viewport without the observer ever seeing it intersect.
    let raf = 0;
    const sweep = () => {
      raf = 0;
      pendingEls.forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight) reveal(el);
      });
    };
    const onScroll = () => {
      if (!raf && pendingEls.size) raf = requestAnimationFrame(sweep);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Tracked per run: this effect re-runs on every navigation (and twice in dev),
    // and elements that live across pages (the footer) must be observed again,
    // otherwise an armed-but-not-yet-revealed element would stay hidden forever.
    const seen = new WeakSet<Element>();
    const init = (el: Element) => {
      if (seen.has(el)) return;
      seen.add(el);
      if (el.hasAttribute("data-in")) return; // already revealed
      // arm only once, the first time the element is ever seen
      if (!el.hasAttribute("data-reveal-init")) {
        el.setAttribute("data-reveal-init", "");
        if (el.getAttribute("data-reveal") === "stagger") {
          Array.from(el.children).forEach((child, i) =>
            (child as HTMLElement).style.setProperty("--ri", String(Math.min(i, 8))),
          );
        }
        const below = el.getBoundingClientRect().top > window.innerHeight * 0.96;
        if (below && !reduce) el.setAttribute("data-armed", "");
      }
      pendingEls.add(el);
      io.observe(el);
    };

    const scan = (root: ParentNode) => root.querySelectorAll("[data-reveal]").forEach(init);
    scan(document);

    // Sections loaded later (dynamic imports, tab switches) are picked up too
    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          if (node.matches("[data-reveal]")) init(node);
          scan(node);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  return null;
}

/**
 * Calls `onProgress(p)` with the element's progress through the viewport:
 * 0 when its top enters at the bottom, 1 when its bottom leaves at the top.
 * rAF-throttled, only while the element is near the screen.
 */
export function observeScrollProgress(
  el: Element,
  onProgress: (p: number) => void,
): () => void {
  let raf = 0;
  let near = false;
  const update = () => {
    raf = 0;
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight;
    const p = (vh - r.top) / (vh + r.height);
    onProgress(Math.min(1, Math.max(0, p)));
  };
  const schedule = () => {
    if (near && !raf) raf = requestAnimationFrame(update);
  };
  const io = new IntersectionObserver(
    ([entry]) => {
      near = entry.isIntersecting;
      schedule();
    },
    { rootMargin: "20% 0px 20% 0px" },
  );
  io.observe(el);
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule, { passive: true });
  return () => {
    cancelAnimationFrame(raf);
    io.disconnect();
    window.removeEventListener("scroll", schedule);
    window.removeEventListener("resize", schedule);
  };
}

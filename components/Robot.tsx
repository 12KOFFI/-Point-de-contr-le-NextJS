"use client";

import { useEffect, useRef, useState } from "react";

// Pivot of the head (base of the neck) in SVG user units
const PIVOT_X = 160;
const PIVOT_Y = 190;
// Visor centre, used to foreshorten the face when the head turns
const VISOR_CX = 160;
const VISOR_CY = 127;

const clamp = (v: number, min = -1, max = 1) => Math.min(max, Math.max(min, v));

/**
 * SVG robot that turns its head toward the cursor and can be dragged around the Hero.
 *
 * Head turn = fake 3D yaw/pitch from layered parallax: the face (visor, eyes) moves
 * toward the target and is foreshortened, the ears slide the other way and tuck behind
 * the shell, and the side turning away gets shaded.
 *
 * Drag: pointer (mouse/touch) or keyboard arrows; double-click / Escape sends it home.
 */
export default function Robot({ label }: { label: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const headRef = useRef<SVGGElement>(null);
  const visorRef = useRef<SVGGElement>(null);
  const eyesRef = useRef<SVGGElement>(null);
  const earLRef = useRef<SVGRectElement>(null);
  const earRRef = useRef<SVGRectElement>(null);
  const shadeLRef = useRef<SVGRectElement>(null);
  const shadeRRef = useRef<SVGRectElement>(null);
  const shineRef = useRef<SVGPathElement>(null);
  const neckRef = useRef<SVGGElement>(null);
  const bodyRef = useRef<SVGGElement>(null);
  const chestRef = useRef<SVGGElement>(null);
  // shared between the drag handlers and the look-at loop
  const dragLook = useRef({ active: false, vx: 0, vy: 0 });
  const [happy, setHappy] = useState(false);

  /* ---------------------------------------------------------------- look-at */
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    // Reduced motion keeps the user-driven "look at" (feedback) but drops the
    // idle look-around and scroll reactions (ambient movement).
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const pointer = { x: 0, y: 0, active: false };
    const tilt = { x: 0, y: 0, at: 0 };
    const current = { x: 0, y: 0 };
    let scrollLook = 0; // decaying "look down/up" impulse from scrolling
    let lastScrollY = window.scrollY;
    let lastMove = 0;
    let rafId = 0;
    let inView = true;
    let lastTime = performance.now();

    const onPointer = (x: number, y: number) => {
      pointer.x = x;
      pointer.y = y;
      pointer.active = true;
      lastMove = performance.now();
    };
    const onPointerMove = (e: PointerEvent) => onPointer(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) onPointer(t.clientX, t.clientY);
    };
    const onLeave = () => {
      pointer.active = false;
    };
    const onScroll = () => {
      const y = window.scrollY;
      scrollLook = clamp(scrollLook + (y - lastScrollY) * 0.02);
      lastScrollY = y;
    };
    const onOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;
      tilt.x = clamp(e.gamma / 30);
      tilt.y = clamp((e.beta - 45) / 30);
      tilt.at = performance.now();
    };

    const set = (el: Element | null, value: string) => el?.setAttribute("transform", value);

    const tick = (now: number) => {
      const dt = Math.min(64, now - lastTime);
      lastTime = now;

      let tx: number;
      let ty: number;
      const drag = dragLook.current;
      if (drag.active) {
        // being carried: look where it's going
        tx = clamp(drag.vx / 10);
        ty = clamp(drag.vy / 10);
      } else if (pointer.active && now - lastMove < 3500) {
        // One layout read per frame, before any write. tanh: strong response
        // near the robot, smooth saturation far away.
        const rect = svg.getBoundingClientRect();
        const cx = rect.left + rect.width * 0.5;
        const cy = rect.top + rect.height * 0.33;
        tx = Math.tanh((pointer.x - cx) / 280);
        ty = Math.tanh((pointer.y - cy) / 240);
      } else if (now - tilt.at < 1000) {
        tx = tilt.x;
        ty = tilt.y;
      } else if (reduce) {
        tx = 0;
        ty = 0;
      } else {
        // Idle: slow look-around
        tx = Math.sin(now * 0.0006) * 0.6;
        ty = Math.sin(now * 0.0011) * 0.3;
      }

      if (!reduce && !drag.active) {
        ty = clamp(ty + scrollLook);
        scrollLook *= Math.pow(0.92, dt / 16.67);
      }

      // Frame-rate independent easing
      const k = 1 - Math.pow(1 - (reduce ? 0.25 : 0.14), dt / 16.67);
      current.x += (tx - current.x) * k;
      current.y += (ty - current.y) * k;

      const { x, y } = current;
      const f = (n: number) => n.toFixed(2);
      // Head: small shift + roll (the turn itself comes from the layers below)
      set(headRef.current, `translate(${f(x * 10)} ${f(y * 6)}) rotate(${f(x * 4)} ${PIVOT_X} ${PIVOT_Y})`);
      // Face moves toward the target and gets foreshortened
      set(
        visorRef.current,
        `translate(${f(x * 28)} ${f(y * 15)}) translate(${VISOR_CX} ${VISOR_CY}) scale(${f(1 - Math.abs(x) * 0.18)} ${f(1 - Math.abs(y) * 0.1)}) translate(${-VISOR_CX} ${-VISOR_CY})`,
      );
      set(eyesRef.current, `translate(${f(x * 12)} ${f(y * 8)})`);
      // Ears slide the opposite way: the one on the turning side tucks behind the shell
      set(earLRef.current, `translate(${f(-x * 14)} ${f(-y * 4)})`);
      set(earRRef.current, `translate(${f(-x * 14)} ${f(-y * 4)})`);
      set(shineRef.current, `translate(${f(x * 16)} ${f(y * 5)})`);
      shadeRRef.current?.setAttribute("opacity", f(Math.max(0, x)));
      shadeLRef.current?.setAttribute("opacity", f(Math.max(0, -x)));
      set(neckRef.current, `translate(${f(x * 4)} ${f(y * 2)})`);
      set(bodyRef.current, `translate(${f(x * 2)} 0)`);
      set(chestRef.current, `translate(${f(x * 6)} ${f(y * 2)})`);

      rafId = inView ? requestAnimationFrame(tick) : 0;
    };

    const start = () => {
      if (!rafId) {
        lastTime = performance.now();
        rafId = requestAnimationFrame(tick);
      }
    };

    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) start();
    });
    io.observe(svg);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("touchstart", onTouch, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("deviceorientation", onOrientation);
    document.documentElement.addEventListener("pointerleave", onLeave);
    start();

    return () => {
      cancelAnimationFrame(rafId);
      io.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("touchstart", onTouch);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("deviceorientation", onOrientation);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  /* ------------------------------------------------------------------- drag */
  useEffect(() => {
    const wrap = wrapRef.current;
    const svg = svgRef.current;
    if (!wrap || !svg) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const pos = { x: 0, y: 0 };
    let swing = 0; // degrees, follows horizontal drag speed like a pendulum
    let lift = 0; // 0 → resting, 1 → picked up
    let dragging = false;
    let pressed = false;
    let moved = false;
    let suppressClick = false;
    let raf = 0;
    const startPt = { px: 0, py: 0, ox: 0, oy: 0 };
    const last = { x: 0, y: 0, t: 0 };
    const drag = dragLook.current;

    // Keep the robot inside its section (below the fixed header)
    const bounds = () => {
      const section = wrap.closest("section");
      if (!section) return null;
      const r = wrap.getBoundingClientRect();
      const s = section.getBoundingClientRect();
      const baseLeft = r.left - pos.x;
      const baseTop = r.top - pos.y;
      return {
        minX: s.left - baseLeft + 8,
        maxX: s.right - (baseLeft + r.width) - 8,
        minY: s.top - baseTop + 72,
        maxY: s.bottom - (baseTop + r.height) - 8,
      };
    };
    const clampToBounds = () => {
      const b = bounds();
      if (!b) return;
      pos.x = clamp(pos.x, Math.min(b.minX, 0), Math.max(b.maxX, 0));
      pos.y = clamp(pos.y, Math.min(b.minY, 0), Math.max(b.maxY, 0));
    };

    const render = () => {
      wrap.style.transform = `translate3d(${pos.x.toFixed(1)}px, ${pos.y.toFixed(1)}px, 0) rotate(${swing.toFixed(2)}deg) scale(${(1 + lift * 0.05).toFixed(3)})`;
    };

    const loop = () => {
      const targetSwing = dragging && !reduce ? clamp(drag.vx * 1.2, -14, 14) : 0;
      swing += (targetSwing - swing) * 0.18;
      lift += ((dragging ? 1 : 0) - lift) * 0.22;
      drag.vx *= 0.82;
      drag.vy *= 0.82;
      render();
      const settled = !dragging && Math.abs(swing) < 0.05 && lift < 0.005;
      if (settled) {
        swing = 0;
        lift = 0;
        render();
        raf = 0;
      } else {
        raf = requestAnimationFrame(loop);
      }
    };
    const ensureLoop = () => {
      if (!raf) raf = requestAnimationFrame(loop);
    };

    const goHome = () => {
      wrap.style.transition = "transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)";
      pos.x = 0;
      pos.y = 0;
      render();
      window.setTimeout(() => (wrap.style.transition = ""), 700);
    };

    const onDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      pressed = true;
      moved = false;
      startPt.px = e.clientX;
      startPt.py = e.clientY;
      startPt.ox = pos.x;
      startPt.oy = pos.y;
      last.x = e.clientX;
      last.y = e.clientY;
      last.t = performance.now();
      svg.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!pressed) return;
      const dx = e.clientX - startPt.px;
      const dy = e.clientY - startPt.py;
      if (!moved) {
        if (Math.hypot(dx, dy) < 5) return; // still a click
        moved = true;
        dragging = true;
        drag.active = true;
        wrap.classList.add("is-lifted");
        setHappy(true);
      }
      const b = bounds();
      pos.x = b ? clamp(startPt.ox + dx, Math.min(b.minX, 0), Math.max(b.maxX, 0)) : startPt.ox + dx;
      pos.y = b ? clamp(startPt.oy + dy, Math.min(b.minY, 0), Math.max(b.maxY, 0)) : startPt.oy + dy;
      const now = performance.now();
      const dt = Math.max(8, now - last.t);
      drag.vx = ((e.clientX - last.x) / dt) * 16;
      drag.vy = ((e.clientY - last.y) / dt) * 16;
      last.x = e.clientX;
      last.y = e.clientY;
      last.t = now;
      ensureLoop();
    };
    const onUp = () => {
      if (!pressed) return;
      pressed = false;
      suppressClick = moved;
      if (dragging) {
        dragging = false;
        drag.active = false;
        wrap.classList.remove("is-lifted");
        // small squash on landing
        wrap.classList.remove("is-dropped");
        void wrap.offsetWidth;
        wrap.classList.add("is-dropped");
        setHappy(false);
        ensureLoop();
      }
    };
    const onClick = () => {
      if (suppressClick) {
        suppressClick = false;
        return;
      }
      setHappy((h) => !h);
    };
    const onKey = (e: KeyboardEvent) => {
      const step = e.shiftKey ? 64 : 24;
      const moves: Record<string, [number, number]> = {
        ArrowLeft: [-step, 0],
        ArrowRight: [step, 0],
        ArrowUp: [0, -step],
        ArrowDown: [0, step],
      };
      if (e.key === "Escape" || e.key === "Home") {
        e.preventDefault();
        goHome();
        return;
      }
      const m = moves[e.key];
      if (!m) return;
      e.preventDefault();
      pos.x += m[0];
      pos.y += m[1];
      clampToBounds();
      wrap.style.transition = "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)";
      render();
      window.setTimeout(() => (wrap.style.transition = ""), 250);
    };
    const onResize = () => {
      clampToBounds();
      render();
    };

    svg.addEventListener("pointerdown", onDown);
    svg.addEventListener("pointermove", onMove);
    svg.addEventListener("pointerup", onUp);
    svg.addEventListener("pointercancel", onUp);
    svg.addEventListener("click", onClick);
    svg.addEventListener("dblclick", goHome);
    wrap.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      svg.removeEventListener("pointerdown", onDown);
      svg.removeEventListener("pointermove", onMove);
      svg.removeEventListener("pointerup", onUp);
      svg.removeEventListener("pointercancel", onUp);
      svg.removeEventListener("click", onClick);
      svg.removeEventListener("dblclick", goHome);
      wrap.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      role="img"
      aria-label={label}
      tabIndex={0}
      className="robot-drag relative cursor-grab touch-none rounded-3xl outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500 [&.is-lifted]:cursor-grabbing"
    >
      <svg
        ref={svgRef}
        viewBox="0 0 320 360"
        aria-hidden="true"
        className={`robot h-auto w-full select-none ${happy ? "is-happy" : ""}`}
        onPointerEnter={() => setHappy(true)}
        onPointerLeave={() => setHappy(false)}
      >
        <defs>
          <linearGradient id="rb-shell" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#cfd9e8" />
          </linearGradient>
          <linearGradient id="rb-metal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>
          <linearGradient id="rb-visor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>
          {/* side shading: the half of the head turning away gets darker */}
          <linearGradient id="rb-shade-r" x1="0" y1="0" x2="1" y2="0">
            <stop offset="45%" stopColor="#0f172a" stopOpacity="0" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="rb-shade-l" x1="1" y1="0" x2="0" y2="0">
            <stop offset="45%" stopColor="#0f172a" stopOpacity="0" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0.4" />
          </linearGradient>
          <radialGradient id="rb-glow">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="rb-antenna">
            <stop offset="0%" stopColor="#a5b4fc" />
            <stop offset="60%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </radialGradient>
          <clipPath id="rb-visor-clip">
            <rect x="92" y="88" width="136" height="78" rx="36" />
          </clipPath>
        </defs>

        {/* Ground shadow */}
        <ellipse
          className="robot-shadow fill-slate-500 dark:fill-black"
          cx="160"
          cy="342"
          rx="88"
          ry="10"
        />

        <g className="robot-float">
          {/* Body */}
          <g ref={bodyRef}>
            {/* Left arm */}
            <rect
              x="62"
              y="212"
              width="30"
              height="76"
              rx="15"
              fill="url(#rb-shell)"
              transform="rotate(14 77 216)"
            />
            {/* Right arm (waves when happy) */}
            <g className="robot-arm-r">
              <rect x="228" y="212" width="30" height="76" rx="15" fill="url(#rb-shell)" />
            </g>
            <rect x="95" y="200" width="130" height="112" rx="42" fill="url(#rb-shell)" />
            {/* Chest panel turns a little with the head */}
            <g ref={chestRef}>
              <rect x="124" y="228" width="72" height="46" rx="16" fill="url(#rb-visor)" />
              <circle cx="160" cy="251" r="18" fill="url(#rb-glow)" className="robot-pulse" />
              <circle cx="160" cy="251" r="7" fill="#67e8f9" />
              <rect x="136" y="282" width="48" height="5" rx="2.5" fill="#cbd5e1" />
            </g>
          </g>

          {/* Neck */}
          <g ref={neckRef}>
            <rect x="144" y="180" width="32" height="26" rx="9" fill="url(#rb-metal)" />
          </g>

          {/* Head */}
          <g ref={headRef}>
            {/* Antenna */}
            <rect x="157" y="40" width="6" height="24" rx="3" fill="url(#rb-metal)" />
            <circle cx="160" cy="34" r="16" fill="url(#rb-antenna)" className="robot-pulse" />
            <circle cx="160" cy="34" r="6" fill="#c7d2fe" />

            {/* Ears (drawn behind the shell so they can tuck away) */}
            <rect ref={earLRef} x="56" y="110" width="22" height="48" rx="9" fill="url(#rb-metal)" />
            <rect ref={earRRef} x="242" y="110" width="22" height="48" rx="9" fill="url(#rb-metal)" />

            {/* Shell + turn shading */}
            <rect x="70" y="60" width="180" height="130" rx="58" fill="url(#rb-shell)" />
            <rect ref={shadeLRef} x="70" y="60" width="180" height="130" rx="58" fill="url(#rb-shade-l)" opacity="0" />
            <rect ref={shadeRRef} x="70" y="60" width="180" height="130" rx="58" fill="url(#rb-shade-r)" opacity="0" />
            <path
              ref={shineRef}
              d="M100 82 Q130 66 170 66"
              stroke="#ffffff"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
              opacity="0.9"
            />

            {/* Visor: moves toward the target and foreshortens → the head reads as turning */}
            <g ref={visorRef}>
              <rect x="92" y="88" width="136" height="78" rx="36" fill="url(#rb-visor)" />
              <g clipPath="url(#rb-visor-clip)">
                {/* Eyes (move the most) */}
                <g ref={eyesRef}>
                  <circle cx="130" cy="126" r="26" fill="url(#rb-glow)" />
                  <circle cx="190" cy="126" r="26" fill="url(#rb-glow)" />
                  <g className="robot-eyes-round transition-opacity duration-200">
                    <g className="robot-blink">
                      <ellipse cx="130" cy="126" rx="12" ry="15" fill="#67e8f9" />
                      <ellipse cx="190" cy="126" rx="12" ry="15" fill="#67e8f9" />
                      <circle cx="134" cy="120" r="3.5" fill="#ecfeff" />
                      <circle cx="194" cy="120" r="3.5" fill="#ecfeff" />
                    </g>
                  </g>
                  <g
                    className="robot-eyes-happy transition-opacity duration-200"
                    stroke="#67e8f9"
                    strokeWidth="6"
                    strokeLinecap="round"
                    fill="none"
                  >
                    <path d="M117 130 Q130 113 143 130" />
                    <path d="M177 130 Q190 113 203 130" />
                  </g>
                  <path
                    d="M150 150 Q160 157 170 150"
                    stroke="#67e8f9"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.75"
                  />
                </g>
              </g>
              {/* Glass reflection */}
              <path
                d="M106 104 Q114 94 128 92"
                stroke="#ffffff"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
                opacity="0.18"
              />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}

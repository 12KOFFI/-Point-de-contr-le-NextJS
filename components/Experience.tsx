"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";
import { FiExternalLink } from "react-icons/fi";


/* Inline SVG icons to replace static images */
function BriefcaseSVG() {
  return (
    <svg
      className="exp-icon w-6 h-6 text-blue-500"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}

function BookSVG() {
  return (
    <svg
      className="exp-icon w-6 h-6 text-purple-500"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

function CodeSVG() {
  return (
    <svg
      className="exp-card-icon w-8 h-8 text-blue-400"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function ServerSVG() {
  return (
    <svg
      className="exp-card-icon w-8 h-8 text-purple-400"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
      <line x1="6" y1="6" x2="6.01" y2="6" />
      <line x1="6" y1="18" x2="6.01" y2="18" />
    </svg>
  );
}

const expIcons = [CodeSVG, ServerSVG];

type ExperienceCopy = (typeof translations)[keyof typeof translations]["experiences"];

const TABS = ["formation", "certifications"] as const;
type Tab = (typeof TABS)[number];

const EASE_OUT_EXPO = "ease-[cubic-bezier(0.16,1,0.3,1)]";

function CertificateCover({ title, issuer }: { title: string; issuer: string }) {
  // Typographic cover for certificates without a public image
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 flex flex-col justify-between bg-[linear-gradient(135deg,#1e3a8a_0%,#4c1d95_100%)] p-6 text-white"
    >
      <svg
        className="h-9 w-9 text-white/80"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c0 2 4 3 6 3s6-1 6-3v-5" />
      </svg>
      <div>
        <p className="text-2xl font-extrabold leading-tight text-balance">{title}</p>
        <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/75">
          {issuer}
        </p>
      </div>
    </div>
  );
}

function EducationTabs({ t }: { t: ExperienceCopy }) {
  const [tab, setTab] = useState<Tab>("formation");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Deep links: /experiences#certifications opens the matching tab
  useEffect(() => {
    const fromHash = () => {
      const hash = window.location.hash.slice(1);
      if (hash === "formation" || hash === "certifications") setTab(hash);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  const select = (next: Tab, focus = false) => {
    setTab(next);
    window.history.replaceState(null, "", `#${next}`);
    if (focus) tabRefs.current[TABS.indexOf(next)]?.focus();
  };

  // WAI-ARIA tabs keyboard pattern
  const onKeyDown = (e: React.KeyboardEvent) => {
    const i = TABS.indexOf(tab);
    const next =
      e.key === "ArrowRight"
        ? (i + 1) % TABS.length
        : e.key === "ArrowLeft"
          ? (i - 1 + TABS.length) % TABS.length
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? TABS.length - 1
              : null;
    if (next === null) return;
    e.preventDefault();
    select(TABS[next], true);
  };

  const labels = { formation: t.educationTab, certifications: t.certificationsTab };
  const counts = { formation: t.education.length, certifications: t.certifications.length };

  return (
    <div id="formation" className="scroll-mt-28">
      <span id="certifications" aria-hidden="true" className="block scroll-mt-28" />

      <div data-reveal="up" className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <BookSVG />
          <h3 id="edu-heading" className="text-2xl font-bold">
            {t.educationTitle}
          </h3>
        </div>

        <div
          role="tablist"
          aria-labelledby="edu-heading"
          onKeyDown={onKeyDown}
          className="relative grid grid-cols-2 self-start rounded-full border border-gray-200 bg-gray-100 p-1 dark:border-white/10 dark:bg-white/5 sm:self-auto"
        >
          {/* sliding indicator */}
          <span
            aria-hidden="true"
            className={`absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-white shadow-sm ring-1 ring-black/5 transition-transform duration-500 ${EASE_OUT_EXPO} dark:bg-neutral-800 dark:ring-white/10 motion-reduce:transition-none ${
              tab === "certifications" ? "translate-x-full" : ""
            }`}
          />
          {TABS.map((id, i) => {
            const active = tab === id;
            return (
              <button
                key={id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`tab-${id}`}
                aria-selected={active}
                aria-controls={`panel-${id}`}
                tabIndex={active ? 0 : -1}
                onClick={() => select(id)}
                className={`relative z-10 flex items-center justify-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500 pointer-coarse:min-h-11 ${
                  active
                    ? "text-gray-900 dark:text-white"
                    : "text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                }`}
              >
                {labels[id]}
                <span
                  className={`rounded-full px-1.5 text-xs tabular-nums transition-colors duration-200 ${
                    active
                      ? "bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300"
                      : "bg-gray-200 text-gray-600 dark:bg-white/10 dark:text-gray-400"
                  }`}
                >
                  {counts[id]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div
        key={tab}
        role="tabpanel"
        id={`panel-${tab}`}
        aria-labelledby={`tab-${tab}`}
        tabIndex={0}
        className="hero-reveal rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-500"
      >
        {tab === "formation" ? (
          <ol className="divide-y divide-gray-200 overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 dark:divide-white/10 dark:border-white/10 dark:bg-neutral-900">
            {t.education.map((edu) => (
              <li
                key={edu.title}
                className="grid gap-1 p-5 sm:grid-cols-[9rem_1fr] sm:gap-6 sm:p-6"
              >
                <span className="pt-0.5 text-sm font-semibold tabular-nums text-purple-600 dark:text-purple-400">
                  {edu.period}
                </span>
                <div>
                  <h4 className="font-bold text-balance">{edu.title}</h4>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {edu.school}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        ) : (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {t.certifications.map((cert) => {
              const link = "link" in cert ? cert.link : undefined;
              const image = "image" in cert ? cert.image : undefined;
              return (
                <li
                  key={cert.title}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-purple-300 hover:shadow-lg hover:shadow-purple-500/10 dark:border-white/10 dark:bg-neutral-900 dark:hover:border-purple-500/40"
                >
                  <div className="relative aspect-[1000/774] overflow-hidden border-b border-gray-200 bg-gray-100 dark:border-white/10 dark:bg-neutral-800">
                    {image ? (
                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        tabIndex={-1}
                        aria-hidden="true"
                      >
                        <Image
                          src={image}
                          alt=""
                          fill
                          sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
                          className={`object-cover transition-transform duration-700 ${EASE_OUT_EXPO} group-hover:scale-[1.03] motion-reduce:transition-none`}
                        />
                      </a>
                    ) : (
                      <CertificateCover title={cert.title} issuer={cert.school} />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h4 className="font-bold leading-snug text-balance">{cert.title}</h4>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {cert.school} · {cert.period}
                    </p>
                    {link && (
                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${t.viewCertificate} : ${cert.title}`}
                        className="mt-auto inline-flex items-center gap-1.5 self-start pt-4 text-sm font-semibold text-purple-600 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500 dark:text-purple-400"
                      >
                        {t.viewCertificate}
                        <FiExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}


export default function Experience() {
  const { lang } = useLanguage();
  const t = translations[lang].experiences;
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  const experiences = [
    { ...t.intern, showStack: true },
    { ...t.freelance, showStack: true },
  ];

  // Timeline drawn by the scroll: the line grows with the reader and each dot
  // lights up when the line reaches it.
  useEffect(() => {
    const timeline = timelineRef.current;
    const line = lineRef.current;
    if (!timeline || !line) return;
    const dots = Array.from(timeline.querySelectorAll<HTMLElement>(".timeline-dot"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    timeline.setAttribute("data-ready", "");
    if (reduce) {
      dots.forEach((d) => d.setAttribute("data-lit", ""));
      return () => timeline.removeAttribute("data-ready");
    }

    let raf = 0;
    const update = () => {
      raf = 0;
      const r = timeline.getBoundingClientRect();
      // the tip of the line sits at ~65% of the viewport height
      const p = Math.min(1, Math.max(0, (window.innerHeight * 0.65 - r.top) / r.height));
      line.style.transform = `scaleY(${p.toFixed(4)})`;
      const tip = p * r.height;
      dots.forEach((d) => d.toggleAttribute("data-lit", d.offsetTop <= tip));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      timeline.removeAttribute("data-ready");
    };
  }, []);

  return (
    <section
      className="bg-white dark:bg-neutral-950 text-gray-900 dark:text-white py-20 px-4 sm:px-6 transition-colors duration-300 relative overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_0%_25%,rgba(168,85,247,0.06),transparent_40%),radial-gradient(circle_at_100%_75%,rgba(59,130,246,0.06),transparent_40%)]"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Title */}
        <h2 data-reveal="heading" className="exp-title text-4xl md:text-6xl font-bold tracking-tight text-balance text-center mb-20 text-gray-900 dark:text-white">
          {t.title} <span className="text-blue-600 dark:text-blue-400">{t.titleHighlight}</span>
        </h2>

        {/* Experiences Section */}
        <div className="mb-20">
          <div data-reveal="up" className="flex items-center gap-3 mb-10">
            <BriefcaseSVG />
            <h3 className="text-2xl font-bold">{t.experienceTitle}</h3>
          </div>

          <div ref={timelineRef} className="timeline relative">
            {/* Track + scroll-drawn line */}
            <div className="absolute left-4 md:left-6 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-white/10"></div>
            <div
              ref={lineRef}
              className="timeline-line absolute left-4 md:left-6 top-0 bottom-0 w-0.5 origin-top bg-gradient-to-b from-blue-500 to-purple-500"
            ></div>

            <div data-reveal="stagger" className="exp-cards-container space-y-10">
              {experiences.map((exp, index) => {
                const IconComponent = expIcons[index] || CodeSVG;
                return (
                  <div key={index} className="exp-card relative pl-12 md:pl-16">
                    {/* Timeline dot */}
                    <div className="timeline-dot absolute left-2 md:left-4 top-2 w-4 h-4 rounded-full bg-blue-500 [.timeline[data-ready]_&:not([data-lit])]:bg-gray-300 dark:[.timeline[data-ready]_&:not([data-lit])]:bg-neutral-700 border-4 border-white dark:border-neutral-950 shadow-lg shadow-blue-500/30"></div>

                    <div className="bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-white/10 rounded-xl p-6 hover:border-blue-300 dark:hover:border-blue-500/30 transition-colors shadow-lg group">
                      {/* SVG icon */}
                      <div className="float-right ml-4 mb-2 p-3 bg-blue-50 dark:bg-blue-500/10 rounded-xl group-hover:scale-110 transition-transform duration-300">
                        <IconComponent />
                      </div>

                      {/* Role & Period */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                        <h4 className="text-lg font-bold text-blue-500">
                          {exp.role}
                        </h4>
                        <span className="text-sm font-medium px-3 py-1 bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-full w-fit">
                          {exp.period}
                        </span>
                      </div>

                      {/* Company */}
                      <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 italic">
                        {exp.company}
                      </p>

                      {/* Tasks */}
                      <ul className="space-y-2 mb-4">
                        {exp.tasks.map((task, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300"
                          >
                            <span className="text-blue-500 mt-1 flex-shrink-0">
                              &#8226;
                            </span>
                            {task}
                          </li>
                        ))}
                      </ul>

                      {/* Stack */}
                      {exp.showStack && "stack" in exp && (
                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-white/10">
                          <div className="flex flex-wrap gap-2">
                            {(exp.stack as string)
                              .split(" · ")
                              .map((tech, i) => (
                                <span
                                  key={i}
                                  className="px-2 py-1 bg-gray-100 dark:bg-white/10 text-xs rounded-md text-gray-700 dark:text-white font-medium hover:scale-105 transition-transform"
                                >
                                  {tech}
                                </span>
                              ))}
                          </div>
                          {"note" in exp && (
                            <p className="mt-3 text-xs text-gray-400 dark:text-gray-500 italic">
                              {exp.note as string}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Education & certifications: two tabs in the same section */}
        <EducationTabs t={t} />
      </div>
    </section>
  );
}

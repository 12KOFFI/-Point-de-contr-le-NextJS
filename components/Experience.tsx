"use client";

import React, { useLayoutEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

function GraduationSVG() {
  return (
    <svg
      className="edu-card-icon w-8 h-8 text-purple-400"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c0 2 4 3 6 3s6-1 6-3v-5" />
    </svg>
  );
}

const expIcons = [CodeSVG, ServerSVG];

export default function Experience() {
  const { lang } = useLanguage();
  const t = translations[lang].experiences;
  const sectionRef = useRef<HTMLElement>(null);

  const experiences = [
    { ...t.freelance, showStack: true },
    { ...t.intern, showStack: false },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Title
      gsap.from(".exp-title", {
        scrollTrigger: {
          trigger: ".exp-title",
          start: "top 85%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
      });

      // Section headers icons
      gsap.from(".exp-icon", {
        scrollTrigger: {
          trigger: ".exp-icon",
          start: "top 90%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        scale: 0,
        rotation: -180,
        duration: 0.6,
        stagger: 0.2,
        ease: "back.out(1.7)",
      });

      // Timeline line draw
      gsap.from(".timeline-line", {
        scrollTrigger: {
          trigger: ".timeline-line",
          start: "top 80%",
          toggleActions: "play none none none",
        },
        scaleY: 0,
        transformOrigin: "top",
        duration: 1.2,
        ease: "power2.out",
      });

      // Experience cards
      gsap.from(".exp-card", {
        scrollTrigger: {
          trigger: ".exp-cards-container",
          start: "top 80%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        x: -40,
        scale: 0.95,
        duration: 0.7,
        stagger: 0.25,
        ease: "power3.out",
      });

      // SVG icons in cards - draw effect
      gsap.from(".exp-card-icon", {
        scrollTrigger: {
          trigger: ".exp-cards-container",
          start: "top 75%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        scale: 0,
        rotation: 360,
        duration: 0.8,
        stagger: 0.3,
        ease: "back.out(2)",
      });

      // Timeline dots pulse
      gsap.from(".timeline-dot", {
        scrollTrigger: {
          trigger: ".exp-cards-container",
          start: "top 80%",
          toggleActions: "play none none none",
        },
        scale: 0,
        duration: 0.5,
        stagger: 0.2,
        ease: "back.out(2)",
      });

      // Continuous pulse on dots
      gsap.to(".timeline-dot", {
        boxShadow: "0 0 20px rgba(59,130,246,0.6)",
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Education cards
      gsap.from(".edu-card", {
        scrollTrigger: {
          trigger: ".edu-section",
          start: "top 80%",
          toggleActions: "play none none none",
          once: true,
        },
        y: 24,
        scale: 0.98,
        duration: 0.6,
        stagger: 0.12,
        ease: "power3.out",
      });

      // Edu SVG icons
      gsap.from(".edu-card-icon", {
        scrollTrigger: {
          trigger: ".edu-section",
          start: "top 75%",
          toggleActions: "play none none none",
          once: true,
        },
        y: -8,
        rotate: -8,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)",
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, [lang]);

  return (
    <section
      ref={sectionRef}
      className="bg-white dark:bg-neutral-950 text-gray-900 dark:text-white py-20 px-4 sm:px-6 transition-colors duration-300 relative overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden opacity-5 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Title */}
        <h2 className="exp-title text-4xl md:text-6xl font-bold text-center mb-20 bg-gradient-to-r from-gray-900 to-gray-500 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
          {t.title} <span className="text-blue-500">{t.titleHighlight}</span>
        </h2>

        {/* Experiences Section */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-10">
            <BriefcaseSVG />
            <h3 className="text-2xl font-bold">{t.experienceTitle}</h3>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="timeline-line absolute left-4 md:left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500"></div>

            <div className="exp-cards-container space-y-10">
              {experiences.map((exp, index) => {
                const IconComponent = expIcons[index] || CodeSVG;
                return (
                  <div key={index} className="exp-card relative pl-12 md:pl-16">
                    {/* Timeline dot */}
                    <div className="timeline-dot absolute left-2 md:left-4 top-2 w-4 h-4 rounded-full bg-blue-500 border-4 border-white dark:border-neutral-950 shadow-lg shadow-blue-500/30"></div>

                    <div className="bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-white/10 rounded-xl p-6 hover:border-blue-300 dark:hover:border-blue-500/30 transition-all shadow-lg group">
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

        {/* Education Section */}
        <div className="edu-section">
          <div className="flex items-center gap-3 mb-10">
            <BookSVG />
            <h3 className="text-2xl font-bold">{t.educationTitle}</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {t.education.map((edu, index) => (
              <div
                key={index}
                className="edu-card bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-white/10 rounded-xl p-5 hover:border-purple-300 dark:hover:border-purple-500/30 transition-all shadow-md group cursor-default"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <span className="text-xs font-medium px-2 py-1 bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 rounded-full">
                    {edu.period}
                  </span>
                  <div className="p-1.5 bg-purple-50 dark:bg-purple-500/10 rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <GraduationSVG />
                  </div>
                </div>
                <h4 className="text-base font-bold mb-1">{edu.title}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {edu.school}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

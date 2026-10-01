"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FiArrowRight, FiDownload, FiMail } from "react-icons/fi";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";
import Robot from "@/components/Robot";
import ParticleNetwork from "@/components/ParticleNetwork";

const socials = [
  { label: "GitHub", href: "https://github.com/12KOFFI", icon: FaGithub },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/isaac-n-dri-koffi-7b74b4247/", icon: FaLinkedin },
  { label: "Email", href: "mailto:isaacndri5@gmail.com", icon: FiMail },
];

/**
 * Typewriter isolated in its own component: only this <span> re-renders
 * on each character, not the whole Hero.
 */
function TypedRoles({ roles }: { roles: string[] }) {
  const [text, setText] = useState("");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setText(roles[0]);
      return;
    }

    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timeout: ReturnType<typeof setTimeout>;

    const step = () => {
      const word = roles[roleIndex];
      charIndex += deleting ? -1 : 1;
      setText(word.slice(0, charIndex));

      let delay = deleting ? 35 : 75;
      if (!deleting && charIndex === word.length) {
        deleting = true;
        delay = 1600;
      } else if (deleting && charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        delay = 300;
      }
      timeout = setTimeout(step, delay);
    };

    setText("");
    timeout = setTimeout(step, 500);
    return () => clearTimeout(timeout);
  }, [roles]);

  return (
    <>
      <span className="sr-only">{roles.join(", ")}</span>
      <span aria-hidden="true" className="whitespace-nowrap">
        <span className="text-blue-600 dark:text-blue-400">{text}</span>
        <span className="typed-caret ml-0.5 font-light text-blue-500">|</span>
      </span>
    </>
  );
}

export default function Hero() {
  const { lang } = useLanguage();
  const t = translations[lang].hero;
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLAnchorElement>(null);

  // Scroll exit with depth: the text leaves faster than the robot, which sinks back a little
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let lastP = -1;
    const update = () => {
      raf = 0;
      const section = sectionRef.current;
      if (!section) return;
      const p = Math.min(1, Math.max(0, window.scrollY / (section.offsetHeight * 0.85)));
      if (p === lastP) return;
      lastP = p;
      if (textRef.current) {
        textRef.current.style.transform = `translate3d(0, ${(-p * 70).toFixed(1)}px, 0)`;
        textRef.current.style.opacity = (1 - p * 0.75).toFixed(3);
      }
      if (visualRef.current) {
        visualRef.current.style.transform = `translate3d(0, ${(p * 40).toFixed(1)}px, 0) scale(${(1 - p * 0.08).toFixed(3)})`;
      }
      if (cueRef.current) cueRef.current.style.opacity = Math.max(0, 1 - p * 4).toFixed(3);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative isolate flex min-h-[calc(100svh-5rem)] items-center overflow-hidden bg-white px-4 py-12 transition-colors duration-300 dark:bg-gray-900 sm:px-6 md:py-16">
      {/* Background: interactive particle network */}
      <ParticleNetwork className="absolute inset-0 -z-10 h-full w-full" />

      <div className="mx-auto w-full max-w-7xl px-0 sm:px-6">
        <div className="flex flex-col-reverse items-center gap-4 sm:gap-6 lg:flex-row lg:gap-12">
          {/* Text */}
          <div ref={textRef} className="flex-1 text-center will-change-transform lg:text-left">
            <h1
              className="hero-reveal mb-5 text-4xl font-extrabold leading-[1.1] tracking-tight text-balance text-gray-900 dark:text-white sm:text-5xl md:text-6xl"
              style={{ "--d": "0ms" } as React.CSSProperties}
            >
              {t.greeting}{" "}
              <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
                {t.name}
              </span>
            </h1>

            <p
              className="hero-reveal mb-5 text-lg text-gray-700 dark:text-gray-200 sm:text-xl"
              style={{ "--d": "50ms" } as React.CSSProperties}
            >
              <span className="block text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">
                {t.role}
              </span>
              <span className="mt-1 block font-medium">
                {t.typedPrefix} <TypedRoles roles={t.typedRoles} />
              </span>
            </p>

            <p
              className="hero-reveal mx-auto mb-8 max-w-xl text-base leading-relaxed text-gray-600 dark:text-gray-300 sm:text-lg lg:mx-0"
              style={{ "--d": "100ms" } as React.CSSProperties}
            >
              {t.description}
            </p>

            <div
              className="hero-reveal flex flex-col justify-center gap-3 sm:flex-row lg:justify-start"
              style={{ "--d": "150ms" } as React.CSSProperties}
            >
              <Link
                href="/projets"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-600/25 transition-[background-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-blue-600/40 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500"
              >
                {t.viewProjects}
                <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <a
                href="/CV_Isaac_NDri_Koffi_Developpeur.pdf"
                download
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-gray-300 px-6 py-3 font-semibold text-gray-900 transition-[background-color,border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-gray-400 hover:bg-gray-100 dark:border-white/30 dark:text-white dark:hover:border-white/60 dark:hover:bg-white/10 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500"
              >
                <FiDownload className="transition-transform duration-300 group-hover:translate-y-0.5" />
                {t.downloadCV}
              </a>
            </div>

            <ul
              className="hero-reveal mt-8 flex justify-center gap-3 lg:justify-start"
              style={{ "--d": "200ms" } as React.CSSProperties}
            >
              {socials.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition-[color,border-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:border-blue-400 hover:text-blue-600 hover:shadow-md hover:shadow-blue-500/20 dark:border-white/10 dark:bg-white/5 dark:text-gray-200 dark:hover:border-blue-400/60 dark:hover:text-blue-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500"
                  >
                    <Icon size={18} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Robot */}
          <div className="hero-visual relative flex w-full max-w-[190px] flex-1 justify-center sm:max-w-[300px] lg:max-w-[440px]">
            <div ref={visualRef} className="relative w-full">
              {/* glow stays on the robot's home spot when it's dragged away */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-[6%] -z-10 bg-[radial-gradient(closest-side,rgba(59,130,246,0.3),rgba(34,211,238,0.12)_55%,transparent)]"
              />
              <Robot label={t.robotLabel} />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        ref={cueRef}
        href="#competences"
        aria-label={t.scrollHint}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 rounded-full md:block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500"
      >
        <span className="flex h-10 w-6 justify-center rounded-full border-2 border-gray-400/60 pt-2 dark:border-white/30">
          <span className="scroll-dot h-2 w-1 rounded-full bg-blue-500" />
        </span>
      </a>
    </section>
  );
}

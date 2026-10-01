"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

export default function DeveloperInfo() {
  const textsRef = useRef<HTMLDivElement>(null);
  const { lang } = useLanguage();
  const t = translations[lang].developerInfo;

  // Guided reading: the paragraph crossing the middle of the screen is lit,
  // the others step back. Nothing is dimmed until this script is running.
  useEffect(() => {
    const container = textsRef.current;
    if (!container) return;
    const paragraphs = Array.from(container.querySelectorAll<HTMLElement>(".dev-text"));
    const setActive = (el: Element) =>
      paragraphs.forEach((p) => p.toggleAttribute("data-active", p === el));

    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting);
        if (hit.length) setActive(hit[hit.length - 1].target);
      },
      { rootMargin: "-42% 0px -42% 0px" },
    );
    paragraphs.forEach((p) => io.observe(p));
    setActive(paragraphs[0]);
    container.setAttribute("data-ready", "");

    return () => {
      io.disconnect();
      container.removeAttribute("data-ready");
    };
  }, [lang]);

  return (
    <section className="relative bg-white px-4 py-16 text-gray-900 transition-colors duration-300 dark:bg-black dark:text-white sm:px-6 md:py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        {/* Portrait: shown immediately, no animation */}
        <div className="flex justify-center lg:sticky lg:top-28 lg:h-fit lg:justify-start">
          <div
            className="relative h-56 w-56 overflow-hidden rounded-2xl border border-gray-200 shadow-xl dark:border-white/10 sm:h-64 sm:w-64 lg:h-80 lg:w-80"
          >
            <Image
              src="/images/image-profil.jpg"
              alt="Isaac Koffi"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 320px, 256px"
              loading="eager"
            />
          </div>
        </div>

        <div>
          <h2
            data-reveal="heading"
            className="mb-8 text-center text-3xl font-bold leading-tight tracking-tight text-balance sm:text-4xl md:text-5xl lg:text-left"
          >
            {t.title}
          </h2>

          <div ref={textsRef} className="dev-focus space-y-5 md:space-y-6">
            {t.texts.map((text, i) => (
              <p
                key={i}
                className="dev-text text-base leading-relaxed text-gray-700 dark:text-gray-300 sm:text-lg"
              >
                {text}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

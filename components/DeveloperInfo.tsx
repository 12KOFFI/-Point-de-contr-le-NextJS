"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function DeveloperInfo() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const { lang } = useLanguage();
  const t = translations[lang].developerInfo;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image reveal with scale
      if (imageRef.current) {
        gsap.from(imageRef.current, {
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          scale: 0.85,
          x: -40,
          duration: 1,
          ease: "power3.out",
        });
      }

      // Title entrance
      gsap.from(".dev-title", {
        scrollTrigger: {
          trigger: ".dev-title",
          start: "top 85%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
      });

      // Text paragraphs stagger
      gsap.from(".dev-text", {
        scrollTrigger: {
          trigger: ".dev-text-container",
          start: "top 80%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 25,
        duration: 0.6,
        stagger: 0.12,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [lang]);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        scrollRef.current.style.scrollBehavior = "smooth";
      }
    };
    window.addEventListener("resize", handleScroll);
    return () => window.removeEventListener("resize", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-white dark:bg-black text-gray-900 dark:text-white py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
        {/* IMAGE FIXE */}
        <div className="lg:sticky lg:top-24 h-fit flex justify-center order-2 lg:order-1">
          <div
            ref={imageRef}
            className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-xl md:rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 hover:border-blue-300 dark:hover:border-white/30 transition-all duration-300 shadow-xl"
          >
            <Image
              src="/images/image-profil.jpg"
              alt="Isaac Koffi"
              fill
              className="object-cover grayscale hover:grayscale-0 transition duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
              priority
            />
          </div>
        </div>

        {/* TEXTE SCROLLABLE */}
        <div
          ref={scrollRef}
          className="max-h-[70vh] lg:max-h-[80vh] overflow-y-auto pr-2 lg:pr-4 order-1 lg:order-2 scrollbar-thin"
        >
          <h2 className="dev-title text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6 md:mb-8 bg-gradient-to-r from-gray-900 to-gray-500 dark:from-white dark:to-gray-400 bg-clip-text text-transparent text-center lg:text-left">
            {t.title}
          </h2>

          <div className="dev-text-container space-y-4 sm:space-y-5 md:space-y-6">
            {t.texts.map((text, i) => (
              <p
                key={i}
                className="dev-text text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
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

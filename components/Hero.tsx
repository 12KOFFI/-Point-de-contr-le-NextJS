"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef, useCallback } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";
import gsap from "gsap";

const floatingTechs = [
  { name: "react", top: "5%", left: "10%", size: 40 },
  { name: "nextjs", top: "15%", right: "5%", size: 36 },
  { name: "nodejs", bottom: "15%", left: "5%", size: 38 },
  { name: "tail", bottom: "10%", right: "10%", size: 34 },
  { name: "ts", top: "50%", left: "0%", size: 32 },
  { name: "symfony", top: "45%", right: "0%", size: 36 },
];

export default function Hero() {
  const { lang } = useLanguage();
  const t = translations[lang].hero;
  const [typedText, setTypedText] = useState("");
  const typingSpeed = 40;

  const heroRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const floatingRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Typing effect
  useEffect(() => {
    setTypedText("");
    let index = 0;
    const fullText = t.typedText;
    const interval = setInterval(() => {
      setTypedText((prev) => prev + fullText.charAt(index));
      index++;
      if (index >= fullText.length) clearInterval(interval);
    }, typingSpeed);
    return () => clearInterval(interval);
  }, [t.typedText]);

  // GSAP entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text entrance
      gsap.from(textRef.current, {
        opacity: 0,
        x: -60,
        duration: 1,
        ease: "power3.out",
      });

      // Image entrance with 3D
      gsap.from(imageContainerRef.current, {
        opacity: 0,
        scale: 0.8,
        rotateY: 15,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.3,
      });

      // Floating tech icons - continuous animation
      floatingRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.from(el, {
          opacity: 0,
          scale: 0,
          duration: 0.6,
          delay: 0.8 + i * 0.1,
          ease: "back.out(1.7)",
        });

        // Continuous floating
        gsap.to(el, {
          y: "random(-12, 12)",
          x: "random(-8, 8)",
          rotation: "random(-8, 8)",
          duration: "random(2.5, 4)",
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: i * 0.3,
        });
      });
    }, heroRef);

    return () => ctx.revert();
  }, [lang]);

  // Mouse parallax for 3D effect
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rotateY = ((e.clientX - centerX) / rect.width) * 20;
    const rotateX = -((e.clientY - centerY) / rect.height) * 20;

    gsap.to(imageContainerRef.current, {
      rotateY,
      rotateX,
      duration: 0.5,
      ease: "power2.out",
      transformPerspective: 800,
    });

    // Parallax on floating techs
    floatingRefs.current.forEach((el, i) => {
      if (!el) return;
      const depth = 0.02 + i * 0.008;
      gsap.to(el, {
        x: (e.clientX - centerX) * depth,
        y: (e.clientY - centerY) * depth,
        duration: 0.5,
        ease: "power2.out",
      });
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!imageContainerRef.current) return;
    gsap.to(imageContainerRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.5)",
    });
  }, []);

  return (
    <section
      ref={heroRef}
      className="min-h-screen flex items-center bg-white dark:bg-gray-900 px-4 sm:px-6 py-16 md:py-20 transition-colors duration-300 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-8 md:gap-12 lg:gap-16 xl:gap-24">
          {/* Texte principal */}
          <div ref={textRef} className="text-center lg:text-left flex-1">
            <p className="text-blue-500 text-sm sm:text-base font-semibold mb-2 tracking-wide uppercase">
              {t.role}
            </p>
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 leading-tight text-gray-900 dark:text-white">
              {t.greeting}{" "}
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                {t.name}
              </span>
            </h1>

            <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0 min-h-[100px]">
              {typedText}
              <span className="animate-pulse text-blue-500">|</span>
            </p>

            <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <Link
                href="/projets"
                className="hero-btn px-5 py-2.5 sm:px-6 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium sm:font-semibold rounded-full text-sm sm:text-base transition-colors"
              >
                {t.viewProjects}
              </Link>
              <a
                href="/mon-portfolio.pdf"
                download
                className="hero-btn px-5 py-2.5 sm:px-6 sm:py-3 border border-gray-300 dark:border-white text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 font-medium sm:font-semibold rounded-full text-sm sm:text-base transition-colors"
              >
                {t.downloadCV}
              </a>
            </div>

            {/* Stack technique */}
            <div className="mt-8 sm:mt-10 md:mt-12 flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3">
              {["nextjs", "react", "tail", "nodejs", "symfony"].map((tech) => (
                <div
                  key={tech}
                  className="bg-gray-100 dark:bg-white/10 p-1.5 sm:p-2 rounded-md sm:rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/20"
                >
                  <Image
                    src={`/images/stack/${tech}.svg`}
                    alt={tech}
                    width={20}
                    height={20}
                    className="w-5 h-5 sm:w-6 sm:h-6"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Image de profil avec effet 3D */}
          <div
            className="flex-1 flex justify-center mb-8 lg:mb-0 relative"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: "1000px" }}
          >
            {/* Floating tech icons */}
            {floatingTechs.map((tech, i) => (
              <div
                key={tech.name}
                ref={(el) => {
                  floatingRefs.current[i] = el;
                }}
                className="absolute z-10 bg-white/90 dark:bg-white/10 backdrop-blur-sm p-2 rounded-xl shadow-lg border border-gray-200/50 dark:border-white/10"
                style={{
                  top: tech.top,
                  left: tech.left,
                  right: tech.right,
                  bottom: tech.bottom,
                }}
              >
                <Image
                  src={`/images/stack/${tech.name}.svg`}
                  alt={tech.name}
                  width={tech.size}
                  height={tech.size}
                />
              </div>
            ))}

            <div
              ref={imageContainerRef}
              className="relative w-56 h-56 xs:w-64 xs:h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-xl overflow-hidden shadow-2xl shadow-blue-500/20 will-change-transform"
              style={{ transformStyle: "preserve-3d" }}
            >
              <Image
                src="/images/stack/image-hero.svg"
                alt="Isaac Koffi - Développeur Full Stack"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, (max-width: 1024px) 360px, 400px"
                priority
              />
              {/* Glow overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

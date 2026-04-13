"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skillBlocks = [
  {
    key: "frontend" as const,
    techs: [
      { name: "React.js", icon: "react" },
      { name: "Next.js", icon: "nextjs" },
      { name: "Tailwind CSS", icon: "tail" },
      { name: "TypeScript", icon: "ts" },
    ],
    color: "from-blue-500 to-cyan-400",
    borderColor: "border-blue-500/30 hover:border-blue-500/60",
    shadowColor: "hover:shadow-blue-500/20",
    glowColor: "blue",
  },
  {
    key: "backend" as const,
    techs: [
      { name: "PHP / Symfony", icon: "symfony" },
      { name: "Node.js", icon: "nodejs" },
      { name: "Express.js", icon: "express" },
    ],
    color: "from-purple-500 to-pink-400",
    borderColor: "border-purple-500/30 hover:border-purple-500/60",
    shadowColor: "hover:shadow-purple-500/20",
    glowColor: "purple",
  },
  {
    key: "database" as const,
    techs: [
      { name: "MySQL", icon: "mysql" },
      { name: "MongoDB", icon: "mongodb" },
    ],
    color: "from-green-500 to-emerald-400",
    borderColor: "border-green-500/30 hover:border-green-500/60",
    shadowColor: "hover:shadow-green-500/20",
    glowColor: "green",
  },
];

export default function Presentation() {
  const { lang } = useLanguage();
  const t = translations[lang].presentation;
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const iconsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(".skills-title", {
        scrollTrigger: {
          trigger: ".skills-title",
          start: "top 85%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
      });

      // Cards stagger animation
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          y: 50,
          scale: 0.95,
          duration: 0.7,
          delay: i * 0.15,
          ease: "power3.out",
        });
      });

      // SVG icons stagger animation
      iconsRef.current.forEach((icon, i) => {
        if (!icon) return;
        gsap.from(icon, {
          scrollTrigger: {
            trigger: icon,
            start: "top 90%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          scale: 0,
          rotation: -15,
          duration: 0.5,
          delay: i * 0.08,
          ease: "back.out(1.7)",
        });

        // Subtle continuous floating
        gsap.to(icon, {
          y: "random(-4, 4)",
          duration: "random(2, 3.5)",
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: i * 0.2,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [lang]);

  let iconIndex = 0;

  return (
    <section
      ref={sectionRef}
      className="bg-gray-50 dark:bg-black text-gray-900 dark:text-white px-4 sm:px-6 lg:px-8 py-16 md:py-24 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="skills-title text-2xl sm:text-3xl md:text-4xl font-bold text-blue-500 mb-12 md:mb-16 text-center">
          {t.title}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
          {skillBlocks.map((block, i) => (
            <div
              key={i}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              className={`bg-white dark:bg-[#111] border ${block.borderColor} rounded-xl md:rounded-2xl p-6 sm:p-8 flex flex-col gap-4 sm:gap-6 h-full group shadow-lg ${block.shadowColor} transition-all duration-300`}
            >
              <h3
                className={`text-lg sm:text-xl font-bold text-center bg-gradient-to-r ${block.color} bg-clip-text text-transparent`}
              >
                {t[block.key]}
              </h3>

              <div className="flex flex-wrap gap-3 justify-center">
                {block.techs.map((tech) => {
                  const currentIndex = iconIndex++;
                  return (
                    <div
                      key={tech.name}
                      ref={(el) => {
                        iconsRef.current[currentIndex] = el;
                      }}
                      className="skill-icon flex flex-col items-center gap-2 p-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-transparent hover:border-blue-500/30 transition-all duration-300 cursor-default group/icon"
                    >
                      <div className="relative w-10 h-10 sm:w-12 sm:h-12 transition-transform duration-300 group-hover/icon:scale-125">
                        <Image
                          src={`/images/stack/${tech.icon}.svg`}
                          alt={tech.name}
                          fill
                          className="object-contain drop-shadow-sm group-hover/icon:drop-shadow-[0_0_8px_rgba(59,130,246,0.5)] transition-all duration-300"
                        />
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                        {tech.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

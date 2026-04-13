"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* Tech name → SVG file mapping */
const techIconMap: Record<string, string> = {
  MongoDB: "mongodb",
  "React (Vite)": "react",
  "Node.js": "nodejs",
  Cloudinary: "",
  Vercel: "nextjs",
  Render: "nodejs",
  PHP: "php",
  MySQL: "mysql",
  "HTML/CSS": "html",
  Bootstrap: "bootstrap",
  WampServer: "php",
  Git: "git",
  Symfony: "symfony",
  "Tailwind CSS": "tail",
  Tailwind: "tail",
  "Next.js": "nextjs",
  TypeScript: "ts",
  Prisma: "prisma",
  "Doctrine ORM": "symfony",
  Twig: "symfony",
  DomPDF: "php",
  o2switch: "git",
};

/* Inline SVG icons for project categories */
function ShoppingCartSVG() {
  return (
    <svg
      className="w-12 h-12 text-blue-500"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}

function FileTextSVG() {
  return (
    <svg
      className="w-12 h-12 text-blue-500"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

function BookOpenSVG() {
  return (
    <svg
      className="w-12 h-12 text-blue-500"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

function CheckSquareSVG() {
  return (
    <svg
      className="w-12 h-12 text-blue-500"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="9 11 12 14 22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  );
}

function BuildingSVG() {
  return (
    <svg
      className="w-12 h-12 text-blue-500"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <line x1="8" y1="6" x2="8" y2="6.01" />
      <line x1="16" y1="6" x2="16" y2="6.01" />
      <line x1="12" y1="6" x2="12" y2="6.01" />
      <line x1="8" y1="10" x2="8" y2="10.01" />
      <line x1="16" y1="10" x2="16" y2="10.01" />
      <line x1="12" y1="10" x2="12" y2="10.01" />
      <line x1="8" y1="14" x2="8" y2="14.01" />
      <line x1="16" y1="14" x2="16" y2="14.01" />
      <line x1="12" y1="14" x2="12" y2="14.01" />
    </svg>
  );
}

const projectIcons = [
  ShoppingCartSVG,
  FileTextSVG,
  BookOpenSVG,
  CheckSquareSVG,
  BuildingSVG,
];

export default function Projects() {
  const { lang } = useLanguage();
  const t = translations[lang].projects;
  const sectionRef = useRef<HTMLElement>(null);

  const projects = [
    {
      titleKey: "ecommerce" as const,
      techs: [
        "MongoDB",
        "React (Vite)",
        "Node.js",
        "Cloudinary",
        "Vercel",
        "Render",
      ],
      link: "https://ecommerce-finaly.vercel.app/",
      github: "https://github.com/12KOFFI/Ecommerce-finaly",
    },
    {
      titleKey: "multiNettoyage" as const,
      techs: [
        "PHP",
        "Symfony",
        "Doctrine ORM",
        "MySQL",
        "Twig",
        "DomPDF",
        "SMTP",
        "Git",
      ],
      link: "https://multi-nettoyage94.fr/",
      github: null,
    },
    {
      titleKey: "etatCivil" as const,
      techs: ["PHP", "MySQL", "HTML/CSS", "Bootstrap", "Git"],
      link: "https://github.com/12KOFFI/etatcivil",
      github: "https://github.com/12KOFFI/etatcivil",
    },
    {
      titleKey: "blog" as const,
      techs: ["PHP", "Symfony", "Tailwind CSS", "MySQL", "Git"],
      link: "#",
      github: "#",
    },
    {
      titleKey: "taskManager" as const,
      techs: ["Next.js", "Tailwind", "TypeScript", "MySQL", "Prisma"],
      link: "https://github.com/12KOFFI/TODO-APP-FULL-STACK",
      github: "https://github.com/12KOFFI/TODO-APP-FULL-STACK",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title
      gsap.fromTo(
        ".projects-title",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      );

      // Cards stagger
      gsap.fromTo(
        ".project-card",
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          clearProps: "all",
          scrollTrigger: {
            trigger: ".projects-grid",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );

      // Tech icons inside cards
      gsap.fromTo(
        ".tech-icon-badge",
        { opacity: 0, scale: 0, y: 10 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.03,
          ease: "back.out(1.7)",
          clearProps: "all",
          scrollTrigger: {
            trigger: ".projects-grid",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [lang]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="bg-gray-50 dark:bg-neutral-950 text-gray-900 dark:text-white py-28 px-6 relative overflow-hidden transition-colors duration-300"
    >
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl mix-blend-overlay" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl mix-blend-overlay" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="projects-title text-4xl md:text-6xl font-bold text-center mb-20 bg-gradient-to-r from-gray-900 to-gray-500 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
          {t.title} <span className="text-blue-500">{t.titleHighlight}</span>
        </h2>

        <div className="projects-grid grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl mx-auto">
          {projects.map((project, index) => {
            const IconComponent = projectIcons[index] || CheckSquareSVG;
            const projectT = t[project.titleKey];
            return (
              <div
                key={index}
                className="project-card group relative bg-white dark:bg-neutral-900 rounded-xl overflow-hidden border border-gray-200 dark:border-white/10 hover:border-blue-300 dark:hover:border-blue-500/30 transition-all duration-300 shadow-lg hover:shadow-blue-500/10 dark:hover:shadow-blue-500/20 hover:-translate-y-1 p-6 flex flex-col justify-between"
              >
                {/* Icon */}
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-blue-50 dark:bg-blue-500/10 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                    <IconComponent />
                  </div>
                </div>

                {/* Content */}
                <div className="text-center flex-1">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-500 transition-colors">
                    {projectT.title}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                    {projectT.description}
                  </p>
                </div>

                {/* Tech badges with SVG icons */}
                <div className="flex gap-2 mt-4 mb-4 flex-wrap justify-center">
                  {project.techs.map((tech, i) => {
                    const iconFile = techIconMap[tech];
                    return (
                      <div
                        key={i}
                        className="tech-icon-badge flex items-center gap-1.5 px-2.5 py-1.5 bg-gray-100 dark:bg-neutral-800 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-500/10 hover:scale-105 transition-all duration-200 cursor-default"
                      >
                        {iconFile && (
                          <Image
                            src={`/images/stack/${iconFile}.svg`}
                            alt={tech}
                            width={16}
                            height={16}
                            className="w-4 h-4 flex-shrink-0"
                          />
                        )}
                        <span className="text-xs text-gray-700 dark:text-white font-medium">
                          {tech}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Buttons */}
                <div className="flex gap-3 justify-center mt-auto">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 max-w-[200px] text-center bg-blue-600 hover:bg-blue-500 transition px-4 py-2 rounded-lg text-white text-sm font-medium"
                  >
                    {t.viewProject}
                  </a>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-10 bg-gray-100 dark:bg-neutral-800 hover:bg-gray-200 dark:hover:bg-neutral-700 transition px-2 py-2 rounded-lg text-gray-700 dark:text-white"
                      aria-label="Code source GitHub"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                        <path d="M9 18c-4.51 2-5-2-7-2" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { FiExternalLink } from "react-icons/fi";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";
import { observeScrollProgress } from "@/components/ScrollMotion";

/* Tech name → SVG file mapping */
// Only real logos: techs without one render as a text badge
const techIconMap: Record<string, string> = {
  MongoDB: "mongodb",
  "React (Vite)": "react",
  "Node.js": "nodejs",
  Express: "express",
  PHP: "php",
  MySQL: "mysql",
  "HTML/CSS": "html",
  Bootstrap: "bootstrap",
  "Bootstrap 5": "bootstrap",
  Git: "git",
  Symfony: "symfony",
  "Tailwind CSS": "tail",
  Tailwind: "tail",
  "Next.js": "nextjs",
  TypeScript: "ts",
  Prisma: "prisma",
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

function UsersSVG() {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function GraduationCapSVG() {
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
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c0 2 4 3 6 3s6-1 6-3v-5" />
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

const projectIcons = {
  daip: GraduationCapSVG,
  daikin: UsersSVG,
  multiNettoyage: BuildingSVG,
  ecommerce: ShoppingCartSVG,
  etatCivil: FileTextSVG,
  blog: BookOpenSVG,
  taskManager: CheckSquareSVG,
};

type ProjectKey = keyof typeof projectIcons;

type Project = {
  titleKey: ProjectKey;
  techs: string[];
  /** live site, when it is publicly reachable */
  link: string | null;
  github: string | null;
  /** screenshot of the live site */
  image?: string;
  /** natural height of the (tall) screenshot at 1000px wide */
  imageHeight?: number;
};

const projects: Project[] = [
  {
    titleKey: "daip",
    techs: ["PHP", "Symfony", "Doctrine ORM", "Twig", "Bootstrap 5", "Git"],
    link: "https://1jeune1metier.daip.ci",
    github: null,
    image: "/images/projects/1jeune1metier-tall.webp",
    imageHeight: 1500,
  },
  {
    titleKey: "daikin",
    techs: ["PHP", "Symfony", "Twig", "Bootstrap 5", "Git"],
    link: "https://daip.ci/daikin/recrutement",
    github: null,
    image: "/images/projects/daikin-tall.webp",
    imageHeight: 1500,
  },
  {
    titleKey: "multiNettoyage",
    techs: ["PHP", "Symfony", "Doctrine ORM", "MySQL", "Twig", "DomPDF", "SMTP", "Git"],
    link: "https://multi-nettoyage94.fr/",
    github: null,
    image: "/images/projects/multi-nettoyage-tall.webp",
    imageHeight: 1500,
  },
  {
    titleKey: "ecommerce",
    techs: ["React (Vite)", "Node.js", "Express", "MongoDB", "JWT", "Cloudinary", "Vercel", "Render"],
    link: "https://ecommerce-finaly.vercel.app/",
    github: "https://github.com/12KOFFI/PROJET-ECOMMERCE",
    image: "/images/projects/ecommerce-tall.webp",
    imageHeight: 701,
  },
  {
    titleKey: "etatCivil",
    techs: ["PHP", "MySQL", "HTML/CSS", "Bootstrap", "Git"],
    link: null,
    github: "https://github.com/12KOFFI/etatcivil",
  },
  {
    titleKey: "blog",
    techs: ["PHP", "Symfony", "Twig", "Tailwind CSS", "MySQL", "Git"],
    link: null,
    github: "https://github.com/12KOFFI/MyBlog",
  },
  {
    titleKey: "taskManager",
    techs: ["Next.js", "Tailwind", "TypeScript", "MySQL", "Prisma"],
    link: null,
    github: "https://github.com/12KOFFI/TODO-APP-FULL-STACK",
  },
];

const featured = projects.filter((p) => p.image);
const others = projects.filter((p) => !p.image);

const FOCUS_RING =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500";

function GithubIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function TechBadges({ techs, max }: { techs: string[]; max?: number }) {
  const shown = max ? techs.slice(0, max) : techs;
  const hidden = techs.length - shown.length;
  return (
    <ul className="flex flex-wrap gap-1.5">
      {shown.map((tech) => {
        const iconFile = techIconMap[tech];
        return (
          <li
            key={tech}
            className="flex items-center gap-1.5 rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 dark:bg-white/[0.06] dark:text-gray-200"
          >
            {iconFile && (
              <Image
                src={`/images/stack/${iconFile}.svg`}
                alt=""
                width={14}
                height={14}
                className={`h-3.5 w-3.5 flex-shrink-0 ${iconFile === "express" ? "dark:invert" : ""}`}
              />
            )}
            {tech}
          </li>
        );
      })}
      {hidden > 0 && (
        <li
          title={techs.slice(shown.length).join(", ")}
          className="rounded-md px-1.5 py-1 text-xs font-medium tabular-nums text-gray-500 dark:text-gray-400"
        >
          <span aria-hidden="true">+{hidden}</span>
          <span className="sr-only">{techs.slice(shown.length).join(", ")}</span>
        </li>
      )}
    </ul>
  );
}

const hostOf = (url: string) => new URL(url).host.replace(/^www\./, "");

type ProjectsCopy = (typeof translations)[keyof typeof translations]["projects"];

/** Screenshot inside a slim browser frame: shows it's a live site and where it lives */
function BrowserShot({
  project,
  title,
  priority,
  sizes,
}: {
  project: Project;
  title: string;
  priority: boolean;
  sizes: string;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  // The site scrolls inside its frame as the page scrolls: a live preview
  // that shows more of the project than a static crop.
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    return observeScrollProgress(frame, () => {
      const img = imgRef.current;
      if (!img) return;
      const travel = img.offsetHeight - frame.clientHeight;
      if (travel <= 0) return;
      // From the moment the frame enters (or from the top of the page if it's
      // already visible) until it leaves: always starts on the site's header.
      const r = frame.getBoundingClientRect();
      const absTop = r.top + window.scrollY;
      const start = Math.max(0, absTop - window.innerHeight);
      const end = absTop + r.height;
      const q = Math.min(1, Math.max(0, (window.scrollY - start) / (end - start)));
      const eased = q * q * (3 - 2 * q); // smoothstep: settles at both ends
      img.style.transform = `translate3d(0, ${(-travel * eased).toFixed(1)}px, 0)`;
    });
  }, []);

  return (
    <a
      href={project.link!}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={-1}
      aria-hidden="true"
      title={title}
      className="flex h-full flex-col"
    >
      <div className="flex items-center gap-2.5 border-b border-gray-200 bg-gray-50 px-3 py-2 dark:border-white/10 dark:bg-neutral-800/60">
        <span className="flex gap-1">
          <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
          <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
          <span className="h-2 w-2 rounded-full bg-[#28c840]" />
        </span>
        <span className="flex-1 truncate rounded bg-white px-2 py-0.5 text-center text-[11px] text-gray-500 ring-1 ring-gray-200 dark:bg-neutral-900 dark:text-gray-400 dark:ring-white/10">
          {hostOf(project.link!)}
        </span>
      </div>
      <div
        ref={frameRef}
        className="relative aspect-[16/10] flex-1 overflow-hidden bg-gray-100 dark:bg-neutral-800"
      >
        <Image
          ref={imgRef}
          src={project.image!}
          alt=""
          width={1000}
          height={project.imageHeight ?? 625}
          priority={priority}
          sizes={sizes}
          className="absolute inset-x-0 top-0 h-auto w-full will-change-transform"
        />
      </div>
    </a>
  );
}

function ProjectActions({
  project,
  title,
  t,
  pinBottom = true,
}: {
  project: Project;
  title: string;
  t: ProjectsCopy;
  pinBottom?: boolean;
}) {
  return (
    <div className={`flex items-center gap-2.5 pt-1 ${pinBottom ? "mt-auto" : ""}`}>
      <a
        href={project.link!}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${t.viewProject} : ${title}`}
        className={`inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-blue-700 pointer-coarse:min-h-11 ${FOCUS_RING}`}
      >
        {t.viewProject}
        <FiExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
      </a>
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${t.sourceCode} : ${title}`}
          className={`inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-700 transition-colors duration-200 hover:border-gray-400 hover:text-gray-900 dark:border-white/15 dark:text-gray-200 dark:hover:border-white/40 dark:hover:text-white pointer-coarse:h-11 pointer-coarse:w-11 ${FOCUS_RING}`}
        >
          <GithubIcon className="h-4 w-4" />
        </a>
      )}
    </div>
  );
}

const CARD =
  "group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/10 dark:border-white/10 dark:bg-neutral-900 dark:hover:border-blue-500/40";

export default function Projects() {
  const { lang } = useLanguage();
  const t = translations[lang].projects;

  return (
    <section className="relative overflow-hidden bg-white px-4 py-20 text-gray-900 transition-colors duration-300 dark:bg-neutral-950 dark:text-white sm:px-6">
      <div className="relative z-10 mx-auto max-w-6xl">
        <h2 className="hero-reveal mb-14 text-center text-4xl font-bold tracking-tight text-balance md:mb-20 md:text-6xl">
          {t.title} <span className="text-blue-600 dark:text-blue-400">{t.titleHighlight}</span>
        </h2>

        {/* Featured: live sites with a real screenshot.
            The national platform leads (full-width, horizontal); the others sit compact on one row. */}
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, index) => {
            const copy = t[project.titleKey];
            const lead = index === 0;

            if (lead) {
              return (
                <li
                  key={project.titleKey}
                  className={`${CARD} hero-reveal grid md:col-span-2 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:col-span-3 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]`}
                  style={{ "--d": "0ms" } as React.CSSProperties}
                >
                  <div className="border-b border-gray-200 dark:border-white/10 md:border-b-0 md:border-r">
                    <BrowserShot
                      project={project}
                      title={copy.title}
                      priority
                      sizes="(min-width: 1152px) 600px, (min-width: 768px) 55vw, 100vw"
                    />
                  </div>
                  <div className="flex flex-col justify-center gap-4 p-6 lg:p-10">
                    <h3 className="text-2xl font-bold tracking-tight text-balance">{copy.title}</h3>
                    <p className="text-[15px] leading-relaxed text-gray-600 dark:text-gray-400">
                      {copy.description}
                    </p>
                    <TechBadges techs={project.techs} />
                    <ProjectActions project={project} title={copy.title} t={t} pinBottom={false} />
                  </div>
                </li>
              );
            }

            return (
              <li
                key={project.titleKey}
                // tablet (2 cols): center the odd card out instead of leaving a hole
                data-reveal="up"
                className={`${CARD} flex flex-col md:last:col-span-2 md:last:mx-auto md:last:w-[calc(50%-0.75rem)] lg:last:col-span-1 lg:last:mx-0 lg:last:w-auto`}
                style={{ animationDelay: `${(index - 1) * 50}ms` }}
              >
                <div className="border-b border-gray-200 dark:border-white/10">
                  <BrowserShot
                    project={project}
                    title={copy.title}
                    priority={false}
                    sizes="(min-width: 1152px) 368px, (min-width: 768px) 50vw, 100vw"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <h3 className="text-lg font-bold leading-snug text-balance">{copy.title}</h3>
                  {/* visually clamped; assistive tech still reads the full text */}
                  <p className="line-clamp-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                    {copy.description}
                  </p>
                  <TechBadges techs={project.techs} max={3} />
                  <ProjectActions project={project} title={copy.title} t={t} />
                </div>
              </li>
            );
          })}
        </ul>

        {/* Other projects: no public preview, so a compact list instead of empty cards */}
        <h3 data-reveal="heading" className="mb-5 mt-16 text-2xl font-bold">
          {t.otherProjects}
        </h3>
        <ul data-reveal="stagger" className="divide-y divide-gray-200 overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 dark:divide-white/10 dark:border-white/10 dark:bg-neutral-900">
          {others.map((project) => {
            const copy = t[project.titleKey];
            const Icon = projectIcons[project.titleKey];
            return (
              <li
                key={project.titleKey}
                className="grid gap-4 p-5 sm:grid-cols-[auto_1fr_auto] sm:items-start sm:gap-6 sm:p-6"
              >
                <div className="hidden h-12 w-12 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-500/10 sm:flex [&_svg]:h-6 [&_svg]:w-6">
                  <Icon />
                </div>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-bold">{copy.title}</h4>
                    <p className="mt-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                      {copy.description}
                    </p>
                  </div>
                  <TechBadges techs={project.techs} />
                </div>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${t.sourceCode} : ${copy.title}`}
                    className={`inline-flex items-center gap-2 self-start rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-800 transition-colors duration-200 hover:border-gray-500 dark:border-white/15 dark:bg-transparent dark:text-gray-100 dark:hover:border-white/40 ${FOCUS_RING}`}
                  >
                    <GithubIcon className="h-4 w-4" />
                    {t.sourceCode}
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

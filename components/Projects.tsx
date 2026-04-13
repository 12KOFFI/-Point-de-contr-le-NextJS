"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import { ShoppingCart, FileText, BookOpen, CheckSquare } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

export default function Projects() {
  const { lang } = useLanguage();
  const t = translations[lang].projects;

  const projects = [
    {
      titleKey: "ecommerce" as const,
      icon: ShoppingCart,
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
      titleKey: "etatCivil" as const,
      icon: FileText,
      techs: ["PHP", "MySQL", "HTML/CSS", "Bootstrap", "WampServer", "Git"],
      link: "https://github.com/12KOFFI/etatcivil",
      github: "https://github.com/12KOFFI/etatcivil",
    },
    {
      titleKey: "blog" as const,
      icon: BookOpen,
      techs: ["PHP", "Symfony", "Tailwind CSS", "MySQL", "Git"],
      link: "#",
      github: "#",
    },
    {
      titleKey: "taskManager" as const,
      icon: CheckSquare,
      techs: ["Next.js", "Tailwind", "TypeScript", "MySQL", "Prisma"],
      link: "https://github.com/12KOFFI/TODO-APP-FULL-STACK",
      github: "https://github.com/12KOFFI/TODO-APP-FULL-STACK",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="projects"
      className="bg-gray-50 dark:bg-neutral-950 text-gray-900 dark:text-white py-28 px-6 relative overflow-hidden transition-colors duration-300"
    >
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl mix-blend-overlay"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl mix-blend-overlay"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <LazyMotion features={domAnimation}>
          <m.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-4xl md:text-6xl font-bold text-center mb-20 bg-gradient-to-r from-gray-900 to-gray-500 dark:from-white dark:to-gray-400 bg-clip-text text-transparent"
          >
            {t.title} <span className="text-blue-500">{t.titleHighlight}</span>
          </m.h2>

          <m.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col items-center"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl mx-auto justify-center">
              {projects.map((project, index) => {
                const Icon = project.icon;
                const projectT = t[project.titleKey];
                return (
                  <m.div
                    key={index}
                    variants={item}
                    whileHover={{ y: -10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="group relative bg-white dark:bg-neutral-900 rounded-xl overflow-hidden border border-gray-200 dark:border-white/10 hover:border-blue-300 dark:hover:border-pink-500/30 transition-all duration-500 shadow-lg hover:shadow-blue-500/10 dark:hover:shadow-pink-500/20 p-6 flex flex-col justify-between"
                  >
                    <div className="flex justify-center mb-4">
                      <Icon className="w-14 h-14 text-blue-500 group-hover:scale-110 transition-transform duration-300" />
                    </div>

                    <div className="text-center flex-1">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-blue-500 transition-colors">
                        {projectT.title}
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                        {projectT.description}
                      </p>
                    </div>

                    <div className="flex gap-2 mt-4 mb-4 flex-wrap justify-center">
                      {project.techs.map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-gray-100 dark:bg-neutral-800 text-xs rounded-lg text-gray-700 dark:text-white font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-3 justify-center mt-auto">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 max-w-[200px] text-center bg-blue-600 hover:bg-blue-500 transition px-4 py-2 rounded-lg text-white text-sm font-medium"
                      >
                        {t.viewProject}
                      </a>
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
                          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                          <path d="M9 18c-4.51 2-5-2-7-2"></path>
                        </svg>
                      </a>
                    </div>
                  </m.div>
                );
              })}
            </div>
          </m.div>
        </LazyMotion>
      </div>
    </section>
  );
}

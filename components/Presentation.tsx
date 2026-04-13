"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

const skillBlocks = [
  {
    key: "frontend" as const,
    techs: ["React.js", "Next.js", "Tailwind CSS", "Bootstrap 5"],
    color: "from-blue-500 to-cyan-400",
    borderColor: "border-blue-500/30 hover:border-blue-500/60",
    shadowColor: "hover:shadow-blue-500/20",
  },
  {
    key: "backend" as const,
    techs: ["PHP / Symfony", "Node.js / Express"],
    color: "from-purple-500 to-pink-400",
    borderColor: "border-purple-500/30 hover:border-purple-500/60",
    shadowColor: "hover:shadow-purple-500/20",
  },
  {
    key: "database" as const,
    techs: ["MySQL", "MongoDB", "Git", "Postman", "WampServer"],
    color: "from-green-500 to-emerald-400",
    borderColor: "border-green-500/30 hover:border-green-500/60",
    shadowColor: "hover:shadow-green-500/20",
  },
];

export default function Presentation() {
  const { lang } = useLanguage();
  const t = translations[lang].presentation;

  return (
    <section className="bg-gray-50 dark:bg-black text-gray-900 dark:text-white px-4 sm:px-6 lg:px-8 py-16 md:py-24 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <LazyMotion features={domAnimation}>
          <m.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-500 mb-12 md:mb-16 text-center"
          >
            {t.title}
          </m.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
            {skillBlocks.map((block, i) => (
              <m.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className={`bg-white dark:bg-[#111] border ${block.borderColor} rounded-xl md:rounded-2xl p-6 sm:p-8 flex flex-col gap-4 sm:gap-6 h-full group shadow-lg ${block.shadowColor} transition-all duration-300`}
              >
                <h3
                  className={`text-lg sm:text-xl font-bold text-center bg-gradient-to-r ${block.color} bg-clip-text text-transparent`}
                >
                  {t[block.key]}
                </h3>

                <div className="flex flex-wrap gap-2 justify-center">
                  {block.techs.map((tech, j) => (
                    <span
                      key={j}
                      className="px-3 py-1.5 bg-gray-100 dark:bg-white/10 text-gray-800 dark:text-white text-sm rounded-lg font-medium transition-colors hover:bg-gray-200 dark:hover:bg-white/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </m.div>
            ))}
          </div>
        </LazyMotion>
      </div>
    </section>
  );
}

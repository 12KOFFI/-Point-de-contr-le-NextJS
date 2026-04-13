"use client";

import React from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";
import { FiBriefcase, FiBookOpen } from "react-icons/fi";

export default function Experience() {
  const { lang } = useLanguage();
  const t = translations[lang].experiences;

  const experiences = [
    {
      ...t.freelance,
      showStack: true,
    },
    {
      ...t.intern,
      showStack: false,
    },
  ];

  return (
    <section className="bg-white dark:bg-neutral-950 text-gray-900 dark:text-white py-20 px-4 sm:px-6 transition-colors duration-300 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden opacity-5 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Title */}
        <LazyMotion features={domAnimation}>
          <m.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold text-center mb-20 bg-gradient-to-r from-gray-900 to-gray-500 dark:from-white dark:to-gray-400 bg-clip-text text-transparent"
          >
            {t.title} <span className="text-blue-500">{t.titleHighlight}</span>
          </m.h2>

          {/* Experiences Section */}
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-10">
              <FiBriefcase className="text-blue-500 w-6 h-6" />
              <h3 className="text-2xl font-bold">{t.experienceTitle}</h3>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 md:left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500"></div>

              <div className="space-y-10">
                {experiences.map((exp, index) => (
                  <m.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className="relative pl-12 md:pl-16"
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-2 md:left-4 top-2 w-4 h-4 rounded-full bg-blue-500 border-4 border-white dark:border-neutral-950 shadow-lg shadow-blue-500/30"></div>

                    <div className="bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-white/10 rounded-xl p-6 hover:border-blue-300 dark:hover:border-blue-500/30 transition-all shadow-lg">
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
                                  className="px-2 py-1 bg-gray-100 dark:bg-white/10 text-xs rounded-md text-gray-700 dark:text-white font-medium"
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
                  </m.div>
                ))}
              </div>
            </div>
          </div>

          {/* Education Section */}
          <div>
            <div className="flex items-center gap-3 mb-10">
              <FiBookOpen className="text-purple-500 w-6 h-6" />
              <h3 className="text-2xl font-bold">{t.educationTitle}</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {t.education.map((edu, index) => (
                <m.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-white/10 rounded-xl p-5 hover:border-purple-300 dark:hover:border-purple-500/30 transition-all shadow-md"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium px-2 py-1 bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 rounded-full">
                      {edu.period}
                    </span>
                  </div>
                  <h4 className="text-base font-bold mb-1">{edu.title}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {edu.school}
                  </p>
                </m.div>
              ))}
            </div>
          </div>
        </LazyMotion>
      </div>
    </section>
  );
}

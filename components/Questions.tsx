"use client";

import React from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

export default function Questions() {
  const { lang } = useLanguage();
  const t = translations[lang].questions;

  return (
    <section className="py-20 px-6 bg-gray-50 dark:bg-neutral-950 text-gray-900 dark:text-white transition-colors duration-300">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">{t.title}</h2>
        <p className="text-gray-500 dark:text-gray-400">{t.subtitle}</p>
      </div>

      <LazyMotion features={domAnimation}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {t.items.map((item, index) => (
            <m.div
              key={index}
              className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-white/5 rounded-2xl p-6 text-left shadow-md hover:shadow-xl transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {item.desc}
              </p>
            </m.div>
          ))}
        </div>
      </LazyMotion>
    </section>
  );
}

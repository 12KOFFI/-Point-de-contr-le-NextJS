"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

function StarSVG() {
  return (
    <svg
      className="question-icon w-6 h-6 text-blue-500"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function RocketSVG() {
  return (
    <svg
      className="question-icon w-6 h-6 text-purple-500"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}

function PaletteSVG() {
  return (
    <svg
      className="question-icon w-6 h-6 text-green-500"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="13.5" cy="6.5" r=".5" />
      <circle cx="17.5" cy="10.5" r=".5" />
      <circle cx="8.5" cy="7.5" r=".5" />
      <circle cx="6.5" cy="12.5" r=".5" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
    </svg>
  );
}

const questionIcons = [StarSVG, RocketSVG, PaletteSVG];

export default function Questions() {
  const { lang } = useLanguage();
  const t = translations[lang].questions;
  return (
    <section
      className="py-20 px-6 bg-gray-50 dark:bg-neutral-950 text-gray-900 dark:text-white transition-colors duration-300"
    >
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h2 data-reveal="heading" className="text-4xl font-bold tracking-tight text-balance mb-4">
          {t.title}
        </h2>
        <p data-reveal="up" className="text-gray-500 dark:text-gray-400">
          {t.subtitle}
        </p>
      </div>

      <div data-reveal="stagger" className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {t.items.map((item, index) => {
          const IconComponent = questionIcons[index] || StarSVG;
          return (
            <div
              key={index}
              className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-white/5 rounded-2xl p-6 text-left shadow-md hover:shadow-xl hover:-translate-y-1 transition-[box-shadow,translate] duration-300 group"
            >
              <div className="mb-4 p-2 w-fit bg-gray-50 dark:bg-white/5 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <IconComponent />
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

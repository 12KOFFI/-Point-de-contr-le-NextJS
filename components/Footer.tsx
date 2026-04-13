"use client";

import React from "react";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { lang } = useLanguage();
  const t = translations[lang].footer;
  const navT = translations[lang].nav;
  const contactT = translations[lang].contact;

  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/12KOFFI",
      icon: <FaGithub className="w-4 h-4" />,
    },
    {
      name: "LinkedIn",
      url: "https://urlz.fr/urkU",
      icon: <FaLinkedin className="w-4 h-4" />,
    },
  ];

  const navLinks = [
    { name: navT.home, path: "/" },
    { name: navT.about, path: "/apropos" },
    { name: navT.projects, path: "/projets" },
    { name: navT.experiences, path: "/experiences" },
    { name: navT.contact, path: "/contact" },
  ];

  return (
    <footer className="border-t border-gray-200 bg-[linear-gradient(180deg,_#f8fafc_0%,_#eef4ff_100%)] text-gray-900 transition-colors duration-300 dark:border-white/10 dark:bg-[linear-gradient(180deg,_#020617_0%,_#0b1120_100%)] dark:text-white">
      <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 sm:py-14">
        <div className="rounded-3xl border border-gray-200/80 bg-white/80 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-md dark:border-white/10 dark:bg-white/5 dark:shadow-[0_20px_60px_rgba(0,0,0,0.25)] sm:p-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.3fr_1fr_1fr]">
            <div className="text-center lg:text-left">
              <p className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-blue-700 dark:border-blue-400/20 dark:bg-blue-500/10 dark:text-blue-300">
                {contactT.cta}
              </p>
              <h3 className="mt-4 text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                {t.brand}
              </h3>
              <p className="mt-3 max-w-md text-sm leading-7 text-gray-600 dark:text-gray-300">
                {t.tagline}
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-3 lg:justify-start">
                <Link
                  href="/contact"
                  className="rounded-full bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-600 dark:bg-white dark:text-gray-900 dark:hover:bg-blue-100"
                >
                  {contactT.sendEmail}
                </Link>
                <span className="rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-600 dark:border-white/10 dark:bg-white/5 dark:text-gray-300">
                  {contactT.locationValue}
                </span>
              </div>
            </div>

            <div className="text-center lg:text-left">
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-300">
                {t.navigation}
              </h4>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.name} className="text-center lg:text-left">
                    <Link
                      href={link.path}
                      className="text-sm text-gray-600 transition-colors hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center lg:text-left">
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-300">
                {t.social}
              </h4>
              <div className="flex flex-col gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 transition-all hover:-translate-y-0.5 hover:border-blue-300 hover:text-blue-600 dark:border-white/10 dark:bg-white/5 dark:text-gray-200 dark:hover:border-blue-400/30 dark:hover:text-blue-300 lg:justify-start"
                    aria-label={social.name}
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-800 shadow-sm dark:bg-white/10 dark:text-white">
                      {social.icon}
                    </span>
                    <span>{social.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-gray-200 pt-6 text-center text-xs text-gray-500 dark:border-white/10 dark:text-gray-400 sm:flex-row sm:items-center sm:justify-between sm:text-sm">
            <p>
              &copy; {currentYear} Isaac Koffi. {t.rights}
            </p>
           
          </div>
        </div>
      </div>
    </footer>
  );
}

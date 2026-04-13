"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import clsx from "clsx";
import { FiMenu, FiX, FiSun, FiMoon, FiGlobe } from "react-icons/fi";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLang } = useLanguage();
  const t = translations[lang].nav;

  const links = [
    { name: t.home, path: "/" },
    { name: t.about, path: "/apropos" },
    { name: t.projects, path: "/projets" },
    { name: t.experiences, path: "/experiences" },
    { name: t.contact, path: "/contact" },
  ];

  return (
    <header className="fixed top-0 w-full z-50 backdrop-blur bg-white/80 dark:bg-black/50 border-b border-gray-200 dark:border-white/10 transition-colors duration-300">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
        >
          Isaac K.
        </Link>

        {/* Menu Desktop */}
        <ul className="hidden lg:flex space-x-4 xl:space-x-6 text-sm font-medium">
          {links.map((link) => (
            <li key={link.path}>
              <Link
                href={link.path}
                className={clsx(
                  "transition-colors hover:text-blue-500 px-2 py-1",
                  pathname === link.path
                    ? "text-blue-500"
                    : "text-gray-700 dark:text-white",
                )}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Actions: Theme + Lang + Mobile Menu */}
        <div className="flex items-center gap-2">
          {/* Language Toggle */}
          <button
            onClick={toggleLang}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-sm font-medium bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-white/20 transition-colors"
            aria-label="Changer la langue"
          >
            <FiGlobe size={16} />
            <span className="uppercase text-xs font-bold">{lang}</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-white/20 transition-colors"
            aria-label="Changer le thème"
          >
            {theme === "dark" ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>

          {/* Bouton Menu Mobile */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Menu Mobile */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 dark:bg-black/95 backdrop-blur-lg border-t border-gray-200 dark:border-white/10 transition-colors">
            <ul className="flex flex-col space-y-2 p-4">
              {links.map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className={clsx(
                      "block transition-colors hover:text-blue-600 px-4 py-3 rounded-lg",
                      pathname === link.path
                        ? "text-blue-500 bg-blue-50 dark:bg-white/10"
                        : "text-gray-700 dark:text-white",
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { FiMenu, FiX, FiSun, FiMoon, FiGlobe } from "react-icons/fi";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLang } = useLanguage();
  const t = translations[lang].nav;
  const headerCopy =
    lang === "fr"
      ? {
          badge: "Portfolio",
          menuLabel: "Menu principal",
          langLabel: "Changer la langue",
          themeLabel: "Changer le thème",
        }
      : {
          badge: "Portfolio",
          menuLabel: "Main menu",
          langLabel: "Change language",
          themeLabel: "Change theme",
        };

  const links = [
    { name: t.home, path: "/" },
    { name: t.about, path: "/apropos" },
    { name: t.projects, path: "/projets" },
    { name: t.experiences, path: "/experiences" },
    { name: t.contact, path: "/contact" },
  ];

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > 16);

      if (currentScrollY <= 24) {
        setIsHeaderVisible(true);
      } else if (!mobileMenuOpen) {
        setIsHeaderVisible(currentScrollY < lastScrollY);
      }

      lastScrollY = currentScrollY;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileMenuOpen]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      setIsHeaderVisible(true);
    }
  }, [mobileMenuOpen]);

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 px-3 pt-3 transition-transform duration-300 ease-out sm:px-5 sm:pt-4",
        isHeaderVisible ? "translate-y-0" : "-translate-y-[120%]",
      )}
    >
      <div
        className={clsx(
          "mx-auto max-w-7xl rounded-[1.75rem] border transition-all duration-300",
          isScrolled
            ? "border-white/50 bg-white/78 shadow-[0_18px_55px_rgba(15,23,42,0.12)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/72"
            : "border-white/35 bg-white/62 shadow-[0_10px_35px_rgba(15,23,42,0.08)] backdrop-blur-lg dark:border-white/10 dark:bg-slate-950/55",
        )}
      >
        <nav className="relative flex items-center justify-between px-4 py-3 sm:px-5 sm:py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-cyan-500 to-purple-500 text-sm font-black text-white shadow-lg shadow-blue-500/25">
              IK
            </div>
            <div className="hidden sm:block">
              <p className="text-base font-bold text-slate-900 dark:text-white">
                Isaac K.
              </p>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                {headerCopy.badge}
              </p>
            </div>
          </Link>

          <div className="hidden lg:flex lg:items-center lg:gap-3">
            <ul className="flex items-center gap-1 rounded-full border border-slate-200/80 bg-white/72 px-2 py-2 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/5">
              {links.map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className={clsx(
                      "rounded-full px-4 py-2 text-sm font-medium transition-all duration-300",
                      pathname === link.path
                        ? "bg-slate-900 text-white shadow-md dark:bg-white dark:text-slate-900"
                        : "text-slate-600 hover:bg-slate-100 hover:text-blue-600 dark:text-slate-200 dark:hover:bg-white/10 dark:hover:text-blue-300",
                    )}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/72 p-2 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/5">
              <button
                onClick={toggleLang}
                className="flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 dark:text-white dark:hover:bg-white/10"
                aria-label={headerCopy.langLabel}
              >
                <FiGlobe size={16} />
                <span className="uppercase text-xs tracking-[0.2em]">
                  {lang}
                </span>
              </button>

              <button
                onClick={toggleTheme}
                className="rounded-full p-2.5 text-slate-700 transition-colors hover:bg-slate-100 dark:text-white dark:hover:bg-white/10"
                aria-label={headerCopy.themeLabel}
              >
                {theme === "dark" ? <FiSun size={18} /> : <FiMoon size={18} />}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={toggleLang}
              className="flex items-center gap-1 rounded-full border border-slate-200/80 bg-white/72 px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur-md transition-colors hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
              aria-label={headerCopy.langLabel}
            >
              <FiGlobe size={15} />
              <span className="uppercase text-[11px] tracking-[0.2em]">
                {lang}
              </span>
            </button>

            <button
              onClick={toggleTheme}
              className="rounded-full border border-slate-200/80 bg-white/72 p-2.5 text-slate-700 shadow-sm backdrop-blur-md transition-colors hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
              aria-label={headerCopy.themeLabel}
            >
              {theme === "dark" ? <FiSun size={18} /> : <FiMoon size={18} />}
            </button>

            <button
              className="rounded-full border border-slate-200/80 bg-white/72 p-2.5 text-slate-700 shadow-sm backdrop-blur-md transition-colors hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={headerCopy.menuLabel}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="absolute left-0 right-0 top-[calc(100%+0.75rem)] lg:hidden">
              <div className="overflow-hidden rounded-[1.75rem] border border-white/50 bg-white/90 p-4 shadow-[0_18px_55px_rgba(15,23,42,0.16)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/88">
                <ul className="flex flex-col gap-2">
                  {links.map((link) => (
                    <li key={link.path}>
                      <Link
                        href={link.path}
                        className={clsx(
                          "flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-300",
                          pathname === link.path
                            ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                            : "text-slate-700 hover:bg-slate-100 hover:text-blue-600 dark:text-white dark:hover:bg-white/10 dark:hover:text-blue-300",
                        )}
                      >
                        <span>{link.name}</span>
                        {pathname === link.path && (
                          <span className="h-2.5 w-2.5 rounded-full bg-blue-400 dark:bg-blue-500" />
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

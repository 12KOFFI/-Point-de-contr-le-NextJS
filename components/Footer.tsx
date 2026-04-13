'use client';

import React from 'react';
import Link from 'next/link';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { lang } = useLanguage();
  const t = translations[lang].footer;
  const navT = translations[lang].nav;

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/12KOFFI', icon: <FaGithub className="w-4 h-4" /> },
    { name: 'LinkedIn', url: 'https://urlz.fr/urkU', icon: <FaLinkedin className="w-4 h-4" /> },
  ];

  const navLinks = [
    { name: navT.home, path: '/' },
    { name: navT.about, path: '/apropos' },
    { name: navT.projects, path: '/projets' },
    { name: navT.experiences, path: '/experiences' },
    { name: navT.contact, path: '/contact' },
  ];

  return (
    <footer className="bg-gray-50 dark:bg-neutral-950 text-gray-900 dark:text-white border-t border-gray-200 dark:border-white/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              {t.brand}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
              {t.tagline}
            </p>
          </div>

          {/* Navigation */}
          <div className="text-center md:text-left">
            <h4 className="font-semibold text-lg mb-4 text-gray-700 dark:text-gray-200">{t.navigation}</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.name} className="text-center md:text-left">
                  <Link
                    href={link.path}
                    className="text-gray-500 dark:text-gray-400 hover:text-blue-500 text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="text-center md:text-left">
            <h4 className="font-semibold text-lg mb-4 text-gray-700 dark:text-gray-200">{t.social}</h4>
            <ul className="space-y-2">
              {socialLinks.map((social) => (
                <li key={social.name} className="text-center md:text-left">
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 dark:text-gray-400 hover:text-blue-500 text-sm flex items-center justify-center md:justify-start gap-2 transition-colors"
                    aria-label={social.name}
                  >
                    {social.icon}
                    {social.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 dark:border-white/10 mt-8 sm:mt-12 pt-6 text-center">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            &copy; {currentYear} Isaac Koffi. {t.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}

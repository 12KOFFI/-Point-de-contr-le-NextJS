'use client';

import React from 'react';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';

const contactInfo = [
  {
    key: 'email',
    icon: FiMail,
    value: 'isaacndri5@gmail.com',
    href: 'mailto:isaacndri5@gmail.com',
  },
  {
    key: 'phone',
    icon: FiPhone,
    value: '+225 01-41-38-25-95',
    href: 'tel:+2250141382595',
  },
  {
    key: 'linkedin',
    icon: FaLinkedin,
    value: 'LinkedIn',
    href: 'https://urlz.fr/urkU',
  },
  {
    key: 'github',
    icon: FaGithub,
    value: 'github.com/12KOFFI',
    href: 'https://github.com/12KOFFI',
  },
];

export default function Contact() {
  const { lang } = useLanguage();
  const t = translations[lang].contact;

  return (
    <section
      id="contact"
      className="min-h-[60vh] flex flex-col justify-center items-center bg-white dark:bg-gray-900 px-4 py-20 transition-colors duration-300"
    >
      <div className="text-center max-w-2xl mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          {t.title}
        </h2>
        <p className="text-base sm:text-lg mb-8 text-gray-600 dark:text-gray-300">
          {t.subtitle}
        </p>
      </div>

      {/* Contact info cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl w-full mb-10">
        {contactInfo.map((info) => {
          const Icon = info.icon;
          return (
            <a
              key={info.key}
              href={info.href}
              target={info.key === 'email' || info.key === 'phone' ? undefined : '_blank'}
              rel={info.key === 'email' || info.key === 'phone' ? undefined : 'noopener noreferrer'}
              className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl hover:border-blue-300 dark:hover:border-blue-500/30 transition-all group"
            >
              <div className="p-2 bg-blue-100 dark:bg-blue-500/20 rounded-lg">
                <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                  {t[info.key as keyof typeof t]}
                </p>
                <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors">
                  {info.value}
                </p>
              </div>
            </a>
          );
        })}

        {/* Location */}
        <a
          href="#"
          className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl sm:col-span-2"
        >
          <div className="p-2 bg-blue-100 dark:bg-blue-500/20 rounded-lg">
            <FiMapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wider">
              {t.location}
            </p>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {t.locationValue}
            </p>
          </div>
        </a>
      </div>

      <a
        href="mailto:isaacndri5@gmail.com"
        className="inline-block px-6 py-3 sm:px-8 sm:py-4 bg-blue-600 hover:bg-blue-700 rounded-full text-white text-base sm:text-lg font-semibold transition-colors"
        aria-label={t.sendEmail}
      >
        {t.cta}
      </a>
    </section>
  );
}

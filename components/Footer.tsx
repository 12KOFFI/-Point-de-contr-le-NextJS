'use client';

import React from 'react';
import Link from 'next/link';
import { FaGithub, FaLinkedin, FaTwitter, FaHeart } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const socialLinks = [
    { name: 'GitHub', url: '#', icon: <FaGithub className="w-4 h-4" /> },
    { name: 'LinkedIn', url: '#', icon: <FaLinkedin className="w-4 h-4" /> },
    { name: 'Twitter', url: '#', icon: <FaTwitter className="w-4 h-4" /> }
  ];

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'À propos', path: '/apropos' },
    { name: 'Projets', path: '/projets' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <footer className="bg-neutral-950 text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Contenu principal */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Brand Section - Centré sur mobile */}
          <div className="md:col-span-3 text-center md:text-left">
            <div className="flex flex-col items-center md:items-start space-y-3">
              <h3 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                MonPortfolio
              </h3>
              <p className="text-gray-400 text-sm max-w-xs">
                Développé avec <FaHeart className="inline text-pink-500" /> en Next.js, 
                Tailwind & TypeScript
              </p>
            </div>
          </div>

          {/* Navigation - Centré sur mobile */}
          <div className="md:col-span-2 flex justify-center md:justify-start">
            <div>
              <h4 className="font-semibold text-lg mb-4 text-gray-200 text-center md:text-left">Navigation</h4>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.name} className="text-center md:text-left">
                    <Link 
                      href={link.path}
                      className="text-gray-400 hover:text-pink-500 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Social Links - Centré sur mobile */}
          <div className="md:col-span-3 flex justify-center md:justify-start">
            <div>
              <h4 className="font-semibold text-lg mb-4 text-gray-200 text-center md:text-left">Réseaux</h4>
              <ul className="space-y-2">
                {socialLinks.map((social) => (
                  <li key={social.name} className="text-center md:text-left">
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-500 text-sm flex items-center justify-center md:justify-start gap-2"
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

          {/* Newsletter - Centré sur mobile */}
          <div className="md:col-span-4">
            <div className="max-w-xs mx-auto md:mx-0">
              <h4 className="font-semibold text-lg mb-4 text-gray-200 text-center md:text-left">Newsletter</h4>
              <p className="text-gray-400 text-sm mb-3 text-center md:text-left">
                Abonnez-vous pour mes actualités
              </p>
              <form className="flex flex-col space-y-3">
                <input
                  type="email"
                  placeholder="Votre email"
                  className="bg-neutral-900 border border-white/10 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                  required
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded text-sm font-medium"
                >
                  S&apos;abonner
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Copyright - Toujours centré */}
        <div className="border-t border-white/10 mt-8 sm:mt-12 pt-6 text-center">
          <p className="text-xs text-gray-500">
            © {currentYear} MonPortfolio. Tous droits réservés. | 
            <Link href="/mentions-legales" className="hover:text-pink-500 ml-2">
              Mentions légales
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
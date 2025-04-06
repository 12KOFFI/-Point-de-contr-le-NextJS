'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import clsx from 'clsx';
import { FiMenu, FiX } from 'react-icons/fi';

const links = [
  { name: 'Accueil', path: '/' },
  { name: 'À propos', path: '/apropos' },
  { name: 'Projets', path: '/projets' },
  { name: 'Contact', path: '/contact' },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 backdrop-blur bg-black/50 border-b border-white/10">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center text-white">
        {/* Logo */}
        <div className="text-xl sm:text-2xl font-bold">MonPortfolio</div>

        {/* Menu Desktop */}
        <ul className="hidden md:flex space-x-4 lg:space-x-6 text-sm font-medium">
          {links.map((link) => (
            <li key={link.path}>
              <Link
                href={link.path}
                className={clsx(
                  'transition-colors hover:text-pink-500 px-2 py-1',
                  pathname === link.path ? 'text-pink-500' : 'text-white'
                )}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Bouton Menu Mobile */}
        <button 
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menu"
        >
          {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        {/* Menu Mobile */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-lg border-t border-white/10">
            <ul className="flex flex-col space-y-2 p-4">
              {links.map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className={clsx(
                      'block transition-colors hover:text-pink-500 px-4 py-3 rounded-lg',
                      pathname === link.path 
                        ? 'text-pink-500 bg-white/10' 
                        : 'text-white'
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
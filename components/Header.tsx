'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import clsx from 'clsx';

const links = [
  { name: 'Accueil', path: '/' },
  { name: 'À propos', path: '/apropos' },
  { name: 'Projets', path: '/projets' },
  { name: 'Contact', path: '/contact' },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 w-full z-50 backdrop-blur bg-black/50 border-b border-white/10">
      <nav className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center text-white">
        <div className="text-2xl font-bold">MonPortfolio</div>
        <ul className="flex space-x-6 text-sm font-medium">
          {links.map((link) => (
            <li key={link.path}>
              <Link
                href={link.path}
                className={clsx(
                  'transition-colors hover:text-pink-500',
                  pathname === link.path ? 'text-pink-500' : 'text-white'
                )}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

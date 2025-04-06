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
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            MonPortfolio
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Développé avec <FaHeart className="inline text-pink-500" /> en Next.js, 
            Tailwind & TypeScript. Conçu pour la performance et lélégance.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="font-semibold text-lg mb-4 text-gray-200">Navigation</h4>
          <ul className="space-y-3">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link 
                  href={link.path}
                  className="text-gray-400 hover:text-pink-500 transition-colors duration-300 flex items-center group"
                >
                  <span className="w-1 h-1 bg-pink-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h4 className="font-semibold text-lg mb-4 text-gray-200">Réseaux</h4>
          <ul className="space-y-3">
            {socialLinks.map((social) => (
              <li key={social.name}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-pink-500 transition-colors duration-300 flex items-center group"
                  aria-label={social.name}
                >
                  <span className="mr-2">{social.icon}</span>
                  {social.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="font-semibold text-lg mb-4 text-gray-200">Newsletter</h4>
          <p className="text-gray-400 text-sm mb-3">
            Abonnez-vous pour recevoir mes dernières actualités.
          </p>
          <form className="flex flex-col space-y-3">
            <input
              type="email"
              placeholder="Votre email"
              className="bg-neutral-900 border border-white/10 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
              required
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2 px-4 rounded text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Sabonner
            </button>
          </form>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10 py-6">
        <div className="max-w-7xl mx-auto px-6 text-center text-xs text-gray-500">
          <p>
            © {currentYear} MonPortfolio. Tous droits réservés. | 
            <Link href="/mentions-legales" className="hover:text-pink-500 transition-colors ml-2">
              Mentions légales
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
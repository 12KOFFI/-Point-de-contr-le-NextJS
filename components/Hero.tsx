'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center bg-gray-900 px-6 py-20">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-24">
          {/* Texte principal */}
          <div className="text-center lg:text-left flex-1">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight text-white">
              Salut, moi c&apos;est <span className="text-pink-500">Isaac Koffi</span>
            </h1>

            <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-2xl mx-auto lg:mx-0">
              Développeur Full Stack spécialisé en Next.js, React et TypeScript. 
              Je crée des applications web performantes et modernes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/projets"
                className="px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-full"
              >
                Voir mes projets
              </Link>
              <a
                href="/mon-portfolio.pdf"
                download
                className="px-6 py-3 border border-white text-white hover:bg-white/10 font-semibold rounded-full"
              >
                Télécharger CV
              </a>
            </div>

            {/* Stack technique */}
            <div className="mt-12 flex flex-wrap justify-center lg:justify-start gap-3">
              {['nextjs', 'react', 'ts', 'tail', 'nodejs'].map((tech) => (
                <div key={tech} className="bg-white/10 p-2 rounded-lg">
                  <Image
                    src={`/images/stack/${tech}.svg`}
                    alt={tech}
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Image de profil */}
          <div className="flex-1 flex justify-center">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-xl overflow-hidden">
              <Image
                src="/images/stack/image-hero.svg"
                alt="Isaac Koffi - Développeur Full Stack"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
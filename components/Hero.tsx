'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center bg-gray-900 px-4 sm:px-6 py-16 md:py-20">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-8 md:gap-12 lg:gap-16 xl:gap-24">
          {/* Texte principal */}
          <div className="text-center lg:text-left flex-1">
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 leading-tight text-white">
              Salut, moi c&apos;est <span className="text-">Isaac Koffi</span>
            </h1>

            <p className="text-gray-300 text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0">
              Développeur Full Stack spécialisé en Next.js, React et TypeScript. 
              Je crée des applications web performantes et modernes.
            </p>

            <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <Link
                href="/projets"
                className="px-5 py-2.5 sm:px-6 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium sm:font-semibold rounded-full text-sm sm:text-base transition-colors"
              >
                Voir mes projets
              </Link>
              <a
                href="/mon-portfolio.pdf"
                download
                className="px-5 py-2.5 sm:px-6 sm:py-3 border border-white text-white hover:bg-white/10 font-medium sm:font-semibold rounded-full text-sm sm:text-base transition-colors"
              >
                Télécharger CV
              </a>
            </div>

            {/* Stack technique */}
            <div className="mt-8 sm:mt-10 md:mt-12 flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3">
              {['nextjs', 'react', 'ts', 'tail', 'nodejs'].map((tech) => (
                <div key={tech} className="bg-white/10 p-1.5 sm:p-2 rounded-md sm:rounded-lg">
                  <Image
                    src={`/images/stack/${tech}.svg`}
                    alt={tech}
                    width={20}
                    height={20}
                    className="w-5 h-5 sm:w-6 sm:h-6"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Image de profil */}
          <div className="flex-1 flex justify-center mb-8 lg:mb-0">
            <div className="relative w-56 h-56 xs:w-64 xs:h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-xl overflow-hidden">
              <Image
                src="/images/stack/image-hero.svg"
                alt="Isaac Koffi - Développeur Full Stack"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, (max-width: 1024px) 360px, 400px"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
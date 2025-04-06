'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

export default function DeveloperInfo() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Smooth scroll polyfill léger
    const handleScroll = () => {
      if (scrollRef.current) {
        scrollRef.current.style.scrollBehavior = 'smooth';
      }
    };

    window.addEventListener('resize', handleScroll);
    return () => window.removeEventListener('resize', handleScroll);
  }, []);

  return (
    <section className="relative bg-black text-white py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
        {/* IMAGE FIXE - Optimisé pour mobile */}
        <div className="lg:sticky lg:top-24 h-fit flex justify-center order-2 lg:order-1">
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-xl md:rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-300">
            <Image
              src="/images/image-profil.jpg"
              alt="Photo de profil"
              fill
              className="object-cover grayscale hover:grayscale-0 transition duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
              priority
            />
          </div>
        </div>

        {/* TEXTE SCROLLABLE - Optimisé pour mobile */}
        <div 
          ref={scrollRef}
          className="max-h-[70vh] lg:max-h-[80vh] overflow-y-auto pr-2 lg:pr-4 order-1 lg:order-2
          scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6 md:mb-8 
          bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent text-center lg:text-left">
            Développeur Fullstack JavaScript & TypeScript
          </h2>
          
          <div className="space-y-4 sm:space-y-5 md:space-y-6">
            {[
              "Je conçois des applications web performantes, scalables et modernes.",
              "Spécialisé en React, Next.js, Node.js, je transforme vos idées en expériences interactives élégantes.",
              "Mon objectif est de créer des interfaces fluides, accessibles et centrées sur l'utilisateur.",
              "J'accorde une importance particulière à l'optimisation, à l'expérience utilisateur et aux bonnes pratiques de développement.",
              "Grâce à ma maîtrise du JavaScript moderne, je suis capable de construire des plateformes robustes et dynamiques.",
              "Je reste à jour avec les dernières tendances du web pour garantir un produit toujours performant.",
              "Chaque ligne de code que j'écris vise à offrir une expérience exceptionnelle à l'utilisateur final.",
              "Vous avez une idée ? Discutons-en, et donnons-lui vie ensemble."
            ].map((text, i) => (
              <p key={i} className="text-base sm:text-lg text-gray-300 leading-relaxed">
                {text}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
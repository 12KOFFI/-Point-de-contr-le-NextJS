'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Lenis from '@studio-freight/lenis';

export default function DeveloperInfo() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.07,
      wrapper: scrollRef.current!,
      content: scrollRef.current!,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <section className="relative bg-black text-white py-24 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* IMAGE FIXE */}
        <div className="sticky top-24 h-fit flex justify-center items-start md:items-center">
          <div className="relative w-64 h-64 rounded-2xl overflow-hidden shadow-xl border border-white/10 hover:border-white/30 transition-all duration-500 group">
            <Image
              src="/images/image-profil.jpg"
              alt="Photo de profil"
              fill
              className="object-cover grayscale hover:grayscale-0 transition duration-700 ease-in-out"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        </div>

        {/* TEXTE SCROLLABLE */}
        <div
          ref={scrollRef}
          className="max-h-[600px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-white/10"
        >
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-8 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent text-center md:text-left">
            Développeur Fullstack JavaScript & TypeScript
          </h2>
          <div className="space-y-6">
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
              <p key={i} className="text-lg text-gray-300 leading-relaxed">
                {text}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

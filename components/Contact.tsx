'use client';

import React from 'react';

export default function Contact() {
  return (
    <section
      id="contact"
      className="min-h-[60vh] flex flex-col justify-center items-center bg-gray-900 px-4 py-20 text-white"
    >
      <div className="text-center max-w-2xl">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Envie de collaborer ?</h2>
        <p className="text-base sm:text-lg mb-8 text-gray-300">
          Vous avez un projet, une idée ou simplement envie d&apos;échanger ?
          Contactez-moi et voyons ce que nous pouvons créer ensemble !
        </p>

        <a
          href="mailto:isaacndri5@gmail.com"
          className="inline-block px-6 py-3 sm:px-8 sm:py-4 bg-blue-600 hover:bg-blue-700 rounded-full text-white text-base sm:text-lg font-semibold"
          aria-label="Envoyer un email"
        >
          Parlons-en
        </a>
      </div>
    </section>
  );
}
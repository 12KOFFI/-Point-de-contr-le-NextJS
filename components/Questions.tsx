"use client";

import React from "react";
import { motion } from "framer-motion";

const items = [
  {
    title: "Performance & qualité",
    desc: "Je construis des apps rapides, optimisées et bien structurées, selon les meilleures pratiques du web moderne.",
  },
  {
    title: "Stack moderne",
    desc: "React, Next.js, Tailwind, Node, TypeScript... Je maîtrise les outils récents pour livrer des projets solides et maintenables.",
  },
  {
    title: "Expérience UX/UI",
    desc: "Je conçois des interfaces claires, intuitives et esthétiques qui offrent une vraie valeur à l’utilisateur.",
  },
];

export default function Questions() {
  return (
    <section className="py-20 px-6 bg-neutral-950 text-white">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">
          Pourquoi travailler avec moi ?
        </h2>
        <p className="text-gray-400">
          Voici ce que je vous propose à travers mes services et mes projets.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {items.map((item, index) => (
          <motion.div
            key={index}
            className="bg-neutral-900 border border-white/5 rounded-2xl p-6 text-left shadow-md hover:shadow-xl transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <h3 className="text-xl font-semibold mb-2 text-white">
              {item.title}
            </h3>
            <p className="text-gray-400 text-sm">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

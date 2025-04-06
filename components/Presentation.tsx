'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const skills = [
  {
    title: 'Développeur Frontend',
    icons: [
      { name: 'TypeScript', file: 'ts' },
      { name: 'React', file: 'react' },
      { name: 'Next.js', file: 'nextjs' },
      { name: 'Tailwind', file: 'tail' },
    ],
    image: '/images/stack/exp1.svg',
  },
  {
    title: 'Développeur Backend',
    icons: [
      { name: 'Node.js', file: 'nodejs' },
      { name: 'MySQL', file: 'mysql' },
      { name: 'MongoDB', file: 'mongodb' },
    ],
    image: '/images/stack/exp4.svg',
  },
  {
    title: 'Designer – UI/UX',
    icons: [
      { name: 'Photoshop', file: 'ps' },
      { name: 'Illustrator', file: 'ai' },
      { name: 'Figma', file: 'figma' },
    ],
    image: '/images/stack/exp3.svg',
  },
]

export default function Presentation() {
  return (
    <section className="bg-black text-white px-6 md:px-20 py-24 relative">
      <h2 className="text-3xl md:text-4xl font-bold text-purple-500 mb-16 text-center">
        Présentation
      </h2>

      <div className="grid md:grid-cols-3 gap-12 max-w-7xl mx-auto">
        {skills.map((block, i) => (
          <div
            key={i}
            className="bg-[#111] border border-purple-900 rounded-2xl p-6 overflow-hidden min-w-[420px] flex flex-col gap-6 h-full group shadow-xl relative"
          >
            {/* Contenu */}
            <div className="relative z-10">
              <h3 className="text-xl font-semibold text-white text-center mb-6">{block.title}</h3>

              <div className="flex items-center gap-6">
                {/* Illustration */}
                <div className="flex-shrink-0">
                  <Image
                    src={block.image}
                    alt="Illustration"
                    width={80}
                    height={80}
                    className="opacity-90 hover:opacity-100 transition duration-300"
                  />
                </div>

                {/* Icônes défilantes */}
                <div className="relative w-full overflow-hidden">
                  <motion.div
                    className="flex gap-10"
                    animate={{ x: ['100%', '-100%'] }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                  >
                    {block.icons.map((icon, index) => (
                      <div key={index} className="flex flex-col items-center min-w-[60px]">
                        <Image
                          src={`/images/stack/${icon.file}.svg`}
                          alt={icon.name}
                          width={40}
                          height={40}
                          className="mb-1 transition-transform duration-300 hover:scale-110"
                        />
                        <span className="text-xs text-white">{icon.name}</span>
                      </div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

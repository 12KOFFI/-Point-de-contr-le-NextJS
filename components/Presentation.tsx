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
    <section className="bg-black text-white px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-500 mb-12 md:mb-16 text-center">
          Présentation
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
          {skills.map((block, i) => (
            <div
              key={i}
              className="bg-[#111] border border-purple-900/50 hover:border-purple-900 rounded-xl md:rounded-2xl p-4 sm:p-6 overflow-hidden flex flex-col gap-4 sm:gap-6 h-full group shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
            >
              {/* Contenu */}
              <div className="relative z-10">
                <h3 className="text-lg sm:text-xl font-semibold text-white text-center mb-4 sm:mb-6">
                  {block.title}
                </h3>

                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                  {/* Illustration */}
                  <div className="flex-shrink-0">
                    <Image
                      src={block.image}
                      alt="Illustration"
                      width={80}
                      height={80}
                      className="opacity-90 hover:opacity-100 transition duration-300 w-16 h-16 sm:w-20 sm:h-20"
                    />
                  </div>

                  {/* Icônes défilantes */}
                  <div className="relative w-full overflow-hidden">
                    <motion.div
                      className="flex gap-6 sm:gap-8 md:gap-10"
                      animate={{ x: ['100%', '-100%'] }}
                      transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                    >
                      {[...block.icons, ...block.icons].map((icon, index) => (
                        <div key={index} className="flex flex-col items-center min-w-[50px] sm:min-w-[60px]">
                          <Image
                            src={`/images/stack/${icon.file}.svg`}
                            alt={icon.name}
                            width={32}
                            height={32}
                            className="w-8 h-8 sm:w-10 sm:h-10 mb-1 transition-transform duration-300 hover:scale-110"
                          />
                          <span className="text-xs text-white/80">{icon.name}</span>
                        </div>
                      ))}
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
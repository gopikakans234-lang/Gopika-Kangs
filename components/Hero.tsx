
import React from 'react';
import { CONTENT } from '../constants';
import { Section } from './Section';
import { motion } from 'framer-motion';

interface HeroProps {
  onCtaClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onCtaClick }) => {
  const { hero } = CONTENT;

  return (
    <Section className="min-h-[50vh] flex items-center justify-center pt-32 pb-0 md:pb-0 relative overflow-hidden">
      {/* Ambient background glow - made subtler */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-green/5 blur-[120px] rounded-full pointer-events-none opacity-40" />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8"
        >
          <span className="inline-block px-5 py-2 rounded-full bg-white/5 border border-white/10 text-brand-green text-xs font-bold tracking-[0.2em] uppercase backdrop-blur-md">
            For Mid-Senior Developers
          </span>
        </motion.div>

        <motion.div 
          className=""
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        >
          {/* Main Headline */}
          <h1 className="flex flex-col gap-3 md:gap-5 mb-6">
            <span className="font-sans font-bold tracking-tighter text-4xl md:text-7xl leading-[1.1] text-text-main">
              {hero.heading}
            </span>
          </h1>
          
          {/* Subheading */}
          <h2 className="text-2xl md:text-5xl font-sans font-black tracking-tighter text-brand-green uppercase transform scale-y-105">
            {hero.subHeading}
          </h2>
        </motion.div>
      </div>
    </Section>
  );
};

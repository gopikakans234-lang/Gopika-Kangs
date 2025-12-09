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
    <Section className="min-h-[50vh] flex items-center justify-center pt-32 pb-16 md:pb-24 relative overflow-hidden">
      {/* Ambient background glow - made subtler */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-green/5 blur-[120px] rounded-full pointer-events-none opacity-40" />

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12"
        >
          <span className="inline-block px-8 py-3 rounded-full bg-navy-900 border border-brand-green text-brand-green text-sm md:text-base font-bold tracking-[0.25em] uppercase shadow-[0_0_25px_rgba(12,205,126,0.25)] backdrop-blur-xl hover:shadow-[0_0_35px_rgba(12,205,126,0.4)] transition-all duration-300">
            For Mid-Career Developers
          </span>
        </motion.div>

        <motion.div 
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        >
          {/* Main Headline: Reduced to 36px – 48px range */}
          <h1 className="mb-6 max-w-4xl mx-auto">
            <span className="font-sans font-bold tracking-tight text-2xl md:text-[36px] lg:text-[48px] leading-[1.2] text-white block">
              {hero.heading}
            </span>
          </h1>
          
          {/* Subheading: Reduced by ~2% more */}
          <h2 className="text-[15.5px] md:text-[22.5px] lg:text-[30px] leading-[1.1] font-sans font-black tracking-tight text-brand-green uppercase">
            {hero.subHeading}
          </h2>
        </motion.div>
      </div>
    </Section>
  );
};
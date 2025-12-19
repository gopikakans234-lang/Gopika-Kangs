
import React from 'react';
import { CONTENT } from '../constants';
import { Section } from './Section';
import { motion } from 'framer-motion';
import { Button } from './Button';

interface HeroProps {
  onCtaClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onCtaClick }) => {
  const { hero } = CONTENT;

  return (
    <Section 
      animateOnInView={false} // CRITICAL: Ensures content shows immediately on mobile load
      className="min-h-[100dvh] md:min-h-[85vh] flex items-center justify-center pt-28 pb-12 md:pt-32 md:pb-20 relative overflow-hidden px-0"
    >
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[300px] md:h-[400px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[250px] h-[250px] md:w-[600px] md:h-[400px] bg-brand-green/10 blur-[80px] md:blur-[120px] rounded-full pointer-events-none" />

      <div className="flex flex-col items-center text-center max-w-7xl mx-auto relative z-10 w-full px-4 sm:px-6">
        
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 md:mb-8"
        >
          <span className="inline-block px-4 py-2 md:px-6 md:py-3 rounded-full border border-brand-green/40 bg-brand-green/10 text-brand-green text-[10px] sm:text-xs md:text-sm font-extrabold tracking-[0.2em] uppercase backdrop-blur-md shadow-[0_0_25px_rgba(12,205,126,0.2)]">
            For Mid-Career Developers
          </span>
        </motion.div>

        {/* Main Heading - Larger font size as requested */}
        <motion.h1 
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 md:mb-8 leading-[1.1] md:leading-[1.1] tracking-tight max-w-5xl drop-shadow-2xl whitespace-normal md:whitespace-pre-line px-2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          {hero.heading}
        </motion.h1>
        
        {/* Sub-headline */}
        <motion.h2 
          className="text-base sm:text-lg md:text-2xl font-bold text-brand-green uppercase tracking-widest mb-8 md:mb-10 px-4"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {hero.subHeading}
        </motion.h2>

        {/* Description Lines - Single line logic on desktop */}
        <motion.div 
          className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 mb-10 md:mb-14 w-full max-w-none leading-relaxed font-normal flex flex-col gap-4 md:gap-6 px-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {Array.isArray(hero.description) ? (
            hero.description.map((line: string, index: number) => (
              <p key={index} className="md:whitespace-nowrap max-w-3xl mx-auto md:max-w-none">
                {line}
              </p>
            ))
          ) : (
            <p className="md:whitespace-nowrap max-w-3xl mx-auto md:max-w-none">
              {hero.description}
            </p>
          )}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-10 w-full sm:w-auto px-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Button onClick={onCtaClick} className="w-full sm:w-auto shadow-2xl">
            {hero.primaryCta}
          </Button>
          
          <button className="group flex items-center justify-center gap-3 text-sm md:text-base font-bold tracking-[0.15em] text-white uppercase hover:text-brand-green transition-colors py-3">
            {hero.secondaryCta}
            <span className="hidden sm:inline-block w-8 md:w-12 h-[2px] bg-white/20 group-hover:bg-brand-green transition-colors duration-300"></span>
          </button>
        </motion.div>

      </div>
    </Section>
  );
};

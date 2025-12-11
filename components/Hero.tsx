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
    <Section className="min-h-[85vh] flex items-center justify-center pt-24 pb-16 relative overflow-hidden">
      {/* Background Glow for Image */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-brand-green/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="flex flex-col items-center text-center max-w-6xl mx-auto px-4 relative z-10">
        
        {/* Badge - Prominent Visibility */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <span className="inline-block px-6 py-3 rounded-full border border-brand-green/40 bg-brand-green/10 text-brand-green text-sm md:text-base font-extrabold tracking-[0.2em] uppercase backdrop-blur-md shadow-[0_0_25px_rgba(12,205,126,0.3)]">
            For Mid-Career Developers
          </span>
        </motion.div>

        {/* Main Heading - Prominent & Visible */}
        <motion.h1 
          className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-8 leading-[1.1] tracking-tight max-w-5xl drop-shadow-2xl whitespace-pre-line"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          {hero.heading}
        </motion.h1>
        
        {/* Green Sub-headline */}
        <motion.h2 
          className="text-xl md:text-3xl font-bold text-brand-green uppercase tracking-wide mb-10"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {hero.subHeading}
        </motion.h2>

        {/* Description Paragraph(s) - Reduced Size */}
        <motion.div 
          className="text-base md:text-xl text-white/90 mb-12 max-w-4xl leading-relaxed font-normal flex flex-col gap-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {Array.isArray(hero.description) ? (
            hero.description.map((line: string, index: number) => (
              <p key={index}>{line}</p>
            ))
          ) : (
            <p>{hero.description}</p>
          )}
        </motion.div>

        {/* Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-10 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Button onClick={onCtaClick}>
            {hero.primaryCta}
          </Button>
          
          <button className="group flex items-center gap-3 text-sm md:text-base font-bold tracking-[0.15em] text-white uppercase hover:text-brand-green transition-colors py-2">
            {hero.secondaryCta}
            <span className="w-8 md:w-12 h-[2px] bg-white/20 group-hover:bg-brand-green transition-colors duration-300"></span>
          </button>
        </motion.div>

      </div>
    </Section>
  );
};
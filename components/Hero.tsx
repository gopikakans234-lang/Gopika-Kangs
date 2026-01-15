
import React from 'react';
import { CONTENT } from '../constants';
import { Section } from './Section';
import { motion } from 'framer-motion';
import { Button } from './Button';

interface HeroProps {
  onCtaClick: () => void;
  onQuizClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onCtaClick, onQuizClick }) => {
  const { hero } = CONTENT;

  return (
    <Section 
      animateOnInView={false} 
      className="min-h-[100dvh] md:min-h-[85vh] flex items-center justify-center pt-28 pb-12 md:pt-32 md:pb-20 relative overflow-hidden px-0"
    >
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[300px] md:h-[400px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[250px] h-[250px] md:w-[600px] md:h-[400px] bg-brand-green/10 blur-[80px] md:blur-[120px] rounded-full pointer-events-none" />

      <div className="flex flex-col items-center text-center max-w-7xl mx-auto relative z-10 w-full px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6 md:mb-8">
          <span className="inline-block px-4 py-2 md:px-6 md:py-3 rounded-full border border-brand-green/40 bg-brand-green/10 text-brand-green text-[10px] sm:text-xs md:text-sm font-extrabold tracking-[0.2em] uppercase backdrop-blur-md shadow-[0_0_25px_rgba(12,205,126,0.2)]">
            For Mid-Career Developers
          </span>
        </motion.div>

        <motion.h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6 md:mb-8 leading-[1.1] tracking-tight max-w-5xl px-2" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          {hero.heading}
        </motion.h1>
        
        <motion.h2 className="text-sm sm:text-base md:text-xl font-bold text-brand-green uppercase tracking-widest mb-8 md:mb-10 px-4" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
          {hero.subHeading}
        </motion.h2>

        <motion.div className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 mb-10 md:mb-14 w-full max-w-none leading-relaxed font-normal flex flex-col gap-4 md:gap-6 px-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {Array.isArray(hero.description) ? (
            hero.description.map((line: string, index: number) => (
              <p key={index} className="md:whitespace-nowrap max-w-3xl mx-auto md:max-w-none">{line}</p>
            ))
          ) : (
            <p className="md:whitespace-nowrap max-w-3xl mx-auto md:max-w-none">{hero.description}</p>
          )}
        </motion.div>

        <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-10 w-full sm:w-auto px-6" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <Button onClick={onCtaClick} className="w-full sm:w-auto shadow-2xl">{hero.primaryCta}</Button>
          {(hero as any).secondaryCta && (
            <Button onClick={onQuizClick} variant="secondary" className="w-full sm:w-auto">
              {(hero as any).secondaryCta}
            </Button>
          )}
        </motion.div>
      </div>
    </Section>
  );
};

import React from 'react';
import { CONTENT } from '../constants';
import { Button } from './Button';
import { Section } from './Section';
import { motion } from 'framer-motion';

interface HeroProps {
  onCtaClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onCtaClick }) => {
  const { hero } = CONTENT;

  const scrollToSolution = () => {
    const element = document.getElementById('solution');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Section className="min-h-[90vh] flex items-center justify-center pt-32 pb-20 relative overflow-hidden">
      {/* Ambient background glow - made subtler */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-green/5 blur-[120px] rounded-full pointer-events-none opacity-40" />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12"
        >
          <span className="inline-block px-5 py-2 rounded-full bg-white/5 border border-white/10 text-brand-green text-xs font-bold tracking-[0.2em] uppercase backdrop-blur-md">
            For Mid-Senior Developers
          </span>
        </motion.div>

        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        >
          {/* Updated to match Webolution Logo: Sans-Serif, Bold, Tight Tracking */}
          <h1 className="flex flex-col gap-3 md:gap-5">
            <span className="font-sans font-bold tracking-tighter text-5xl md:text-7xl leading-[1.1] text-text-main">
              7+ years in web development…
            </span>
            <span className="font-sans font-bold tracking-tighter text-5xl md:text-7xl leading-[1.1] text-text-main/70">
              still stuck in the same place?
            </span>
          </h1>
          
          {/* Subheading */}
          <h2 className="mt-8 md:mt-12 text-4xl md:text-6xl font-sans font-black tracking-tighter text-brand-green uppercase transform scale-y-105">
            {hero.subHeading}
          </h2>
        </motion.div>

        <motion.p 
          className="text-lg md:text-2xl text-text-muted/80 max-w-2xl mx-auto mb-14 text-center leading-relaxed font-light"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          {hero.description}
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          <Button onClick={onCtaClick} fullWidth className="sm:w-auto px-12 py-5 text-lg shadow-brand-green/10 shadow-2xl hover:shadow-brand-green/20">
            {hero.primaryCta}
          </Button>
          <button 
            onClick={scrollToSolution} 
            className="group flex items-center gap-2 px-8 py-4 text-text-muted hover:text-white transition-colors text-sm font-medium tracking-widest uppercase"
          >
            {hero.secondaryCta}
            <span className="block h-px w-8 group-hover:w-12 bg-white/20 group-hover:bg-white transition-all duration-300"></span>
          </button>
        </motion.div>
      </div>
    </Section>
  );
};
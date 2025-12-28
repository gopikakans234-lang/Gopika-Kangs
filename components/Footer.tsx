
import React from 'react';
import { CONTENT } from '../constants';
import { Button } from './Button';
import { motion } from 'framer-motion';

interface FooterProps {
  onCtaClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onCtaClick }) => {
  const { footer } = CONTENT;

  return (
    <footer className="w-full py-10 md:py-20 bg-navy-800 text-center px-4 md:px-6 border-t border-white/5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto"
      >
        <h2 className="text-xl md:text-3xl font-bold text-white mb-6 md:mb-8 uppercase tracking-tight">
          {footer.heading}
        </h2>
        
        <div className="mb-8">
          <Button onClick={onCtaClick} fullWidth={false} className="w-full md:w-auto px-10 py-4 text-base md:text-lg">
            {footer.cta}
          </Button>
        </div>

        <p className="text-text-muted text-sm md:text-base opacity-80">
          {footer.subText}
        </p>

        <div className="mt-8 md:mt-12 text-[10px] text-white/20 uppercase tracking-[0.2em] font-black">
          © {new Date().getFullYear()} Webolution. All rights reserved.
        </div>
      </motion.div>
    </footer>
  );
};

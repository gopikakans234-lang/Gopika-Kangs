
import React from 'react';
import { motion } from 'framer-motion';
import { SectionProps } from '../types';

export interface ExtendedSectionProps extends SectionProps {
  animateOnInView?: boolean;
}

export const Section: React.FC<ExtendedSectionProps> = ({ 
  children, 
  className = '', 
  id,
  delay = 0,
  animateOnInView = true
}) => {
  // For sections above the fold (like Hero), we skip the whileInView wrapper
  // to prevent it from remaining invisible due to scroll-detection issues on mobile.
  if (!animateOnInView) {
    return (
      <section id={id} className={`w-full py-12 md:py-32 px-5 md:px-6 ${className}`}>
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </section>
    );
  }

  return (
    <section id={id} className={`w-full py-12 md:py-32 px-5 md:px-6 ${className}`}>
      <motion.div 
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1, margin: "0px 0px -50px 0px" }}
        transition={{ duration: 0.5, delay: delay }}
      >
        {children}
      </motion.div>
    </section>
  );
};

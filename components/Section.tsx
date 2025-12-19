
import React from 'react';
import { motion } from 'framer-motion';
import { SectionProps } from '../types';

export const Section: React.FC<SectionProps> = ({ 
  children, 
  className = '', 
  id,
  delay = 0 
}) => {
  return (
    <section id={id} className={`w-full py-12 md:py-32 px-5 md:px-6 ${className}`}>
      <motion.div 
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.05 }} // Triggers as soon as 5% is visible, no margin restriction
        transition={{ duration: 0.6, delay: delay }}
      >
        {children}
      </motion.div>
    </section>
  );
};

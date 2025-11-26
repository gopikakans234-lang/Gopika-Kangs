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
    <section id={id} className={`w-full py-20 md:py-32 px-6 flex justify-center ${className}`}>
      <motion.div 
        className="w-full max-w-[800px] flex flex-col items-center text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: delay, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </section>
  );
};

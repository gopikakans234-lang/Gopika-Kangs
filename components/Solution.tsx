
import React from 'react';
import { CONTENT } from '../constants';
import { Section } from './Section';
import { Button } from './Button';
import { Map, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface SolutionProps {
  onCtaClick: () => void;
}

export const Solution: React.FC<SolutionProps> = ({ onCtaClick }) => {
  const { solution } = CONTENT;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <Section id="solution" className="bg-navy-900">
      <div className="flex justify-center mb-6 text-brand-green">
        <Map size={56} strokeWidth={1.5} />
      </div>
      
      <h2 className="text-3xl md:text-5xl font-bold text-white mb-12">
        {solution.heading}
      </h2>

      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="w-full max-w-4xl mx-auto flex flex-col gap-6 text-left mb-16"
      >
        {solution.phases.map((phase, index) => (
          <motion.div 
            key={index}
            variants={item}
            className="group relative bg-navy-800/50 backdrop-blur-sm rounded-r-xl overflow-hidden hover:bg-navy-800 transition-colors duration-300"
          >
            {/* The Left Accent Bar - Gradient from Brand Green to Cyan/Blue */}
            <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-brand-green to-blue-500 shadow-[0_0_15px_rgba(34,197,94,0.4)]" />
            
            <div className="p-8 pl-10 md:pl-12">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-brand-green transition-colors">
                  {phase.phase}
                </h3>
                <span className="text-brand-green/80 font-medium tracking-wide uppercase text-sm md:text-base">
                  {phase.title}
                </span>
              </div>
              
              <p className="text-text-muted text-lg leading-relaxed">
                {phase.text}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <Button onClick={onCtaClick} variant="primary">
        {solution.cta} <ArrowRight className="ml-2 w-5 h-5 inline" />
      </Button>
    </Section>
  );
};

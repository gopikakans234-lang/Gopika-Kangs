
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
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
        {/* Header Icon */}
        <div className="flex justify-center mb-6 text-brand-green">
          <Map size={56} strokeWidth={1.5} />
        </div>
        
        {/* Main Heading "Your Blueprint..." */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white mb-8"
          >
            {solution.heading}
          </motion.h2>

          {/* Intro Text Block */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            {solution.intro && solution.intro.map((text, i) => (
               <p key={i} className={`text-lg md:text-2xl leading-relaxed ${i === 0 ? 'text-white font-medium' : 'text-text-muted'}`}>
                 {text}
               </p>
            ))}
          </motion.div>
        </div>

        {/* Roadmap Title */}
        <motion.h3 
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           transition={{ delay: 0.2 }}
           className="text-2xl md:text-3xl font-bold text-brand-green uppercase tracking-wide mb-10 text-center"
        >
          {solution.roadmapTitle}
        </motion.h3>

        {/* Phases List */}
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
              <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-brand-green to-blue-500 shadow-[0_0_15px_rgba(12,205,126,0.4)]" />
              
              <div className="p-8 pl-10 md:pl-12">
                <div className="flex flex-col items-start gap-2 mb-3">
                  <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-brand-green transition-colors">
                    {phase.phase}
                  </h3>
                  <span className="text-brand-green font-bold tracking-wide uppercase text-sm md:text-base">
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
      </div>
    </Section>
  );
};

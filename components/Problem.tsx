import React from 'react';
import { CONTENT } from '../constants';
import { Section } from './Section';
import { motion } from 'framer-motion';
import { Button } from './Button';

interface ProblemProps {
  onCtaClick?: () => void;
}

export const Problem: React.FC<ProblemProps> = ({ onCtaClick }) => {
  const { problem, agitate } = CONTENT;

  return (
    <div className="relative">
      <Section className="pb-16 pt-0 md:pt-0">
        <div className="max-w-5xl mx-auto text-center px-4 flex flex-col items-center">
          
          {problem.highlight && (
            <motion.h3 
              className="text-4xl md:text-7xl font-black text-brand-green uppercase leading-[0.9] md:leading-[0.9] mb-8 md:mb-12 tracking-tighter"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {problem.highlight}
            </motion.h3>
          )}

          <motion.div 
            className="flex flex-col gap-8 max-w-4xl mx-auto text-center mb-10 md:mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p className="text-base md:text-xl text-text-muted leading-relaxed font-normal tracking-tight max-w-3xl mx-auto">
              {problem.description}
            </p>
            {problem.description2 && (
              <p className="text-3xl md:text-6xl text-white leading-[0.95] font-black tracking-tighter">
                {problem.description2}
              </p>
            )}
          </motion.div>

          {/* Book Bundle Image Inserted Here */}
          <motion.div
            className="w-full max-w-[320px] md:max-w-[480px] mx-auto mb-12 md:mb-16 relative z-10"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {/* Subtle glow behind the book */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-brand-green/5 blur-[50px] rounded-full pointer-events-none" />
            
            <img 
              src="webolutionbook.png"
              alt="Webolution Book and Kindle Bundle" 
              className="relative z-10 w-full h-auto drop-shadow-2xl transform hover:scale-105 transition-transform duration-500 rounded-lg"
            />
          </motion.div>

          <motion.div 
            className="flex flex-col md:flex-row items-center gap-6 md:gap-10 mb-20 md:mb-24"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button onClick={onCtaClick}>
              {problem.primaryCta}
            </Button>
            
            <button className="group flex items-center gap-3 text-base font-bold tracking-[0.15em] text-white uppercase hover:text-brand-green transition-colors">
              {problem.secondaryCta}
              <span className="w-10 md:w-16 h-[2px] bg-white/30 group-hover:bg-brand-green transition-colors"></span>
            </button>
          </motion.div>

          {/* Agitate Section - Box 1: Insight */}
          <motion.div 
            className="w-full max-w-5xl text-center bg-navy-800 border border-brand-green/20 rounded-3xl p-8 md:p-12 backdrop-blur-sm shadow-xl shadow-brand-green/5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <div>
              {agitate.heading && (
                <h4 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
                  {agitate.heading}
                </h4>
              )}
              <p className="text-lg md:text-xl text-text-muted leading-relaxed font-normal">
                {agitate.text}
              </p>
            </div>
          </motion.div>

          {/* Agitate Section - Urgency */}
          {agitate.urgency && (
            <motion.div 
              className="w-full max-w-4xl text-center mt-20 md:mt-32"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <h5 className="text-xl md:text-3xl font-bold text-white mb-12 tracking-tight">
                {agitate.urgency.heading}
              </h5>
              
              <div className="flex flex-col items-center">
                <ul className="text-left space-y-6 inline-block">
                  {agitate.urgency.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-4 text-lg md:text-2xl text-text-muted leading-relaxed font-medium">
                      <span className="flex-shrink-0 mt-1">🔻</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}

        </div>
      </Section>
    </div>
  );
};
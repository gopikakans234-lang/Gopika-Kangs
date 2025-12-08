
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
      <Section className="pb-12 pt-8 md:pt-10">
        <div className="max-w-4xl mx-auto text-center px-4 flex flex-col items-center">
          
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
            className="flex flex-col gap-6 max-w-3xl mx-auto text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p className="text-lg md:text-2xl text-text-muted leading-relaxed font-light">
              {problem.description}
            </p>
            <p className="text-xl md:text-3xl text-white leading-relaxed font-medium">
              {problem.description2}
            </p>
          </motion.div>

          <motion.div 
            className="flex flex-col md:flex-row items-center gap-6 md:gap-10 mt-10 md:mt-12 mb-16 md:mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button onClick={onCtaClick}>
              {problem.primaryCta}
            </Button>
            
            <button className="group flex items-center gap-3 text-sm font-bold tracking-[0.15em] text-white uppercase hover:text-brand-green transition-colors">
              {problem.secondaryCta}
              <span className="w-8 md:w-12 h-[1px] bg-white/30 group-hover:bg-brand-green transition-colors"></span>
            </button>
          </motion.div>

          {/* Agitate Section - Box 1: Insight */}
          <motion.div 
            className="w-full max-w-3xl text-left bg-navy-800 border border-brand-green/20 rounded-2xl p-6 md:p-10 backdrop-blur-sm mb-6 shadow-lg shadow-brand-green/5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <div>
              {agitate.heading && (
                <h4 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  {agitate.heading}
                </h4>
              )}
              <p className="text-lg md:text-xl text-text-muted leading-relaxed">
                {agitate.text}
              </p>
            </div>
          </motion.div>

          {/* Agitate Section - Box 2: Pain Points Bullets */}
          <motion.div 
            className="w-full max-w-3xl text-left bg-white/5 border border-white/10 rounded-2xl p-6 md:p-10 backdrop-blur-sm mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div>
              {agitate.bulletTitle && (
                <h5 className="text-xl md:text-2xl font-bold text-white mb-6">
                  {agitate.bulletTitle}
                </h5>
              )}

              {agitate.bullets && agitate.bullets.length > 0 && (
                <ul className="space-y-4">
                  {agitate.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-4 text-text-muted text-base md:text-lg leading-relaxed">
                      <span className="flex-shrink-0 w-2 h-2 rounded-full bg-brand-green mt-2.5 animate-pulse"></span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>

          {/* Agitate Section - Box 3: Pain Review (No Box Styling) */}
          {agitate.painReview && (
            <motion.div 
              className="w-full max-w-3xl text-left mt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <div>
                <h5 className="text-xl md:text-2xl font-bold text-white mb-4 leading-tight">
                  {agitate.painReview.heading}
                </h5>
                <div className="space-y-4">
                  {agitate.painReview.text.map((paragraph, idx) => (
                    <p key={idx} className="text-text-muted text-base md:text-lg leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

        </div>
      </Section>
    </div>
  );
};

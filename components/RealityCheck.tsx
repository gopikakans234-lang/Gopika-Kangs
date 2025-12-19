
import React from 'react';
import { CONTENT } from '../constants';
import { Section } from './Section';
import { motion } from 'framer-motion';

export const RealityCheck: React.FC = () => {
  const { realityCheck } = CONTENT;

  return (
    <Section className="bg-navy-900 pt-0 md:pt-0 pb-12 md:pb-20">
      <div className="max-w-5xl mx-auto text-center">
        {/* Heading */}
        <motion.h2 
          className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-6 tracking-tight leading-tight px-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {realityCheck.heading}
        </motion.h2>
        
        {/* Text - Reduced by one size level */}
        <motion.p 
          className="text-base md:text-lg lg:text-xl text-text-muted leading-relaxed font-medium max-w-4xl mx-auto mb-10 md:mb-24 px-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {realityCheck.text}
        </motion.p>

        {/* Urgency Box */}
        {realityCheck.urgencyBox && (
          <motion.div 
            className="w-full max-w-3xl mx-auto bg-navy-800 border border-white/10 rounded-3xl p-6 sm:p-8 md:p-10 text-left relative overflow-hidden shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Background effect */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-green/5 blur-[80px] rounded-full pointer-events-none" />

            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-8 relative z-10 leading-snug">
              {realityCheck.urgencyBox.heading}
            </h3>

            <div className="space-y-6 relative z-10">
              {realityCheck.urgencyBox.items.map((item: any, index: number) => (
                <div key={index} className="flex items-start sm:items-center gap-4 group">
                  <span className="flex-shrink-0 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-navy-900/50 border border-white/10 text-xl md:text-2xl group-hover:border-brand-green/30 transition-colors">
                    {item.emoji}
                  </span>
                  <p className="text-base sm:text-lg md:text-xl text-text-muted/90 font-medium leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Pain Review Section */}
        {realityCheck.painReview && (
          <motion.div
            className="mt-16 md:mt-32 max-w-7xl mx-auto text-center px-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
             <h3 className="text-2xl md:text-4xl font-black text-white mb-6 tracking-tight">
               {realityCheck.painReview.heading}
             </h3>
             <div className="space-y-6 flex flex-col items-center">
               {realityCheck.painReview.text.map((paragraph: string, index: number) => (
                 <p key={index} className="text-base md:text-lg text-text-muted leading-relaxed max-w-none md:whitespace-nowrap">
                   {paragraph}
                 </p>
               ))}
             </div>
          </motion.div>
        )}
      </div>
    </Section>
  );
};

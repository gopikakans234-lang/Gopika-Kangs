import React from 'react';
import { CONTENT } from '../constants';
import { Section } from './Section';
import { motion } from 'framer-motion';

export const RealityCheck: React.FC = () => {
  const { realityCheck } = CONTENT;

  return (
    // Removed top padding (pt-0) to close gap with Hero section
    <Section className="bg-navy-900 pt-0 md:pt-0 pb-12 md:pb-20">
      <div className="max-w-5xl mx-auto text-center px-4">
        {/* Heading */}
        <motion.h2 
          className="text-xl md:text-3xl lg:text-4xl font-extrabold text-white mb-5 tracking-tight leading-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {realityCheck.heading}
        </motion.h2>
        
        {/* Text - Responsive margin-bottom */}
        <motion.p 
          className="text-lg md:text-xl lg:text-2xl text-text-muted leading-relaxed font-medium max-w-4xl mx-auto mb-12 md:mb-24"
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
            // Reduced padding from md:p-10 to md:p-8
            className="w-full max-w-3xl mx-auto bg-navy-800 border border-white/10 rounded-3xl p-6 md:p-8 text-left relative overflow-hidden shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Background effect */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 blur-[80px] rounded-full pointer-events-none" />

            {/* Reduced margin-bottom from mb-6 to mb-5 */}
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-5 relative z-10">
              {realityCheck.urgencyBox.heading}
            </h3>

            <div className="space-y-4 relative z-10">
              {realityCheck.urgencyBox.items.map((item: any, index: number) => (
                <div key={index} className="flex items-start gap-4">
                  <span className="flex-shrink-0 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-xl bg-navy-900/50 border border-white/5 text-xl md:text-2xl">
                    {item.emoji}
                  </span>
                  <p className="text-lg md:text-xl text-text-muted/90 font-medium pt-1 md:pt-2">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Pain Review Section - Increased width to max-w-5xl to prevent text wrapping */}
        {realityCheck.painReview && (
          <motion.div
            className="mt-16 md:mt-32 max-w-5xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
             <h3 className="text-2xl md:text-3xl font-bold text-white mb-5 tracking-tight">
               {realityCheck.painReview.heading}
             </h3>
             <div className="space-y-4">
               {realityCheck.painReview.text.map((paragraph: string, index: number) => (
                 <p key={index} className="text-lg md:text-xl text-text-muted leading-relaxed max-w-5xl mx-auto">
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
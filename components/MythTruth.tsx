
import React from 'react';
import { CONTENT } from '../constants';
import { Section } from './Section';
import { X, Check } from 'lucide-react';
import { motion } from 'framer-motion';

export const MythTruth: React.FC = () => {
  const { mythTruth } = CONTENT;

  return (
    <Section className="bg-navy-900">
      <div className="text-center max-w-4xl mx-auto mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold text-white mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
        >
          {mythTruth.heading}
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-xl text-text-muted leading-relaxed"
        >
          {mythTruth.subHeading}
        </motion.p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 w-full max-w-5xl mx-auto">
        {mythTruth.cards.map((card, index) => {
          const isMyth = card.type === 'myth';
          return (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className={`
                relative p-10 rounded-2xl border transition-all duration-300 group
                ${isMyth 
                  ? 'bg-navy-800 border-red-500/20 hover:border-red-500/50 hover:shadow-[0_0_30px_rgba(239,68,68,0.1)]' 
                  : 'bg-navy-800 border-brand-green/20 hover:border-brand-green/50 hover:shadow-[0_0_30px_rgba(12,205,126,0.1)]'}
              `}
            >
              <div className="flex flex-col items-center text-center gap-6">
                {/* Icon */}
                <div className={`
                  w-20 h-20 rounded-full flex items-center justify-center mb-2
                  ${isMyth ? 'bg-red-500/10 text-red-500' : 'bg-brand-green/10 text-brand-green'}
                `}>
                  {isMyth ? <X size={48} strokeWidth={3} /> : <Check size={48} strokeWidth={3} />}
                </div>

                {/* Label */}
                <h3 className={`
                  text-3xl font-bold tracking-tight
                  ${isMyth ? 'text-red-500' : 'text-brand-green'}
                `}>
                  {card.label}
                </h3>

                {/* Text */}
                <p className="text-2xl text-white font-medium leading-tight">
                  {card.text}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
};

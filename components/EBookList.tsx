
import React from 'react';
import { CONTENT } from '../constants';
import { Section } from './Section';
import { motion } from 'framer-motion';
import { BookOpen, ArrowRight } from 'lucide-react';
import { Button } from './Button';

interface EBookListProps {
  onViewDetails: (id: string) => void;
  onCtaClick: () => void;
}

export const EBookList: React.FC<EBookListProps> = ({ onViewDetails, onCtaClick }) => {
  const { ebook } = CONTENT;

  return (
    <div className="pt-24 md:pt-32">
      {/* Hero Section */}
      <Section className="bg-navy-900 pb-12" animateOnInView={false}>
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex justify-center text-brand-green mb-4"
          >
            <BookOpen size={48} strokeWidth={1.5} />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl md:text-6xl font-black text-white leading-tight"
          >
            {ebook.hero.heading}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-brand-green font-bold uppercase tracking-tight"
          >
            {ebook.hero.subHeading}
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-text-muted leading-relaxed max-w-2xl mx-auto"
          >
            {ebook.hero.intro}
          </motion.p>
        </div>
      </Section>

      {/* eBook Cards Grid */}
      <Section className="bg-navy-900 pt-0 pb-20">
        <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {ebook.list.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-navy-800/40 border border-white/5 rounded-3xl overflow-hidden hover:bg-navy-800/80 transition-all hover:border-brand-green/30 flex flex-col"
            >
              {/* Cover Placeholder */}
              <div className="aspect-[3/4] bg-navy-900 flex items-center justify-center p-8 group-hover:bg-brand-green/5 transition-colors">
                <img 
                   src={item.cover} 
                   alt={item.title} 
                   className="w-full h-full object-contain shadow-2xl group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              <div className="p-8 flex-1 flex flex-col space-y-4">
                <div className="text-xs font-black text-brand-green uppercase tracking-widest">{item.category}</div>
                <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-brand-green transition-colors">
                  {item.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed flex-1">
                  {item.summary}
                </p>
                <div className="pt-4">
                  <Button 
                    onClick={() => onViewDetails(item.id)} 
                    variant="outline" 
                    fullWidth 
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div 
          className="mt-20 text-center space-y-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
           <p className="text-xl md:text-3xl font-bold text-white max-w-2xl mx-auto leading-tight">
             Your next career breakthrough starts with clarity and strategy.
           </p>
           <Button onClick={onCtaClick} className="px-12 py-5 shadow-2xl">
             Explore Webolution <ArrowRight className="ml-2" />
           </Button>
        </motion.div>
      </Section>
    </div>
  );
};

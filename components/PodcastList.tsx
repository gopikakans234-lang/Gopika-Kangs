
import React from 'react';
import { CONTENT } from '../constants';
import { Section } from './Section';
import { motion } from 'framer-motion';
import { PlayCircle, Clock, Mic2, ArrowRight } from 'lucide-react';
import { Button } from './Button';

interface PodcastListProps {
  onListenNow: (id: string) => void;
  onCtaClick: () => void;
}

export const PodcastList: React.FC<PodcastListProps> = ({ onListenNow, onCtaClick }) => {
  const { podcast } = CONTENT;

  return (
    <div className="pt-24 md:pt-32">
      {/* Hero Section */}
      <Section className="bg-navy-900 pb-12" animateOnInView={false}>
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center text-brand-green mb-4"
          >
            <Mic2 size={48} strokeWidth={1.5} className="md:w-16 md:h-16" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl sm:text-3xl md:text-5xl font-black text-white leading-tight tracking-tight uppercase"
          >
            {podcast.hero.heading}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-2xl text-brand-green font-bold tracking-tight max-w-2xl mx-auto"
          >
            {podcast.hero.subHeading}
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-lg text-text-muted leading-relaxed max-w-2xl mx-auto font-medium"
          >
            {podcast.hero.intro}
          </motion.p>
        </div>
      </Section>

      {/* Episode List */}
      <Section className="bg-navy-900 pt-0 pb-20">
        <div className="max-w-5xl mx-auto grid gap-4 md:gap-6">
          {podcast.episodes.map((ep, idx) => (
            <motion.div
              key={ep.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-navy-800/40 border border-white/5 rounded-2xl overflow-hidden hover:bg-navy-800/80 transition-all hover:border-brand-green/30 p-5 md:p-8 flex flex-col md:flex-row items-center gap-6"
            >
              <div className="w-full md:w-auto flex-shrink-0 flex items-center justify-center">
                 <div className="w-14 h-14 md:w-16 md:h-16 bg-brand-green/10 text-brand-green rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                   <PlayCircle size={32} />
                 </div>
              </div>
              
              <div className="flex-1 text-center md:text-left space-y-2">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs md:text-sm font-black uppercase tracking-widest text-white/30">
                  <span className="text-brand-green">{ep.category}</span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={12} /> {ep.duration}
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-brand-green transition-colors">
                  {ep.title}
                </h3>
                <p className="text-text-muted text-base md:text-lg leading-relaxed line-clamp-2 font-light">
                  {ep.summary}
                </p>
              </div>

              <div className="w-full md:w-auto">
                <Button 
                  onClick={() => onListenNow(ep.id)} 
                  variant="outline" 
                  className="w-full md:w-auto px-6 py-2.5 text-sm whitespace-nowrap border-brand-green/40"
                >
                  Listen Now
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Global CTA */}
        <motion.div 
          className="mt-16 md:mt-24 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
           <Button onClick={onCtaClick} className="px-12 py-4 shadow-xl">
             Start Your Webolution <ArrowRight className="ml-2" />
           </Button>
        </motion.div>
      </Section>
    </div>
  );
};

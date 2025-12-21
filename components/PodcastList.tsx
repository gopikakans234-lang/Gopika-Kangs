
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
      <Section className="bg-navy-900 pb-12" animateOnInView={false}>
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center text-brand-green mb-4"
          >
            <Mic2 size={48} strokeWidth={1.5} />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl md:text-6xl font-black text-white leading-tight"
          >
            {podcast.hero.heading}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-brand-green font-bold uppercase tracking-tight"
          >
            {podcast.hero.subHeading}
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-text-muted leading-relaxed max-w-2xl mx-auto"
          >
            {podcast.hero.intro}
          </motion.p>
        </div>
      </Section>

      <Section className="bg-navy-900 pt-0 pb-20">
        <div className="max-w-5xl mx-auto grid gap-6 md:gap-8">
          {podcast.episodes.map((ep, idx) => (
            <motion.div
              key={ep.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-navy-800/40 border border-white/5 rounded-2xl overflow-hidden hover:bg-navy-800/80 transition-all hover:border-brand-green/30 p-6 md:p-8 flex flex-col md:flex-row items-center gap-6"
            >
              <div className="w-full md:w-auto flex-shrink-0 flex items-center justify-center">
                 <div className="w-16 h-16 md:w-20 md:h-20 bg-brand-green/10 text-brand-green rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                   <PlayCircle size={40} />
                 </div>
              </div>
              
              <div className="flex-1 text-center md:text-left space-y-3">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-bold uppercase tracking-widest text-white/40">
                  <span className="text-brand-green">{ep.category}</span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} /> {ep.duration}
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-brand-green transition-colors">
                  {ep.title}
                </h3>
                <p className="text-text-muted leading-relaxed line-clamp-2">
                  {ep.summary}
                </p>
              </div>

              <div className="w-full md:w-auto pt-4 md:pt-0">
                <Button 
                  onClick={() => onListenNow(ep.id)} 
                  variant="outline" 
                  fullWidth 
                  className="px-8 whitespace-nowrap"
                >
                  Listen Now
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
           <Button onClick={onCtaClick} className="px-12 py-5 shadow-2xl">
             Start Your Webolution <ArrowRight className="ml-2" />
           </Button>
        </motion.div>
      </Section>
    </div>
  );
};


import React from 'react';
import { CONTENT } from '../constants';
import { Section } from './Section';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Tag } from 'lucide-react';
import { Button } from './Button';

interface BlogListProps {
  onReadMore: (postId: string) => void;
  onCtaClick: () => void;
}

export const BlogList: React.FC<BlogListProps> = ({ onReadMore, onCtaClick }) => {
  const { blog } = CONTENT;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="pt-24 md:pt-32">
      <Section className="pb-12 md:pb-16 bg-navy-900">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight"
          >
            {blog.listHero.heading}
          </motion.h1>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl font-bold text-brand-green uppercase tracking-wide mb-8"
          >
            {blog.listHero.subHeading}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-text-muted leading-relaxed max-w-3xl mx-auto"
          >
            {blog.listHero.intro}
          </motion.p>
        </div>
      </Section>

      <Section className="bg-navy-900 pt-0 pb-20">
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-6 md:gap-8 max-w-5xl mx-auto"
        >
          {blog.posts.map((post) => (
            <motion.div 
              key={post.id}
              variants={item}
              className="group bg-navy-800/40 border border-white/5 rounded-2xl overflow-hidden hover:bg-navy-800/80 transition-all hover:border-brand-green/30 hover:shadow-[0_0_30px_rgba(12,205,126,0.05)] cursor-pointer"
              onClick={() => onReadMore(post.id)}
            >
              <div className="p-6 md:p-10 flex flex-col md:flex-row gap-6 items-start justify-between">
                <div className="flex-1 space-y-4">
                  <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm font-semibold uppercase tracking-widest">
                    <span className="flex items-center gap-1.5 text-brand-green">
                      <Tag size={14} /> {post.category}
                    </span>
                    <span className="flex items-center gap-1.5 text-white/40">
                      <Calendar size={14} /> {post.date}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-3xl font-bold text-white group-hover:text-brand-green transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-text-muted text-base md:text-lg leading-relaxed line-clamp-2">
                    {post.summary}
                  </p>
                </div>
                <div className="flex-shrink-0 self-end md:self-center">
                  <div className="flex items-center gap-2 text-brand-green font-bold group-hover:translate-x-1 transition-transform">
                    Read More <ArrowRight size={20} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 md:mt-32 text-center"
        >
          <div className="bg-navy-800/50 backdrop-blur-md p-8 md:p-16 rounded-3xl border border-white/10 max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-4xl font-bold text-white mb-6">
              Start Your Webolution – Read the Full Guide
            </h3>
            <p className="text-text-muted text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
              Don't just read about growth. Engineer it. Our complete system shows you exactly how to bypass the mid-career plateau.
            </p>
            <Button onClick={onCtaClick} className="w-full sm:w-auto">
              Get the Career Roadmap
            </Button>
          </div>
        </motion.div>
      </Section>
    </div>
  );
};

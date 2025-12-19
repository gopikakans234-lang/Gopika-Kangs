
import React, { useEffect } from 'react';
import { CONTENT } from '../constants';
import { Section } from './Section';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Button } from './Button';

interface BlogDetailProps {
  onBack: () => void;
  onCtaClick: () => void;
}

export const BlogDetail: React.FC<BlogDetailProps> = ({ onBack, onCtaClick }) => {
  const { detailedPost } = CONTENT.blog;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-24 md:pt-32">
      <Section className="bg-navy-900 pb-0">
        <div className="max-w-3xl mx-auto">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-text-muted hover:text-brand-green transition-colors mb-12 font-semibold tracking-wide uppercase text-sm"
          >
            <ArrowLeft size={18} /> Back to Blog
          </button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
              {detailedPost.title}
            </h1>
            
            {/* Intro */}
            <div className="space-y-6 text-lg md:text-xl text-text-muted leading-relaxed font-normal italic border-l-4 border-brand-green pl-6 py-2">
               {detailedPost.hook}
            </div>

            {/* The Problem */}
            <div className="space-y-6 pt-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white">The Real Problem</h2>
              <p className="text-lg md:text-xl text-text-muted leading-relaxed">
                {detailedPost.theProblem}
              </p>
            </div>

            {/* Why It Happens */}
            <div className="space-y-6 pt-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white">Why This Happens</h2>
              <ul className="space-y-4">
                {detailedPost.whyItHappens.map((point, i) => (
                  <li key={i} className="flex items-start gap-4 text-lg text-text-muted leading-relaxed">
                    <span className="flex-shrink-0 mt-1 text-brand-green">
                      <CheckCircle2 size={24} />
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Why Old Advice Fails */}
            <div className="bg-navy-800/50 p-8 rounded-2xl border border-white/5 space-y-4 pt-8">
              <h2 className="text-2xl font-bold text-white">Why Old Advice Fails</h2>
              <div className="space-y-3">
                <p className="text-red-400 font-bold uppercase tracking-widest text-sm">The Myth</p>
                <p className="text-lg md:text-xl text-white">{detailedPost.myth}</p>
                <div className="pt-2">
                  <p className="text-brand-green font-bold uppercase tracking-widest text-sm">The Truth</p>
                  <p className="text-lg md:text-xl text-white">{detailedPost.truth}</p>
                </div>
              </div>
            </div>

            {/* Framework Intro */}
            <div className="space-y-6 pt-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white">Introducing Webolution</h2>
              <p className="text-lg md:text-xl text-text-muted leading-relaxed">
                {detailedPost.frameworkIntro}
              </p>
            </div>

            {/* Framework Phases */}
            <div className="grid gap-6 pt-8">
              {detailedPost.phases.map((phase, i) => (
                <div key={i} className="group relative bg-navy-800 p-6 md:p-8 rounded-xl border border-white/5 hover:border-brand-green/30 transition-colors">
                  <h3 className="text-xl font-bold text-brand-green mb-2 uppercase tracking-wide">
                    {phase.name}
                  </h3>
                  <p className="text-lg text-white leading-relaxed">
                    {phase.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Closing */}
            <div className="pt-12 pb-16 space-y-12">
              <p className="text-xl md:text-2xl text-white font-medium text-center">
                {detailedPost.closing}
              </p>
              
              <div className="text-center">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">
                  Start your Webolution today.
                </h3>
                <Button onClick={onCtaClick} className="px-12">
                  Break the Cycle Now
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>
    </div>
  );
};

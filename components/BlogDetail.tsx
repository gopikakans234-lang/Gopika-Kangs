
import React, { useEffect } from 'react';
import { CONTENT } from '../constants';
import { Section } from './Section';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Button } from './Button';

interface BlogDetailProps {
  postId: string;
  onBack: () => void;
  onCtaClick: () => void;
}

export const BlogDetail: React.FC<BlogDetailProps> = ({ postId, onBack, onCtaClick }) => {
  const postDetails = CONTENT.blog.details[postId as keyof typeof CONTENT.blog.details];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [postId]);

  if (!postDetails) {
    return (
      <div className="pt-32 text-center">
        <p className="text-white">Post not found.</p>
        <button onClick={onBack} className="text-brand-green mt-4">Back to Insights</button>
      </div>
    );
  }

  return (
    <div className="pt-24 md:pt-32">
      <Section className="bg-navy-900 pb-0 px-5 md:px-6" animateOnInView={false}>
        <div className="max-w-3xl mx-auto">
          {/* Back Button */}
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-text-muted hover:text-brand-green transition-colors mb-10 md:mb-12 font-semibold tracking-wide uppercase text-xs md:text-sm"
          >
            <ArrowLeft size={16} /> Back to Insights
          </button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-12 md:space-y-20 pb-20 md:pb-32"
          >
            {/* 1. Hero Section */}
            <header className="space-y-6 md:space-y-8">
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-white leading-[1.1] tracking-tight">
                {postDetails.title}
              </h1>
              <div className="p-6 md:p-8 bg-brand-green/10 border-l-4 border-brand-green rounded-r-2xl">
                <p className="text-lg md:text-2xl text-white font-medium italic leading-relaxed">
                  "{postDetails.heroHook}"
                </p>
              </div>
            </header>

            {/* 2. Section: The Silent Plateau / Strategy Shift */}
            <section className="space-y-6">
              <h2 className="text-2xl md:text-4xl font-bold text-white tracking-tight">
                {postDetails.silentPlateau.heading}
              </h2>
              <p className="text-lg md:text-xl text-text-muted leading-relaxed">
                {postDetails.silentPlateau.text}
              </p>
            </section>

            {/* 3. Section: Hard Work vs Strategy */}
            <section className="space-y-6">
              <h2 className="text-2xl md:text-4xl font-bold text-white tracking-tight">
                {postDetails.hardWorkVsStrategy.heading}
              </h2>
              <p className="text-lg md:text-xl text-text-muted leading-relaxed">
                {postDetails.hardWorkVsStrategy.text}
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4 mt-8">
                <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-2xl">
                   <p className="text-xs font-bold uppercase text-red-400 mb-2 tracking-widest">The Myth</p>
                   <p className="text-lg md:text-xl text-white font-semibold">"{postDetails.hardWorkVsStrategy.myth}"</p>
                </div>
                <div className="p-6 bg-brand-green/10 border border-brand-green/20 rounded-2xl">
                   <p className="text-xs font-bold uppercase text-brand-green mb-2 tracking-widest">The Truth</p>
                   <p className="text-lg md:text-xl text-white font-semibold">"{postDetails.hardWorkVsStrategy.truth}"</p>
                </div>
              </div>
            </section>

            {/* 4. The Real Reason You’re Stuck */}
            <section className="space-y-6">
              <h2 className="text-2xl md:text-4xl font-bold text-white tracking-tight">
                {postDetails.realReason.heading}
              </h2>
              <div className="space-y-4">
                {postDetails.realReason.points.map((point, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 bg-navy-800/40 rounded-xl border border-white/5">
                    <span className="text-brand-green mt-1">
                      <CheckCircle2 size={24} />
                    </span>
                    <p className="text-lg text-text-muted leading-relaxed">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* 5. Introducing Webolution */}
            <section className="space-y-6">
              <h2 className="text-2xl md:text-4xl font-bold text-brand-green tracking-tight">
                {postDetails.webolutionIntro.heading}
              </h2>
              <p className="text-lg md:text-xl text-text-muted leading-relaxed">
                {postDetails.webolutionIntro.text}
              </p>
            </section>

            {/* 6. The Webolution Framework */}
            <section className="space-y-10">
              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-white/10" />
                <span className="text-xs font-black text-brand-green uppercase tracking-[0.3em]">The System</span>
                <div className="h-px flex-1 bg-white/10" />
              </div>
              
              <div className="grid gap-6">
                {postDetails.framework.map((phase: any, i: number) => (
                  <div key={i} className="group p-6 md:p-8 bg-navy-800 border border-white/5 rounded-2xl hover:border-brand-green/30 transition-all shadow-xl shadow-black/20">
                    <h3 className="text-xl md:text-2xl font-black text-white mb-3 uppercase flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center text-sm">{i + 1}</span>
                      {phase.phase}
                    </h3>
                    <p className="text-lg text-text-muted leading-relaxed">
                      {phase.text}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* 7. Closing & CTA */}
            <footer className="text-center space-y-10 pt-10 border-t border-white/5">
              <div className="space-y-4">
                <p className="text-xl md:text-3xl text-white font-bold leading-tight">
                  {postDetails.closing.text}
                </p>
                <p className="text-3xl md:text-5xl font-black text-brand-green uppercase tracking-tighter">
                  {postDetails.closing.cta}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button onClick={onCtaClick} className="w-full sm:w-auto px-12">
                  Break the Cycle Now
                </Button>
              </div>
            </footer>
          </motion.div>
        </div>
      </Section>
    </div>
  );
};

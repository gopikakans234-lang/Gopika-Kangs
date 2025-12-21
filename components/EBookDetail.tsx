
import React from 'react';
import { CONTENT } from '../constants';
import { Section } from './Section';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, AlertTriangle, Lightbulb, TrendingUp } from 'lucide-react';
import { Button } from './Button';

interface EBookDetailProps {
  ebookId: string;
  onBack: () => void;
  onCtaClick: () => void;
}

export const EBookDetail: React.FC<EBookDetailProps> = ({ ebookId, onBack, onCtaClick }) => {
  const details = CONTENT.ebook.details[ebookId as keyof typeof CONTENT.ebook.details];

  if (!details) {
    return (
      <div className="pt-32 text-center text-white h-[80vh] flex flex-col items-center justify-center">
        <p className="text-2xl font-bold mb-4">EBook coming soon.</p>
        <button onClick={onBack} className="text-brand-green flex items-center gap-2 hover:underline">
          <ArrowLeft size={18} /> Back to Library
        </button>
      </div>
    );
  }

  return (
    <div className="pt-24 md:pt-32">
      <Section className="bg-navy-900 pb-20" animateOnInView={false}>
        <div className="max-w-4xl mx-auto px-4">
          
          {/* Navigation */}
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-text-muted hover:text-brand-green transition-colors mb-12 font-bold uppercase tracking-widest text-sm"
          >
            <ArrowLeft size={18} /> Back to Library
          </button>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-20"
          >
            {/* 1. Hero Section */}
            <header className="text-center space-y-8">
               <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-brand-green/10 border border-brand-green/20 text-brand-green text-sm font-black uppercase tracking-widest">
                Official Guide
              </div>
              <div className="space-y-4">
                <h1 className="text-3xl md:text-6xl font-black text-white tracking-tighter leading-tight">
                  {details.hero.heading}
                </h1>
                <p className="text-2xl md:text-4xl font-bold text-brand-green uppercase">
                  {details.hero.subHeading}
                </p>
                <p className="text-xl text-text-muted font-medium italic">
                  — {details.hero.support}
                </p>
              </div>
              <div className="pt-4">
                <Button onClick={onCtaClick} className="px-16 py-6 shadow-2xl">
                  Start Your Webolution
                </Button>
              </div>
            </header>

            {/* 2. Problem Section */}
            <section className="bg-navy-800/40 border border-white/5 rounded-[40px] p-8 md:p-16 space-y-12">
               <div className="flex flex-col md:flex-row gap-12 items-center">
                  <div className="flex-1 space-y-6">
                    <h2 className="text-3xl md:text-4xl font-black text-white">The Stagnation Realities</h2>
                    <p className="text-lg md:text-xl text-text-muted leading-relaxed whitespace-pre-line">
                      {details.problem.text}
                    </p>
                  </div>
                  <div className="w-full md:w-1/3 flex justify-center">
                    <div className="w-32 h-32 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center">
                       <AlertTriangle size={64} />
                    </div>
                  </div>
               </div>

               <div className="space-y-8 pt-8 border-t border-white/5">
                 <h3 className="text-2xl md:text-3xl font-bold text-white text-center">
                   {details.problem.urgency.heading}
                 </h3>
                 <div className="grid md:grid-cols-2 gap-4">
                    {details.problem.urgency.bullets.map((bullet, i) => (
                      <div key={i} className="flex items-start gap-4 p-5 bg-navy-900/50 rounded-2xl border border-white/5">
                        <CheckCircle2 size={24} className="text-red-500 mt-0.5 flex-shrink-0" />
                        <p className="text-lg text-text-muted font-medium">{bullet}</p>
                      </div>
                    ))}
                 </div>
               </div>
            </section>

            {/* 3. Why Old Advice Fails */}
            <section className="text-center space-y-12">
               <div className="inline-flex items-center gap-2 text-white/40 uppercase font-black tracking-[0.4em] text-xs">
                 <Lightbulb size={16} /> Strategy Shift
               </div>
               <h2 className="text-4xl md:text-6xl font-black text-white">{details.advice.heading}</h2>
               
               <div className="max-w-2xl mx-auto py-8 px-6 bg-brand-green/5 border-l-4 border-brand-green rounded-r-2xl">
                 <p className="text-2xl md:text-3xl font-medium text-white italic">
                   "{details.advice.quote}"
                 </p>
               </div>

               <p className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto">
                 This mindset keeps developers stuck on the execution floor while others rise into leadership and influence.
               </p>

               <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto pt-8">
                  <div className="p-8 bg-red-500/10 border border-red-500/20 rounded-3xl space-y-4">
                    <span className="text-xs font-black text-red-500 uppercase tracking-widest">The Myth</span>
                    <p className="text-2xl font-bold text-white">"{details.advice.myth}"</p>
                  </div>
                  <div className="p-8 bg-brand-green/10 border border-brand-green/20 rounded-3xl space-y-4">
                    <span className="text-xs font-black text-brand-green uppercase tracking-widest">The Truth</span>
                    <p className="text-2xl font-bold text-white">"{details.advice.truth}"</p>
                  </div>
               </div>
            </section>

            {/* 4. Solution Section */}
            <section className="space-y-16">
               <div className="text-center space-y-6">
                 <h2 className="text-3xl md:text-5xl font-black text-white">{details.solution.heading}</h2>
                 <p className="text-lg md:text-2xl text-text-muted max-w-3xl mx-auto leading-relaxed">
                   {details.solution.description}
                 </p>
               </div>

               <div className="grid gap-6 md:grid-cols-2">
                 {details.solution.phases.map((phase) => (
                   <div key={phase.id} className="group p-8 bg-navy-800 border border-white/5 rounded-3xl hover:border-brand-green/30 transition-all shadow-xl">
                      <div className="flex items-center justify-between mb-6">
                        <span className="text-xs font-black text-brand-green uppercase tracking-widest">Process Phase 0{phase.id}</span>
                        <TrendingUp size={20} className="text-white/20 group-hover:text-brand-green transition-colors" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4">{phase.title}</h3>
                      <p className="text-text-muted text-lg leading-relaxed">{phase.desc}</p>
                   </div>
                 ))}
               </div>
            </section>

            {/* 5. Final CTA */}
            <footer className="text-center bg-brand-green p-12 md:p-24 rounded-[60px] space-y-8">
               <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-navy-900 tracking-tighter leading-none">
                 Your future-proof developer career starts here
               </h2>
               <div className="pt-4">
                 <Button onClick={onCtaClick} variant="primary" className="bg-navy-900 text-white hover:bg-navy-800 shadow-2xl px-12 py-6 text-xl">
                   {details.cta}
                 </Button>
               </div>
            </footer>

          </motion.div>
        </div>
      </Section>
    </div>
  );
};

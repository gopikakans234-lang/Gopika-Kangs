
import React from 'react';
import { CONTENT } from '../constants';
import { Section } from './Section';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, Pause, FastForward, Rewind, CheckCircle2, Mic2 } from 'lucide-react';
import { Button } from './Button';

interface PodcastDetailProps {
  podcastId: string;
  onBack: () => void;
  onCtaClick: () => void;
}

export const PodcastDetail: React.FC<PodcastDetailProps> = ({ podcastId, onBack, onCtaClick }) => {
  const details = CONTENT.podcast.details[podcastId as keyof typeof CONTENT.podcast.details];

  if (!details) {
    return (
      <div className="pt-32 text-center text-white h-[80vh] flex flex-col items-center justify-center">
        <p className="text-2xl font-bold mb-4">Detailed episode coming soon.</p>
        <button onClick={onBack} className="text-brand-green flex items-center gap-2 hover:underline">
          <ArrowLeft size={18} /> Back to Podcast List
        </button>
      </div>
    );
  }

  return (
    <div className="pt-24 md:pt-32">
      <Section className="bg-navy-900 pb-20" animateOnInView={false}>
        <div className="max-w-4xl mx-auto px-4">
          
          {/* Back Navigation */}
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-text-muted hover:text-brand-green transition-colors mb-8 font-bold uppercase tracking-widest text-sm"
          >
            <ArrowLeft size={18} /> Back to Podcast List
          </button>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-12"
          >
            {/* Header */}
            <header className="text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-green/10 border border-brand-green/20 text-brand-green text-xs font-black uppercase tracking-widest">
                <Mic2 size={14} /> Episode Feature
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter leading-tight">
                {details.title}
              </h1>
            </header>

            {/* Audio Player UI Placeholder */}
            <div className="bg-navy-800 rounded-3xl p-8 border border-white/5 shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
                 <div className="w-1/3 h-full bg-brand-green" />
               </div>
               <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                 <div className="flex items-center gap-6">
                   <button className="text-white/40 hover:text-white transition-colors"><Rewind size={24} /></button>
                   <button className="w-16 h-16 rounded-full bg-brand-green text-navy-900 flex items-center justify-center hover:scale-105 transition-transform">
                     <Play size={32} className="ml-1" />
                   </button>
                   <button className="text-white/40 hover:text-white transition-colors"><FastForward size={24} /></button>
                 </div>
                 <div className="flex-1 w-full space-y-2">
                   <div className="flex justify-between text-xs font-mono text-white/60">
                     <span>05:12</span>
                     <span>18:42</span>
                   </div>
                   <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                     <div className="w-1/3 h-full bg-brand-green" />
                   </div>
                 </div>
               </div>
            </div>

            {/* Description */}
            <div className="prose prose-invert max-w-none">
               <p className="text-xl md:text-2xl text-text-muted leading-relaxed font-medium whitespace-pre-line">
                 {details.description}
               </p>
            </div>

            {/* Talking Points */}
            <section className="space-y-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
                <span className="w-1.5 h-8 bg-brand-green rounded-full" />
                Key Talking Points
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {details.talkingPoints.map((point, i) => (
                  <div key={i} className="flex items-start gap-4 p-5 bg-navy-800/40 rounded-2xl border border-white/5">
                    <span className="text-brand-green mt-1">
                      <CheckCircle2 size={24} />
                    </span>
                    <p className="text-lg text-text-muted font-medium">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Old Advice Section */}
            <section className="bg-navy-800 rounded-3xl p-8 md:p-12 border border-white/5 text-center space-y-10">
              <h2 className="text-3xl md:text-4xl font-black text-white">Why the Old Advice Fails</h2>
              <div className="grid md:grid-cols-2 gap-8 relative">
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/5 hidden md:block" />
                <div className="space-y-4">
                  <span className="text-xs font-black text-red-400 uppercase tracking-[0.3em]">Myth</span>
                  <p className="text-2xl md:text-3xl font-bold text-white italic">"{details.oldAdvice.myth}"</p>
                </div>
                <div className="space-y-4">
                  <span className="text-xs font-black text-brand-green uppercase tracking-[0.3em]">Truth</span>
                  <p className="text-2xl md:text-3xl font-bold text-brand-green italic">"{details.oldAdvice.truth}"</p>
                </div>
              </div>
            </section>

            {/* Blueprint Section */}
            <section className="space-y-10 py-10">
              <div className="text-center space-y-4">
                <h2 className="text-3xl md:text-5xl font-black text-white">{details.blueprint.heading}</h2>
                <p className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto">{details.blueprint.summary}</p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {details.blueprint.phases.map((phase) => (
                  <div key={phase.id} className="p-6 bg-navy-800 border border-white/5 rounded-2xl hover:border-brand-green/30 transition-all shadow-xl">
                    <div className="text-xs font-black text-brand-green uppercase mb-4 tracking-widest">Phase {phase.id}</div>
                    <h3 className="text-xl font-bold text-white mb-2">{phase.title}</h3>
                    <p className="text-text-muted text-sm leading-relaxed">{phase.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* CTA */}
            <div className="text-center pt-10">
               <Button onClick={onCtaClick} className="px-16 py-6 shadow-[0_0_50px_rgba(12,205,126,0.2)]">
                 {details.cta}
               </Button>
            </div>

          </motion.div>
        </div>
      </Section>
    </div>
  );
};

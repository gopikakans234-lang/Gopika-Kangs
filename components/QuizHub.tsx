
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Mic2, ArrowRight, Zap } from 'lucide-react';
import { CONTENT } from '../constants';

interface QuizHubProps {
  onSelect: (id: string) => void;
  onCancel: () => void;
}

export const QuizHub: React.FC<QuizHubProps> = ({ onSelect, onCancel }) => {
  const { quizHub } = CONTENT;

  const iconMap: Record<string, any> = {
    TrendingUp,
    Mic2
  };

  return (
    <div className="pt-32 pb-20 min-h-screen bg-navy-900 flex flex-col items-center px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full text-center"
      >
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-green/10 border border-brand-green/30 text-brand-green text-[10px] font-black uppercase tracking-[0.4em] mb-8">
          <Zap size={14} fill="currentColor" /> Diagnosis Suite
        </div>
        <h1 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tighter uppercase leading-[0.9]">
          {quizHub.heading}
        </h1>
        <p className="text-xl md:text-2xl text-text-muted mb-20 max-w-2xl mx-auto leading-relaxed font-medium">
          {quizHub.subHeading}
        </p>

        <div className="grid md:grid-cols-2 gap-8 w-full">
          {quizHub.variants.map((variant, i) => {
            const Icon = iconMap[variant.icon] || TrendingUp;
            return (
              <motion.div
                key={variant.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.15 }}
                onClick={() => onSelect(variant.id)}
                className="group relative bg-navy-800 border border-white/5 p-10 md:p-14 rounded-[50px] text-left cursor-pointer hover:bg-navy-700 transition-all hover:border-brand-green/40 hover:shadow-2xl hover:shadow-brand-green/5 overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                   <Icon size={120} />
                </div>

                <div className={`w-16 h-16 rounded-[20px] bg-navy-950 flex items-center justify-center mb-10 text-brand-green group-hover:scale-110 transition-transform shadow-xl`}>
                  <Icon size={32} />
                </div>
                
                <span className="text-[10px] font-black text-brand-green uppercase tracking-[0.4em] mb-6 block opacity-60">
                  {variant.tag}
                </span>
                
                <h3 className="text-3xl md:text-4xl font-black text-white mb-6 group-hover:text-brand-green transition-colors uppercase leading-tight tracking-tight">
                  {variant.title}
                </h3>
                
                <p className="text-text-muted text-lg leading-relaxed mb-12 font-medium">
                  {variant.description}
                </p>
                
                <div className="flex items-center gap-3 text-brand-green text-sm font-black uppercase tracking-[0.2em] group-hover:translate-x-3 transition-transform">
                  Launch <ArrowRight size={18} strokeWidth={3} />
                </div>
              </motion.div>
            );
          })}
        </div>

        <button 
          onClick={onCancel}
          className="mt-24 text-sm text-white/20 hover:text-white uppercase font-black tracking-[0.6em] transition-all hover:tracking-[0.7em]"
        >
          Cancel Assessment
        </button>
      </motion.div>
    </div>
  );
};

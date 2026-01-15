
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Mic2, Headphones, Layout, ArrowRight, Zap } from 'lucide-react';
import { CONTENT } from '../constants';

interface QuizHubProps {
  onSelect: (id: string) => void;
  onCancel: () => void;
}

export const QuizHub: React.FC<QuizHubProps> = ({ onSelect, onCancel }) => {
  const { quizHub } = CONTENT;

  const iconMap: Record<string, any> = {
    TrendingUp,
    Mic2,
    Headphones,
    Layout
  };

  return (
    <div className="pt-32 pb-20 min-h-screen bg-navy-900 flex flex-col items-center px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl w-full text-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-green/10 border border-brand-green/30 text-brand-green text-[10px] font-black uppercase tracking-[0.3em] mb-6">
          <Zap size={14} fill="currentColor" /> Diagnosis Suite
        </div>
        <h1 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tighter uppercase leading-none">
          {quizHub.heading}
        </h1>
        <p className="text-xl text-text-muted mb-16 max-w-2xl mx-auto leading-relaxed">
          {quizHub.subHeading}
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {quizHub.variants.map((variant, i) => {
            const Icon = iconMap[variant.icon] || TrendingUp;
            return (
              <motion.div
                key={variant.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => onSelect(variant.id)}
                className="group relative bg-navy-800 border border-white/5 p-8 rounded-[40px] text-left cursor-pointer hover:bg-navy-700 transition-all hover:border-brand-green/40 hover:shadow-2xl hover:shadow-brand-green/5"
              >
                <div className={`w-14 h-14 rounded-2xl bg-navy-900 flex items-center justify-center mb-8 text-white group-hover:text-brand-green transition-colors`}>
                  <Icon size={28} />
                </div>
                
                <span className="text-[10px] font-black text-brand-green uppercase tracking-widest mb-4 block opacity-60">
                  {variant.tag}
                </span>
                
                <h3 className="text-2xl font-black text-white mb-4 group-hover:text-brand-green transition-colors uppercase leading-tight">
                  {variant.title}
                </h3>
                
                <p className="text-text-muted text-sm leading-relaxed mb-8">
                  {variant.description}
                </p>
                
                <div className="flex items-center gap-2 text-brand-green text-xs font-black uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                  Launch <ArrowRight size={14} strokeWidth={3} />
                </div>
              </motion.div>
            );
          })}
        </div>

        <button 
          onClick={onCancel}
          className="mt-20 text-sm text-white/20 hover:text-white uppercase font-black tracking-[0.4em] transition-all"
        >
          Cancel and return home
        </button>
      </motion.div>
    </div>
  );
};

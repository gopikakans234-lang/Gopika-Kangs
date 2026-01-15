
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Headphones, Play, Pause, Volume2, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import { CONTENT } from '../constants';
import { Button } from './Button';

interface AudioQuizProps {
  onCancel: () => void;
  onComplete: (score: number) => void;
}

export const AudioQuiz: React.FC<AudioQuizProps> = ({ onCancel, onComplete }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [step, setStep] = useState<'quiz' | 'analyzing'>('quiz');

  const scenarios = CONTENT.audioQuiz.scenarios;
  const currentScenario = scenarios[currentIdx];

  const handleNext = () => {
    if (selected === null) return;
    
    const newAnswers = [...answers, selected];
    setAnswers(newAnswers);
    setSelected(null);
    setIsPlaying(false);

    if (currentIdx < scenarios.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setStep('analyzing');
      setTimeout(() => {
        const correctCount = newAnswers.filter((ans, i) => ans === scenarios[i].correct).length;
        onComplete((correctCount / scenarios.length) * 100);
      }, 3000);
    }
  };

  if (step === 'analyzing') {
    return (
      <div className="min-h-screen bg-navy-900 flex flex-col items-center justify-center p-6 text-center">
        <Loader2 className="text-brand-green animate-spin mb-8" size={64} />
        <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-4">Analyzing Professional Intuition...</h2>
        <p className="text-text-muted font-black uppercase tracking-[0.3em] text-xs">Matching with Leadership Neural Patterns</p>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 min-h-screen bg-navy-900 flex flex-col items-center px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full"
      >
        <div className="flex justify-between items-center mb-12">
           <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-brand-green/10 text-brand-green rounded-full flex items-center justify-center">
               <Headphones size={24} />
             </div>
             <div>
               <h1 className="text-2xl font-black text-white uppercase tracking-tight leading-none">Audio Intuition</h1>
               <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em]">Listening Path</span>
             </div>
           </div>
           <div className="flex gap-2">
             {scenarios.map((_, i) => (
               <div key={i} className={`w-8 h-1 rounded-full ${i <= currentIdx ? 'bg-brand-green' : 'bg-white/10'}`} />
             ))}
           </div>
        </div>

        <div className="bg-navy-800 rounded-[50px] border border-white/5 p-8 md:p-16 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 text-center space-y-12">
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase leading-tight">
              {currentScenario.title}
            </h2>
            <p className="text-lg text-text-muted font-medium max-w-2xl mx-auto italic">
              "{currentScenario.context}"
            </p>

            {/* Audio Player UI */}
            <div className="bg-navy-900/50 p-10 rounded-[40px] border border-white/5 space-y-8 max-w-xl mx-auto">
               <div className="flex items-center justify-center gap-8">
                 <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-20 h-20 rounded-full bg-brand-green text-navy-900 flex items-center justify-center hover:scale-105 transition-all shadow-xl shadow-brand-green/20"
                 >
                   {isPlaying ? <Pause size={32} /> : <Play size={32} className="ml-1" />}
                 </button>
                 <div className="flex-1 space-y-4">
                   <div className="flex items-end justify-between h-8 gap-0.5">
                     {[...Array(30)].map((_, i) => (
                       <motion.div 
                        key={i}
                        animate={{ height: isPlaying ? [4, Math.random() * 32, 4] : 4 }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                        className="w-1.5 bg-brand-green/40 rounded-full" 
                       />
                     ))}
                   </div>
                   <div className="flex justify-between text-[10px] font-black text-white/20 uppercase tracking-widest">
                     <span>Scenario Clip</span>
                     <span>00:14 / 00:14</span>
                   </div>
                 </div>
               </div>
            </div>

            {/* Options */}
            <div className="grid md:grid-cols-2 gap-4 text-left">
              {currentScenario.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => setSelected(i)}
                  className={`p-6 rounded-3xl border transition-all text-lg font-bold ${selected === i ? 'bg-brand-green border-brand-green text-navy-900' : 'bg-navy-900 border-white/5 text-white hover:border-brand-green/30'}`}
                >
                  <span className="opacity-40 mr-4 font-black">0{i+1}</span>
                  {opt}
                </button>
              ))}
            </div>

            <div className="pt-8">
              <Button 
                onClick={handleNext} 
                disabled={selected === null}
                className="w-full sm:w-auto px-16 py-6"
              >
                Confirm Perception <ArrowRight className="ml-2" />
              </Button>
            </div>
          </div>
        </div>

        <button 
          onClick={onCancel}
          className="mt-12 text-sm text-white/20 hover:text-white uppercase font-black tracking-widest block mx-auto"
        >
          Exit Assessment
        </button>
      </motion.div>
    </div>
  );
};

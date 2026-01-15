
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout, ArrowRight, Loader2, ZoomIn } from 'lucide-react';
import { CONTENT } from '../constants';
import { Button } from './Button';

interface ImageQuizProps {
  onCancel: () => void;
  onComplete: (score: number) => void;
}

export const ImageQuiz: React.FC<ImageQuizProps> = ({ onCancel, onComplete }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [step, setStep] = useState<'quiz' | 'analyzing'>('quiz');

  const scenarios = CONTENT.imageQuiz.scenarios;
  const currentScenario = scenarios[currentIdx];

  const handleNext = () => {
    if (selected === null) return;
    
    const newAnswers = [...answers, selected];
    setAnswers(newAnswers);
    setSelected(null);

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
        <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-4">Validating Technical Perception...</h2>
        <p className="text-text-muted font-black uppercase tracking-[0.3em] text-xs">Matching with Principal Architect Standards</p>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 min-h-screen bg-navy-900 flex flex-col items-center px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl w-full"
      >
        <div className="flex justify-between items-center mb-12">
           <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-orange-400/10 text-orange-400 rounded-full flex items-center justify-center">
               <Layout size={24} />
             </div>
             <div>
               <h1 className="text-2xl font-black text-white uppercase tracking-tight leading-none">Visual Architect</h1>
               <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em]">Technical Design Path</span>
             </div>
           </div>
           <div className="flex gap-2">
             {scenarios.map((_, i) => (
               <div key={i} className={`w-8 h-1 rounded-full ${i <= currentIdx ? 'bg-orange-400' : 'bg-white/10'}`} />
             ))}
           </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
           <div className="relative group rounded-[40px] overflow-hidden border border-white/5 shadow-2xl bg-navy-800">
             <img 
               src={currentScenario.image} 
               alt="Scenario" 
               className="w-full aspect-square object-cover opacity-80 group-hover:opacity-100 transition-opacity"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 to-transparent flex items-end p-10">
                <div className="bg-navy-900/90 backdrop-blur-md px-6 py-3 rounded-2xl flex items-center gap-3 text-xs font-black text-white uppercase tracking-widest border border-white/10">
                  <ZoomIn size={16} /> Analysis View 01
                </div>
             </div>
           </div>

           <div className="space-y-10 py-6">
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase leading-tight">
                {currentScenario.question}
              </h2>

              <div className="space-y-4">
                {currentScenario.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => setSelected(i)}
                    className={`w-full p-6 rounded-3xl border transition-all text-lg font-bold text-left flex justify-between items-center ${selected === i ? 'bg-orange-400 border-orange-400 text-navy-900' : 'bg-navy-800 border-white/5 text-white hover:border-orange-400/30'}`}
                  >
                    <span>{opt}</span>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selected === i ? 'border-navy-900' : 'border-white/10'}`}>
                      {selected === i && <div className="w-3 h-3 bg-navy-900 rounded-full" />}
                    </div>
                  </button>
                ))}
              </div>

              <div className="pt-8">
                <Button 
                  onClick={handleNext} 
                  disabled={selected === null}
                  className="w-full py-6 bg-orange-400 text-navy-900 hover:bg-orange-500 shadow-orange-400/20"
                >
                  Submit Analysis <ArrowRight className="ml-2" />
                </Button>
              </div>
           </div>
        </div>

        <button 
          onClick={onCancel}
          className="mt-20 text-sm text-white/20 hover:text-white uppercase font-black tracking-widest block mx-auto"
        >
          Exit Assessment
        </button>
      </motion.div>
    </div>
  );
};

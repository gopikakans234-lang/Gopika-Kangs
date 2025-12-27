
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONTENT } from '../constants';
import { HelpCircle, Clock, Shield, CheckCircle2, ArrowRight, User, X, Compass, CheckCircle } from 'lucide-react';
import { Button } from './Button';

interface TestSessionProps {
  onComplete: () => void;
  onCancel: () => void;
}

export const TestSession: React.FC<TestSessionProps> = ({ onComplete, onCancel }) => {
  const [step, setStep] = useState<'intro' | 'test'>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const { assessment } = CONTENT;

  const handleStart = () => setStep('test');

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = value;
    setAnswers(newAnswers);

    // Auto-advance with a slight delay for visual feedback
    setTimeout(() => {
      if (currentQuestionIndex < assessment.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        onComplete();
      }
    }, 400);
  };

  const progress = ((currentQuestionIndex) / assessment.questions.length) * 100;

  if (step === 'intro') {
    return (
      <div className="pt-32 pb-20 min-h-screen bg-[#FDFDFF] flex flex-col items-center px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xl w-full text-center"
        >
          {/* Top Logo/Icon Circle */}
          <div className="w-20 h-20 bg-brand-green/20 text-brand-green rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-brand-green/10">
            <Compass size={40} strokeWidth={1.5} />
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-navy-900 mb-4 tracking-tight">
            Personality Assessment
          </h1>
          <p className="text-lg text-gray-400 font-medium mb-12">
            Discover your authentic professional personality type
          </p>

          <div className="bg-[#F8F9FD] rounded-[32px] p-8 md:p-12 space-y-6 mb-12 text-left shadow-sm border border-gray-100">
            <div className="flex items-center gap-4 group">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-brand-green bg-white shadow-sm">
                <HelpCircle size={20} />
              </div>
              <span className="text-navy-900 font-semibold text-lg">50 questions to complete</span>
            </div>
            <div className="flex items-center gap-4 group">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-brand-green bg-white shadow-sm">
                <Clock size={20} />
              </div>
              <span className="text-navy-900 font-semibold text-lg">Takes 8-12 minutes</span>
            </div>
            <div className="flex items-center gap-4 group">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-brand-green bg-white shadow-sm">
                <CheckCircle size={20} />
              </div>
              <span className="text-navy-900 font-semibold text-lg">Answer honestly for accuracy</span>
            </div>
            <div className="flex items-center gap-4 group">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-brand-green bg-white shadow-sm">
                <Shield size={20} />
              </div>
              <span className="text-navy-900 font-semibold text-lg">Your results are private</span>
            </div>
          </div>

          <Button 
            onClick={handleStart} 
            className="w-full py-5 text-xl bg-brand-green hover:bg-brand-hover text-navy-900 shadow-xl shadow-brand-green/20"
          >
            Begin Assessment <ArrowRight className="ml-2" />
          </Button>

          <button onClick={onCancel} className="mt-8 text-sm text-gray-400 hover:text-navy-900 transition-colors uppercase font-black tracking-widest">
            Back to Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen bg-white text-navy-900 flex flex-col">
      {/* Top Progress Bar */}
      <div className="sticky top-16 bg-white z-40 px-6 py-6 border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-3">
            <motion.div 
              className="h-full bg-brand-green"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ type: 'spring', stiffness: 50, damping: 20 }}
            />
          </div>
          <div className="flex justify-between items-center text-[11px] font-black uppercase tracking-widest text-gray-300">
            <span>{Math.round(progress)}%</span>
            <span>{currentQuestionIndex}/{assessment.questions.length} questions</span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center py-12 px-6">
        <div className="max-w-3xl w-full">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentQuestionIndex}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="bg-[#FAFAFF] border border-gray-100 rounded-[40px] p-10 md:p-20 text-center shadow-sm"
            >
              <div className="mb-12">
                <span className="inline-block px-4 py-1.5 bg-brand-green/10 text-brand-green text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-8">
                  Question {currentQuestionIndex + 1}
                </span>
                
                <div className="flex flex-col items-center gap-6">
                  <User className="text-brand-green opacity-40" size={32} />
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-navy-900 leading-[1.3] max-w-2xl">
                    {assessment.questions[currentQuestionIndex]}
                  </h2>
                </div>
              </div>

              {/* Enhanced Likert Scale UI */}
              <div className="mt-16 relative">
                <div className="flex items-center justify-between max-w-lg mx-auto mb-16 relative">
                  {/* Connector Line */}
                  <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-gray-200 z-0" />
                  
                  {[...Array(7)].map((_, i) => {
                    // Logic for sizes and colors based on index (Agree -> Disagree)
                    // i=0 is strong agree, i=3 is neutral, i=6 is strong disagree
                    const val = i - 3; 
                    const absVal = Math.abs(val);
                    const baseSize = 34;
                    const size = baseSize + (absVal * 12);
                    const isActive = answers[currentQuestionIndex] === i;
                    
                    // Color mapping: Purple-ish for agree, Blue-ish for disagree as in images
                    // But We'll use Brand Green -> Brand Navy
                    let colorClass = "border-gray-200 bg-white";
                    if (i < 3) colorClass = "border-brand-green"; // Agree side
                    if (i === 3) colorClass = "border-gray-300"; // Neutral
                    if (i > 3) colorClass = "border-navy-900"; // Disagree side

                    return (
                      <button
                        key={i}
                        onClick={() => handleAnswer(i)}
                        className={`
                          relative z-10 rounded-full border-2 transition-all duration-300 group
                          ${isActive ? 'scale-125 shadow-xl ring-4 ring-offset-4' : 'hover:scale-110'}
                          ${isActive && i < 3 ? 'bg-brand-green border-brand-green ring-brand-green/20' : ''}
                          ${isActive && i === 3 ? 'bg-gray-400 border-gray-400 ring-gray-400/20' : ''}
                          ${isActive && i > 3 ? 'bg-navy-900 border-navy-900 ring-navy-900/20' : ''}
                          ${!isActive ? colorClass : ''}
                        `}
                        style={{ width: size, height: size }}
                      >
                        {isActive && (
                          <motion.div 
                            initial={{ scale: 0 }} 
                            animate={{ scale: 1 }} 
                            className="flex items-center justify-center w-full h-full text-white"
                          >
                            <CheckCircle2 size={size * 0.5} />
                          </motion.div>
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="flex justify-between max-w-lg mx-auto">
                  <span className="text-xs font-black uppercase tracking-widest text-brand-green">Agree</span>
                  <span className="text-xs font-black uppercase tracking-widest text-navy-900">Disagree</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Persistent Footer */}
      <div className="p-8 border-t border-gray-100 flex justify-center">
         <button 
           onClick={onCancel}
           className="p-3 text-gray-300 hover:text-red-500 transition-colors rounded-full hover:bg-red-50"
           title="Cancel Assessment"
         >
           <X size={24} />
         </button>
      </div>
    </div>
  );
};

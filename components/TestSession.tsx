
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONTENT } from '../constants';
import { 
  HelpCircle, 
  Clock, 
  Shield, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  User, 
  X, 
  Compass, 
  Activity, 
  Phone, 
  Mail, 
  Edit3
} from 'lucide-react';
import { Button } from './Button';

type Step = 'intro' | 'test' | 'summary' | 'details';

interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface TestSessionProps {
  onComplete: (data: { userInfo: UserInfo; answers: number[] }) => void;
  onCancel: () => void;
}

export const TestSession: React.FC<TestSessionProps> = ({ onComplete, onCancel }) => {
  const [step, setStep] = useState<Step>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>(new Array(CONTENT.assessment.questions.length).fill(-1));
  const [userInfo, setUserInfo] = useState<UserInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  const { assessment } = CONTENT;

  const handleStart = () => setStep('test');

  const handleSelectAnswer = (value: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = value;
    setAnswers(newAnswers);
  };

  const goToNext = () => {
    if (currentQuestionIndex < assessment.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setStep('summary');
    }
  };

  const goToPrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete({ userInfo, answers });
  };

  const progress = ((currentQuestionIndex + 1) / assessment.questions.length) * 100;

  // Render Intro
  if (step === 'intro') {
    return (
      <div className="pt-32 pb-20 min-h-screen bg-navy-900 flex flex-col items-center px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xl w-full text-center"
        >
          <div className="w-20 h-20 bg-brand-green/20 text-brand-green rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-brand-green/10">
            <Compass size={40} strokeWidth={1.5} />
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Career Presence Audit
          </h1>
          <p className="text-lg text-text-muted font-medium mb-12">
            Evaluate your career mindset and professional authority
          </p>

          <div className="bg-navy-800 rounded-[32px] p-8 md:p-12 space-y-6 mb-12 text-left shadow-sm border border-white/5">
            {assessment.intro.stats.filter(s => s.icon !== 'microphone').map((stat, i) => (
              <div key={i} className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-brand-green bg-navy-900 shadow-sm border border-white/5">
                  {stat.icon === 'help' && <HelpCircle size={20} />}
                  {stat.icon === 'clock' && <Clock size={20} />}
                  {stat.icon === 'shield' && <Shield size={20} />}
                  {stat.icon === 'check' && <Activity size={20} />}
                </div>
                <span className="text-white font-semibold text-lg">{stat.label}</span>
              </div>
            ))}
          </div>

          <Button 
            onClick={handleStart} 
            className="w-full py-5 text-xl bg-brand-green hover:bg-brand-hover text-navy-900 shadow-xl shadow-brand-green/20"
          >
            {assessment.intro.cta} <ArrowRight className="ml-2" />
          </Button>

          <button onClick={onCancel} className="mt-8 text-sm text-white/40 hover:text-white transition-colors uppercase font-black tracking-widest">
            Back to Home
          </button>
        </motion.div>
      </div>
    );
  }

  // Render Test Questions
  if (step === 'test') {
    return (
      <div className="pt-24 min-h-screen bg-navy-900 text-white flex flex-col">
        <div className="sticky top-16 bg-navy-900 z-40 px-6 py-6 border-b border-white/5">
          <div className="max-w-4xl mx-auto">
            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden mb-3">
              <motion.div 
                className="h-full bg-brand-green shadow-[0_0_10px_rgba(12,205,126,0.5)]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ type: 'spring', stiffness: 50, damping: 20 }}
              />
            </div>
            <div className="flex justify-between items-center text-[11px] font-black uppercase tracking-widest text-white/30">
              <span>{Math.round(progress)}% Complete</span>
              <span>Question {currentQuestionIndex + 1}/{assessment.questions.length}</span>
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
                className="bg-navy-800 border border-white/5 rounded-[40px] p-8 md:p-16 text-center shadow-2xl relative"
              >
                <div className="mb-12">
                  <div className="flex flex-col items-center gap-6">
                    <div className="w-12 h-12 bg-brand-green/10 text-brand-green rounded-full flex items-center justify-center mb-2">
                       <User size={24} />
                    </div>
                    <h2 className="text-2xl md:text-4xl font-black text-white leading-[1.3] max-w-2xl">
                      {assessment.questions[currentQuestionIndex]}
                    </h2>
                  </div>
                </div>

                <div className="mt-16 relative">
                  <div className="flex items-center justify-between max-w-lg mx-auto mb-12 relative">
                    <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-white/5 z-0" />
                    {[...Array(7)].map((_, i) => {
                      const isActive = answers[currentQuestionIndex] === i;
                      const baseSize = 32;
                      const size = baseSize + (Math.abs(i - 3) * 6);
                      
                      let bgClass = "bg-white/10";
                      let activeBg = "";
                      if (i < 3) activeBg = "bg-brand-green";
                      if (i === 3) activeBg = "bg-white/40";
                      if (i > 3) activeBg = "bg-brand-green"; // Inverted logic for Disagree if needed, but solid green for choice is fine

                      return (
                        <button
                          key={i}
                          onClick={() => handleSelectAnswer(i)}
                          className={`
                            relative z-10 rounded-full transition-all duration-300 group
                            ${isActive ? 'scale-125 shadow-[0_0_20px_rgba(12,205,126,0.4)]' : 'hover:scale-110'}
                            ${isActive ? activeBg : bgClass}
                            border-2 border-transparent
                            flex items-center justify-center
                          `}
                          style={{ width: size, height: size }}
                        >
                          {isActive && (
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-navy-900">
                              <CheckCircle2 size={size * 0.5} />
                            </motion.div>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex justify-between max-w-lg mx-auto opacity-50">
                    <span className="text-[10px] font-black uppercase tracking-widest text-brand-green">Strongly Agree</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-white">Strongly Disagree</span>
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="mt-16 flex items-center justify-between">
                  <button 
                    onClick={goToPrev}
                    disabled={currentQuestionIndex === 0}
                    className="flex items-center gap-2 text-sm font-bold text-white/40 hover:text-white transition-colors disabled:opacity-0"
                  >
                    <ArrowLeft size={18} /> Back
                  </button>
                  
                  <Button 
                    onClick={goToNext}
                    disabled={answers[currentQuestionIndex] === -1}
                    className="px-10 py-3 bg-white text-navy-900 hover:bg-brand-green hover:text-navy-900 border-none rounded-xl"
                  >
                    {currentQuestionIndex === assessment.questions.length - 1 ? 'Finish' : 'Next'} <ArrowRight size={18} className="ml-1" />
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    );
  }

  // Render Summary
  if (step === 'summary') {
    return (
      <div className="pt-32 pb-20 min-h-screen bg-navy-900 flex flex-col items-center px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-3xl w-full"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Review Your Audit</h1>
            <p className="text-text-muted">Ensure your answers reflect your true current state for the most accurate roadmap.</p>
          </div>

          <div className="bg-navy-800 border border-white/5 rounded-[40px] p-6 md:p-10 space-y-4 max-h-[60vh] overflow-y-auto mb-10 custom-scrollbar">
            {assessment.questions.map((q, idx) => {
              const answer = answers[idx];
              const labels = ["Strongly Agree", "Agree", "Somewhat Agree", "Neutral", "Somewhat Disagree", "Disagree", "Strongly Disagree"];
              
              return (
                <div key={idx} className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-navy-900/50 border border-white/5 hover:border-brand-green/20 transition-all group">
                  <div className="flex-1">
                    <p className="text-white font-medium mb-1 leading-snug">{q}</p>
                    <p className="text-xs text-brand-green font-bold uppercase tracking-widest">{labels[answer]}</p>
                  </div>
                  <button 
                    onClick={() => {
                      setCurrentQuestionIndex(idx);
                      setStep('test');
                    }}
                    className="p-2 text-white/20 hover:text-brand-green transition-colors"
                    title="Change Answer"
                  >
                    <Edit3 size={18} />
                  </button>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
             <button 
               onClick={() => {
                 setCurrentQuestionIndex(assessment.questions.length - 1);
                 setStep('test');
               }}
               className="px-8 py-4 text-white/60 hover:text-white font-bold transition-colors"
             >
               Back to Questions
             </button>
             <Button onClick={() => setStep('details')} className="px-12">
               Generate My Blueprint <ArrowRight className="ml-2" />
             </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Render Details Form
  if (step === 'details') {
    return (
      <div className="pt-32 pb-20 min-h-screen bg-navy-900 flex flex-col items-center px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full"
        >
          <div className="text-center mb-10">
             <div className="w-16 h-16 bg-brand-green/20 text-brand-green rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield size={32} />
             </div>
             <h1 className="text-3xl font-black text-white mb-2">Almost Done</h1>
             <p className="text-text-muted">Enter your details to receive your personalized 12-page Career Strategy Blueprint.</p>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-4">
             <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                 <label className="text-xs font-bold uppercase tracking-widest text-white/40">First Name</label>
                 <input 
                   required
                   type="text"
                   value={userInfo.firstName}
                   onChange={(e) => setUserInfo({...userInfo, firstName: e.target.value})}
                   className="w-full bg-navy-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-green/50"
                   placeholder="John"
                 />
               </div>
               <div className="space-y-2">
                 <label className="text-xs font-bold uppercase tracking-widest text-white/40">Last Name</label>
                 <input 
                   required
                   type="text"
                   value={userInfo.lastName}
                   onChange={(e) => setUserInfo({...userInfo, lastName: e.target.value})}
                   className="w-full bg-navy-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-green/50"
                   placeholder="Doe"
                 />
               </div>
             </div>

             <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/40">Business Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                  <input 
                    required
                    type="email"
                    value={userInfo.email}
                    onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                    className="w-full bg-navy-800 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-green/50"
                    placeholder="john@company.com"
                  />
                </div>
             </div>

             <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/40">Mobile (Optional)</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                  <input 
                    type="tel"
                    value={userInfo.phone}
                    onChange={(e) => setUserInfo({...userInfo, phone: e.target.value})}
                    className="w-full bg-navy-800 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-green/50"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
             </div>

             <div className="pt-6">
                <Button type="submit" fullWidth className="py-5 text-lg shadow-2xl">
                   Access My Roadmap <ArrowRight className="ml-2" />
                </Button>
             </div>
             
             <p className="text-[10px] text-center text-white/20 mt-6 leading-relaxed">
               By proceeding, you agree to our Terms of Service and Privacy Policy. We value your data security and never spam.
             </p>
          </form>

          <button 
            onClick={() => setStep('summary')}
            className="w-full mt-6 text-sm font-bold text-white/20 hover:text-white transition-colors"
          >
            Back to Summary
          </button>
        </motion.div>
      </div>
    );
  }

  return null;
};

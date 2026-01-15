import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONTENT } from '../constants';
import { 
  Shield, 
  ArrowRight, 
  ArrowLeft, 
  User, 
  Activity, 
  Phone, 
  Mail, 
  Edit3,
  Check,
  CheckCircle2
} from 'lucide-react';
import { Button } from './Button';

type Step = 'intro' | 'test' | 'summary' | 'details' | 'processing';

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
    setStep('processing');
    setTimeout(() => {
      onComplete({ userInfo, answers });
    }, 2500);
  };

  // 1. Intro Step
  if (step === 'intro') {
    return (
      <div className="pt-32 pb-20 min-h-screen bg-navy-900 flex flex-col items-center px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full text-center flex flex-col items-center"
        >
          <div className="w-20 h-20 bg-brand-green/10 text-brand-green rounded-full flex items-center justify-center mb-8">
            <Activity size={40} />
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight uppercase leading-none">
            {assessment.intro.heading}
          </h1>
          <p className="text-xl text-text-muted font-medium mb-12 max-w-lg mx-auto leading-relaxed">
            {assessment.intro.subHeading}
          </p>

          <div className="flex flex-col gap-4 mb-16 w-full max-w-md">
            {assessment.intro.list.map((item, i) => (
              <div key={i} className="flex items-center gap-4 text-left p-2">
                <div className="text-brand-green">
                  <CheckCircle2 size={24} />
                </div>
                <span className="text-white font-bold text-lg">{item}</span>
              </div>
            ))}
          </div>

          <Button 
            onClick={handleStart} 
            className="w-full sm:w-auto px-16 py-6 text-xl shadow-2xl"
          >
            {assessment.intro.cta} <ArrowRight className="ml-2" />
          </Button>

          <button onClick={onCancel} className="mt-10 text-sm text-white/30 hover:text-white transition-colors uppercase font-black tracking-widest">
            {assessment.intro.back}
          </button>
        </motion.div>
      </div>
    );
  }

  // 2. Questioning Step
  if (step === 'test') {
    return (
      <div className="min-h-screen bg-navy-900 flex items-center justify-center pt-24 pb-12 px-4 sm:px-10">
        
        {/* Inner Container: Updated background to match deep navy theme */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-6xl h-full min-h-[75vh] bg-navy-800/80 rounded-[50px] border border-white/5 flex flex-col relative overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.5)]"
        >
          
          {/* Content Wrapper */}
          <div className="flex-1 flex flex-col items-center justify-center px-6 md:px-12 max-w-4xl mx-auto w-full relative">
            
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentQuestionIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-center w-full pt-8"
              >
                {/* Question Text */}
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-20 md:mb-24 tracking-tight">
                  {assessment.questions[currentQuestionIndex]}
                </h2>

                {/* Slider / Circles Area */}
                <div className="relative w-full max-w-lg mx-auto pb-16">
                  {/* Horizontal line */}
                  <div className="absolute left-0 right-0 top-[16px] h-[1px] bg-white/10 z-0" />
                  
                  <div className="flex items-center justify-between relative z-10 px-2 h-[32px]">
                    {[...Array(7)].map((_, i) => {
                      const isActive = answers[currentQuestionIndex] === i;
                      const sizes = [32, 16, 16, 16, 16, 16, 32];
                      const size = sizes[i];
                      
                      return (
                        <div key={i} className="flex flex-col items-center justify-center h-full">
                          <button
                            onClick={() => handleSelectAnswer(i)}
                            className={`
                              relative rounded-full transition-all duration-300 transform
                              flex items-center justify-center
                            `}
                            style={{ 
                              width: size, 
                              height: size, 
                              backgroundColor: isActive ? '#0CCD7E' : 'rgba(255, 255, 255, 0.08)' 
                            }}
                          >
                            {isActive && (
                              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                <Check size={size * 0.6} className="text-navy-950" strokeWidth={4} />
                              </motion.div>
                            )}
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  {/* Labels */}
                  <div className="flex justify-between mt-8 px-1">
                    <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] text-[#0CCD7E]">
                      STRONGLY AGREE
                    </span>
                    <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
                      STRONGLY DISAGREE
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Bar inside the inner box */}
          <div className="w-full px-12 pb-12 flex items-center justify-between">
            <button 
              onClick={goToPrev}
              disabled={currentQuestionIndex === 0}
              className="flex items-center gap-2 px-4 py-2 text-xs font-black uppercase tracking-widest text-white/20 hover:text-white transition-colors disabled:opacity-0"
            >
              <ArrowLeft size={16} /> Back
            </button>
            
            <button 
              onClick={goToNext}
              disabled={answers[currentQuestionIndex] === -1}
              className="flex items-center gap-2 px-8 py-4 bg-brand-green/80 hover:bg-brand-green text-navy-950 font-bold rounded-2xl transition-all shadow-lg group"
            >
               <span className="text-lg font-bold">
                 {currentQuestionIndex === assessment.questions.length - 1 ? 'Review' : 'Next'}
               </span>
               <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // 3. Summary Review Step
  if (step === 'summary') {
    return (
      <div className="pt-32 pb-20 min-h-screen bg-navy-900 flex flex-col items-center px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-4xl w-full"
        >
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight uppercase mb-4">Review Audit</h1>
            <p className="text-lg text-text-muted font-medium">Verify your responses before the final career analysis.</p>
          </div>

          <div className="space-y-4 mb-16 max-h-[60vh] overflow-y-auto pr-4 custom-scrollbar text-left">
            {assessment.questions.map((q, idx) => {
              const answer = answers[idx];
              const labels = ["Strongly Agree", "Agree", "Somewhat Agree", "Neutral", "Somewhat Disagree", "Disagree", "Strongly Disagree"];
              
              return (
                <div key={idx} className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 rounded-[32px] bg-navy-800/40 border border-white/5 hover:border-brand-green/30 transition-all group">
                  <div className="flex gap-4 items-start flex-1">
                    <span className="text-[10px] font-black text-brand-green opacity-40 mt-1">{idx + 1}</span>
                    <p className="text-white/80 font-bold text-lg leading-snug">{q}</p>
                  </div>
                  <div className="flex items-center gap-6 flex-shrink-0">
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] text-brand-green font-black uppercase tracking-widest mb-1">{labels[answer]}</span>
                      <div className="flex gap-1">
                        {[...Array(7)].map((_, i) => (
                          <div key={i} className={`w-2.5 h-2.5 rounded-full ${i === answer ? 'bg-brand-green shadow-[0_0_8px_rgba(12,205,126,0.6)]' : 'bg-white/10'}`} />
                        ))}
                      </div>
                    </div>
                    <button 
                      onClick={() => {
                        setCurrentQuestionIndex(idx);
                        setStep('test');
                      }}
                      className="p-4 bg-navy-950 text-white/30 hover:text-brand-green hover:bg-brand-green/10 rounded-2xl transition-all"
                    >
                      <Edit3 size={20} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row gap-6 w-full justify-center pt-8 border-t border-white/10">
             <button 
               onClick={() => {
                 setCurrentQuestionIndex(assessment.questions.length - 1);
                 setStep('test');
               }}
               className="px-10 py-5 text-white/30 hover:text-white font-black uppercase tracking-widest text-sm transition-colors"
             >
               Go Back
             </button>
             <Button onClick={() => setStep('details')} className="px-16 py-6 text-xl shadow-2xl">
               Proceed to Final Step <ArrowRight className="ml-2" />
             </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  // 4. Detailed Lead Form Step
  if (step === 'details') {
    return (
      <div className="pt-32 pb-20 min-h-screen bg-navy-900 flex flex-col items-center px-6 text-left">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full"
        >
          <div className="text-center mb-12">
             <div className="w-20 h-20 bg-brand-green text-navy-950 rounded-[24px] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-brand-green/30">
                <Shield size={36} strokeWidth={2.5} />
             </div>
             <h1 className="text-4xl font-black text-white mb-4 uppercase tracking-tight">Access Results</h1>
             <p className="text-lg text-text-muted font-medium">Complete your details to receive your 12-page analysis.</p>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-6">
             <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase tracking-widest text-white/30 px-1">First Name</label>
                 <div className="relative">
                   <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                   <input 
                     required
                     type="text"
                     value={userInfo.firstName}
                     onChange={(e) => setUserInfo({...userInfo, firstName: e.target.value})}
                     className="w-full bg-navy-800 border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-white/10 focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent transition-all"
                     placeholder="First"
                   />
                 </div>
               </div>
               <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase tracking-widest text-white/30 px-1">Last Name</label>
                 <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                    <input 
                      required
                      type="text"
                      value={userInfo.lastName}
                      onChange={(e) => setUserInfo({...userInfo, lastName: e.target.value})}
                      className="w-full bg-navy-800 border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-white/10 focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent transition-all"
                      placeholder="Last"
                    />
                 </div>
               </div>
             </div>

             <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/30 px-1">Professional Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                  <input 
                    required
                    type="email"
                    value={userInfo.email}
                    onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                    className="w-full bg-navy-800 border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-white/10 focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent transition-all"
                    placeholder="name@company.com"
                  />
                </div>
             </div>

             <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/30 px-1">Mobile (Optional)</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                  <input 
                    type="tel"
                    value={userInfo.phone}
                    onChange={(e) => setUserInfo({...userInfo, phone: e.target.value})}
                    className="w-full bg-navy-800 border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-white/10 focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent transition-all"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
             </div>

             <div className="pt-8">
                <Button type="submit" fullWidth className="py-6 text-xl shadow-2xl shadow-brand-green/20">
                   Generate Full Report <ArrowRight className="ml-2" />
                </Button>
             </div>
             
             <p className="text-[10px] text-center text-white/20 mt-10 leading-relaxed font-black uppercase tracking-widest">
               Your career data is protected. <br/>By continuing, you agree to our privacy protocol.
             </p>
          </form>
        </motion.div>
      </div>
    );
  }

  // 5. Processing Step
  if (step === 'processing') {
    return (
      <div className="min-h-screen bg-navy-900 flex flex-col items-center justify-center p-6 text-center">
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-32 h-32 bg-brand-green/10 rounded-[40px] border-2 border-brand-green/30 flex items-center justify-center mb-12"
        >
          <Activity size={64} className="text-brand-green" />
        </motion.div>
        <h2 className="text-3xl font-black text-white uppercase tracking-tight mb-4">Finalizing Audit...</h2>
        <div className="w-64 h-2 bg-white/5 rounded-full overflow-hidden mx-auto">
          <motion.div 
            className="h-full bg-brand-green"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.5 }}
          />
        </div>
      </div>
    );
  }

  return null;
};
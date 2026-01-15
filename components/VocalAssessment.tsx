
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Square, ArrowRight, Loader2, CheckCircle, Volume2, Activity, Zap, ShieldCheck, ArrowLeft, TrendingUp } from 'lucide-react';
import { CONTENT } from '../constants';
import { Button } from './Button';

type Step = 'intro' | 'onboarding' | 'record' | 'processing' | 'results';

export const VocalAssessment: React.FC<{ onCancel: () => void; onComplete: (data: any) => void }> = ({ onCancel, onComplete }) => {
  const [step, setStep] = useState<Step>('intro');
  const [onboardingIdx, setOnboardingIdx] = useState(0);
  const [multiSelect, setMultiSelect] = useState<string[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingComplete, setRecordingComplete] = useState(false);
  const [loadingMsgIdx, setLoadingMsgIdx] = useState(0);
  const [result, setResult] = useState<any>(null);

  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioContext = useRef<AudioContext | null>(null);
  const analyser = useRef<AnalyserNode | null>(null);
  const animationFrame = useRef<number | null>(null);
  const [waveformData, setWaveformData] = useState<number[]>(new Array(40).fill(5));

  const content = CONTENT.voiceAnalysis;
  const onboardingSteps = content.onboarding;

  useEffect(() => {
    if (step === 'processing') {
      const interval = setInterval(() => {
        setLoadingMsgIdx(prev => (prev + 1) % content.loadingMessages.length);
      }, 1500);
      
      setTimeout(() => {
        const personas = content.personas;
        setResult(personas[Math.floor(Math.random() * personas.length)]);
        setStep('results');
      }, 6000);

      return () => clearInterval(interval);
    }
  }, [step]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      
      audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      const source = audioContext.current.createMediaStreamSource(stream);
      analyser.current = audioContext.current.createAnalyser();
      analyser.current.fftSize = 128;
      source.connect(analyser.current);

      const bufferLength = analyser.current.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const animate = () => {
        analyser.current?.getByteFrequencyData(dataArray);
        const normalizedData = Array.from(dataArray).slice(0, 40).map(v => Math.max(5, v / 4));
        setWaveformData(normalizedData);
        animationFrame.current = requestAnimationFrame(animate);
      };
      
      animate();
      mediaRecorder.current.start();
      setIsRecording(true);

      setTimeout(() => {
        if (mediaRecorder.current?.state === 'recording') stopRecording();
      }, 6000);

    } catch (err) {
      alert("Microphone access is required for the analysis.");
      onCancel();
    }
  };

  const stopRecording = () => {
    mediaRecorder.current?.stop();
    setIsRecording(false);
    setRecordingComplete(true);
    if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
    if (audioContext.current) audioContext.current.close();
  };

  const nextOnboarding = () => {
    if (onboardingIdx < onboardingSteps.length - 1) {
      setOnboardingIdx(onboardingIdx + 1);
    } else {
      setStep('record');
    }
  };

  const prevOnboarding = () => {
    if (onboardingIdx > 0) {
      setOnboardingIdx(onboardingIdx - 1);
    } else {
      setStep('intro');
    }
  };

  if (step === 'intro') {
    return (
      <div className="pt-32 pb-20 min-h-screen flex flex-col items-center px-6">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-2xl w-full text-center flex flex-col items-center">
          <div className="w-20 h-20 bg-brand-green/10 text-brand-green rounded-full flex items-center justify-center mb-8">
            <Volume2 size={40} className="animate-pulse" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter leading-none">{content.intro.heading}</h1>
          <p className="text-xl md:text-2xl text-brand-green mb-4 font-black uppercase tracking-widest">{content.intro.subHeading}</p>
          <p className="text-lg text-text-muted mb-12 font-medium max-w-lg mx-auto">{content.intro.description}</p>
          
          <Button onClick={() => setStep('onboarding')} className="w-full sm:w-auto px-16 py-6 text-xl shadow-2xl">
            {content.intro.cta} <ArrowRight className="ml-2" />
          </Button>
          <button onClick={onCancel} className="mt-10 text-sm text-white/30 hover:text-white uppercase font-black tracking-[0.3em] transition-colors">{content.intro.back}</button>
        </motion.div>
      </div>
    );
  }

  if (step === 'onboarding') {
    const current = onboardingSteps[onboardingIdx];
    const progress = ((onboardingIdx + 1) / onboardingSteps.length) * 100;

    return (
      <div className="min-h-screen flex flex-col items-center pt-24 pb-12 px-6">
        <div className="w-full max-w-2xl">
          {/* Progress Bar */}
          <div className="flex items-center justify-between mb-8">
             <button onClick={prevOnboarding} className="text-white/20 hover:text-white transition-colors">
               <ArrowLeft size={24} />
             </button>
             <div className="flex-1 mx-8 h-1 bg-white/5 rounded-full overflow-hidden">
               <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} className="h-full bg-brand-green" />
             </div>
             <span className="text-[10px] font-black text-white/20 tracking-widest">{onboardingIdx + 1} / {onboardingSteps.length}</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div 
              key={onboardingIdx}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-12"
            >
              <div className="text-center space-y-4">
                <h2 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight uppercase">
                  {current.title}
                </h2>
                {current.subtitle && <p className="text-lg text-text-muted font-medium">{current.subtitle}</p>}
                {current.helper && <p className="text-sm text-white/30 font-bold uppercase tracking-widest">{current.helper}</p>}
              </div>

              {/* Specific Screen Types */}
              {current.type === 'vision' ? (
                <div className="space-y-12">
                   <div className="relative h-64 w-full bg-navy-800/50 rounded-[40px] border border-white/5 flex items-end justify-center px-10 pb-10 overflow-hidden">
                      <div className="absolute top-10 left-10 text-xs font-black text-white/20 uppercase tracking-widest">Growth Forecast</div>
                      {/* Graph Visual */}
                      <div className="flex items-end gap-16 w-full">
                         <div className="flex-1 flex flex-col items-center gap-4">
                            <motion.div initial={{ height: 20 }} animate={{ height: 40 }} className="w-full bg-red-500/20 rounded-t-2xl border-t border-red-500/40" />
                            <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">{current.labels[0]}</span>
                         </div>
                         <div className="flex-1 flex flex-col items-center gap-4">
                            <motion.div initial={{ height: 20 }} animate={{ height: 140 }} className="w-full bg-brand-green/20 rounded-t-2xl border-t border-brand-green/60 shadow-[0_0_30px_rgba(12,205,126,0.2)]" />
                            <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">{current.labels[1]}</span>
                         </div>
                      </div>
                   </div>
                   <div className="space-y-4">
                     {current.callouts.map((c, i) => (
                       <div key={i} className="p-5 bg-navy-800/30 rounded-3xl border border-white/5 text-sm font-bold text-white/80">
                         {c}
                       </div>
                     ))}
                   </div>
                   <Button onClick={nextOnboarding} fullWidth className="py-6">Continue</Button>
                </div>
              ) : current.type === 'welcome' ? (
                <div className="text-center space-y-10">
                   <p className="text-xl text-text-muted leading-relaxed font-medium italic">"{current.description}"</p>
                   <div className="py-10">
                      <div className="w-24 h-24 bg-brand-green/10 text-brand-green rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-brand-green/5">
                        <CheckCircle size={48} />
                      </div>
                   </div>
                   <Button onClick={nextOnboarding} fullWidth className="py-6">Continue</Button>
                </div>
              ) : (
                <div className="grid gap-4">
                   {current.options?.map((opt, i) => {
                     const isSelected = multiSelect.includes(opt);
                     return (
                       <button
                         key={i}
                         onClick={() => {
                           if (current.type === 'multi') {
                             setMultiSelect(prev => prev.includes(opt) ? prev.filter(x => x !== opt) : [...prev, opt]);
                           } else {
                             nextOnboarding();
                           }
                         }}
                         className={`w-full p-6 rounded-3xl border text-left text-lg font-bold transition-all flex items-center justify-between ${isSelected ? 'bg-brand-green text-navy-900 border-brand-green' : 'bg-navy-800/40 border-white/5 text-white hover:border-brand-green/30 hover:bg-navy-800'}`}
                       >
                         {opt}
                         {current.type === 'multi' && (
                           <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-navy-900' : 'border-white/10'}`}>
                             {isSelected && <div className="w-3 h-3 bg-navy-900 rounded-full" />}
                           </div>
                         )}
                       </button>
                     );
                   })}
                   {current.type === 'multi' && (
                     <div className="pt-8">
                        <Button onClick={nextOnboarding} fullWidth className="py-6">Continue</Button>
                     </div>
                   )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    );
  }

  if (step === 'record') {
    const currentStep = content.steps[0];
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 pb-12 px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-3xl bg-navy-800/90 border border-white/5 rounded-[50px] p-8 md:p-16 shadow-[0_40px_100px_rgba(0,0,0,0.5)] backdrop-blur-xl"
        >
          <div className="mb-12 flex items-center gap-2">
            <Zap size={14} className="text-brand-green fill-current" />
            <span className="text-[10px] font-black text-brand-green uppercase tracking-[0.4em]">Vocal Calibration Protocol</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-white mb-12 leading-tight tracking-tight uppercase">
            {currentStep.question}
          </h2>

          <div className="flex flex-col items-center gap-12">
            <div className="w-full p-10 bg-navy-950/80 rounded-[40px] border border-brand-green/20 text-center shadow-inner">
              <p className="text-2xl md:text-3xl font-medium italic text-white/90 leading-relaxed font-serif">
                "{currentStep.sentence}"
              </p>
            </div>

            <div className="flex flex-col items-center gap-8 w-full">
              <div className="flex items-end justify-center gap-1.5 h-32 w-full mb-6">
                {waveformData.map((h, i) => (
                  <motion.div 
                    key={i} 
                    animate={{ height: isRecording ? h : 4 }} 
                    className={`w-1.5 md:w-2 rounded-full ${isRecording ? 'bg-brand-green shadow-[0_0_15px_rgba(12,205,126,0.3)]' : 'bg-white/10'}`} 
                  />
                ))}
              </div>

              <div className="relative">
                <button
                  onClick={isRecording ? stopRecording : startRecording}
                  disabled={recordingComplete && !isRecording}
                  className={`w-28 h-28 rounded-full flex items-center justify-center transition-all shadow-2xl relative z-10 ${isRecording ? 'bg-red-500 hover:scale-105' : 'bg-brand-green hover:scale-110 disabled:opacity-50'}`}
                >
                  {isRecording && <div className="absolute inset-0 rounded-full border-4 border-red-500 animate-ping opacity-50" />}
                  {isRecording ? <Square fill="white" size={32} /> : <Mic className="text-navy-900" size={44} strokeWidth={2.5} />}
                </button>
              </div>
              
              <div className="text-center space-y-2">
                <p className="text-sm font-black uppercase tracking-[0.4em] text-white/60">
                  {isRecording ? "Capturing Resonance..." : recordingComplete ? "Voice Profile Cached" : currentStep.instruction}
                </p>
                {isRecording && <p className="text-[10px] font-black text-brand-green uppercase tracking-widest animate-pulse">Stay in your normal tone</p>}
              </div>

              {recordingComplete && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <Button onClick={() => setStep('processing')} className="px-16 py-6 text-xl shadow-2xl mt-4">
                    Analyze My Signature <ArrowRight size={20} className="ml-2" />
                  </Button>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  if (step === 'processing') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-navy-900">
        <div className="relative w-48 h-48 mb-16 flex items-center justify-center">
           <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} className="absolute inset-0 border-4 border-brand-green/5 border-t-brand-green rounded-full shadow-[0_0_50px_rgba(12,205,126,0.2)]" />
           <Activity size={60} className="text-brand-green animate-pulse" />
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-6 leading-none">
          {content.loadingMessages[loadingMsgIdx]}
        </h2>
        <p className="text-white/20 font-black uppercase tracking-[0.5em] text-xs">Vocal Neural Processing</p>
      </div>
    );
  }

  if (step === 'results' && result) {
    return (
      <div className="pt-32 pb-20 min-h-screen px-6 flex flex-col items-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl w-full space-y-12">
          <header className="text-center space-y-4">
             <div className="inline-block px-5 py-2 rounded-full bg-brand-green/10 border border-brand-green/20 text-brand-green text-[10px] font-black uppercase tracking-[0.4em]">Vocal Identity Decoded</div>
             <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase leading-[0.85] mb-4">
               The <span className="text-brand-green">{result.name.split(' ')[1]}</span>
             </h1>
          </header>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 bg-navy-800 rounded-[50px] p-8 md:p-16 border border-white/5 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center gap-12">
               <div className="relative w-48 h-48 flex items-center justify-center flex-shrink-0">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
                    <motion.circle 
                      cx="96" cy="96" r="88" 
                      stroke="currentColor" strokeWidth="12" fill="transparent" 
                      strokeDasharray={552} 
                      initial={{ strokeDashoffset: 552 }}
                      animate={{ strokeDashoffset: 552 - (552 * (result.score / 100)) }}
                      transition={{ duration: 2, ease: "easeOut" }}
                      className="text-brand-green" 
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute text-center">
                    <span className="text-6xl font-black text-white">{result.score}</span>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 block mt-1">Impact</span>
                  </div>
               </div>
               <div className="space-y-6 text-center md:text-left">
                  <h3 className="text-3xl font-black text-white uppercase tracking-tight">{result.name}</h3>
                  <p className="text-xl text-white/70 leading-relaxed font-medium italic">"{result.description}"</p>
               </div>
            </div>
            
            <div className="bg-brand-green text-navy-900 rounded-[50px] p-10 flex flex-col justify-center items-center text-center space-y-8 shadow-2xl">
               <div className="w-20 h-20 bg-navy-900/10 rounded-3xl flex items-center justify-center"><Activity size={40} strokeWidth={2.5} /></div>
               <div className="space-y-2">
                 <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60">Status</span>
                 <h4 className="text-3xl font-black uppercase leading-none">Authority Profile Active</h4>
               </div>
            </div>
          </div>

          <div className="bg-white rounded-[60px] p-12 md:p-20 text-center space-y-12 shadow-2xl shadow-black/30">
            <h2 className="text-4xl md:text-6xl font-black text-navy-900 uppercase tracking-tighter leading-none">Unlock Your Vocal Leverage</h2>
            <p className="text-navy-900/60 text-xl md:text-2xl max-w-2xl mx-auto font-medium leading-relaxed">
              Your voice is currently performing at {result.score - 8}% of its leadership potential. Get the detailed breakdown of your resonance and projection patterns.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6 pt-4">
              <Button onClick={() => onComplete({ type: 'voice', result })} className="px-20 py-7 text-2xl shadow-2xl shadow-brand-green/30">Generate Signature Report</Button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return null;
};


import React, { useState, useEffect } from 'react';
import { CONTENT } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronLeft, ChevronRight, Menu, X, Bookmark, Download } from 'lucide-react';
import { Button } from './Button';

interface EBookDetailProps {
  ebookId: string;
  onBack: () => void;
  onCtaClick: () => void;
}

export const EBookDetail: React.FC<EBookDetailProps> = ({ ebookId, onBack, onCtaClick }) => {
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const details = CONTENT.ebook.details[ebookId as keyof typeof CONTENT.ebook.details];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentChapterIndex]);

  if (!details) {
    return (
      <div className="pt-32 text-center text-white h-screen flex flex-col items-center justify-center bg-navy-900">
        <p className="text-2xl font-bold mb-4">Book file not found in library.</p>
        <button onClick={onBack} className="text-brand-green flex items-center gap-2 hover:underline">
          <ArrowLeft size={18} /> Return to Library
        </button>
      </div>
    );
  }

  const currentChapter = details.chapters[currentChapterIndex];
  const totalChapters = details.chapters.length;

  const handleNext = () => {
    if (currentChapterIndex < totalChapters - 1) {
      setCurrentChapterIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentChapterIndex > 0) {
      setCurrentChapterIndex(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-navy-900 selection:bg-brand-green/20">
      {/* 1. Viewer Top Bar */}
      <nav className="sticky top-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-100 z-[60] flex items-center justify-between px-4 md:px-8 py-4 h-18">
        <div className="flex items-center gap-6">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-navy-900"
            title="Exit Reader"
          >
            <ArrowLeft size={22} />
          </button>
          <div className="hidden sm:block h-5 w-px bg-gray-200" />
          <h2 className="text-sm font-black uppercase tracking-[0.2em] text-gray-300 hidden lg:block">
            {details.title}
          </h2>
        </div>

        {/* Progress and Nav */}
        <div className="flex items-center gap-4 md:gap-10">
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest leading-none mb-1.5">
              Chapter {currentChapterIndex + 1} of {totalChapters}
            </span>
            <div className="w-24 md:w-40 h-1 bg-gray-100 rounded-full overflow-hidden">
               <motion.div 
                 className="h-full bg-brand-green"
                 initial={{ width: 0 }}
                 animate={{ width: `${((currentChapterIndex + 1) / totalChapters) * 100}%` }}
               />
            </div>
          </div>
          
          <div className="flex items-center gap-1 md:gap-3">
            <button 
              onClick={handlePrev}
              disabled={currentChapterIndex === 0}
              className="p-2 md:px-4 hover:bg-gray-100 rounded-lg transition-colors text-navy-900 disabled:opacity-10 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={22} />
            </button>
            <button 
              onClick={handleNext}
              disabled={currentChapterIndex === totalChapters - 1}
              className="p-2 md:px-5 hover:bg-gray-100 rounded-lg transition-colors text-navy-900 disabled:opacity-10 disabled:cursor-not-allowed flex items-center gap-1.5"
            >
              <span className="hidden md:inline font-black uppercase text-xs tracking-widest">Next</span>
              <ChevronRight size={22} />
            </button>
          </div>
          
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-navy-900"
          >
            <Menu size={22} />
          </button>
        </div>
      </nav>

      <div className="flex relative">
        {/* 2. Sidebar / Table of Contents */}
        <AnimatePresence>
          {isSidebarOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsSidebarOpen(false)}
                className="fixed inset-0 bg-navy-900/5 backdrop-blur-[2px] z-[70]"
              />
              <motion.aside
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                className="fixed top-0 right-0 h-full w-full max-w-sm bg-white border-l border-gray-100 z-[80] shadow-[0_0_100px_rgba(0,0,0,0.1)] p-10 md:p-14 flex flex-col"
              >
                <div className="flex items-center justify-between mb-12">
                  <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-300">Table of Contents</h3>
                  <button onClick={() => setIsSidebarOpen(false)} className="text-gray-400 hover:text-navy-900 transition-colors"><X size={24}/></button>
                </div>
                <div className="space-y-4 flex-1 overflow-y-auto custom-scrollbar pr-4">
                  {details.chapters.map((chapter, i) => (
                    <button
                      key={chapter.id}
                      onClick={() => {
                        setCurrentChapterIndex(i);
                        setIsSidebarOpen(false);
                      }}
                      className={`w-full text-left p-6 rounded-2xl transition-all border ${currentChapterIndex === i ? 'bg-navy-900 text-white border-navy-900 shadow-xl' : 'hover:bg-gray-50 border-transparent text-navy-700'}`}
                    >
                      <span className={`text-[10px] font-black uppercase block mb-2 tracking-[0.2em] ${currentChapterIndex === i ? 'opacity-40' : 'text-gray-300'}`}>Chapter 0{i+1}</span>
                      <span className="text-lg font-black leading-tight uppercase tracking-tight">{chapter.title}</span>
                    </button>
                  ))}
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* 3. Main Reading Area */}
        <main className="w-full flex justify-center py-20 md:py-32 px-6 md:px-12">
          <motion.article 
            key={currentChapter.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-[800px] w-full"
          >
            {/* Chapter Header */}
            <header className="mb-20 md:mb-32 text-center">
              <span className="inline-block px-4 py-2 bg-gray-50 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-8">
                Chapter 0{currentChapterIndex + 1}
              </span>
              <h1 className="text-4xl md:text-7xl font-black text-navy-900 tracking-tighter leading-none uppercase">
                {currentChapter.title}
              </h1>
            </header>

            {/* Reading Content */}
            <div className="prose prose-lg md:prose-2xl max-w-none text-navy-900/90 font-serif leading-relaxed space-y-12">
              
              {/* Introduction Content */}
              {currentChapter.id === 'intro' && (
                <div className="space-y-12">
                   <p className="text-2xl md:text-3xl font-black text-brand-green uppercase tracking-tight font-sans text-center">
                     {(currentChapter.content as any).heading}
                   </p>
                   <div className="text-2xl md:text-4xl leading-snug font-medium italic border-l-4 border-gray-100 pl-8 md:pl-12 py-4">
                     {(currentChapter.content as any).text.split('\n').map((line: string, i: number) => (
                       <p key={i} className="mb-4">{line}</p>
                     ))}
                   </div>
                </div>
              )}

              {/* Problem Content */}
              {currentChapter.id === 'problem' && (
                <div className="space-y-12">
                   <div className="space-y-4 text-center md:text-left">
                      <h2 className="text-3xl md:text-5xl font-black text-navy-900 tracking-tight uppercase font-sans">
                        {(currentChapter.content as any).heading}
                      </h2>
                      <p className="text-xl md:text-2xl text-gray-400 font-medium italic">
                        {(currentChapter.content as any).subHeading}
                      </p>
                   </div>
                   
                   <div className="grid gap-6 mt-16 font-sans">
                     {(currentChapter.content as any).points.map((point: string, i: number) => (
                       <div key={i} className="flex items-start gap-5 p-8 bg-gray-50 rounded-3xl border border-gray-100 hover:border-brand-green/30 transition-all group">
                         <div className="mt-1.5 flex-shrink-0 w-6 h-6 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center">
                           <X size={14} strokeWidth={4} />
                         </div>
                         <span className="text-xl md:text-2xl font-bold text-navy-900 leading-tight">{point}</span>
                       </div>
                     ))}
                   </div>
                </div>
              )}

              {/* Advice Content */}
              {currentChapter.id === 'advice' && (
                <div className="space-y-20">
                   <div className="bg-gray-50 p-12 md:p-20 rounded-[60px] text-center italic font-serif text-3xl md:text-5xl leading-tight border border-gray-100 shadow-sm">
                     "{(currentChapter.content as any).quote}"
                   </div>
                   <p className="text-2xl text-center max-w-2xl mx-auto text-gray-400 font-medium">
                     {(currentChapter.content as any).explanation}
                   </p>
                   <div className="grid md:grid-cols-2 gap-10 py-10 font-sans">
                      <div className="p-10 bg-red-500/[0.03] border border-red-500/10 rounded-[40px] text-center space-y-6">
                        <span className="text-[11px] font-black uppercase text-red-400 tracking-[0.3em]">The Myth</span>
                        <p className="text-2xl md:text-3xl font-black text-navy-900 leading-tight">"{(currentChapter.content as any).myth}"</p>
                      </div>
                      <div className="p-10 bg-brand-green/[0.03] border border-brand-green/10 rounded-[40px] text-center space-y-6 shadow-2xl shadow-brand-green/5">
                        <span className="text-[11px] font-black uppercase text-brand-green tracking-[0.3em]">The Truth</span>
                        <p className="text-2xl md:text-3xl font-black text-navy-900 leading-tight">"{(currentChapter.content as any).truth}"</p>
                      </div>
                   </div>
                </div>
              )}

              {/* Generic Phase/Blueprint Content */}
              {(currentChapter.id.startsWith('phase') || currentChapter.id === 'blueprint') && (
                <div className="space-y-16 py-10">
                   <div className="space-y-8">
                     <h2 className="text-4xl md:text-7xl font-black leading-none uppercase font-sans tracking-tighter">
                       {(currentChapter.content as any).heading}
                     </h2>
                     <p className="text-2xl md:text-4xl text-gray-400 font-medium leading-relaxed italic">
                       {(currentChapter.content as any).description}
                     </p>
                   </div>
                   
                   <div className="p-10 md:p-16 bg-navy-900 rounded-[50px] text-white space-y-10 font-sans shadow-2xl">
                      <div className="text-brand-green text-[10px] font-black uppercase tracking-[0.5em]">Protocol Implementation</div>
                      <p className="text-xl md:text-2xl font-bold opacity-90 leading-relaxed">
                        This phase focuses on technical and professional recalibration. Most developers wait for permission; we build authority through intentional design.
                      </p>
                   </div>
                </div>
              )}
            </div>

            {/* End of Chapter Navigation */}
            <div className="mt-40 pt-20 border-t border-gray-100 flex flex-col items-center gap-16">
               {currentChapterIndex === totalChapters - 1 ? (
                 <div className="text-center space-y-12 w-full">
                    <h3 className="text-3xl md:text-6xl font-black text-navy-900 uppercase tracking-tighter leading-none">{details.footer.cta}</h3>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                       <Button onClick={onCtaClick} className="px-16 py-6 shadow-2xl text-xl">Join the Webolution</Button>
                       <Button variant="secondary" className="bg-gray-100 text-navy-900 border-transparent hover:bg-gray-200 px-10">
                         <Download size={20} className="mr-2" /> Download PDF
                       </Button>
                    </div>
                    <div className="flex justify-center gap-10 pt-4">
                       <button className="flex items-center gap-2.5 text-gray-300 hover:text-navy-900 font-black uppercase text-[10px] tracking-[0.4em] transition-colors group">
                         <Bookmark size={16} className="group-hover:text-brand-green" /> Bookmark Progress
                       </button>
                    </div>
                 </div>
               ) : (
                 <button 
                  onClick={handleNext}
                  className="group flex flex-col items-center gap-10 w-full"
                 >
                   <span className="text-[11px] font-black uppercase tracking-[0.4em] text-gray-300 group-hover:text-brand-green transition-colors">Next Chapter</span>
                   <span className="text-4xl md:text-7xl font-black text-navy-900 group-hover:text-brand-green transition-all tracking-tighter uppercase flex items-center gap-6">
                     {details.chapters[currentChapterIndex + 1].title} <ChevronRight size={60} className="group-hover:translate-x-4 transition-transform" />
                   </span>
                 </button>
               )}
            </div>
          </motion.article>
        </main>
      </div>
    </div>
  );
};

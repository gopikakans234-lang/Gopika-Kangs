
import React, { useState, useEffect } from 'react';
import { CONTENT } from '../constants';
import { Section } from './Section';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronLeft, ChevronRight, Menu, X, BookOpen, Download, Bookmark } from 'lucide-react';
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
    <div className="min-h-screen bg-white text-navy-900 selection:bg-brand-green/30">
      {/* 1. Viewer Top Bar */}
      <nav className="sticky top-0 w-full bg-white/90 backdrop-blur-md border-b border-navy-100 z-[60] flex items-center justify-between px-4 md:px-8 py-3 h-16">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-navy-50 rounded-full transition-colors text-navy-400 hover:text-navy-900"
            title="Exit Reader"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="hidden sm:block h-4 w-px bg-navy-100" />
          <h2 className="text-sm md:text-base font-black uppercase tracking-widest text-navy-900/40 hidden sm:block">
            {details.title}
          </h2>
        </div>

        {/* Progress and Nav */}
        <div className="flex items-center gap-2 md:gap-6">
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-bold text-navy-300 uppercase tracking-widest leading-none mb-1">
              Chapter {currentChapterIndex + 1} of {totalChapters}
            </span>
            <div className="w-24 md:w-32 h-1 bg-navy-100 rounded-full overflow-hidden">
               <motion.div 
                 className="h-full bg-brand-green"
                 initial={{ width: 0 }}
                 animate={{ width: `${((currentChapterIndex + 1) / totalChapters) * 100}%` }}
               />
            </div>
          </div>
          
          <div className="flex items-center gap-1 md:gap-2">
            <button 
              onClick={handlePrev}
              disabled={currentChapterIndex === 0}
              className="p-2 md:px-3 hover:bg-navy-50 rounded-lg transition-colors text-navy-900 disabled:opacity-20 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={handleNext}
              disabled={currentChapterIndex === totalChapters - 1}
              className="p-2 md:px-3 hover:bg-navy-50 rounded-lg transition-colors text-navy-900 disabled:opacity-20 disabled:cursor-not-allowed flex items-center gap-1"
            >
              <span className="hidden md:inline font-bold text-sm">Next</span>
              <ChevronRight size={20} />
            </button>
          </div>
          
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 hover:bg-navy-50 rounded-full transition-colors text-navy-900"
          >
            <Menu size={20} />
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
                className="fixed inset-0 bg-navy-900/20 backdrop-blur-sm z-[70]"
              />
              <motion.aside
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                className="fixed top-0 right-0 h-full w-full max-w-xs bg-white border-l border-navy-100 z-[80] shadow-2xl p-8 flex flex-col"
              >
                <div className="flex items-center justify-between mb-10">
                  <h3 className="text-xs font-black uppercase tracking-widest text-navy-300">Table of Contents</h3>
                  <button onClick={() => setIsSidebarOpen(false)} className="text-navy-400 hover:text-navy-900"><X size={20}/></button>
                </div>
                <div className="space-y-4 flex-1 overflow-y-auto">
                  {details.chapters.map((chapter, i) => (
                    <button
                      key={chapter.id}
                      onClick={() => {
                        setCurrentChapterIndex(i);
                        setIsSidebarOpen(false);
                      }}
                      className={`w-full text-left p-4 rounded-xl transition-all border ${currentChapterIndex === i ? 'bg-navy-900 text-white border-navy-900 shadow-lg' : 'hover:bg-navy-50 border-transparent text-navy-600'}`}
                    >
                      <span className="text-[10px] font-black opacity-40 uppercase block mb-1">0{i+1}</span>
                      <span className="text-base font-bold leading-tight">{chapter.title}</span>
                    </button>
                  ))}
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* 3. Main Reading Area */}
        <main className="w-full flex justify-center py-12 md:py-24 px-6 md:px-12 bg-white">
          <motion.article 
            key={currentChapter.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl w-full"
          >
            {/* Chapter Header */}
            <header className="mb-16 md:mb-24 text-center">
              <span className="inline-block px-3 py-1 bg-navy-50 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-navy-400 mb-6">
                Chapter {currentChapterIndex + 1}
              </span>
              <h1 className="text-4xl md:text-6xl font-black text-navy-900 tracking-tighter leading-none font-serif">
                {currentChapter.title}
              </h1>
            </header>

            {/* Content Switcher based on Chapter ID */}
            <div className="prose prose-lg md:prose-xl max-w-none text-navy-800 space-y-8 leading-relaxed">
              
              {/* Orientation / Intro Chapter */}
              {currentChapter.id === 'intro' && (
                <div className="space-y-12">
                   <div className="text-center space-y-4 mb-20">
                     <h2 className="text-2xl md:text-3xl font-black text-brand-green uppercase tracking-tight">{(currentChapter.content as any).heading}</h2>
                     <p className="text-xl md:text-2xl font-bold italic">{(currentChapter.content as any).subHeading}</p>
                     <p className="text-lg text-navy-400 font-medium">{(currentChapter.content as any).support}</p>
                   </div>
                   <div className="space-y-8 font-serif italic text-2xl md:text-3xl border-l-4 border-navy-100 pl-8 text-navy-900/70">
                     {(currentChapter.content as any).narrative.map((p: string, i: number) => <p key={i}>{p}</p>)}
                   </div>
                </div>
              )}

              {/* Stagnation Chapter */}
              {currentChapter.id === 'stagnation' && (
                <div className="space-y-12">
                   <h2 className="text-3xl md:text-4xl font-black text-center">{(currentChapter.content as any).heading}</h2>
                   <div className="grid gap-4 mt-12">
                     {/* Use type assertion to handle polymorphic content structure */}
                     {(currentChapter.content as any).bullets.map((bullet: string, i: number) => (
                       <div key={i} className="flex items-center gap-4 p-6 bg-navy-50 rounded-2xl">
                         <div className="w-2 h-2 rounded-full bg-brand-green" />
                         <span className="text-xl font-bold">{bullet}</span>
                       </div>
                     ))}
                   </div>
                </div>
              )}

              {/* Myth/Truth Chapter */}
              {currentChapter.id === 'myth' && (
                <div className="space-y-16">
                   {/* Fix Property access errors via content type assertion */}
                   <div className="bg-navy-50 p-12 md:p-16 rounded-[40px] text-center italic font-serif text-3xl md:text-4xl leading-snug">
                     "{(currentChapter.content as any).quote}"
                   </div>
                   <p className="text-xl text-center max-w-lg mx-auto text-navy-500 font-medium">
                     {(currentChapter.content as any).explanation}
                   </p>
                   <div className="grid md:grid-cols-2 gap-8 py-10">
                      <div className="p-8 border-2 border-red-500/10 rounded-3xl text-center space-y-4">
                        <span className="text-[10px] font-black uppercase text-red-500 tracking-widest">The Myth</span>
                        <p className="text-2xl font-bold">"{(currentChapter.content as any).myth}"</p>
                      </div>
                      <div className="p-8 border-2 border-brand-green/20 rounded-3xl text-center space-y-4 shadow-xl shadow-brand-green/5">
                        <span className="text-[10px] font-black uppercase text-brand-green tracking-widest">The Truth</span>
                        <p className="text-2xl font-bold">"{(currentChapter.content as any).truth}"</p>
                      </div>
                   </div>
                </div>
              )}

              {/* Blueprint Chapters (Debug, Design, etc.) */}
              {currentChapter.id.startsWith('blueprint') && (
                <div className="space-y-12 py-10">
                   <div className="inline-flex items-center gap-2 text-brand-green font-black uppercase tracking-widest text-xs">
                     <BookOpen size={16} /> Strategy Node
                   </div>
                   <h2 className="text-4xl md:text-5xl font-black font-serif leading-tight">{(currentChapter.content as any).heading}</h2>
                   {/* Cast as any to resolve missing 'description' property error on intro-shaped content */}
                   <p className="text-2xl md:text-3xl text-navy-500 leading-relaxed">
                     {(currentChapter.content as any).description}
                   </p>
                </div>
              )}
            </div>

            {/* End of Chapter Navigation */}
            <div className="mt-32 pt-16 border-t border-navy-100 flex flex-col items-center gap-12">
               {currentChapterIndex === totalChapters - 1 ? (
                 <div className="text-center space-y-10 w-full">
                    <h3 className="text-3xl md:text-4xl font-black text-navy-900">{details.footer.cta}</h3>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                       <Button onClick={onCtaClick} className="px-12">Start Your Webolution</Button>
                       <Button variant="secondary" className="bg-navy-50 text-navy-900 border-transparent hover:bg-navy-100">
                         <Download size={18} className="mr-2" /> Download PDF
                       </Button>
                    </div>
                    <div className="flex justify-center gap-8 pt-4">
                       <button className="flex items-center gap-2 text-navy-300 hover:text-navy-900 font-bold uppercase text-[10px] tracking-widest transition-colors">
                         <Bookmark size={14} /> Bookmark Progress
                       </button>
                    </div>
                 </div>
               ) : (
                 <button 
                  onClick={handleNext}
                  className="group flex flex-col items-center gap-6"
                 >
                   <span className="text-[10px] font-black uppercase tracking-[0.3em] text-navy-300 group-hover:text-brand-green transition-colors">Next Chapter</span>
                   <span className="text-3xl md:text-5xl font-black text-navy-900 group-hover:text-brand-green transition-all tracking-tighter font-serif flex items-center gap-4">
                     {details.chapters[currentChapterIndex + 1].title} <ChevronRight size={40} className="group-hover:translate-x-2 transition-transform" />
                   </span>
                 </button>
               )}
            </div>
          </motion.article>
        </main>
      </div>
      
      {/* Background Page Texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[-1] bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />
    </div>
  );
};

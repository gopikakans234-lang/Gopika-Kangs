import React, { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { ProblemAgitate } from './components/ProblemAgitate';
import { Solution } from './components/Solution';
import { Aida } from './components/Aida';
import { MythTruth } from './components/MythTruth';
import { Footer } from './components/Footer';
import { LeadModal } from './components/LeadModal';
import { LoginModal } from './components/LoginModal';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openLogin = () => setIsLoginOpen(true);
  const closeLogin = () => setIsLoginOpen(false);

  // Simple scroll progress bar
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-navy-900 text-text-main font-sans selection:bg-brand-green selection:text-navy-900 overflow-x-hidden">
      
      {/* Reading Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-0.5 bg-brand-green z-50 transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      <nav className="fixed top-0 w-full p-6 z-40 flex justify-between items-center pointer-events-none">
        <div className="text-xl md:text-2xl font-bold tracking-tighter pointer-events-auto cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth'})}>
          <span className="text-brand-green">Web</span><span className="text-white">olution</span>
        </div>
        
        <div className="pointer-events-auto">
          <button 
            onClick={openLogin}
            className="text-sm font-medium text-text-muted hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-white/5"
          >
            Log In
          </button>
        </div>
      </nav>

      <main>
        <Hero onCtaClick={openModal} />
        <ProblemAgitate />
        <Solution onCtaClick={openModal} />
        <Aida onCtaClick={openModal} />
        <MythTruth />
      </main>

      <Footer onCtaClick={openModal} />
      
      <LeadModal isOpen={isModalOpen} onClose={closeModal} />
      <LoginModal isOpen={isLoginOpen} onClose={closeLogin} />
    </div>
  );
};

export default App;
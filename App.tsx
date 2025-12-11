import React, { useState } from 'react';
import { Hero } from './components/Hero';
import { RealityCheck } from './components/RealityCheck';
import { Solution } from './components/Solution';
import { MythTruth } from './components/MythTruth';
import { Footer } from './components/Footer';
import { LeadModal } from './components/LeadModal';
import { LoginModal } from './components/LoginModal';

const App: React.FC = () => {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openLeadModal = () => setIsLeadModalOpen(true);
  const closeLeadModal = () => setIsLeadModalOpen(false);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-navy-900 text-text-main font-sans selection:bg-brand-green selection:text-navy-900">
      <nav className="fixed top-0 w-full px-6 py-4 z-50 flex justify-between items-center pointer-events-none bg-gradient-to-b from-navy-900/80 to-transparent backdrop-blur-[2px]">
        <div 
          className="text-2xl font-black tracking-tighter pointer-events-auto cursor-pointer"
          onClick={scrollToTop}
        >
          <span className="text-brand-green">Web</span><span className="text-white">olution</span>
        </div>
        
        <div className="pointer-events-auto flex gap-6 items-center">
          <button 
            onClick={scrollToTop} 
            className="text-sm md:text-base text-white/80 hover:text-white font-medium transition-colors"
          >
            Home
          </button>
          <button 
            onClick={openLoginModal} 
            className="text-sm md:text-base px-4 py-2 rounded-full border border-white/20 text-white font-medium hover:bg-white/10 hover:border-white/40 transition-all"
          >
            Login
          </button>
        </div>
      </nav>

      <main>
        <Hero onCtaClick={openLeadModal} />
        <RealityCheck />
        <MythTruth />
        <Solution onCtaClick={openLeadModal} />
      </main>

      <Footer onCtaClick={openLeadModal} />
      
      <LeadModal isOpen={isLeadModalOpen} onClose={closeLeadModal} />
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
    </div>
  );
};

export default App;
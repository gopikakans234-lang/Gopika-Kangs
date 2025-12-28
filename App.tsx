
import React, { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { RealityCheck } from './components/RealityCheck';
import { Solution } from './components/Solution';
import { MythTruth } from './components/MythTruth';
import { FAQ } from './components/FAQ';
import { BlogList } from './components/BlogList';
import { BlogDetail } from './components/BlogDetail';
import { PodcastList } from './components/PodcastList';
import { PodcastDetail } from './components/PodcastDetail';
import { EBookList } from './components/EBookList';
import { EBookDetail } from './components/EBookDetail';
import { TestSession } from './components/TestSession';
import { Footer } from './components/Footer';
import { LeadModal } from './components/LeadModal';
import { LoginModal } from './components/LoginModal';
import { Section } from './components/Section';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from './components/Button';

type View = 'home' | 'blog' | 'blog-post' | 'podcast' | 'podcast-detail' | 'ebook' | 'ebook-detail' | 'test' | 'results';

const App: React.FC = () => {
  const [view, setView] = useState<View>('home');
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [selectedPodcastId, setSelectedPodcastId] = useState<string | null>(null);
  const [selectedEBookId, setSelectedEBookId] = useState<string | null>(null);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [sessionResults, setSessionResults] = useState<any>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const openLeadModal = () => setIsLeadModalOpen(true);
  const closeLeadModal = () => setIsLeadModalOpen(false);
  
  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const navigateToHome = () => setView('home');
  const navigateToBlog = () => setView('blog');
  const navigateToPodcast = () => setView('podcast');
  const navigateToEBook = () => setView('ebook');
  const navigateToTest = () => setView('test');
  
  const navigateToPost = (postId: string) => {
    setSelectedPostId(postId);
    setView('blog-post');
  };

  const navigateToPodcastDetail = (podcastId: string) => {
    setSelectedPodcastId(podcastId);
    setView('podcast-detail');
  };

  const navigateToEBookDetail = (ebookId: string) => {
    setSelectedEBookId(ebookId);
    setView('ebook-detail');
  };

  const handleAuditComplete = (data: any) => {
    setSessionResults(data);
    setView('results');
  };

  return (
    <div className="min-h-screen bg-navy-900 text-text-main font-sans selection:bg-brand-green selection:text-navy-900 antialiased overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full px-4 md:px-8 py-4 z-50 flex justify-between items-center bg-navy-900/90 backdrop-blur-lg border-b border-white/5">
        <div 
          className="text-lg sm:text-xl md:text-2xl font-black tracking-tighter cursor-pointer flex items-center gap-1"
          onClick={navigateToHome}
        >
          <span className="text-brand-green">Web</span><span className="text-white">ution</span>
        </div>
        
        <div className="flex gap-4 sm:gap-8 items-center">
          <div className="flex gap-3 sm:gap-6 items-center">
            <button onClick={navigateToHome} className={`text-[10px] sm:text-sm md:text-base font-bold tracking-tight transition-colors ${view === 'home' ? 'text-brand-green' : 'text-white/80 hover:text-white'}`}>Home</button>
            <button onClick={navigateToBlog} className={`text-[10px] sm:text-sm md:text-base font-bold tracking-tight transition-colors ${view.startsWith('blog') ? 'text-brand-green' : 'text-white/80 hover:text-white'}`}>Blog</button>
            <button onClick={navigateToPodcast} className={`text-[10px] sm:text-sm md:text-base font-bold tracking-tight transition-colors ${view.startsWith('podcast') ? 'text-brand-green' : 'text-white/80 hover:text-white'}`}>Podcast</button>
            <button onClick={navigateToEBook} className={`text-[10px] sm:text-sm md:text-base font-bold tracking-tight transition-colors ${view.startsWith('ebook') ? 'text-brand-green' : 'text-white/80 hover:text-white'}`}>eBook</button>
            <button onClick={openLoginModal} className="hidden md:block text-sm font-bold text-white/60 hover:text-white transition-colors">Log In</button>
            <button onClick={navigateToTest} className={`px-3 py-1 bg-brand-green/10 border border-brand-green/30 text-brand-green text-[10px] sm:text-xs font-black uppercase rounded-full transition-all hover:bg-brand-green hover:text-navy-900`}>Start quiz</button>
          </div>
        </div>
      </nav>

      <main className="relative w-full">
        {view === 'home' && (
          <>
            <Hero onCtaClick={openLeadModal} onSecondaryCtaClick={navigateToTest} />
            <RealityCheck />
            <MythTruth />
            <Solution onCtaClick={openLeadModal} />
            <FAQ />
          </>
        )}

        {view === 'blog' && <BlogList onReadMore={navigateToPost} onCtaClick={openLeadModal} />}
        {view === 'blog-post' && selectedPostId && <BlogDetail postId={selectedPostId} onBack={navigateToBlog} onCtaClick={openLeadModal} />}
        {view === 'podcast' && <PodcastList onListenNow={navigateToPodcastDetail} onCtaClick={openLeadModal} />}
        {view === 'podcast-detail' && selectedPodcastId && <PodcastDetail podcastId={selectedPodcastId} onBack={navigateToPodcast} onCtaClick={openLeadModal} />}
        {view === 'ebook' && <EBookList onViewDetails={navigateToEBookDetail} onCtaClick={openLeadModal} />}
        {view === 'ebook-detail' && selectedEBookId && <EBookDetail ebookId={selectedEBookId} onBack={navigateToEBook} onCtaClick={openLeadModal} />}
        
        {view === 'test' && <TestSession onComplete={handleAuditComplete} onCancel={navigateToHome} />}
        
        {view === 'results' && (
          <Section className="min-h-screen flex items-center justify-center pt-32 pb-20">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-3xl w-full bg-navy-800 border border-white/10 rounded-[40px] p-10 md:p-16 text-center shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-green/5 blur-[80px] rounded-full pointer-events-none" />
              
              <div className="w-20 h-20 bg-brand-green/20 text-brand-green rounded-full flex items-center justify-center mx-auto mb-8">
                <ShieldCheck size={48} />
              </div>

              <h1 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">Strategy Processing...</h1>
              <p className="text-xl text-text-muted mb-12 max-w-xl mx-auto leading-relaxed">
                Thank you, <strong>{sessionResults?.userInfo?.firstName}</strong>. Your career parameters have been captured. Our AI is currently generating your personalized <strong>Strategic Growth Roadmap</strong>.
              </p>

              <div className="bg-navy-900/50 rounded-2xl p-8 mb-12 text-left space-y-4 border border-white/5">
                <div className="flex items-center gap-4">
                  <CheckCircle className="text-brand-green" size={20} />
                  <span className="text-white font-medium">Core mindset profile generated</span>
                </div>
                <div className="flex items-center gap-4">
                  <CheckCircle className="text-brand-green" size={20} />
                  <span className="text-white font-medium">Mid-career stagnation triggers identified</span>
                </div>
                <div className="flex items-center gap-4">
                  <CheckCircle className="text-brand-green" size={20} />
                  <span className="text-white font-medium">Leadership transition markers analyzed</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button onClick={() => window.location.reload()} className="px-10">
                  Return to Dashboard
                </Button>
                <Button variant="secondary" onClick={navigateToHome} className="px-10">
                  Contact Strategy Team
                </Button>
              </div>
              
              <p className="mt-12 text-white/20 text-xs">
                Your report will be sent to <strong>{sessionResults?.userInfo?.email}</strong> within 15 minutes.
              </p>
            </motion.div>
          </Section>
        )}
      </main>

      {view !== 'test' && view !== 'results' && <Footer onCtaClick={openLeadModal} />}
      
      <LeadModal isOpen={isLeadModalOpen} onClose={closeLeadModal} />
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
    </div>
  );
};

export default App;

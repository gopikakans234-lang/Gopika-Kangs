
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
import { Footer } from './components/Footer';
import { LeadModal } from './components/LeadModal';

type View = 'home' | 'blog' | 'blog-post' | 'podcast' | 'podcast-detail' | 'ebooks' | 'ebook-detail';

const App: React.FC = () => {
  const [view, setView] = useState<View>('home');
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [selectedPodcastId, setSelectedPodcastId] = useState<string | null>(null);
  const [selectedEBookId, setSelectedEBookId] = useState<string | null>(null);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  // Scroll to top when view changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const openLeadModal = () => setIsLeadModalOpen(true);
  const closeLeadModal = () => setIsLeadModalOpen(false);

  const navigateToHome = () => {
    setView('home');
    setSelectedPostId(null);
    setSelectedPodcastId(null);
    setSelectedEBookId(null);
  };
  
  const navigateToBlog = () => {
    setView('blog');
    setSelectedPostId(null);
    setSelectedPodcastId(null);
    setSelectedEBookId(null);
  };

  const navigateToPodcast = () => {
    setView('podcast');
    setSelectedPostId(null);
    setSelectedPodcastId(null);
    setSelectedEBookId(null);
  };

  const navigateToEBooks = () => {
    setView('ebooks');
    setSelectedPostId(null);
    setSelectedPodcastId(null);
    setSelectedEBookId(null);
  };
  
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
            <button 
              onClick={navigateToHome} 
              className={`text-[10px] sm:text-sm md:text-base font-bold tracking-tight transition-colors ${view === 'home' ? 'text-brand-green' : 'text-white/80 hover:text-white'}`}
            >
              Home
            </button>
            <button 
              onClick={navigateToBlog} 
              className={`text-[10px] sm:text-sm md:text-base font-bold tracking-tight transition-colors ${view === 'blog' || view === 'blog-post' ? 'text-brand-green' : 'text-white/80 hover:text-white'}`}
            >
              Blog
            </button>
            <button 
              onClick={navigateToPodcast} 
              className={`text-[10px] sm:text-sm md:text-base font-bold tracking-tight transition-colors ${view === 'podcast' || view === 'podcast-detail' ? 'text-brand-green' : 'text-white/80 hover:text-white'}`}
            >
              Podcast
            </button>
            <button 
              onClick={navigateToEBooks} 
              className={`text-[10px] sm:text-sm md:text-base font-bold tracking-tight transition-colors ${view === 'ebooks' || view === 'ebook-detail' ? 'text-brand-green' : 'text-white/80 hover:text-white'}`}
            >
              eBooks
            </button>
          </div>
        </div>
      </nav>

      <main className="relative w-full">
        {view === 'home' && (
          <>
            <Hero onCtaClick={openLeadModal} />
            <RealityCheck />
            <MythTruth />
            <Solution onCtaClick={openLeadModal} />
            <FAQ />
          </>
        )}

        {view === 'blog' && (
          <BlogList 
            onReadMore={navigateToPost} 
            onCtaClick={openLeadModal} 
          />
        )}

        {view === 'blog-post' && selectedPostId && (
          <BlogDetail 
            postId={selectedPostId}
            onBack={navigateToBlog} 
            onCtaClick={openLeadModal} 
          />
        )}

        {view === 'podcast' && (
          <PodcastList 
            onListenNow={navigateToPodcastDetail} 
            onCtaClick={openLeadModal}
          />
        )}

        {view === 'podcast-detail' && selectedPodcastId && (
          <PodcastDetail 
            podcastId={selectedPodcastId}
            onBack={navigateToPodcast}
            onCtaClick={openLeadModal}
          />
        )}

        {view === 'ebooks' && (
          <EBookList 
            onViewDetails={navigateToEBookDetail}
            onCtaClick={openLeadModal}
          />
        )}

        {view === 'ebook-detail' && selectedEBookId && (
          <EBookDetail 
            ebookId={selectedEBookId}
            onBack={navigateToEBooks}
            onCtaClick={openLeadModal}
          />
        )}
      </main>

      <Footer onCtaClick={openLeadModal} />
      
      <LeadModal isOpen={isLeadModalOpen} onClose={closeLeadModal} />
    </div>
  );
};

export default App;

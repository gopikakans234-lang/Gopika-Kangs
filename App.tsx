
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
import { TestSession } from './components/TestSession';
import { QuizHub } from './components/QuizHub';
import { AudioQuiz } from './components/AudioQuiz';
import { ImageQuiz } from './components/ImageQuiz';

type View = 'home' | 'blog' | 'blog-post' | 'podcast' | 'podcast-detail' | 'ebook' | 'ebook-detail' | 'quiz-hub' | 'career-quiz' | 'audio-quiz' | 'image-quiz' | 'voice-quiz';

const App: React.FC = () => {
  const [view, setView] = useState<View>('home');
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [selectedPodcastId, setSelectedPodcastId] = useState<string | null>(null);
  const [selectedEBookId, setSelectedEBookId] = useState<string | null>(null);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const openLeadModal = () => setIsLeadModalOpen(true);
  const closeLeadModal = () => setIsLeadModalOpen(false);

  const navigateToHome = () => setView('home');
  const navigateToBlog = () => setView('blog');
  const navigateToPodcast = () => setView('podcast');
  const navigateToEBook = () => setView('ebook');
  const navigateToQuizHub = () => setView('quiz-hub');
  
  const handleQuizSelect = (id: string) => {
    switch(id) {
      case 'career': setView('career-quiz'); break;
      case 'audio': setView('audio-quiz'); break;
      case 'image': setView('image-quiz'); break;
      case 'voice': setView('voice-quiz'); break;
      default: setView('career-quiz');
    }
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

  const handleAssessmentComplete = (data: any) => {
    console.log('Assessment Complete:', data);
    setView('home');
    openLeadModal();
  };

  const isQuizMode = view === 'quiz-hub' || view === 'career-quiz' || view === 'audio-quiz' || view === 'image-quiz' || view === 'voice-quiz';
  const isReaderMode = view === 'ebook-detail';

  return (
    <div className={`min-h-screen ${isReaderMode ? 'bg-[#FDFDFD]' : 'bg-navy-900'} text-text-main font-sans selection:bg-brand-green selection:text-navy-900 antialiased overflow-x-hidden`}>
      {/* Navigation */}
      {!isReaderMode && (
        <nav className="fixed top-0 w-full px-4 md:px-8 py-4 z-50 flex justify-between items-center bg-navy-900/90 backdrop-blur-lg border-b border-white/5">
          <div 
            className="text-lg sm:text-xl md:text-2xl font-black tracking-tighter cursor-pointer flex items-center gap-1"
            onClick={navigateToHome}
          >
            <span className="text-brand-green">Web</span><span className="text-white">ution</span>
          </div>
          
          <div className="flex gap-4 sm:gap-8 items-center">
            <div className="hidden sm:flex gap-6 items-center">
              <button onClick={navigateToHome} className={`text-sm md:text-base font-bold tracking-tight transition-colors ${view === 'home' ? 'text-brand-green' : 'text-white/80 hover:text-white'}`}>Home</button>
              <button onClick={navigateToBlog} className={`text-sm md:text-base font-bold tracking-tight transition-colors ${view.startsWith('blog') ? 'text-brand-green' : 'text-white/80 hover:text-white'}`}>Blog</button>
              <button onClick={navigateToPodcast} className={`text-sm md:text-base font-bold tracking-tight transition-colors ${view.startsWith('podcast') ? 'text-brand-green' : 'text-white/80 hover:text-white'}`}>Podcast</button>
              <button onClick={navigateToEBook} className={`text-sm md:text-base font-bold tracking-tight transition-colors ${view.startsWith('ebook') ? 'text-brand-green' : 'text-white/80 hover:text-white'}`}>eBooks</button>
            </div>
            <button 
              onClick={navigateToQuizHub}
              className={`px-4 py-2 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all ${isQuizMode ? 'bg-white text-navy-900' : 'bg-brand-green text-navy-900 hover:bg-brand-hover shadow-lg shadow-brand-green/20'}`}
            >
              {isQuizMode ? 'EXIT QUIZ' : 'START QUIZ'}
            </button>
          </div>
        </nav>
      )}

      <main className="relative w-full">
        {view === 'home' && (
          <>
            <Hero 
              onCtaClick={openLeadModal} 
              onQuizClick={navigateToQuizHub} 
            />
            <RealityCheck />
            <MythTruth />
            <Solution 
              onCtaClick={openLeadModal} 
              onQuizClick={navigateToQuizHub} 
            />
            <FAQ />
          </>
        )}

        {view === 'quiz-hub' && (
          <QuizHub 
            onSelect={handleQuizSelect}
            onCancel={navigateToHome}
          />
        )}

        {view === 'career-quiz' && (
          <TestSession 
            onComplete={handleAssessmentComplete} 
            onCancel={navigateToQuizHub} 
          />
        )}

        {view === 'audio-quiz' && (
          <AudioQuiz 
            onCancel={navigateToQuizHub}
            onComplete={(score) => handleAssessmentComplete({ mode: 'audio', score })}
          />
        )}

        {view === 'image-quiz' && (
          <ImageQuiz 
            onCancel={navigateToQuizHub}
            onComplete={(score) => handleAssessmentComplete({ mode: 'image', score })}
          />
        )}

        {view === 'blog' && <BlogList onReadMore={navigateToPost} onCtaClick={openLeadModal} />}
        {view === 'blog-post' && selectedPostId && <BlogDetail postId={selectedPostId} onBack={navigateToBlog} onCtaClick={openLeadModal} />}
        {view === 'podcast' && <PodcastList onListenNow={navigateToPodcastDetail} onCtaClick={openLeadModal} />}
        {view === 'podcast-detail' && selectedPodcastId && <PodcastDetail podcastId={selectedPodcastId} onBack={navigateToPodcast} onCtaClick={openLeadModal} />}
        {view === 'ebook' && <EBookList onViewDetails={navigateToEBookDetail} onCtaClick={openLeadModal} />}
        {view === 'ebook-detail' && selectedEBookId && <EBookDetail ebookId={selectedEBookId} onBack={navigateToEBook} onCtaClick={openLeadModal} />}
      </main>

      {!isQuizMode && !isReaderMode && <Footer onCtaClick={openLeadModal} />}
      
      <LeadModal isOpen={isLeadModalOpen} onClose={closeLeadModal} />
    </div>
  );
};

export default App;

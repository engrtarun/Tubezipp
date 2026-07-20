import React, { useState, useEffect } from 'react';
import VideoPlayer from './components/dashboard/VideoPlayer';
import SummaryTranscriptTabs from './components/dashboard/SummaryTranscriptTabs';
import Suggestions from './components/dashboard/Suggestions';
import { Search } from 'lucide-react';
import './App.css';
import Navbar from "./components/landing/Navbar";
import Hero from "./components/landing/Hero";
import Features from "./components/landing/Feature";
import HowItWorks from "./components/landing/HowItWorks";
import Footer from "./components/landing/Footer";

const getRoutedVideoUrl = () => {
  const match = window.location.pathname.match(/^\/learn\/([A-Za-z0-9_-]{11})$/);
  return match ? `https://www.youtube.com/watch?v=${match[1]}` : '';
};

function App() {
  const [videoUrl, setVideoUrl] = useState(() => getRoutedVideoUrl());
  const [isLoaded, setIsLoaded] = useState(() => Boolean(getRoutedVideoUrl()));

  useEffect(() => {
    const handlePopState = () => {
      const routedVideoUrl = getRoutedVideoUrl();
      setVideoUrl(routedVideoUrl);
      setIsLoaded(Boolean(routedVideoUrl));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const extractVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const videoId = extractVideoId(videoUrl);
    if (videoId) {
      window.history.pushState({}, '', `/learn/${videoId}`);
      setIsLoaded(true);
      window.scrollTo({ top: 0 });
    } else {
      alert('Please enter a valid YouTube URL');
    }
  };

  const handleSuggest = (url) => {
    setVideoUrl(url);
    const videoId = extractVideoId(url);
    if (videoId) {
      window.history.pushState({}, '', `/learn/${videoId}`);
      setIsLoaded(true);
      window.scrollTo({ top: 0 });
    }
  };

  const handleNavigateHome = (sectionId) => {
    window.history.pushState({}, '', sectionId ? `/#${sectionId}` : '/');
    setIsLoaded(false);

    window.setTimeout(() => {
      if (sectionId) {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 0);
  };

  return (
    <div className="app-container">
      <main className="main-content">
        {!isLoaded ? (
          <>
            <Navbar />
            <Hero
              videoUrl={videoUrl}
              setVideoUrl={setVideoUrl}
              handleSubmit={handleSubmit}
            />
            <Features />
            <HowItWorks />
            <Footer />
          </>
        ) : (
          <div className="flex-1 flex flex-col bg-white text-gray-900">
            <Navbar onNavigateHome={handleNavigateHome} />
            <div className="shrink-0 p-4 border-b border-border bg-background/95 flex justify-center w-full">
               <form onSubmit={handleSubmit} className="w-full max-w-3xl relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  </div>
                  <input
                    type="text"
                    className="w-full bg-muted/20 border border-border rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-primary focus:bg-background transition-all"
                    placeholder="[ + enter new YT url ]"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                  />
               </form>
            </div>

            <div className="content-scrollable">
              <div className="video-section">
                <VideoPlayer url={videoUrl} extractVideoId={extractVideoId} /> 
                <Suggestions activeVideoId={extractVideoId(videoUrl)} />
              </div>
              
              <div className="notes-section">
                <SummaryTranscriptTabs videoUrl={videoUrl} />
              </div>
            </div>
            <Footer onNavigateHome={handleNavigateHome} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

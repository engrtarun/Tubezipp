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

function App() {
  const [videoUrl, setVideoUrl] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [recommendedVideos, setRecommendedVideos] = useState([]);
  const [isLoadingVideos, setIsLoadingVideos] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const API_KEY = "AIzaSyC1kG0545W9KYyHXhlq4YYofb4xmCzCXbA";
        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&q=notyourcollege|sheryians|SheryiansAI&type=video&key=${API_KEY}`);
        const data = await response.json();
        if (data.items) {
          const filteredVideos = data.items.filter(video => {
            const title = video.snippet.title.toLowerCase();
            return !title.includes('#shorts') && !title.includes('#short');
          });
          setRecommendedVideos(filteredVideos.slice(0, 8));
        }
      } catch (error) {
        console.error("Error fetching recommended videos:", error);
      } finally {
        setIsLoadingVideos(false);
      }
    };
    fetchVideos();
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
      setIsLoaded(true);
    } else {
      alert('Please enter a valid YouTube URL');
    }
  };

  const handleSuggest = (url) => {
    setVideoUrl(url);
    setIsLoaded(true);
  };

  return (
    <div className="app-container">
      {/* Top Header */}
      <header className="flex items-center px-6 py-4 border-b border-border bg-background z-10 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="font-bold text-primary-foreground text-sm">TZ</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-foreground">Tubezipp</h1>
        </div>
      </header>

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
          /* Post-Load State - Split Layout */
          <div className="flex-1 overflow-hidden flex flex-col">
            {/* Top Bar with new Search input for post-load state */}
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
                <Suggestions relatedVideos={recommendedVideos.slice(0, 4)} />
              </div>
              
              <div className="notes-section">
                <SummaryTranscriptTabs />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

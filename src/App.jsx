import React, { useState } from 'react';
import VideoPlayer from './components/VideoPlayer';
import SummaryTranscriptTabs from './components/SummaryTranscriptTabs';
import Suggestions from './components/Suggestions';
import { Search, Lightbulb } from 'lucide-react';
import './App.css';

function App() {
  const [videoUrl, setVideoUrl] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

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
          /* Initial State - Centered Search */
          <div className="flex-1 flex flex-col items-center justify-center p-6 bg-background max-w-4xl mx-auto w-full">
            <div className="w-full max-w-2xl mb-8 flex flex-col items-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                What do you want to learn today?
              </h2>
              
              <form onSubmit={handleSubmit} className="w-full relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                </div>
                <input
                  type="text"
                  className="w-full bg-muted/30 border-2 border-border rounded-2xl py-4 pl-12 pr-4 text-lg focus:outline-none focus:border-primary focus:bg-background transition-all shadow-sm"
                  placeholder="[ + enter YT url ]"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                />
              </form>
            </div>

            <div className="flex flex-col items-center w-full max-w-2xl">
              <p className="text-sm text-muted-foreground mb-4 flex items-center gap-2">
                <Lightbulb size={16} /> Suggest Any Study Video
              </p>
              <div className="flex flex-wrap justify-center gap-3 w-full">
                <button onClick={() => handleSuggest('https://www.youtube.com/watch?v=kYxRkO5G2B0')} className="px-4 py-2 bg-muted/50 hover:bg-muted border border-border rounded-full text-sm font-medium transition-colors">
                  React Hooks Tutorial
                </button>
                <button onClick={() => handleSuggest('https://www.youtube.com/watch?v=FjC31R7Xp3M')} className="px-4 py-2 bg-muted/50 hover:bg-muted border border-border rounded-full text-sm font-medium transition-colors">
                  Machine Learning Basics
                </button>
                <button onClick={() => handleSuggest('https://www.youtube.com/watch?v=bMknfKXIFA8')} className="px-4 py-2 bg-muted/50 hover:bg-muted border border-border rounded-full text-sm font-medium transition-colors">
                  React Course for Beginners
                </button>
              </div>
            </div>
          </div>
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
                <Suggestions />
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

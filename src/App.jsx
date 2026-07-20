import React, { useState, useEffect } from 'react';
import VideoPlayer from './components/VideoPlayer';
import SummaryTranscriptTabs from './components/SummaryTranscriptTabs';
import Suggestions from './components/Suggestions';
import { Search, Lightbulb } from 'lucide-react';
import './App.css';

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
          /* Initial State - Centered Search & Grid */
          <div className="flex-1 flex flex-col pt-12 md:pt-20 px-4 sm:px-6 bg-background max-w-7xl mx-auto w-full overflow-y-auto">
            <div className="w-full max-w-3xl mb-12 flex flex-col mx-auto">
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

            <div className="w-full flex flex-col">
              <p className="text-sm text-muted-foreground mb-6 flex items-center gap-2 font-medium">
                <Lightbulb size={16} className="text-primary" /> Recommended For You
              </p>
              
              {isLoadingVideos ? (
                <div className="flex justify-center items-center py-12">
                   <div className="animate-pulse flex space-x-4">
                     <div className="flex-1 space-y-6 py-1">
                       <div className="h-2 bg-muted rounded"></div>
                       <div className="space-y-3">
                         <div className="grid grid-cols-3 gap-4">
                           <div className="h-2 bg-muted rounded col-span-2"></div>
                           <div className="h-2 bg-muted rounded col-span-1"></div>
                         </div>
                         <div className="h-2 bg-muted rounded"></div>
                       </div>
                     </div>
                   </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-12">
                  {recommendedVideos.map((video, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => handleSuggest(`https://www.youtube.com/watch?v=${video.id.videoId}`)}
                      className="group cursor-pointer bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all shadow-sm hover:shadow-md flex flex-col"
                    >
                      <div className="aspect-video w-full overflow-hidden relative bg-muted">
                        <img 
                          src={video.snippet.thumbnails.medium.url} 
                          alt={video.snippet.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                      </div>
                      <div className="p-4 flex flex-col flex-1">
                        <h3 className="font-semibold text-sm line-clamp-2 mb-1 group-hover:text-primary transition-colors text-foreground">
                          {video.snippet.title}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-auto">
                          {video.snippet.channelTitle}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
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

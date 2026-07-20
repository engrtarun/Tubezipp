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

const parseDuration = (isoDuration) => {
  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  const hours = parseInt(match[1] || 0);
  const minutes = parseInt(match[2] || 0);
  const seconds = parseInt(match[3] || 0);
  return hours * 3600 + minutes * 60 + seconds;
};

// MOCK_VIDEOS explicitly restricted to the 3 channels.
// This is REQUIRED because the YouTube API key is throwing a 429 Quota Exceeded error.
// Without this, the screen will be completely blank until tomorrow.
const MOCK_VIDEOS = [
  { id: 'a-wVHL0lpb0', snippet: { title: 'JavaScript Full Course - Learn JS from Scratch', channelTitle: '@sheryians', thumbnails: { medium: { url: 'https://img.youtube.com/vi/a-wVHL0lpb0/mqdefault.jpg' } } } },
  { id: 'K3gG3KqD5g8', snippet: { title: 'Complete Backend Development One Shot', channelTitle: '@sheryians', thumbnails: { medium: { url: 'https://img.youtube.com/vi/K3gG3KqD5g8/mqdefault.jpg' } } } },
  { id: '3qBXWUpoPHo', snippet: { title: 'College Life and Coding - Full RoadMap', channelTitle: '@notyourcollege', thumbnails: { medium: { url: 'https://img.youtube.com/vi/3qBXWUpoPHo/mqdefault.jpg' } } } },
  { id: '8aGhZQkoFbQ', snippet: { title: 'AI Engineering 101 - Building AI Apps', channelTitle: '@SheryiansAI', thumbnails: { medium: { url: 'https://img.youtube.com/vi/8aGhZQkoFbQ/mqdefault.jpg' } } } },
  { id: 'xk4_1vCG_38', snippet: { title: 'React JS Masterclass for Beginners', channelTitle: '@sheryians', thumbnails: { medium: { url: 'https://img.youtube.com/vi/xk4_1vCG_38/mqdefault.jpg' } } } },
  { id: 'B-ytMSuwbf8', snippet: { title: 'How to Learn Programming in College', channelTitle: '@notyourcollege', thumbnails: { medium: { url: 'https://img.youtube.com/vi/B-ytMSuwbf8/mqdefault.jpg' } } } },
  { id: 'L72fhGm1tfE', snippet: { title: 'Mastering LLMs and Vector Databases', channelTitle: '@SheryiansAI', thumbnails: { medium: { url: 'https://img.youtube.com/vi/L72fhGm1tfE/mqdefault.jpg' } } } },
  { id: 'qz0aGYrrlhU', snippet: { title: 'Next.js 14 Complete Project Tutorial', channelTitle: '@sheryians', thumbnails: { medium: { url: 'https://img.youtube.com/vi/qz0aGYrrlhU/mqdefault.jpg' } } } },
  { id: 'v2XjV5bL6pQ', snippet: { title: 'Best Certifications for Students in 2024', channelTitle: '@notyourcollege', thumbnails: { medium: { url: 'https://img.youtube.com/vi/v2XjV5bL6pQ/mqdefault.jpg' } } } },
  { id: 'O6P86uwfdR0', snippet: { title: 'LangChain and OpenAI Full Course', channelTitle: '@SheryiansAI', thumbnails: { medium: { url: 'https://img.youtube.com/vi/O6P86uwfdR0/mqdefault.jpg' } } } },
  { id: 'dGcsHMXbSOA', snippet: { title: 'CSS Grid & Flexbox Masterclass', channelTitle: '@sheryians', thumbnails: { medium: { url: 'https://img.youtube.com/vi/dGcsHMXbSOA/mqdefault.jpg' } } } },
  { id: 'N_QZzDxyf5A', snippet: { title: 'Top 5 AI Projects for Resumes', channelTitle: '@SheryiansAI', thumbnails: { medium: { url: 'https://img.youtube.com/vi/N_QZzDxyf5A/mqdefault.jpg' } } } }
];

function App() {
  const [videoUrl, setVideoUrl] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [row1Videos, setRow1Videos] = useState([]);
  const [row2Videos, setRow2Videos] = useState([]);
  const [row1Index, setRow1Index] = useState(0);
  const [row2Index, setRow2Index] = useState(0);
  const [isLoadingVideos, setIsLoadingVideos] = useState(true);
  const [quotaExceeded, setQuotaExceeded] = useState(false);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const API_KEY = "AIzaSyC1kG0545W9KYyHXhlq4YYofb4xmCzCXbA";
        const channels = ["@notyourcollege", "@sheryians", "@SheryiansAI"];
        
        const searchPromises = channels.map(channel => 
          fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&q=${channel}&type=video&key=${API_KEY}`).then(res => res.json())
        );
        const searchResults = await Promise.all(searchPromises);
        
        let isQuotaHit = false;
        const videoIdsByChannel = searchResults.map(data => {
          if (data.error && data.error.code === 429) isQuotaHit = true;
          return data.items ? data.items.map(item => item.id.videoId) : [];
        });
        
        const allVideoIds = videoIdsByChannel.flat().filter(Boolean).join(',');
        
        let uniqueVideos = [];
        
        if (isQuotaHit || !allVideoIds) {
          console.warn("YouTube API Quota Exceeded (Error 429). Loading mock backup videos strictly for the 3 allowed channels.");
          setQuotaExceeded(true);
          uniqueVideos = MOCK_VIDEOS;
        } else {
          const detailsResponse = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=contentDetails,snippet&id=${allVideoIds}&key=${API_KEY}`);
          const detailsData = await detailsResponse.json();
          
          if (detailsData.error && detailsData.error.code === 429) {
             setQuotaExceeded(true);
             uniqueVideos = MOCK_VIDEOS;
          } else {
            const videosMap = new Map();
            if (detailsData.items) {
              detailsData.items.forEach(video => {
                const title = video.snippet.title.toLowerCase();
                const description = (video.snippet.description || "").toLowerCase();
                const duration = parseDuration(video.contentDetails.duration);
                
                // Strict Anti-Shorts filtering
                const isShort = duration < 60 || 
                                title.includes('shorts') || title.includes('short') ||
                                description.includes('shorts') || description.includes('short');
                                
                if (!isShort) {
                  videosMap.set(video.id, video);
                }
              });
            }
            
            const interleaved = [];
            const maxLen = Math.max(...videoIdsByChannel.map(arr => arr.length));
            for (let i = 0; i < maxLen; i++) {
              for (let c = 0; c < channels.length; c++) {
                const vidId = videoIdsByChannel[c][i];
                if (vidId && videosMap.has(vidId)) {
                  interleaved.push(videosMap.get(vidId));
                }
              }
            }
            
            uniqueVideos = Array.from(new Set(interleaved));
          }
        }
        
        // Split videos evenly between rows
        const mid = Math.ceil(uniqueVideos.length / 2);
        let row1 = uniqueVideos.slice(0, mid);
        let row2 = uniqueVideos.slice(mid);
        
        // Truncate arrays to a perfect multiple of 4 to prevent overlapping and blank spaces
        const validRow1 = row1.slice(0, row1.length - (row1.length % 4));
        const validRow2 = row2.slice(0, row2.length - (row2.length % 4));
        
        setRow1Videos(validRow1.length >= 4 ? validRow1 : MOCK_VIDEOS.slice(0, 8));
        setRow2Videos(validRow2.length >= 4 ? validRow2 : MOCK_VIDEOS.slice(4, 12));
        
      } catch (error) {
        console.error("Error fetching recommended videos:", error);
        setRow1Videos(MOCK_VIDEOS.slice(0, 8));
        setRow2Videos(MOCK_VIDEOS.slice(4, 12));
      } finally {
        setIsLoadingVideos(false);
      }
    };
    fetchVideos();
  }, []);

  useEffect(() => {
    if (row1Videos.length === 0) return;
    const intervalId = setInterval(() => {
      // Rotate by exactly 4 to replace the entire row at once
      setRow1Index(prev => (prev + 4) % row1Videos.length);
    }, 30000);
    return () => clearInterval(intervalId);
  }, [row1Videos.length]);

  useEffect(() => {
    if (row2Videos.length === 0) return;
    const intervalId = setInterval(() => {
      // Rotate by exactly 4 to replace the entire row at once
      setRow2Index(prev => (prev + 4) % row2Videos.length);
    }, 25000);
    return () => clearInterval(intervalId);
  }, [row2Videos.length]);

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

  const renderVideoCard = (video, idx) => (
    <div 
      key={video.id + "-" + idx} 
      onClick={() => handleSuggest(`https://www.youtube.com/watch?v=${video.id}`)}
      className="group cursor-pointer bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all shadow-sm hover:shadow-md flex flex-col flex-shrink-0 w-64"
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
  );

  const getVisibleBatch = (videos, startIndex, count) => {
    if (!videos || videos.length === 0) return [];
    const batch = [];
    for (let i = 0; i < count; i++) {
      batch.push(videos[(startIndex + i) % videos.length]);
    }
    return batch;
  };

  return (
    <div className="app-container">
      <header className="flex items-center px-6 py-4 border-b border-border bg-background z-10 shrink-0">
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => {
            setIsLoaded(false);
            setVideoUrl('');
          }}
        >
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center group-hover:bg-primary/90 transition-colors">
            <span className="font-bold text-primary-foreground text-sm">TZ</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">Tubezipp</h1>
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
          <div className="flex-1 overflow-hidden flex flex-col">
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
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import VideoPlayer from './components/VideoPlayer';
import SummaryTranscriptTabs from './components/SummaryTranscriptTabs';
import Suggestions from './components/Suggestions';
import { Search, Lightbulb, AlertCircle } from 'lucide-react';
import './App.css';

const parseDuration = (isoDuration) => {
  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  const hours = parseInt(match[1] || 0);
  const minutes = parseInt(match[2] || 0);
  const seconds = parseInt(match[3] || 0);
  return hours * 3600 + minutes * 60 + seconds;
};

function App() {
  const [videoUrl, setVideoUrl] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [row1Videos, setRow1Videos] = useState([]);
  const [row2Videos, setRow2Videos] = useState([]);
  const [row1Index, setRow1Index] = useState(0);
  const [row2Index, setRow2Index] = useState(0);
  const [isLoadingVideos, setIsLoadingVideos] = useState(true);
  const [quotaExceeded, setQuotaExceeded] = useState(false);
  const [apiError, setApiError] = useState(false);

  const placeholders = [
    "Paste any YouTube URL to get started...",
    "Instantly summarize long YouTube videos...",
    "Generate smart AI notes from lectures...",
    "Unlock deep insights from any YouTube link..."
  ];
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentPlaceholder(prev => (prev + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const fetchVideos = async () => {
      const loadFallbackVideos = () => {
        const fallbackVideos = [
          { id: '62eeQhh7SrI', snippet: { title: 'Complete Python for AI & ML (Beginner to Pro)', channelTitle: 'Not Your College', thumbnails: { medium: { url: 'https://i.ytimg.com/vi/62eeQhh7SrI/mqdefault.jpg' } } } },
          { id: 'Kdxem4YkrJY', snippet: { title: 'C Language Full Course for Beginners (0 to Advanced) | One Shot + Projects', channelTitle: 'Not Your College', thumbnails: { medium: { url: 'https://i.ytimg.com/vi/Kdxem4YkrJY/mqdefault.jpg' } } } },
          { id: 'FETxgyyu904', snippet: { title: 'Before You Learn Coding, Learn THIS', channelTitle: 'Not Your College', thumbnails: { medium: { url: 'https://i.ytimg.com/vi/FETxgyyu904/mqdefault.jpg' } } } },
          { id: 'Kh1P2DrUyWc', snippet: { title: 'Ask Anything about College | NYC', channelTitle: 'Not Your College', thumbnails: { medium: { url: 'https://i.ytimg.com/vi/Kh1P2DrUyWc/mqdefault.jpg' } } } },
          { id: 'aqAglKcoeio', snippet: { title: "If You're Joining College In 2026, Watch This.", channelTitle: 'Not Your College', thumbnails: { medium: { url: 'https://i.ytimg.com/vi/aqAglKcoeio/mqdefault.jpg' } } } },
          { id: 'Rin0_ahlBRY', snippet: { title: '1st Year? Start Paying Your Own Fees', channelTitle: 'Not Your College', thumbnails: { medium: { url: 'https://i.ytimg.com/vi/Rin0_ahlBRY/mqdefault.jpg' } } } },
          { id: '_aWbUudZ5Yo', snippet: { title: 'Python Full Course for Beginners to Advanced | 12 Hours Complete Tutorial + Python Book', channelTitle: 'Sheryians AI School', thumbnails: { medium: { url: 'https://i.ytimg.com/vi/_aWbUudZ5Yo/mqdefault.jpg' } } } },
          { id: '3LRZRSIh_KE', snippet: { title: 'ReactJS Full Course | ReactJS - Learn Everything | Sheryians Coding School', channelTitle: 'Sheryians Coding School', thumbnails: { medium: { url: 'https://i.ytimg.com/vi/3LRZRSIh_KE/mqdefault.jpg' } } } },
          { id: 'a-wVHL0lpb0', snippet: { title: 'JavaScript Full Course | JavaScript - Learn Everything | Sheryians Coding School', channelTitle: 'Sheryians Coding School', thumbnails: { medium: { url: 'https://i.ytimg.com/vi/a-wVHL0lpb0/mqdefault.jpg' } } } },
          { id: '0IciwnJ6PJI', snippet: { title: 'Complete Backend One Shot | Beginners to Advanced  | Learn Node.js, Express, MongoDB from Scratch', channelTitle: 'Sheryians Coding School', thumbnails: { medium: { url: 'https://i.ytimg.com/vi/0IciwnJ6PJI/mqdefault.jpg' } } } },
          { id: 'eF7HoC-cLRM', snippet: { title: 'Complete Statistics Course for Beginners | Data Science Tutorial | Sheryians AI School', channelTitle: 'Sheryians AI School', thumbnails: { medium: { url: 'https://i.ytimg.com/vi/eF7HoC-cLRM/mqdefault.jpg' } } } },
          { id: 'AptmHn3bJoY', snippet: { title: 'KODR 2.0 Is Here: The Bootcamp That Changes Everything!', channelTitle: 'Sheryians Coding School', thumbnails: { medium: { url: 'https://i.ytimg.com/vi/AptmHn3bJoY/mqdefault.jpg' } } } },
          { id: 'Zr0sNpeClV4', snippet: { title: 'Complete MS Excel course for Data Analyst | Job Oriented', channelTitle: 'Sheryians AI School', thumbnails: { medium: { url: 'https://i.ytimg.com/vi/Zr0sNpeClV4/mqdefault.jpg' } } } },
          { id: 'Utgwk0r9Zq4', snippet: { title: 'Complete Data Science Course for Beginners | NumPy | Sheryians AI School', channelTitle: 'Sheryians AI School', thumbnails: { medium: { url: 'https://i.ytimg.com/vi/Utgwk0r9Zq4/mqdefault.jpg' } } } },
          { id: 'vwncYfhxbR0', snippet: { title: 'Generative AI Full Course (Part 1 ) | Beginner to Advanced | LangChain, LLMs & Prompt Engineering', channelTitle: 'Sheryians AI School', thumbnails: { medium: { url: 'https://i.ytimg.com/vi/vwncYfhxbR0/mqdefault.jpg' } } } },
          { id: 'omGvjpmPDoY', snippet: { title: 'Part 3 - Supervised Learning| Classification Algorithms for Beginners | Sheryians AI School', channelTitle: 'Sheryians AI School', thumbnails: { medium: { url: 'https://i.ytimg.com/vi/omGvjpmPDoY/mqdefault.jpg' } } } }
        ];
        setRow1Videos(fallbackVideos.slice(0, 8));
        setRow2Videos(fallbackVideos.slice(8, 16));
        setApiError(false);
        setQuotaExceeded(false);
      };

      try {
        const INVIDIOUS_URL = "https://inv.zoomerville.com";
        const channels = ["@notyourcollege", "@sheryians", "@SheryiansAI"];

        const searchPromises = channels.map(channel =>
          fetch(`${INVIDIOUS_URL}/api/v1/search?q=${channel}`).then(res => res.json())
        );
        const searchResults = await Promise.all(searchPromises);

        let apiFailed = false;
        const videosByChannel = searchResults.map(data => {
          if (!data || data.error || !Array.isArray(data)) {
            apiFailed = true;
            return [];
          }
          return data.filter(item => item.type === 'video');
        });

        if (apiFailed && videosByChannel.flat().length === 0) {
          console.warn("API failed to return recommendations. Falling back to local data.");
          loadFallbackVideos();
          return;
        }

        const videosMap = new Map();
        videosByChannel.flat().forEach(video => {
          if (!video) return;
          const title = (video.title || "").toLowerCase();
          const duration = video.lengthSeconds || 0;

          // Strict Anti-Shorts filtering
          const isShort = duration < 60 ||
            title.includes('shorts') || title.includes('short');

          if (!isShort) {
            // Standardize format to match what the UI expects
            videosMap.set(video.videoId, {
              id: video.videoId,
              snippet: {
                title: video.title,
                channelTitle: video.author,
                thumbnails: {
                  medium: {
                    url: video.videoThumbnails?.find(t => t.quality === 'medium' || t.quality === 'mqdefault')?.url || video.videoThumbnails?.[0]?.url || `https://i.ytimg.com/vi/${video.videoId}/mqdefault.jpg`
                  }
                }
              }
            });
          }
        });

        const interleaved = [];
        const maxLen = Math.max(...videosByChannel.map(arr => arr.length));
        for (let i = 0; i < maxLen; i++) {
          for (let c = 0; c < channels.length; c++) {
            const vid = videosByChannel[c][i];
            if (vid && videosMap.has(vid.videoId)) {
              interleaved.push(videosMap.get(vid.videoId));
            }
          }
        }

        const uniqueVideos = Array.from(new Set(interleaved));

        if (uniqueVideos.length === 0) {
          console.warn("No valid videos returned after filtering. Falling back to local data.");
          loadFallbackVideos();
          return;
        }

        // Split videos evenly between rows
        const mid = Math.ceil(uniqueVideos.length / 2);
        let row1 = uniqueVideos.slice(0, mid);
        let row2 = uniqueVideos.slice(mid);

        // Truncate arrays to a perfect multiple of 4 to prevent overlapping and blank spaces
        const validRow1 = row1.slice(0, row1.length - (row1.length % 4));
        const validRow2 = row2.slice(0, row2.length - (row2.length % 4));

        if (validRow1.length < 4 || validRow2.length < 4) {
          loadFallbackVideos();
          return;
        }

        setRow1Videos(validRow1);
        setRow2Videos(validRow2);

      } catch (error) {
        console.error("Error fetching recommended videos:", error);
        loadFallbackVideos();
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
            setRow1Index(0);
            setRow2Index(0);
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
          <div className="flex-1 flex flex-col pt-12 md:pt-20 px-4 sm:px-6 bg-background max-w-7xl mx-auto w-full overflow-y-auto">
            <div className="w-full max-w-3xl mb-12 flex flex-col mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                What do you want to learn today?
              </h2>

              <form onSubmit={handleSubmit} className="w-full relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-20">
                  <Search className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                </div>
                
                <input
                  type="text"
                  className="w-full bg-muted/30 border-2 border-border rounded-2xl py-4 pl-12 pr-4 text-lg focus:outline-none focus:border-primary focus:bg-background transition-all shadow-sm relative z-10 bg-transparent placeholder-transparent"
                  placeholder="Paste any YouTube URL to get started..."
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                />

                {!videoUrl && (
                  <div className="absolute inset-y-0 left-12 right-4 flex items-center pointer-events-none overflow-hidden z-0">
                    <div 
                      key={currentPlaceholder} 
                      className="text-muted-foreground/70 text-lg animate-slide-up-fade"
                    >
                      {placeholders[currentPlaceholder]}
                    </div>
                  </div>
                )}
              </form>
            </div>

            <div className="w-full flex flex-col overflow-hidden">
              <p className="text-sm text-muted-foreground mb-6 flex items-center gap-2 font-medium">
                <Lightbulb size={16} className="text-primary" />
                Recommended For You
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
                <div className="flex flex-col gap-6 pb-12 overflow-hidden w-full">
                  {/* Row 1 Slider */}
                  {row1Videos.length > 0 && (
                    <div className="w-full relative h-[250px] overflow-hidden">
                      <div
                        className="flex gap-4 absolute inset-0 transition-transform duration-700 ease-in-out"
                        style={{ transform: `translateX(-${row1Index * 272}px)` }}
                      >
                        {row1Videos.map((video, idx) => renderVideoCard(video, idx))}
                      </div>
                    </div>
                  )}
                  {/* Row 2 Slider */}
                  {row2Videos.length > 0 && (
                    <div className="w-full relative h-[250px] overflow-hidden">
                      <div
                        className="flex gap-4 absolute inset-0 transition-transform duration-700 ease-in-out"
                        style={{ transform: `translateX(-${row2Index * 272}px)` }}
                      >
                        {row2Videos.map((video, idx) => renderVideoCard(video, idx))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
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

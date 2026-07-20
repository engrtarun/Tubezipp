import React, { useState, useEffect } from 'react';
import { Lightbulb, PlayCircle, AlertCircle } from 'lucide-react';

const API_KEY = "AIzaSyC1kG0545W9KYyHXhlq4YYofb4xmCzCXbA";

function Suggestions({ activeVideoId }) {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [batchIndex, setBatchIndex] = useState(0);
  const [quotaExceeded, setQuotaExceeded] = useState(false);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    if (!activeVideoId) return;

    const fetchRelated = async () => {
      const loadFallbackSuggestions = () => {
        const fallbackVideos = [
          { id: { videoId: '62eeQhh7SrI' }, snippet: { title: 'Complete Python for AI & ML (Beginner to Pro)', channelTitle: 'Not Your College', thumbnails: { medium: { url: 'https://i.ytimg.com/vi/62eeQhh7SrI/mqdefault.jpg' } } } },
          { id: { videoId: 'Kdxem4YkrJY' }, snippet: { title: 'C Language Full Course for Beginners (0 to Advanced) | One Shot + Projects', channelTitle: 'Not Your College', thumbnails: { medium: { url: 'https://i.ytimg.com/vi/Kdxem4YkrJY/mqdefault.jpg' } } } },
          { id: { videoId: 'FETxgyyu904' }, snippet: { title: 'Before You Learn Coding, Learn THIS', channelTitle: 'Not Your College', thumbnails: { medium: { url: 'https://i.ytimg.com/vi/FETxgyyu904/mqdefault.jpg' } } } },
          { id: { videoId: 'Kh1P2DrUyWc' }, snippet: { title: 'Ask Anything about College | NYC', channelTitle: 'Not Your College', thumbnails: { medium: { url: 'https://i.ytimg.com/vi/Kh1P2DrUyWc/mqdefault.jpg' } } } },
          { id: { videoId: 'aqAglKcoeio' }, snippet: { title: "If You're Joining College In 2026, Watch This.", channelTitle: 'Not Your College', thumbnails: { medium: { url: 'https://i.ytimg.com/vi/aqAglKcoeio/mqdefault.jpg' } } } },
          { id: { videoId: 'Rin0_ahlBRY' }, snippet: { title: '1st Year? Start Paying Your Own Fees', channelTitle: 'Not Your College', thumbnails: { medium: { url: 'https://i.ytimg.com/vi/Rin0_ahlBRY/mqdefault.jpg' } } } },
          { id: { videoId: '_aWbUudZ5Yo' }, snippet: { title: 'Python Full Course for Beginners to Advanced | 12 Hours Complete Tutorial + Python Book', channelTitle: 'Sheryians AI School', thumbnails: { medium: { url: 'https://i.ytimg.com/vi/_aWbUudZ5Yo/mqdefault.jpg' } } } },
          { id: { videoId: '3LRZRSIh_KE' }, snippet: { title: 'ReactJS Full Course | ReactJS - Learn Everything | Sheryians Coding School', channelTitle: 'Sheryians Coding School', thumbnails: { medium: { url: 'https://i.ytimg.com/vi/3LRZRSIh_KE/mqdefault.jpg' } } } },
          { id: { videoId: 'a-wVHL0lpb0' }, snippet: { title: 'JavaScript Full Course | JavaScript - Learn Everything | Sheryians Coding School', channelTitle: 'Sheryians Coding School', thumbnails: { medium: { url: 'https://i.ytimg.com/vi/a-wVHL0lpb0/mqdefault.jpg' } } } },
          { id: { videoId: '0IciwnJ6PJI' }, snippet: { title: 'Complete Backend One Shot | Beginners to Advanced  | Learn Node.js, Express, MongoDB from Scratch', channelTitle: 'Sheryians Coding School', thumbnails: { medium: { url: 'https://i.ytimg.com/vi/0IciwnJ6PJI/mqdefault.jpg' } } } },
          { id: { videoId: 'eF7HoC-cLRM' }, snippet: { title: 'Complete Statistics Course for Beginners | Data Science Tutorial | Sheryians AI School', channelTitle: 'Sheryians AI School', thumbnails: { medium: { url: 'https://i.ytimg.com/vi/eF7HoC-cLRM/mqdefault.jpg' } } } },
          { id: { videoId: 'AptmHn3bJoY' }, snippet: { title: 'KODR 2.0 Is Here: The Bootcamp That Changes Everything!', channelTitle: 'Sheryians Coding School', thumbnails: { medium: { url: 'https://i.ytimg.com/vi/AptmHn3bJoY/mqdefault.jpg' } } } },
          { id: { videoId: 'Zr0sNpeClV4' }, snippet: { title: 'Complete MS Excel course for Data Analyst | Job Oriented', channelTitle: 'Sheryians AI School', thumbnails: { medium: { url: 'https://i.ytimg.com/vi/Zr0sNpeClV4/mqdefault.jpg' } } } },
          { id: { videoId: 'Utgwk0r9Zq4' }, snippet: { title: 'Complete Data Science Course for Beginners | NumPy | Sheryians AI School', channelTitle: 'Sheryians AI School', thumbnails: { medium: { url: 'https://i.ytimg.com/vi/Utgwk0r9Zq4/mqdefault.jpg' } } } },
          { id: { videoId: 'vwncYfhxbR0' }, snippet: { title: 'Generative AI Full Course (Part 1 ) | Beginner to Advanced | LangChain, LLMs & Prompt Engineering', channelTitle: 'Sheryians AI School', thumbnails: { medium: { url: 'https://i.ytimg.com/vi/vwncYfhxbR0/mqdefault.jpg' } } } },
          { id: { videoId: 'omGvjpmPDoY' }, snippet: { title: 'Part 3 - Supervised Learning| Classification Algorithms for Beginners | Sheryians AI School', channelTitle: 'Sheryians AI School', thumbnails: { medium: { url: 'https://i.ytimg.com/vi/omGvjpmPDoY/mqdefault.jpg' } } } }
        ];
        
        // Exclude the currently playing video from suggestions
        const filteredFallback = fallbackVideos.filter(v => v.id.videoId !== activeVideoId);
        
        // Shuffle the array so it looks dynamic
        const shuffled = filteredFallback.sort(() => 0.5 - Math.random());
        
        // Slice a perfect multiple of 3 (for the 3-column grid/slider, e.g. 12 videos)
        setVideos(shuffled.slice(0, 12));
        setApiError(false);
        setQuotaExceeded(false);
      };

      setIsLoading(true);
      setQuotaExceeded(false);
      setApiError(false);
      try {
        let uniqueVideos = [];
        const INVIDIOUS_URL = "https://inv.zoomerville.com";
        
        // Search for the active video ID to get its title
        const detailsRes = await fetch(`${INVIDIOUS_URL}/api/v1/search?q=${activeVideoId}`);
        const detailsData = await detailsRes.json();
        
        if (Array.isArray(detailsData) && detailsData.length > 0) {
          const videoDetails = detailsData.find(item => item.type === 'video' && item.videoId === activeVideoId) || detailsData.find(item => item.type === 'video');
          
          if (videoDetails) {
            const title = videoDetails.title;
            // Use video keywords for relevance search
            const keywords = title.split(' ').slice(0, 3).join(' ');

            // Fetch related videos
            const searchRes = await fetch(`${INVIDIOUS_URL}/api/v1/search?q=${encodeURIComponent(keywords)}`);
            const searchData = await searchRes.json();
            
            if (Array.isArray(searchData)) {
               const videoItems = searchData.filter(item => item.type === 'video' && item.videoId !== activeVideoId && item.lengthSeconds > 60);
               uniqueVideos = videoItems.map(video => ({
                 id: { videoId: video.videoId },
                 snippet: {
                   title: video.title,
                   channelTitle: video.author,
                   thumbnails: {
                     medium: {
                       url: video.videoThumbnails?.find(t => t.quality === 'medium' || t.quality === 'mqdefault')?.url || video.videoThumbnails?.[0]?.url || `https://i.ytimg.com/vi/${video.videoId}/mqdefault.jpg`
                     },
                     default: {
                       url: `https://i.ytimg.com/vi/${video.videoId}/default.jpg`
                     }
                   }
                 }
               }));
            }
          }
        }
        
        if (uniqueVideos.length === 0) {
          console.warn("No related videos found or API failed. Falling back to local data.");
          loadFallbackSuggestions();
          return;
        }

        // Truncate to a multiple of 3 to avoid blank overlaps in the carousel sliding
        const validVideos = uniqueVideos.slice(0, uniqueVideos.length - (uniqueVideos.length % 3));
        if (validVideos.length === 0) {
           loadFallbackSuggestions();
           return;
        }
        setVideos(validVideos);
        
      } catch (err) {
        console.error("Error fetching related videos:", err);
        loadFallbackSuggestions();
      } finally {
        setIsLoading(false);
      }
    };

    fetchRelated();
  }, [activeVideoId]);

  useEffect(() => {
    if (videos.length === 0) return;
    const interval = setInterval(() => {
      setBatchIndex(prev => (prev + 3) % videos.length);
    }, 15000);
    return () => clearInterval(interval);
  }, [videos.length]);

  if (isLoading) {
    return (
      <div className="bg-card border border-border rounded-xl p-4 shadow-sm w-full mt-4 flex-shrink-0 animate-pulse">
        <div className="h-4 bg-muted rounded w-1/4 mb-4"></div>
        <div className="flex gap-4 overflow-hidden">
          {[1,2,3].map(i => (
            <div key={i} className="w-60 h-32 bg-muted rounded-lg flex-shrink-0"></div>
          ))}
        </div>
      </div>
    );
  }

  if (quotaExceeded) {
    return (
      <div className="bg-card border border-red-500/20 bg-red-500/5 rounded-xl p-4 shadow-sm w-full mt-4 flex-shrink-0 flex flex-col items-center justify-center text-center py-8">
        <AlertCircle className="text-red-500 mb-2" size={24} />
        <h3 className="font-semibold text-sm text-foreground mb-1">API Limit Reached</h3>
        <p className="text-xs text-muted-foreground">Cannot load related videos right now.</p>
      </div>
    );
  }

  if (apiError || videos.length === 0) return null;

  const getVisibleBatch = (videosList, startIndex, count) => {
    if (!videosList || videosList.length === 0) return [];
    const batch = [];
    for (let i = 0; i < count; i++) {
      batch.push(videosList[(startIndex + i) % videosList.length]);
    }
    return batch;
  };

  return (
    <div className="bg-card border border-border rounded-xl p-4 shadow-sm w-full mt-4 flex-shrink-0 overflow-hidden">
      <h3 className="font-semibold text-sm mb-3 flex items-center gap-2 text-muted-foreground">
        <Lightbulb size={16} />
        Related Videos
      </h3>
      
      <div className="flex gap-4 overflow-hidden w-full relative h-[220px]">
        <div key={`sug-${batchIndex}`} className="flex gap-4 absolute inset-0 transition-opacity duration-700 animate-in fade-in fill-mode-forwards w-max">
          {getVisibleBatch(videos, batchIndex, 3).map((video, index) => (
            <div key={video.id.videoId + "-" + index} className="flex-shrink-0 w-60 group cursor-pointer rounded-lg bg-muted/30 border border-transparent hover:border-border hover:bg-muted/50 p-2 transition-all duration-300 flex flex-col">
              <div className="aspect-video bg-muted rounded-md mb-2 flex items-center justify-center relative overflow-hidden">
                <img 
                  src={video.snippet.thumbnails?.medium?.url || video.snippet.thumbnails?.default?.url} 
                  alt={video.snippet.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <PlayCircle className="text-white transform group-hover:scale-110 duration-300" size={32} />
                </div>
              </div>
              <h4 className="text-xs font-medium text-foreground line-clamp-2 leading-snug group-hover:text-primary transition-colors">{video.snippet.title}</h4>
              <p className="text-[10px] text-muted-foreground mt-1">{video.snippet.channelTitle}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Suggestions;

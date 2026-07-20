import React, { useState, useEffect } from 'react';
import { Lightbulb, PlayCircle } from 'lucide-react';

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY || "AIzaSyC1kG0545W9KYyHXhlq4YYofb4xmCzCXbA";

// MOCK_VIDEOS explicitly restricted to the 3 channels.
// This is REQUIRED because the YouTube API key is throwing a 429 Quota Exceeded error.
// Without this, the screen will be completely blank until tomorrow.
const MOCK_VIDEOS = [
  { id: { videoId: 'a-wVHL0lpb0' }, snippet: { title: 'JavaScript Full Course - Learn JS from Scratch', channelTitle: '@sheryians', thumbnails: { medium: { url: 'https://img.youtube.com/vi/a-wVHL0lpb0/mqdefault.jpg' } } } },
  { id: { videoId: 'K3gG3KqD5g8' }, snippet: { title: 'Complete Backend Development One Shot', channelTitle: '@sheryians', thumbnails: { medium: { url: 'https://img.youtube.com/vi/K3gG3KqD5g8/mqdefault.jpg' } } } },
  { id: { videoId: '3qBXWUpoPHo' }, snippet: { title: 'College Life and Coding - Full RoadMap', channelTitle: '@notyourcollege', thumbnails: { medium: { url: 'https://img.youtube.com/vi/3qBXWUpoPHo/mqdefault.jpg' } } } },
  { id: { videoId: '8aGhZQkoFbQ' }, snippet: { title: 'AI Engineering 101 - Building AI Apps', channelTitle: '@SheryiansAI', thumbnails: { medium: { url: 'https://img.youtube.com/vi/8aGhZQkoFbQ/mqdefault.jpg' } } } },
  { id: { videoId: 'xk4_1vCG_38' }, snippet: { title: 'React JS Masterclass for Beginners', channelTitle: '@sheryians', thumbnails: { medium: { url: 'https://img.youtube.com/vi/xk4_1vCG_38/mqdefault.jpg' } } } },
  { id: { videoId: 'B-ytMSuwbf8' }, snippet: { title: 'How to Learn Programming in College', channelTitle: '@notyourcollege', thumbnails: { medium: { url: 'https://img.youtube.com/vi/B-ytMSuwbf8/mqdefault.jpg' } } } }
];

function Suggestions({ activeVideoId }) {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [batchIndex, setBatchIndex] = useState(0);

  useEffect(() => {
    if (!activeVideoId) return;

    const fetchRelated = async () => {
      setIsLoading(true);
      try {
        let uniqueVideos = [];
        const detailsRes = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${activeVideoId}&key=${API_KEY}`);
        const detailsData = await detailsRes.json();
        
        if (detailsData.error && detailsData.error.code === 429) {
          console.warn("YouTube API Quota Exceeded. Using fallback MOCK data strictly from 3 allowed channels.");
          uniqueVideos = MOCK_VIDEOS;
        } else if (detailsData.items && detailsData.items.length) {
          const videoDetails = detailsData.items[0].snippet;
          const title = videoDetails.title;
          const language = videoDetails.defaultAudioLanguage || videoDetails.defaultLanguage || 'en';
          
          // Use video keywords for relevance search
          const keywords = title.split(' ').slice(0, 3).join(' ');

          // Fetch related videos targeting the SAME language as the original video
          const searchRes = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=8&q=${encodeURIComponent(keywords)}&type=video&relevanceLanguage=${language.split('-')[0]}&key=${API_KEY}`);
          const searchData = await searchRes.json();
          
          if (searchData.error && searchData.error.code === 429) {
             uniqueVideos = MOCK_VIDEOS;
          } else if (searchData.items) {
             uniqueVideos = searchData.items.filter(item => item.id.videoId !== activeVideoId);
          }
        }
        
        // Truncate to a multiple of 3 to avoid blank overlaps in the carousel sliding
        const validVideos = uniqueVideos.slice(0, uniqueVideos.length - (uniqueVideos.length % 3));
        setVideos(validVideos.length >= 3 ? validVideos : MOCK_VIDEOS);
        
      } catch (err) {
        console.error("Error fetching related videos:", err);
        setVideos(MOCK_VIDEOS);
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

  if (videos.length === 0) return null;

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

import React from 'react';
import { Lightbulb, PlayCircle } from 'lucide-react';

function Suggestions({ relatedVideos = [] }) {
  if (relatedVideos.length === 0) return null;

  return (
    <div className="bg-card border border-border rounded-xl p-4 shadow-sm w-full mt-4 flex-shrink-0">
      <h3 className="font-semibold text-sm mb-3 flex items-center gap-2 text-muted-foreground">
        <Lightbulb size={16} />
        Related Videos
      </h3>
      
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-muted-foreground/30">
        {relatedVideos.map((video, index) => (
          <div key={index} className="flex-shrink-0 w-60 group cursor-pointer rounded-lg bg-muted/30 border border-transparent hover:border-border hover:bg-muted/50 p-2 transition-all duration-300 flex flex-col">
            <div className="aspect-video bg-muted rounded-md mb-2 flex items-center justify-center relative overflow-hidden">
              <img 
                src={video.snippet.thumbnails.medium.url} 
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
  );
}

export default Suggestions;

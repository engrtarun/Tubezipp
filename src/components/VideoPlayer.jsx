import React, { useEffect, useState } from 'react';
import { Play, Pause, Volume2, Maximize, Settings, SkipForward } from 'lucide-react';

function VideoPlayer({ activeTimestamp }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState('00:00');
  
  useEffect(() => {
    if (activeTimestamp) {
      setIsPlaying(true);
      setCurrentTime(activeTimestamp);
    }
  }, [activeTimestamp]);

  return (
    <div className="w-full flex-shrink-0 bg-black rounded-xl overflow-hidden aspect-video relative group border border-border shadow-md">
      {/* Fake Video Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black text-center p-6">
        <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">React Frameworks in 2024</h2>
        <p className="text-gray-400">Current Time: {currentTime}</p>
        
        {!isPlaying && (
          <button 
            className="mt-6 w-16 h-16 bg-primary/90 text-white rounded-full flex items-center justify-center hover:bg-primary transition-transform hover:scale-105"
            onClick={() => setIsPlaying(true)}
          >
            <Play fill="currentColor" size={32} className="ml-2" />
          </button>
        )}
      </div>

      {/* Video Controls Overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        
        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-white/20 rounded-full mb-4 cursor-pointer relative">
          <div className="absolute top-0 left-0 h-full bg-primary rounded-full w-1/3"></div>
          <div className="absolute top-1/2 left-1/3 w-3 h-3 bg-white rounded-full -translate-y-1/2 -translate-x-1/2 transform scale-0 group-hover:scale-100 transition-transform"></div>
        </div>

        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsPlaying(!isPlaying)} className="hover:text-primary transition-colors">
              {isPlaying ? <Pause fill="currentColor" /> : <Play fill="currentColor" />}
            </button>
            <button className="hover:text-primary transition-colors hidden sm:block">
              <SkipForward fill="currentColor" />
            </button>
            <div className="flex items-center gap-2 group/volume">
              <button className="hover:text-primary transition-colors">
                <Volume2 />
              </button>
              <div className="w-0 overflow-hidden group-hover/volume:w-16 transition-all duration-300">
                <div className="w-16 h-1 bg-white/20 rounded-full mt-1">
                  <div className="h-full bg-white rounded-full w-3/4"></div>
                </div>
              </div>
            </div>
            <span className="text-xs font-medium ml-2">{currentTime} / 15:42</span>
          </div>

          <div className="flex items-center gap-4">
            <button className="hover:text-primary transition-colors">
              <Settings size={20} />
            </button>
            <button className="hover:text-primary transition-colors">
              <Maximize size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;

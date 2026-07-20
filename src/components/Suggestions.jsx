import React from 'react';
import { Lightbulb, PlayCircle } from 'lucide-react';

function Suggestions() {
  const suggestions = [
    { title: 'Advanced React Patterns', author: 'React Mastery', time: '18:24' },
    { title: 'Understanding useMemo & useCallback', author: 'Frontend Dev', time: '12:10' },
    { title: 'State Management in 2024', author: 'Code Daily', time: '24:05' },
    { title: 'Next.js 14 Crash Course', author: 'Web Dev Simplified', time: '45:00' },
  ];

  return (
    <div className="bg-card border border-border rounded-xl p-4 shadow-sm w-full mt-4 flex-shrink-0">
      <h3 className="font-semibold text-sm mb-3 flex items-center gap-2 text-muted-foreground">
        <Lightbulb size={16} />
        Related Videos
      </h3>
      
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-muted-foreground/30">
        {suggestions.map((item, index) => (
          <div key={index} className="flex-shrink-0 w-60 group cursor-pointer rounded-lg bg-muted/30 border border-transparent hover:border-border hover:bg-muted/50 p-2 transition-all duration-300">
            <div className="aspect-video bg-black/40 rounded-md mb-2 flex items-center justify-center group-hover:bg-black/60 transition-colors relative overflow-hidden">
              <PlayCircle className="text-white/50 group-hover:text-primary transition-colors transform group-hover:scale-110 duration-300" size={24} />
              <span className="absolute bottom-1.5 right-1.5 bg-black/80 text-white text-[10px] px-1.5 py-0.5 rounded font-mono">
                {item.time}
              </span>
            </div>
            <h4 className="text-xs font-medium text-foreground line-clamp-2 leading-snug group-hover:text-primary transition-colors">{item.title}</h4>
            <p className="text-[10px] text-muted-foreground mt-1">{item.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Suggestions;

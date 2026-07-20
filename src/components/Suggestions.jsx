import React from 'react';
import { Lightbulb, PlayCircle } from 'lucide-react';

function Suggestions() {
  const suggestions = [
    { title: 'Advanced React Patterns', author: 'React Mastery', time: '18:24' },
    { title: 'Understanding useMemo & useCallback', author: 'Frontend Dev', time: '12:10' },
    { title: 'State Management in 2024', author: 'Code Daily', time: '24:05' }
  ];

  return (
    <div className="bg-card border border-border rounded-xl p-4 shadow-sm flex-1">
      <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
        <Lightbulb size={18} className="text-primary" />
        Curated Suggestions
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {suggestions.map((item, index) => (
          <div key={index} className="group cursor-pointer rounded-lg bg-muted/30 border border-transparent hover:border-border hover:bg-muted/50 p-3 transition-all duration-300">
            <div className="aspect-video bg-black/40 rounded-md mb-3 flex items-center justify-center group-hover:bg-black/60 transition-colors relative overflow-hidden">
              <PlayCircle className="text-white/50 group-hover:text-primary transition-colors transform group-hover:scale-110 duration-300" size={32} />
              <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] px-1.5 py-0.5 rounded font-mono">
                {item.time}
              </span>
            </div>
            <h4 className="text-sm font-medium text-foreground line-clamp-2 leading-snug group-hover:text-primary transition-colors">{item.title}</h4>
            <p className="text-xs text-muted-foreground mt-1">{item.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Suggestions;

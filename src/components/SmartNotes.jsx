import React from 'react';
import { Download, Share2, Type } from 'lucide-react';

function SmartNotes({ onTimestampClick }) {
  const notes = [
    {
      time: '01:23',
      text: 'React ke naye hooks kaise kaam karte hain, iska basic introduction.',
      isCode: false
    },
    {
      time: '04:15',
      text: 'Yahan ek example diya gaya hai state update karne ka:',
      isCode: true,
      code: 'const [count, setCount] = useState(0);'
    },
    {
      time: '08:45',
      text: 'Performance optimization ke liye <strong>useMemo</strong> ka use karna zaroori hai jab heavy calculations hon.',
      isCode: false
    }
  ];

  return (
    <div className="bg-card border border-border rounded-xl h-full flex flex-col shadow-sm">
      <div className="p-4 border-b border-border flex items-center justify-between bg-muted/30 rounded-t-xl">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          <Type size={18} className="text-primary" />
          Smart Notes
        </h3>
        <div className="flex gap-2">
          <button className="p-1.5 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-colors" title="Share">
            <Share2 size={16} />
          </button>
          <button className="p-1.5 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-colors" title="Export Markdown">
            <Download size={16} />
          </button>
        </div>
      </div>
      
      <div className="p-4 overflow-y-auto flex-1 space-y-4 custom-scrollbar">
        {notes.map((note, index) => (
          <div key={index} className="group flex gap-3">
            <button 
              onClick={() => onTimestampClick(note.time)}
              className="flex-shrink-0 text-xs font-mono bg-primary/10 text-primary px-2 py-1 rounded-md h-fit hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
            >
              {note.time}
            </button>
            <div className="text-sm pt-0.5">
              <div 
                className="text-foreground/90 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: note.text }}
              />
              {note.isCode && (
                <div className="mt-2 bg-black text-gray-200 p-3 rounded-lg font-mono text-xs overflow-x-auto border border-border">
                  <code>{note.code}</code>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SmartNotes;

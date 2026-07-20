import React, { useState } from 'react';
import { Send, Bot, User, MessageSquare } from 'lucide-react';

function AskVideoChat() {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! Ask me anything about this video.' }
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setMessages([...messages, { role: 'user', content: query }]);
    setQuery('');
    
    // Fake typing effect and response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Based on the video at [04:15], the instructor explains that...' 
      }]);
    }, 1000);
  };

  return (
    <div className="bg-card border border-border rounded-xl h-full flex flex-col shadow-sm">
      <div className="p-4 border-b border-border bg-muted/30 rounded-t-xl">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          <MessageSquare size={18} className="text-primary" />
          Ask the Video
        </h3>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto space-y-4 custom-scrollbar">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-primary/20 text-primary' : 'bg-secondary text-secondary-foreground'}`}>
              {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
            </div>
            <div className={`text-sm p-3 rounded-lg max-w-[85%] ${msg.role === 'user' ? 'bg-primary text-primary-foreground rounded-tr-none' : 'bg-muted text-foreground rounded-tl-none'}`}>
              {msg.content}
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-3 border-t border-border bg-card rounded-b-xl">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What code was written at 15th min?"
            className="flex-1 bg-muted/50 border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all text-foreground"
          />
          <button 
            type="submit" 
            className="bg-primary text-primary-foreground p-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center aspect-square"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}

export default AskVideoChat;

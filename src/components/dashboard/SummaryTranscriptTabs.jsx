import React, { useState } from 'react';
import { Copy, Download, FileText, AlignLeft } from 'lucide-react';

// TODO: Integrate the Groq API using the key below
const GROQ_API_KEY = "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";

function SummaryTranscriptTabs() {
  const [activeTab, setActiveTab] = useState('summary');
  const [selectedLanguage, setSelectedLanguage] = useState('Original Language');
  const [translatedTranscript, setTranslatedTranscript] = useState(null);
  const [isTranslating, setIsTranslating] = useState(false);

  const dummyTranscript = "[00:00] This is a placeholder for the video transcript.\n[00:15] Today we will learn about advanced React patterns.\n[00:30] Let's get started by exploring the useState hook.";

  const handleTranslate = async (e) => {
    const lang = e.target.value;
    setSelectedLanguage(lang);
    
    if (lang === 'Original Language') {
      setTranslatedTranscript(null);
      return;
    }

    setIsTranslating(true);
    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "system",
              content: `You are a professional translator. Translate the following transcript into ${lang}. Maintain the timestamps.`
            },
            {
              role: "user",
              content: dummyTranscript
            }
          ],
          temperature: 0.3
        })
      });
      
      const data = await response.json();
      if (data.choices && data.choices[0]) {
        setTranslatedTranscript(data.choices[0].message.content);
      }
    } catch (error) {
      console.error("Translation error:", error);
      setTranslatedTranscript("Error translating the transcript.");
    } finally {
      setIsTranslating(false);
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  const handleDownload = (text, filename) => {
    const element = document.createElement("a");
    const file = new Blob([text], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="bg-card border border-border rounded-xl shadow-sm flex flex-col h-[500px] lg:h-[calc(100vh-140px)] overflow-hidden">
      {/* Tabs Header */}
      <div className="flex border-b border-border">
        <button
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 text-sm font-medium transition-colors ${
            activeTab === 'summary' 
              ? 'text-primary border-b-2 border-primary bg-muted/20' 
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/10'
          }`}
          onClick={() => setActiveTab('summary')}
        >
          <FileText size={16} />
          Summary
        </button>
        <button
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 text-sm font-medium transition-colors ${
            activeTab === 'transcript' 
              ? 'text-primary border-b-2 border-primary bg-muted/20' 
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/10'
          }`}
          onClick={() => setActiveTab('transcript')}
        >
          <AlignLeft size={16} />
          Transcript
        </button>
      </div>

      {/* Tabs Content */}
      <div className="p-6 overflow-y-auto flex-1">
        {activeTab === 'summary' ? (
          <div className="flex flex-col h-full space-y-4">
            <div className="flex justify-end gap-2 mb-2">
              <button 
                onClick={() => handleCopy("This is a placeholder for the AI-generated video summary...")}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-muted text-foreground rounded hover:bg-muted/80 transition-colors cursor-pointer group relative"
              >
                <Copy size={14} /> Copy
              </button>
              <button 
                onClick={() => handleDownload("This is a placeholder for the AI-generated video summary...", "summary.txt")}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-muted text-foreground rounded hover:bg-muted/80 transition-colors cursor-pointer group relative"
              >
                <Download size={14} /> Download .txt
              </button>
            </div>
            <div className="prose prose-invert max-w-none text-sm text-muted-foreground leading-relaxed">
              <p>
                This is a placeholder for the AI-generated video summary. 
                Your team will integrate the Groq API here using the provided key.
              </p>
              <p>
                The summary will provide a concise overview of the video content, highlighting key points, 
                major topics discussed, and important conclusions.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-full space-y-4">
            <div className="flex justify-between items-center mb-2">
              <select 
                value={selectedLanguage}
                onChange={handleTranslate}
                className="bg-muted text-foreground text-xs rounded border border-border px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="Original Language">Original Language</option>
                <option value="Hindi">Hindi</option>
                <option value="English">English</option>
              </select>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => handleCopy(translatedTranscript || dummyTranscript)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-muted text-foreground rounded hover:bg-muted/80 transition-colors cursor-pointer"
                >
                  <Copy size={14} /> Copy
                </button>
                <button 
                  onClick={() => handleDownload(translatedTranscript || dummyTranscript, "transcript.txt")}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-muted text-foreground rounded hover:bg-muted/80 transition-colors cursor-pointer"
                >
                  <Download size={14} /> Download
                </button>
              </div>
            </div>
            
            <div className="prose prose-invert max-w-none text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
              {isTranslating ? (
                 <div className="flex items-center gap-2 text-primary">
                    <span className="animate-pulse">Translating...</span>
                 </div>
              ) : (
                 <p>{translatedTranscript || dummyTranscript}</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Groq Chat Input Bar */}
      <div className="p-4 border-t border-border bg-background/50">
        <form onSubmit={(e) => e.preventDefault()} className="relative group flex items-center">
          <input
            type="text"
            className="w-full bg-muted/30 border border-border rounded-full py-3 pl-4 pr-12 text-sm focus:outline-none focus:border-primary focus:bg-background transition-all shadow-sm"
            placeholder="Ask anything about this video..."
          />
          <button
            type="button"
            className="absolute right-2 p-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}

export default SummaryTranscriptTabs;

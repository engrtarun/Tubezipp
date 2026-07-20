import React, { useState, useEffect, useRef } from 'react';
import { Copy, Download, FileText, AlignLeft, Info, Send } from 'lucide-react';

function SummaryTranscriptTabs({ videoUrl }) {
  const [activeTab, setActiveTab] = useState('summary');
  const [selectedLanguage, setSelectedLanguage] = useState('Original Language');
  const [transcript, setTranscript] = useState(null);
  const [summary, setSummary] = useState(null);
  const [translatedTranscript, setTranslatedTranscript] = useState(null);
  const [summaryLanguage, setSummaryLanguage] = useState('Original Language');
  const [translatedSummary, setTranslatedSummary] = useState(null);
  const [isTranslatingSummary, setIsTranslatingSummary] = useState(false);
  
  const [isLoadingTranscript, setIsLoadingTranscript] = useState(false);
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [error, setError] = useState(null);

  const [chatQuery, setChatQuery] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [isChatting, setIsChatting] = useState(false);
  const chatContainerRef = useRef(null);
  
  const [videoTitle, setVideoTitle] = useState('');
  const [videoDescription, setVideoDescription] = useState('');

  const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY || "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";
  const YT_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY || "AIzaSyC1kG0545W9KYyHXhlq4YYofb4xmCzCXbA"; // Used for fetching description if transcript fails

  useEffect(() => {
    if (!videoUrl) return;

    const fetchTranscriptAndMeta = async () => {
      setIsLoadingTranscript(true);
      setError(null);
      setTranscript(null);
      setSummary(null);
      setSummaryLanguage('Original Language');
      setTranslatedSummary(null);
      setIsTranslatingSummary(false);
      setVideoTitle('');
      setVideoDescription('');
      
      let vTitle = '';
      let vDesc = '';
      
      try {
        const videoIdMatch = videoUrl.match(/(?:youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/);
        const videoId = videoIdMatch && videoIdMatch[1] ? videoIdMatch[1] : null;

        if (!videoId) throw new Error("Invalid Video URL");

        // Fetch precise title and description upfront via API for robust fallback
        try {
          const ytRes = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${YT_API_KEY}`);
          const ytData = await ytRes.json();
          if (ytData.items && ytData.items.length > 0) {
            vTitle = ytData.items[0].snippet.title;
            vDesc = ytData.items[0].snippet.description;
            setVideoTitle(vTitle);
            setVideoDescription(vDesc);
          }
        } catch (ytErr) {
          console.warn("Could not fetch YouTube meta:", ytErr);
        }

        // Fetch transcript from the open youtube-transcript.ai service (fully supports CORS and returns clean markdown/txt)
        const response = await fetch(`https://youtube-transcript.ai/transcript/${videoId}.txt`);
        if (!response.ok) throw new Error("Failed to fetch transcript from service.");
        const text = await response.text();

        // Parse and clean the transcript (remove header metadata up to the marker)
        let parsedTranscript = text;
        const marker = "## Transcript";
        const markerIndex = text.indexOf(marker);
        if (markerIndex !== -1) {
          parsedTranscript = text.slice(markerIndex + marker.length).trim();
        }

        // Clean double-newlines for better readability
        parsedTranscript = parsedTranscript.replace(/\n\n/g, "\n");

        if (!parsedTranscript) {
          return { success: false, transcript: null, title: vTitle, description: vDesc };
        }
        
        setTranscript(parsedTranscript);
        generateSummary(parsedTranscript, vTitle, vDesc);
        return { success: true, transcript: parsedTranscript, title: vTitle, description: vDesc };
      } catch (err) {
        console.error("Error loading transcript:", err);
        return { success: false, transcript: null, title: vTitle, description: vDesc };
      } finally {
        setIsLoadingTranscript(false);
      }
    };

    const loadTranscript = async () => {
      const result = await fetchTranscriptAndMeta();

      if (!result.success) {
        setError("Transcript unavailable. Using Video Title & Description for context.");
        setTranscript("");

        if (result.title || result.description) {
          generateSummary("", result.title, result.description);
        } else {
          setSummary("Could not fetch video details or transcript to generate a summary.");
        }
      }
    };

    loadTranscript();
  }, [videoUrl]);

  const generateSummary = async (transcriptText, titleFallback, descFallback) => {
    setIsLoadingSummary(true);
    try {
      const context = transcriptText ? transcriptText.substring(0, 15000) : `Title: ${titleFallback}\n\nDescription: ${descFallback}`;
      const systemMessage = transcriptText 
        ? "You are an AI assistant that creates concise, structured, and highly readable summaries of video transcripts. Extract key points and conclusions."
        : "You are an AI assistant that creates concise, structured, and highly readable summaries of videos based on their Title and Description.";

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
              content: systemMessage
            },
            {
              role: "user",
              content: `Please summarize the following video details:\n\n${context}`
            }
          ],
          temperature: 0.3
        })
      });
      
      const data = await response.json();
      if (data.choices && data.choices[0]) {
        setSummary(data.choices[0].message.content);
      }
    } catch (err) {
      console.error("Summary error:", err);
      setSummary("Error generating summary.");
    } finally {
      setIsLoadingSummary(false);
    }
  };

  const handleTranslate = async (e) => {
    const lang = e.target.value;
    setSelectedLanguage(lang);
    
    if (lang === 'Original Language') {
      setTranslatedTranscript(null);
      return;
    }

    if (!transcript) return;

    setIsTranslating(true);
    try {
      const truncated = transcript.substring(0, 15000);
      
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
              content: truncated
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

  const handleTranslateSummary = async (e) => {
    const lang = e.target.value;
    setSummaryLanguage(lang);
    
    if (lang === 'Original Language') {
      setTranslatedSummary(null);
      return;
    }

    if (!summary) return;

    setIsTranslatingSummary(true);
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
              content: `You are a professional translator. Translate the following video summary into ${lang}. Retain all formatting, lists, code blocks, and markdown structure.`
            },
            {
              role: "user",
              content: summary
            }
          ],
          temperature: 0.3
        })
      });
      
      const data = await response.json();
      if (data.choices && data.choices[0]) {
        setTranslatedSummary(data.choices[0].message.content);
      }
    } catch (error) {
      console.error("Summary translation error:", error);
      setTranslatedSummary("Error translating the summary.");
    } finally {
      setIsTranslatingSummary(false);
    }
  };

  const handleSendChat = async () => {
    if (!chatQuery.trim() || isChatting) return;
    
    const newMessage = { role: 'user', content: chatQuery };
    setChatMessages(prev => [...prev, newMessage]);
    setChatQuery('');
    setIsChatting(true);

    try {
      // Fallback to description if transcript is empty
      const contextContent = transcript ? transcript.substring(0, 12000) : videoDescription.substring(0, 12000);
      
      const systemContextMessage = `You are an AI learning assistant for the platform Tubezip. You must answer the user's questions strictly based on the following video details:\nTitle: ${videoTitle}\nDescription/Transcript: ${contextContent}`;
      
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
              content: systemContextMessage
            },
            ...chatMessages.map(m => ({ role: m.role, content: m.content })),
            { role: "user", content: chatQuery }
          ],
          temperature: 0.5
        })
      });
      
      const data = await response.json();
      if (data.choices && data.choices[0]) {
        setChatMessages(prev => [...prev, { role: 'assistant', content: data.choices[0].message.content }]);
      }
    } catch (err) {
      console.error("Chat error:", err);
      setChatMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I couldn't process your request." }]);
    } finally {
      setIsChatting(false);
      setTimeout(() => {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
      }, 100);
    }
  };

  const handleCopy = (text) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  const handleDownload = (text, filename) => {
    if (!text) return;
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
      <div className="flex border-b border-border shrink-0">
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
        <button
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 text-sm font-medium transition-colors ${
            activeTab === 'chat' 
              ? 'text-primary border-b-2 border-primary bg-muted/20' 
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/10'
          }`}
          onClick={() => setActiveTab('chat')}
        >
          <Info size={16} />
          Chat
        </button>
      </div>

      {/* Tabs Content */}
      <div className="p-6 overflow-y-auto flex-1" ref={chatContainerRef}>
        {activeTab === 'summary' ? (
          <div className="flex flex-col h-full space-y-4">
            <div className="flex justify-between items-center mb-2 shrink-0">
              <select 
                value={summaryLanguage}
                onChange={handleTranslateSummary}
                disabled={!summary || isLoadingSummary || isTranslatingSummary}
                className="bg-muted text-foreground text-xs rounded border border-border px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50 cursor-pointer"
              >
                <option value="Original Language">Original Language</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="Hindi">Hindi</option>
                <option value="English">English</option>
              </select>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => handleCopy(translatedSummary || summary)}
                  disabled={!summary || isLoadingSummary || isTranslatingSummary}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-muted text-foreground rounded hover:bg-muted/80 transition-colors cursor-pointer group relative disabled:opacity-50"
                >
                  <Copy size={14} /> Copy
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white px-2 py-1 text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">Copy Summary</span>
                </button>
                <button 
                  onClick={() => handleDownload(translatedSummary || summary, "summary.txt")}
                  disabled={!summary || isLoadingSummary || isTranslatingSummary}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-muted text-foreground rounded hover:bg-muted/80 transition-colors cursor-pointer group relative disabled:opacity-50"
                >
                  <Download size={14} /> Download .txt
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white px-2 py-1 text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">Download Summary</span>
                </button>
              </div>
            </div>
            <div className="prose prose-invert max-w-none text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {isLoadingSummary || isLoadingTranscript ? (
                 <div className="flex flex-col items-center justify-center h-40 gap-4 text-primary">
                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <span className="animate-pulse">{isLoadingTranscript ? "Fetching Transcript & Details..." : "Generating AI Summary..."}</span>
                 </div>
              ) : isTranslatingSummary ? (
                 <div className="flex flex-col items-center justify-center h-40 gap-4 text-primary">
                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <span className="animate-pulse">Translating Summary...</span>
                 </div>
              ) : (
                <p>{translatedSummary || summary || "Waiting for transcript..."}</p>
              )}
            </div>
          </div>
        ) : activeTab === 'transcript' ? (
          <div className="flex flex-col h-full space-y-4">
            <div className="flex justify-between items-center mb-2">
              <select 
                value={selectedLanguage}
                onChange={handleTranslate}
                disabled={!transcript || isLoadingTranscript}
                className="bg-muted text-foreground text-xs rounded border border-border px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
              >
                <option value="Original Language">Original Language</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="Hindi">Hindi</option>
                <option value="English">English</option>
              </select>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => handleCopy(translatedTranscript || transcript)}
                  disabled={!transcript || isLoadingTranscript}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-muted text-foreground rounded hover:bg-muted/80 transition-colors cursor-pointer group relative disabled:opacity-50"
                >
                  <Copy size={14} /> Copy
                </button>
                <button 
                  onClick={() => handleDownload(translatedTranscript || transcript, "transcript.txt")}
                  disabled={!transcript || isLoadingTranscript}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-muted text-foreground rounded hover:bg-muted/80 transition-colors cursor-pointer group relative disabled:opacity-50"
                >
                  <Download size={14} /> Download
                </button>
              </div>
            </div>
            
            <div className="prose prose-invert max-w-none text-sm text-muted-foreground leading-relaxed whitespace-pre-line overflow-y-auto">
              {isLoadingTranscript ? (
                 <div className="flex flex-col items-center justify-center h-40 gap-4 text-primary">
                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <span className="animate-pulse">Fetching Transcript...</span>
                 </div>
              ) : isTranslating ? (
                 <div className="flex items-center gap-2 text-primary justify-center h-40">
                    <span className="animate-pulse">Translating...</span>
                 </div>
              ) : (
                 <p>{error ? <span className="text-amber-500">{error}</span> : (translatedTranscript || transcript || "Waiting for transcript...")}</p>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col space-y-4">
             {chatMessages.length === 0 ? (
               <div className="text-center text-muted-foreground mt-10">
                 <p>Ask anything about this video!</p>
               </div>
             ) : (
               chatMessages.map((msg, idx) => (
                 <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                   <div className={`max-w-[80%] rounded-xl px-4 py-2 text-sm ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'}`}>
                     {msg.content}
                   </div>
                 </div>
               ))
             )}
             {isChatting && (
               <div className="flex justify-start">
                 <div className="bg-muted text-foreground rounded-xl px-4 py-2 text-sm flex gap-1">
                   <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce"></span>
                   <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce delay-75"></span>
                   <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce delay-150"></span>
                 </div>
               </div>
             )}
          </div>
        )}
      </div>

      {/* Groq Chat Input Bar */}
      <div className="p-4 border-t border-border bg-background/50 shrink-0">
        <div className="relative group flex items-center">
          <input
            type="text"
            className="w-full bg-muted/30 border border-border rounded-full py-3 pl-4 pr-12 text-sm focus:outline-none focus:border-primary focus:bg-background transition-all shadow-sm"
            placeholder="Ask anything about this video..."
            value={chatQuery}
            onChange={(e) => setChatQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendChat();
            }}
          />
          <button
            onClick={handleSendChat}
            disabled={isChatting || !chatQuery.trim()}
            className="absolute right-2 p-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SummaryTranscriptTabs;

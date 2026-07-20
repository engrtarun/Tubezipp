import React, { useState, useEffect } from "react";
import { Sparkles, Play, MessageSquare, Share2, Send, Check } from "lucide-react";

const TABS = [
  {
    name: "AI Notes",
    icon: <Sparkles size={14} />,
    title: "Smart AI Notes",
  },
  {
    name: "Transcript",
    icon: <Play size={14} />,
    title: "Interactive Timestamps",
  },
  {
    name: "Ask AI",
    icon: <MessageSquare size={14} />,
    title: "Conversational AI Chat",
  },
  {
    name: "Easy Export",
    icon: <Share2 size={14} />,
    title: "Export Options",
  },
];

const FeatureCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TABS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isHovered]);

  const getSlideClass = (idx) => {
    if (activeIndex === idx) return "opacity-100 translate-x-0 pointer-events-auto";
    if (idx < activeIndex) return "opacity-0 -translate-x-full pointer-events-none";
    return "opacity-0 translate-x-full pointer-events-none";
  };

  return (
    <div
      className="w-full max-w-xl rounded-3xl border border-gray-200 bg-gray-50 p-4 shadow-xl flex flex-col h-[450px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Tabs Header */}
      <div className="flex border-b border-gray-200/60 pb-3 shrink-0 gap-1 overflow-x-auto no-scrollbar">
        {TABS.map((tab, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`flex items-center gap-1.5 py-1.5 px-3 text-xs font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeIndex === idx
                ? "bg-black text-white shadow-sm"
                : "text-gray-500 hover:text-gray-800 hover:bg-gray-200/50"
            }`}
          >
            {tab.icon}
            <span>{tab.name}</span>
          </button>
        ))}
      </div>

      {/* Screen Body Container */}
      <div className="flex-1 mt-4 relative overflow-hidden rounded-2xl bg-white shadow-inner flex flex-col">
        
        {/* Slide 1: AI Smart Notes */}
        <div
          className={`absolute inset-0 flex flex-col transition-all duration-500 ease-in-out ${getSlideClass(0)}`}
        >
          {/* Mock Video Container */}
          <div className="relative aspect-video bg-slate-900 flex items-center justify-center overflow-hidden shrink-0">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618401471353-b98aedd07871?auto=format&fit=crop&w=600&q=80')] bg-cover bg-center opacity-30"></div>
            {/* Video Header Overlay */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
              <span className="text-[9px] font-bold tracking-wider text-white bg-red-600 px-2 py-0.5 rounded-full uppercase">
                Demo Video
              </span>
              <span className="text-[10px] text-gray-300 font-mono bg-black/40 px-1.5 py-0.5 rounded backdrop-blur-xs">14:25</span>
            </div>
            {/* YouTube Big Play Button Mockup */}
            <div className="relative z-10 w-12 h-12 rounded-full bg-red-600 flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer">
              <Play className="fill-white text-white ml-0.5" size={20} />
            </div>
            {/* Play progress bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800">
              <div className="w-1/3 h-full bg-red-600 animate-pulse"></div>
            </div>
          </div>
          
          {/* Mock Notes Area */}
          <div className="p-4 flex-1 flex flex-col justify-between bg-white overflow-y-auto">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-gray-800 text-xs">AI Smart Notes</h4>
                <span className="text-[9px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full uppercase">
                  Hinglish / English
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex items-start gap-2 text-xs text-gray-600">
                  <span className="font-semibold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded text-[10px] shrink-0 mt-0.5 font-mono">
                    01:45
                  </span>
                  <p className="text-gray-700 leading-snug">
                    <strong>Setup React App:</strong> Run <code className="bg-gray-50 text-pink-600 px-1 py-0.5 rounded border border-gray-100 font-mono text-[10px]">npx create-vite</code> to build application scaffolding.
                  </p>
                </div>
                <div className="flex items-start gap-2 text-xs text-gray-600">
                  <span className="font-semibold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded text-[10px] shrink-0 mt-0.5 font-mono">
                    04:20
                  </span>
                  <p className="text-gray-700 leading-snug">
                    <strong>useState Hook explained:</strong> Allows functional components to store and update internal state, triggering re-renders.
                  </p>
                </div>
              </div>
            </div>
            <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-400 mt-2 shrink-0">
              <span>Code blocks correctly formatted</span>
              <span>2 key concepts summarized</span>
            </div>
          </div>
        </div>

        {/* Slide 2: Click-to-Jump Timestamps */}
        <div
          className={`absolute inset-0 flex flex-col transition-all duration-500 ease-in-out ${getSlideClass(1)}`}
        >
          {/* Player with custom timestamp seek simulation */}
          <div className="relative aspect-video bg-slate-900 flex flex-col justify-end overflow-hidden shrink-0">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516116211223-5c359a36298a?auto=format&fit=crop&w=600&q=80')] bg-cover bg-center opacity-25"></div>
            {/* Seek Indicator */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-black/85 text-white px-2.5 py-1 rounded-full text-[10px] font-mono flex items-center gap-1.5 shadow-lg border border-white/10">
                <Play size={10} className="fill-white" /> Seeks to 05:40
              </div>
            </div>
            {/* Custom player controls bar */}
            <div className="relative z-10 bg-black/60 backdrop-blur-xs p-2 flex items-center gap-3 text-white text-[10px]">
              <Play size={10} className="fill-white" />
              <span className="font-mono">05:40 / 18:12</span>
              <div className="flex-1 h-1.5 bg-gray-700 rounded-full overflow-hidden relative">
                <div className="absolute top-0 left-0 w-[31%] h-full bg-blue-500"></div>
                <div className="absolute top-1/2 left-[31%] -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full border-2 border-blue-500 shadow"></div>
              </div>
            </div>
          </div>

          {/* Smart Transcript Area */}
          <div className="p-4 flex-1 flex flex-col bg-white overflow-hidden">
            <div className="flex items-center justify-between mb-2 shrink-0">
              <h4 className="font-bold text-gray-800 text-xs">Smart Transcript</h4>
              <span className="text-[9px] text-gray-400">Click timestamp to skip video</span>
            </div>
            
            <div className="space-y-2 overflow-y-auto flex-1 pr-1">
              <div className="p-1.5 rounded bg-gray-50 border border-gray-100/50 flex gap-2.5 text-xs opacity-60">
                <span className="text-gray-400 font-mono font-semibold shrink-0">04:10</span>
                <p className="text-gray-500 leading-normal">So now let's write our state management logic using useState...</p>
              </div>
              <div className="p-1.5 rounded bg-blue-50 border border-blue-100 flex gap-2.5 text-xs scale-[1.01] transition-transform duration-300">
                <span className="text-blue-600 font-mono font-semibold shrink-0 flex items-center gap-0.5">
                  <Play size={8} className="fill-blue-600 text-blue-600" /> 05:40
                </span>
                <p className="text-gray-700 font-medium leading-normal">To create custom hooks, we start the function name with "use" e.g. useLocalStorage.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Slide 3: Ask the Video (AI Chat) */}
        <div
          className={`absolute inset-0 flex flex-col transition-all duration-500 ease-in-out ${getSlideClass(2)}`}
        >
          {/* Chat header */}
          <div className="bg-gray-50 border-b border-gray-200/60 px-4 py-2.5 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="font-bold text-gray-800 text-xs">Ask the Video AI</span>
            </div>
            <span className="text-[9px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-bold uppercase">
              Llama 3 Active
            </span>
          </div>

          {/* Chat body */}
          <div className="p-4 flex-1 flex flex-col justify-between overflow-hidden bg-slate-50/40">
            <div className="space-y-3 overflow-y-auto flex-1 pr-1">
              {/* User message */}
              <div className="flex justify-end">
                <div className="max-w-[85%] bg-black text-white rounded-2xl rounded-tr-none px-3 py-1.5 text-xs shadow-xs">
                  What was the specific command to install routing?
                </div>
              </div>
              {/* AI message */}
              <div className="flex justify-start">
                <div className="max-w-[85%] bg-white border border-gray-200/80 text-gray-700 rounded-2xl rounded-tl-none px-3 py-1.5 text-xs shadow-xs">
                  <p className="font-bold text-gray-800 mb-0.5">🤖 Video Assistant</p>
                  At <span className="text-blue-600 font-semibold font-mono">08:15</span>, the tutor runs:
                  <pre className="mt-1 bg-gray-50 p-1.5 rounded text-[10px] font-mono text-pink-600 border border-gray-100 overflow-x-auto">
                    npm install react-router-dom
                  </pre>
                </div>
              </div>
            </div>

            {/* Chat input box mock */}
            <div className="mt-3 flex gap-2 pt-2 border-t border-gray-200/60 shrink-0">
              <div className="flex-1 bg-white border border-gray-200 rounded-xl px-3 py-1.5 text-[10px] text-gray-400 flex items-center">
                Ask about any part of the video...
              </div>
              <button className="bg-black text-white p-1.5 rounded-xl flex items-center justify-center shadow-xs">
                <Send size={12} />
              </button>
            </div>
          </div>
        </div>

        {/* Slide 4: Export Options */}
        <div
          className={`absolute inset-0 flex flex-col transition-all duration-500 ease-in-out ${getSlideClass(3)}`}
        >
          <div className="p-4 flex-1 flex flex-col justify-between bg-white">
            <div>
              <h4 className="font-bold text-gray-800 text-xs mb-1">Take Your Notes Anywhere</h4>
              <p className="text-[10px] text-gray-500 mb-4">
                Export generated notes or timestamps directly into your workflows.
              </p>

              <div className="grid grid-cols-2 gap-2.5">
                {/* Notion card */}
                <div className="border border-gray-200 rounded-xl p-2.5 bg-white hover:border-black transition-colors cursor-pointer group flex flex-col justify-between h-[76px]">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[10px] text-gray-800">Notion Workspace</span>
                    <span className="text-sm">📓</span>
                  </div>
                  <span className="text-[9px] text-gray-400 group-hover:text-black font-semibold">
                    Sync Notes ↗
                  </span>
                </div>

                {/* Markdown card */}
                <div className="border border-gray-200 rounded-xl p-2.5 bg-white hover:border-black transition-colors cursor-pointer group flex flex-col justify-between h-[76px]">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[10px] text-gray-800">Markdown (.md)</span>
                    <span className="text-sm">📝</span>
                  </div>
                  <span className="text-[9px] text-gray-400 group-hover:text-black font-semibold">
                    Download File ↗
                  </span>
                </div>

                {/* Copy Clipboard card */}
                <div className="border border-gray-200 rounded-xl p-2.5 bg-white hover:border-black transition-colors cursor-pointer group flex flex-col justify-between h-[76px]">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[10px] text-gray-800">Copy Summary</span>
                    <span className="text-sm">📋</span>
                  </div>
                  <span className="text-[9px] text-gray-400 group-hover:text-black font-semibold">
                    Copy Text ↗
                  </span>
                </div>

                {/* Text Document card */}
                <div className="border border-gray-200 rounded-xl p-2.5 bg-white hover:border-black transition-colors cursor-pointer group flex flex-col justify-between h-[76px]">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[10px] text-gray-800">PlainText (.txt)</span>
                    <span className="text-sm">📄</span>
                  </div>
                  <span className="text-[9px] text-gray-400 group-hover:text-black font-semibold">
                    Download Text ↗
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[9px] text-gray-400 mt-2 shrink-0">
              <span>Supports code, bullet points, tags</span>
              <span className="text-emerald-600 font-bold flex items-center gap-0.5">
                <Check size={10} className="stroke-[3px]" /> Clean Format
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Slide Navigation Dots */}
      <div className="flex justify-center gap-1.5 mt-3 shrink-0">
        {TABS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
              activeIndex === idx ? "bg-black w-4" : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default FeatureCarousel;

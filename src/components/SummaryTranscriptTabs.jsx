import React, { useState } from 'react';
import { Copy, Download, FileText, AlignLeft } from 'lucide-react';

// TODO: Integrate the Groq API using the key below
const GROQ_API_KEY = "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";

function SummaryTranscriptTabs() {
  const [activeTab, setActiveTab] = useState('summary');

  const handleCopy = () => {
    // Dummy copy action
    alert("Summary copied to clipboard!");
  };

  const handleDownload = () => {
    // Dummy download action
    alert("Downloading summary as .txt...");
  };

  return (
    <div className="bg-card border border-border rounded-xl shadow-sm flex flex-col h-full overflow-hidden">
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
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-muted text-foreground rounded hover:bg-muted/80 transition-colors cursor-pointer"
              >
                <Copy size={14} /> Copy
              </button>
              <button 
                onClick={handleDownload}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-muted text-foreground rounded hover:bg-muted/80 transition-colors cursor-pointer"
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
          <div className="prose prose-invert max-w-none text-sm text-muted-foreground leading-relaxed">
            <p className="mb-4">
              [00:00] This is a placeholder for the video transcript.
            </p>
            <p className="mb-4">
              [00:15] It will contain the time-stamped text of everything spoken in the video.
            </p>
            <p>
              [00:30] Your team will integrate a transcript API or service to populate this section.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SummaryTranscriptTabs;

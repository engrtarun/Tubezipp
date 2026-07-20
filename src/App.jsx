import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import VideoPlayer from './components/VideoPlayer';
import SmartNotes from './components/SmartNotes';
import AskVideoChat from './components/AskVideoChat';
import Suggestions from './components/Suggestions';
import './App.css';

function App() {
  const [activeTimestamp, setActiveTimestamp] = useState(null);

  const handleTimestampClick = (time) => {
    setActiveTimestamp(time);
    console.log(`Skipping to ${time}`);
  };

  return (
    <div className="app-container">
      <Sidebar />
      
      <main className="main-content">
        <div className="content-scrollable">
          <div className="video-section">
            <VideoPlayer activeTimestamp={activeTimestamp} /> 
            <Suggestions />
          </div>
          
          <div className="notes-section">
            <div className="h-1/2 pb-3">    
              <SmartNotes onTimestampClick={handleTimestampClick} />
            </div>
            <div className="h-1/2 pt-3">
              <AskVideoChat />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;

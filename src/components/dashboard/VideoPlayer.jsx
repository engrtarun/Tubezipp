import React from 'react';

function VideoPlayer({ url, extractVideoId }) {
  const videoId = url ? extractVideoId(url) : null;

  return (
    <div className="w-full flex-shrink-0 bg-black rounded-xl overflow-hidden aspect-video relative group border border-border shadow-md">
      {videoId ? (
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted/20 text-center p-6">
          <p className="text-muted-foreground">Invalid Video URL</p>
        </div>
      )}
    </div>
  );
}

export default VideoPlayer;

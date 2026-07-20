import React from "react";
import Searchbar from "./Searchbar";

const Hero = ({ videoUrl, setVideoUrl, handleSubmit }) => {
  return (
    <section className="bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-16 px-6 py-20 lg:flex-row">

        {/* Left */}
        <div className="flex-1">

          <span className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
            🚀 AI Powered Learning
          </span>

          <h1 className="mt-6 text-5xl font-bold leading-tight text-gray-900 lg:text-6xl">
            Skip the Noise.
            <br />
            Learn Only What Matters.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
            Turn long YouTube videos into structured notes, clickable
            timestamps and AI powered explanations in seconds.
          </p>

          <div className="mt-10">
            <Searchbar
              videoUrl={videoUrl}
              setVideoUrl={setVideoUrl}
              handleSubmit={handleSubmit}
            />
          </div>

          <div className="mt-6 flex items-center gap-6 text-sm text-gray-500">
            <span>✓ AI Notes</span>
            <span>✓ Timestamps</span>
            <span>✓ Ask the Video</span>
          </div>

        </div>

        {/* Right */}

        <div className="flex flex-1 justify-center">

          <div className="w-full max-w-xl rounded-3xl border border-gray-200 bg-gray-50 p-6 shadow-xl">

            <div className="aspect-video rounded-2xl bg-white shadow-sm"></div>

            <div className="mt-6 space-y-4">

              <div className="h-4 w-2/3 rounded bg-gray-200"></div>

              <div className="h-4 rounded bg-gray-100"></div>

              <div className="h-4 w-5/6 rounded bg-gray-100"></div>

              <div className="h-4 w-1/2 rounded bg-gray-100"></div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Hero;

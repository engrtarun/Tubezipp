import React from "react";
import { Search } from "lucide-react";

const Searchbar = ({ videoUrl, setVideoUrl, handleSubmit }) => {
  return (
    <div className="w-full max-w-2xl">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-3 shadow-sm sm:flex-row sm:items-center"
      >

        <div className="flex flex-1 items-center gap-3">
          <Search size={20} className="text-gray-400" />

          <input
            type="text"
            placeholder="Paste any YouTube video link..."
            className="w-full border-none bg-transparent text-gray-800 outline-none placeholder:text-gray-400"
            value={videoUrl}
            onChange={(event) => setVideoUrl(event.target.value)}
          />
        </div>

        <button
          type="submit"
          className="rounded-xl bg-black px-6 py-3 font-medium text-white transition hover:bg-gray-800"
        >
          Generate Notes
        </button>

      </form>

      <p className="mt-3 text-sm text-gray-500">
        Works with tutorials, podcasts, lectures and long-form videos.
      </p>
    </div>
  );
};

export default Searchbar;

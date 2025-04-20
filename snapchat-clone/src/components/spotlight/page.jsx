'use client';

import { useState, useRef } from "react";
import { PlayIcon, PauseIcon, ChevronDownIcon, HeartIcon, MessageCircleIcon, Share2Icon } from "lucide-react";

export default function Spotlight() {
  const [showMore, setShowMore] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-100 p-8">
      {/* Left side - Spotlight Video */}
      <div className="lg:w-2/3 flex flex-col items-center justify-center relative">
        <div className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-lg">
          <video
            ref={videoRef}
            src="/your-video.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-auto object-cover"
          />

          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-black px-6 py-3 rounded-full font-semibold flex items-center space-x-2 shadow-md hover:bg-gray-200 transition"
          >
            {isPlaying ? <PauseIcon size={20} /> : <PlayIcon size={20} />}
            <span>{isPlaying ? "Pause" : "Play"}</span>
          </button>
        </div>

        {/* Vertical Icons beside video */}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col items-center space-y-6">
          <button className="bg-white p-3 rounded-full shadow hover:bg-gray-200 transition">
            <HeartIcon className="text-black" size={24} />
          </button>
          <button className="bg-white p-3 rounded-full shadow hover:bg-gray-200 transition">
            <MessageCircleIcon className="text-black" size={24} />
          </button>
          <button className="bg-white p-3 rounded-full shadow hover:bg-gray-200 transition">
            <Share2Icon className="text-black" size={24} />
          </button>
        </div>

        {/* Show More Button */}
        <button
          onClick={() => setShowMore(!showMore)}
          className="mt-6 flex flex-col items-center text-black"
        >
          <ChevronDownIcon size={32} className={`transition-transform ${showMore ? "rotate-180" : ""}`} />
          <span className="text-sm">More</span>
        </button>

        {/* Hidden Content */}
        {showMore && (
          <div className="mt-4 text-center text-gray-700">
            <p>More trending videos coming soon!</p>
          </div>
        )}
      </div>

      {/* Right side - Info Section */}
      <div className="lg:w-1/3 flex flex-col justify-center p-8">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Trending on Spotlight</h1>
        <p className="mb-6 text-gray-600">
          Watch viral videos from popular Snapchat creators. See what's trending right now!
        </p>

        <div className="bg-white p-4 rounded-lg shadow-md mb-4">
          <h2 className="text-xl font-semibold">Kylian Mbappé</h2>
          <p className="text-gray-500">@k.mbappegames</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Sound</h3>
          <p className="text-gray-500">@k.mbappegames's Sound</p>
        </div>
      </div>
    </div>
  );
}

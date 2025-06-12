"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { FaHeart, FaCommentDots, FaShareAlt, FaPlay, FaPause } from "react-icons/fa";

export default function Spotlight() {
  const [showMore, setShowMore] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0); // Track video & info index

  // List of videos to cycle through
  const videoList = [
    "/videos/video1.mp4",
    "/videos/video2.mp4",
    "/videos/video3.mp4",
    "/videos/video4.mp4",
    "/videos/video5.mp4",
  ];

  // List of corresponding info sections
  const infoList = [
    { title: "Village Lifestyle", user: "@USER 1", views: "994", likes: "58k" },
    { title: "Nature Photography", user: "@USER 2", views: "8,721", likes: "1.3k" },
    { title: "Urban Dance Moves", user: "@USER 3", views: "21.4k", likes: "5k" },
    { title: "Foodie Adventures", user: "@USER 4", views: "6,221", likes: "2.4k" },
    { title: "DIY Home Projects", user: "@USER 5", views: "5,730", likes: "1.8k" },
  ];

  const videoRef = useRef(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    isPlaying ? videoRef.current.pause() : videoRef.current.play();
    setIsPlaying(!isPlaying);
  };

  // Handle cycling forward (next video & info)
  const handleNextContent = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videoList.length); // Loops forward
    setShowMore(true);
  };

  // Handle cycling backward (previous video & info)
  const handlePrevContent = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + videoList.length) % videoList.length); // Loops backward
    setShowMore(true);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-100">

      {/* Left Panel – Login Section */}
      <div className="lg:w-1/4 bg-white p-6 flex flex-col justify-center shadow-md fade-in">
        <h2 className="text-2xl font-bold mb-4">Log in to Snapchat</h2>
        <p className="text-gray-600 mb-4">
          Chat, Snap, and video call your friends. Watch Stories and Spotlight on your desktop.
        </p>
        <form>
          <input
            type="text"
            placeholder="Username or email address"
            className="border border-gray-300 rounded-md px-4 py-2 mb-3 w-full"
          />
          <input
            type="password"
            placeholder="Password"
            className="border border-gray-300 rounded-md px-4 py-2 mb-3 w-full"
          />
          <button className="bg-blue-500 text-white py-2 rounded-md font-semibold mb-4 hover:bg-blue-600 transition w-full">
            Log in
          </button>
        </form>
        <a href="#" className="text-blue-600 text-sm mb-3">Use phone number instead</a>
        <button className="flex items-center justify-center border border-gray-300 py-2 rounded-md mb-4">
          <img src="https://img.icons8.com/color/24/000000/windows-10.png" alt="Microsoft Logo" className="mr-2" />
          Get it from Microsoft
        </button>
        <p className="text-sm text-gray-500">
          Looking for the app? Get it <a href="#" className="text-blue-600">here</a>.
        </p>
      </div>

      {/* Middle Panel – Spotlight Video */}
      <div className="lg:w-1/2 flex flex-col items-center justify-center p-6 relative fade-in">
        {/* Up Button (Above Video) */}
        <button
          onClick={handlePrevContent} // Cycles backward through video & info
          className="mb-4 flex flex-col items-center text-black fade-in"
        >
          <ChevronUpIcon size={28} className="transition-transform" />
          <span className="text-sm">Previous Content</span>
        </button>

        <div className="relative w-[300px] h-[530px] rounded-xl overflow-hidden shadow-lg">
          <video
            ref={videoRef}
            src={videoList[currentIndex]} // Cycles through looping video index
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />

          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-black px-4 py-2 rounded-full font-semibold flex items-center space-x-2 shadow hover:bg-gray-200 transition"
          >
            {isPlaying ? <FaPause size={16} /> : <FaPlay size={16} />}
          </button>
        </div>

        {/* Vertical Icons */}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col items-center space-y-6 fade-in">
          <button className="bg-white p-3 rounded-full shadow hover:bg-gray-200 transition">
            <FaHeart className="text-black" size={20} />
          </button>
          <button className="bg-white p-3 rounded-full shadow hover:bg-gray-200 transition">
            <FaCommentDots className="text-black" size={20} />
          </button>
          <button className="bg-white p-3 rounded-full shadow hover:bg-gray-200 transition">
            <FaShareAlt className="text-black" size={20} />
          </button>
        </div>

        {/* Down Button (Below Video) */}
        <button
          onClick={handleNextContent} // Cycles forward through video & info
          className="mt-4 flex flex-col items-center text-black fade-in"
        >
          <ChevronDownIcon size={28} className="transition-transform" />
          <span className="text-sm">Next Content</span>
        </button>
      </div>

      {/* Right Panel – Info Section */}
      <div className="lg:w-1/4 p-6 flex flex-col justify-center fade-in">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">
          {showMore ? "Extra Info: Discover More Trends!" : "Get In On Snapchat's Trending Videos"}
        </h1>
        <p className="mb-6 text-gray-600">{showMore ? "Enjoy a fresh collection of trending videos and insights." : "Watch viral Spotlight videos from popular creators and see what's buzzing."}</p>

        {/* Dynamic Info Section */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-4 fade-in">
          <h2 className="text-xl font-semibold">{infoList[currentIndex].title}</h2>
          <p className="text-gray-500">{infoList[currentIndex].user}</p>
          <p className="mt-2 text-sm text-gray-600">
            {infoList[currentIndex].views} views • {infoList[currentIndex].likes} likes
          </p>
        </div>
      </div>
    </div>
  );
}
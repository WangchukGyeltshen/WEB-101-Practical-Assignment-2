'use client';

import React, { useState, useRef, useEffect } from "react";
import {
  ChevronDownIcon,
} from "lucide-react";
import { FaHeart, FaCommentDots, FaShareAlt, FaPlay, FaPause } from "react-icons/fa";

export default function Spotlight() {
  const [showMore, setShowMore] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoUrl, setVideoUrl] = useState("");
  const [email, setEmail] = useState(""); // use email instead of username
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const videoRef = useRef(null);

  // Fetch video data from backend
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/spotlight');
        if (!res.ok) throw new Error('Network response was not ok');
        const data = await res.json();
        setVideoUrl(data.videoUrl);
      } catch (error) {
        console.error('Failed to fetch spotlight data:', error);
        // Optionally set error state here
      }
    }
    fetchData();
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    try {
      // Use absolute URL to backend
      const res = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Login successful!");
        // Optionally handle token here
      } else {
        setLoginError(data.message || "Login failed");
      }
    } catch (err) {
      setLoginError("Network error");
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-100">
      {/* Left Panel - Login Section */}
      <div className="lg:w-1/4 bg-white p-6 flex flex-col justify-center shadow-md">
        <h2 className="text-2xl font-bold mb-4">Log in to Snapchat</h2>
        <p className="text-gray-600 mb-4">
          Chat, Snap, and video call your friends. Watch Stories and Spotlight, all from your computer.
        </p>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email address"
            className="border border-gray-300 rounded-md px-4 py-2 mb-3 w-full"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="border border-gray-300 rounded-md px-4 py-2 mb-3 w-full"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded-md font-semibold mb-4 hover:bg-blue-600 transition w-full"
          >
            Log in
          </button>
          {loginError && <div className="text-red-500 mb-2">{loginError}</div>}
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

      {/* Middle Panel - Spotlight Video */}
      <div className="lg:w-1/2 flex flex-col items-center justify-center p-6 relative">
        <div className="relative w-[300px] h-[530px] rounded-xl overflow-hidden shadow-lg">
          {videoUrl && (
            <video
              ref={videoRef}
              src={videoUrl} // Use fetched video URL
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          )}

          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-black px-4 py-2 rounded-full font-semibold flex items-center space-x-2 shadow hover:bg-gray-200 transition"
          >
            {isPlaying ? <FaPause size={16} /> : <FaPlay size={16} />}
          </button>
        </div>

        {/* Vertical Icons */}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col items-center space-y-6">
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

        {/* Show More */}
        <button
          onClick={() => setShowMore(!showMore)}
          className="mt-4 flex flex-col items-center text-black"
        >
          <ChevronDownIcon size={28} className={`transition-transform ${showMore ? "rotate-180" : ""}`} />
          <span className="text-sm">More</span>
        </button>

        {showMore && (
          <div className="mt-4 text-center text-gray-700">
            <p>More trending videos coming soon!</p>
          </div>
        )}
      </div>

      {/* Right Panel - Info Section */}
      <div className="lg:w-1/4 p-6 flex flex-col justify-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Get In On Snapchat's Trending Videos</h1>
        <p className="mb-6 text-gray-600">
          Watch Viral Spotlight Videos From Popular Creators To See What's Trending.
        </p>

        <div className="bg-white p-4 rounded-lg shadow-md mb-4">
          <h2 className="text-xl font-semibold">Uki❤️</h2>
          <p className="text-gray-500">@tshering23396</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md mb-4">
          <h3 className="text-lg font-semibold">Sound</h3>
          <p className="text-gray-500">@tshering23396's Sound</p>
        </div>

        <div className="flex space-x-3">
          <button className="bg-white p-2 rounded-full shadow-md">
            <img src="https://img.icons8.com/fluency/24/null/code.png" alt="Embed" />
          </button>
          <button className="bg-white p-2 rounded-full shadow-md">
            <img src="https://img.icons8.com/color/24/null/facebook-new.png" alt="Facebook" />
          </button>
          <button className="bg-white p-2 rounded-full shadow-md">
            <img src="https://img.icons8.com/color/24/null/twitter-squared.png" alt="Twitter" />
          </button>
          <button className="bg-white p-2 rounded-full shadow-md">
            <img src="https://img.icons8.com/color/24/null/whatsapp.png" alt="WhatsApp" />
          </button>
          <button className="bg-white p-2 rounded-full shadow-md">
            <img src="https://img.icons8.com/color/24/null/reddit--v1.png" alt="Reddit" />
          </button>
          <button className="bg-white p-2 rounded-full shadow-md">
            <img src="https://img.icons8.com/color/24/null/pinterest--v1.png" alt="Pinterest" />
          </button>
        </div>

        <div className="mt-4 flex items-center">
          <input
            type="text"
            value="https://www.snapchat.com/spotlight"
            readOnly
            className="border border-gray-300 px-2 py-1 w-full rounded-l-md"
          />
          <button className="bg-black text-white px-4 py-1 rounded-r-md font-semibold">Copy Link</button>
        </div>
      </div>
    </div>
  );
}
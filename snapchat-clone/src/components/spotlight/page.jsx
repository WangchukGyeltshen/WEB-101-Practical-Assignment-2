// components/Spotlight.js
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlayIcon, ChevronDownIcon } from "lucide-react";
import Image from "next/image";

export default function Spotlight() {
  const [showVideo, setShowVideo] = useState(true);

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Sidebar */}
      <div className="w-full md:w-1/3 p-6 flex flex-col justify-center items-center border-r">
        <h2 className="text-2xl font-bold mb-4">Log in to Snapchat</h2>
        <p className="text-center mb-6 text-gray-600">
          Chat, Snap, and video call your friends. Watch Stories and Spotlight,
          all from your computer.
        </p>

        <input
          type="text"
          placeholder="Username or email address"
          className="border rounded-lg p-3 w-full mb-4"
        />

        <a href="#" className="text-blue-500 text-sm mb-4">
          Use phone number instead
        </a>

        <Button className="w-full mb-4">Log in</Button>

        <div className="flex items-center gap-2 mb-6">
          <Image
            src="/microsoft-logo.png" // replace with actual logo if needed
            alt="Microsoft"
            width={24}
            height={24}
          />
          <span className="text-sm">Get it from Microsoft</span>
        </div>

        <p className="text-sm">
          Looking for the app?{" "}
          <a href="#" className="text-blue-500">
            Get it here.
          </a>
        </p>
      </div>

      {/* Spotlight Video Section */}
      <div className="flex-1 relative bg-black flex flex-col items-center justify-center">
        {/* Video Mockup */}
        <div className="relative w-80 h-[500px] bg-white rounded-2xl overflow-hidden shadow-xl">
          {showVideo ? (
            <Image
              src="/spotlight-placeholder.png" // upload your snapshot here
              alt="Spotlight"
              layout="fill"
              objectFit="cover"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gray-300">
              <p>Video Content</p>
            </div>
          )}
          <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-full">
            4m
          </div>
          <div className="absolute bottom-2 left-2 text-white font-bold">
            Kylian Mbappé
          </div>
        </div>

        <Button
          variant="ghost"
          onClick={() => setShowVideo(!showVideo)}
          className="mt-6 flex items-center text-white"
        >
          <ChevronDownIcon className="w-6 h-6 mr-2" />
          More Videos
        </Button>
      </div>

      {/* Right Info Sidebar */}
      <div className="w-full md:w-1/3 p-6 flex flex-col justify-center items-start gap-6 border-l">
        <h2 className="text-2xl font-bold">Get In On Snapchat's Trending Videos</h2>
        <p className="text-gray-600">
          Watch Viral Spotlight Videos From Popular Creators To See What's Trending.
        </p>

        <div className="bg-gray-100 p-4 rounded-xl w-full">
          <h3 className="font-bold mb-2">In this Snap</h3>
          <div className="flex items-center gap-4">
            <Image
              src="/snapcode-placeholder.png" // your snapcode image here
              alt="Snapcode"
              width={48}
              height={48}
            />
            <div>
              <p className="font-bold">Kylian Mbappé</p>
              <p className="text-gray-500 text-sm">@k.mbappegames</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Add your social icons */}
          <Button variant="outline" size="icon">
            <PlayIcon className="w-5 h-5" />
          </Button>
          <Button variant="outline" size="icon">
            {/* Add icons like Facebook, WhatsApp, etc. */}
            📤
          </Button>
          <Button variant="outline" size="icon">
            🔗
          </Button>
        </div>
      </div>
    </div>
  );
}

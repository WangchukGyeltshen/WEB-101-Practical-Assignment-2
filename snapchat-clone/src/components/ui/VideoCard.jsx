'use client';

import { useRef, useEffect } from 'react';
import { FaHeart, FaCommentDots, FaShare } from 'react-icons/fa';

export default function VideoCard({ video }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (videoRef.current) {
          if (entry.isIntersecting) {
            videoRef.current.play();
          } else {
            videoRef.current.pause();
          }
        }
      },
      { threshold: 0.7 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="overflow-hidden rounded-xl shadow-md w-[300px] h-[500px] relative bg-black">
        <video
          ref={videoRef}
          src={video.src}
          muted
          loop
          playsInline
          className="object-cover w-full h-full"
        />

        {/* Floating Buttons */}
        <div className="absolute right-2 bottom-16 flex flex-col items-center gap-5 text-white">
          <div className="flex flex-col items-center">
            <button className="bg-white text-black p-3 rounded-full shadow-md hover:scale-110 transition-transform">
              <FaHeart size={20} />
            </button>
            <span className="text-xs mt-1">2.1k</span>
          </div>

          <div className="flex flex-col items-center">
            <button className="bg-white text-black p-3 rounded-full shadow-md hover:scale-110 transition-transform">
              <FaCommentDots size={20} />
            </button>
            <span className="text-xs mt-1">324</span>
          </div>

          <div className="flex flex-col items-center">
            <button className="bg-white text-black p-3 rounded-full shadow-md hover:scale-110 transition-transform">
              <FaShare size={20} />
            </button>
            <span className="text-xs mt-1">Share</span>
          </div>
        </div>
      </div>

      {/* Username below video */}
      <h2 className="font-bold mt-2">@{video.username}</h2>
    </div>
  );
}

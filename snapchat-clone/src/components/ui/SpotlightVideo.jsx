'use client';

import React from 'react';

const videos = [
  { src: '/videos/video1.mp4', username: 'Pema Dorji' },
  { src: '/videos/video2.mp4', username: 'Sonam Choden' },
  { src: '/videos/video3.mp4', username: 'Tandin Wangchuk' },
];

export default function SpotlightPage() {
  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory">
      {videos.map((video, index) => (
        <div key={index} className="h-screen flex items-center justify-center snap-center relative">
          <video
            className="h-full w-full object-cover"
            src={video.src}
            controls
            autoPlay
            muted
            loop
          />
          <div className="absolute bottom-10 left-5 text-white">
            <h2 className="text-xl font-bold">@{video.username}</h2>
          </div>
        </div>
      ))}
    </div>
  );
}

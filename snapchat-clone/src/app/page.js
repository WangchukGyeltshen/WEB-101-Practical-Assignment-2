'use client';

import LoginForm from '@/components/ui/LoginForm';
import SnapInfo from '@/components/ui/SnapInfo';
import VideoCard from '@/components/ui/VideoCard';
import Navbar from '@/components/ui/Navbar';


const videos = [
  { src: '/videos/video1.mp4', username: 'Pema Dorji' },
  { src: '/videos/video2.mp4', username: 'Sonam Choden' },
  { src: '/videos/video3.mp4', username: 'Tandin Wangchuk' },
];

export default function HomePage() {
  return (
    <main className="bg-white min-h-screen">
      {/* Navbar goes here */}
      <Navbar />

      {/* 3-column grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6 h-[calc(100vh-4rem)]">
        
        {/* Left - Login */}
        <div className="overflow-hidden">
          <LoginForm />
        </div>

        {/* Center - Spotlight Videos */}
        <div className="overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar flex flex-col items-center h-full">
          {videos.map((video, index) => (
            <div key={index} className="snap-center flex justify-center py-6">
              <VideoCard video={video} />
            </div>
          ))}
        </div>

        {/* Right - Info */}
        <div className="overflow-hidden">
          <SnapInfo />
        </div>

      </div>
    </main>
  );
}

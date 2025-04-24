'use client';

import VideoCard from '@/components/ui/VideoCard';

const videos = [
  { src: '/videos/video1.mp4', username: 'Pema Dorji' },
  { src: '/videos/video2.mp4', username: 'Sonam Choden' },
  { src: '/videos/video3.mp4', username: 'Tandin Wangchuk' },
];

export default function SpotlightPage() {
  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory bg-black">
      {videos.map((video, index) => (
        <VideoCard key={index} video={video} />
      ))}
    </div>
  );
}

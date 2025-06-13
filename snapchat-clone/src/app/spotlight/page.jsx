'use client';

import { useEffect, useState } from "react";
import VideoCard from '@/components/ui/VideoCard';

export default function SpotlightPage() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/spotlight/public")
      .then(res => res.json())
      .then(data => setVideos(data.map(v => ({ src: v.mediaUrl, username: `User #${v.userId}` }))));
  }, []);

  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory bg-black">
      {videos.map((video, index) => (
        <VideoCard key={index} video={video} />
      ))}
    </div>
  );
}

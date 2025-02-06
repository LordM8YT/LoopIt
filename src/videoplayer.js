import React, { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://pvcwmeikidfgksqjerit.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2Y3dtZWlraWRmZ2tzcWplcml0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc1NzE4MjgsImV4cCI6MjA1MzE0NzgyOH0.1X8Hv3SSkJyen8zi1e2tJKqC3fB-SX6PSkjW4L0TIpM');

function VideoFeed() {
  const [videos, setVideos] = useState([]);
  const videoRefs = useRef([]);

  useEffect(() => {
    async function fetchVideos() {
      const { data, error } = await supabase.storage.from('videos').list();
      if (error) {
        console.error('Error fetching videos:', error);
      } else {
        setVideos(data.map(file => `https://supabase.com/dashboard/project/pvcwmeikidfgksqjerit/storage/buckets/videos/${file.name}`));
      }
    }
    fetchVideos();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      videoRefs.current.forEach((video) => {
        if (video) {
          const rect = video.getBoundingClientRect();
          const inView = rect.top >= 0 && rect.bottom <= window.innerHeight;
          if (inView) {
            video.play();
          } else {
            video.pause();
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="video-feed">
      {videos.map((src, index) => (
        <video
          key={index}
          ref={(el) => (videoRefs.current[index] = el)}
          src={src}
          controls={false}
          loop
          muted
          playsInline
          className="video-item"
        />
      ))}
    </div>
  );
}

export default VideoFeed;

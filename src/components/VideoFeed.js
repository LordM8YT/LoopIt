import React, { useEffect, useState } from 'react';
import supabase from '../supabaseClient'; // Default import

const VideoFeed = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const { data, error } = await supabase
        .from('videos')
        .select('*');

      if (error) {
        console.error('Error fetching videos:', error);
      } else {
        setVideos(data);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="flex flex-col items-center">
      {videos.map((video) => (
        <div key={video.id} className="w-full h-screen bg-black text-white flex justify-center items-center">
          {/* Video og metadata */}
          <video src={video.url} controls className="h-full"></video>
        </div>
      ))}
    </div>
  );
};

export default VideoFeed;

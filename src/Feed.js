import React, { useEffect, useState } from 'react';
import supabase from './supabaseClient';

function Feed() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const { data, error } = await supabase
        .storage
        .from('videos') // Bytt ut med navnet på din storage bucket
        .list();

      if (error) {
        console.error('Error fetching videos:', error);
      } else {
        setVideos(data);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div>
      <h2>Feed</h2>
      {videos.map((video) => (
        <video key={video.name} controls width="320">
          <source src={`https://supabase.com/dashboard/project/pvcwmeikidfgksqjerit/storage/buckets/videos/${video.name}`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ))}
    </div>
  );
}

export default Feed;

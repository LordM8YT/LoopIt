import React from 'react';
import './Feed.css'; // Legg til en CSS-fil for styling

const videos = [
  {
    id: 1,
    username: 'bruker1',
    description: 'Dette er en testvideo!',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
  },
  {
    id: 2,
    username: 'bruker2',
    description: 'En annen video her!',
    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
  },
];

function Feed() {
  return (
    <div className="feed-container">
      {videos.map((video) => (
        <div key={video.id} className="video-container">
          <video src={video.videoUrl} controls className="video-player" />
          <div className="video-info">
            <h3>@{video.username}</h3>
            <p>{video.description}</p>
          </div>
          <div className="video-actions">
            <img src="/icons/Favorite_fill.svg" alt="Like" className="icon" />
            <img src="/icons/comment_fill.svg" alt="Comment" className="icon" />
            <img src="/icons/group_share.svg" alt="Share" className="icon" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Feed;

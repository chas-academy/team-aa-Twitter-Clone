import { useState } from 'react';
import api from '../api/api';

export default function TweetCard({ tweet }) {
  const [likes, setLikes] = useState(tweet.likes);

  const handleLike = async () => {
    try {
      const res = await api.post(`/tweets/${tweet._id}/like`);
      setLikes(res.data.likes);
    } catch (err) {
      console.error('Failed to like tweet', err);
    }
  };

  return (
    <div className="tweet-card">
      <p>{tweet.content}</p>
      <p>Likes: {likes}</p>
      <button onClick={handleLike}>Like</button>
    </div>
  );
}
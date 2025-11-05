import { useContext, useMemo, useState } from 'react';
import api from '../api/api';
import { AuthContext } from '../context/AuthContext';
import "../styles/TweetCard.css";

export default function TweetCard({ tweet }) {
  const { user } = useContext(AuthContext);
  const [likes, setLikes] = useState(tweet.likes);
  const [likedBy, setLikedBy] = useState(tweet.likedBy || []);

  const hasLiked = useMemo(() => {
    if (!user) return false;
    return likedBy.includes(user._id);
  }, [likedBy, user]);

  const handleLike = async () => {
    if (hasLiked) return; // avoid extra calls
    try {
      const res = await api.post(`/tweets/${tweet._id}/like`);
      setLikes(res.data.likes);
      if (res.data.likedBy) setLikedBy(res.data.likedBy);
    } catch (err) {
      console.error('Failed to like tweet', err);
    }
  };

  return (
    <div className="tweet-card">
      <div className="tweet-content">{tweet.content}</div>
      <div className="tweet-actions">
        <button
          className={`like-btn ${hasLiked ? 'liked' : ''}`}
          onClick={handleLike}
          disabled={hasLiked}
        >
          {hasLiked ? 'Liked' : 'Like'} • {likes}
        </button>
      </div>
    </div>
  );
}
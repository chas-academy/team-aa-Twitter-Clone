import { useEffect, useState } from 'react';
import api from '../api/api';
import Post from '../components/TweetCard';

export default function Home() {
    const [tweets, setTweets] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchTweets = async () => {
        try {
            const res = await api.get('/tweets');
            setTweets(res.data);
        } catch (err) {
            console.error('Failed to fetch tweets:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTweets();
    }, []);

    if (loading) return <p>Loading tweets...</p>;

    return (
        <div className="home-page">
            <h2>Tweets</h2>
            {tweets.length === 0 ? (
                <p>No tweets available.</p>
            ) : (
                tweets.map(tweet => <TweetCard key={tweet.id} tweet={tweet} />)
            )}
        </div>
    );
}
import { useEffect, useState } from 'react';
import api from '../api/api';
import TweetCard from '../components/TweetCard';
import '../styles/Home.css';

export default function Home() {
    const [tweets, setTweets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    const fetchTweets = async () => {
        try {
            setLoading(true);
            const res = await api.get('/tweets');
            setTweets(res.data);
            setIsSearching(false);
        } catch (err) {
            console.error('Failed to fetch tweets:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) {
            fetchTweets();
            return;
        }

        try {
            setLoading(true);
            setIsSearching(true);
            const res = await api.get(`/tweets/search?query=${encodeURIComponent(searchQuery)}`);
            setTweets(res.data);
        } catch (err) {
            console.error('Failed to search tweets:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleClearSearch = () => {
        setSearchQuery('');
        setIsSearching(false);
        fetchTweets();
    };

    useEffect(() => {
        fetchTweets();
    }, []);

    if (loading) return <p>Loading tweets...</p>;

    return (
        <div className="home-page">
            <h2>Tweets</h2>
            
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    placeholder="Search tweets..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                />
                <button type="submit" className="search-button">Search</button>
                {isSearching && (
                    <button type="button" onClick={handleClearSearch} className="clear-button">
                        Clear
                    </button>
                )}
            </form>

            {isSearching && (
                <p className="search-info">
                    Showing results for: "{searchQuery}"
                </p>
            )}

            {tweets.length === 0 ? (
                <p>No tweets available.</p>
            ) : (
                tweets.map(tweet => <TweetCard key={tweet._id} tweet={tweet} />)
            )}
        </div>
    );
}
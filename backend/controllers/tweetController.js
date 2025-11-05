const Tweet = require('../models/Tweet');

// Create a tweet
exports.createTweet = async (req, res) => {
    try {
        const { content } = req.body;
        const userId = req.user?._id;
        if (!userId || !content) {
            return res.status(400).json({ message: 'User ID (from auth) and content are required' });
        }

        const tweet = new Tweet({ userId, content });
        await tweet.save();
        res.status(201).json(tweet);
    } catch (error) {
        res.status(500).json({ message: 'Could not create tweet', error });
    }
};

// Get all tweets
exports.getAllTweets = async (req, res) => {
    try {
        const tweets = await Tweet.find().sort({ createdAt: -1 });
        res.json(tweets);
    } catch (error) {
        res.status(500).json({ message: 'Could not retrieve tweets', error });
    }
};

// Like a tweet
exports.likeTweet = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user?._id?.toString();

        const tweet = await Tweet.findById(id);
        if (!tweet) return res.status(404).json({ message: 'Tweet not found' });

        // Ensure likedBy exists
        tweet.likedBy = tweet.likedBy || [];

        // Prevent multiple likes by the same user
        if (userId && tweet.likedBy.includes(userId)) {
            return res.status(400).json({ message: 'You have already liked this tweet', likes: tweet.likes });
        }

        if (userId) tweet.likedBy.push(userId);
        tweet.likes = (tweet.likes || 0) + 1;
        await tweet.save();

        res.json({ message: 'Tweet liked', likes: tweet.likes, likedBy: tweet.likedBy });
    } catch (error) {
        res.status(500).json({ message: 'Could not like tweet', error });
    }
};

// Comment on a tweet
exports.commentTweet = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId, text } = req.body;

        const tweet = await Tweet.findById(id);
        if (!tweet) return res.status(404).json({ message: 'Tweet not found' });

        tweet.comments.push({ userId, text });
        await tweet.save();

        res.status(201).json(tweet);
    } catch (error) {
        res.status(500).json({ message: 'Could not comment on tweet', error });
    }
};

// Search tweets
exports.searchTweets = async (req, res) => {
    try {
        const { query } = req.query;
        
        if (!query || query.trim() === '') {
            return res.status(400).json({ message: 'Search query is required' });
        }

        const tweets = await Tweet.find({
            content: { $regex: query, $options: 'i' }
        }).sort({ createdAt: -1 });

        res.json(tweets);
    } catch (error) {
        res.status(500).json({ message: 'Could not search tweets', error });
    }
};
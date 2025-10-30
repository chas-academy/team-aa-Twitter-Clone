const Tweet = require('../models/Tweet');

// Create a tweet
exports.createTweet = async (req, res) => {
    try {
        const { userId, content } = req.body;
        if (!userId || !content) {
            return res.status(400).json({ message: 'User ID and content are required' });
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

        const tweet = await Tweet.findById(id);
        if (!tweet) return res.status(404).json({ message: 'Tweet not found' });

        tweet.likes += 1;
        await tweet.save();

        res.json({ message: 'Tweet liked', likes: tweet.likes });
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
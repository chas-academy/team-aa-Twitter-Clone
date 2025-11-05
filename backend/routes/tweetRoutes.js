const express = require('express');
const router = express.Router();
const {
    createTweet,
    getAllTweets,
    likeTweet,
    commentTweet,
    searchTweets
} = require('../controllers/tweetController');

const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, createTweet);
router.get('/', getAllTweets);
router.get('/search', searchTweets);
router.post('/:id/like', authMiddleware, likeTweet);
router.post('/:id/comment', authMiddleware, commentTweet);

module.exports = router;
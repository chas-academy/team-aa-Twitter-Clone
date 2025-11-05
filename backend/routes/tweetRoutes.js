const express = require('express');
const router = express.Router();
const {
    createTweet,
    getAllTweets,
    likeTweet,
    commentTweet,
    searchTweets,
    deleteTweet
} = require('../controllers/tweetController');

const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

router.post('/', authMiddleware, createTweet);
router.get('/', getAllTweets);
router.get('/search', searchTweets);
router.post('/:id/like', authMiddleware, likeTweet);
router.post('/:id/comment', authMiddleware, commentTweet);
router.delete('/:id', authMiddleware, adminMiddleware, deleteTweet);

module.exports = router;
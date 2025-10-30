const express = require('express');
const router = express.Router();
const {
    createTweet,
    getAllTweets,
    likeTweet,
    commentTweet
} = require('../controllers/tweetController');

router.post('/', createTweet);
router.get('/', getAllTweets);
router.post('/:id/like', likeTweet);
router.post('/:id/comment', commentTweet);

module.exports = router;
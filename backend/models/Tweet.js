const { text } = require('express');
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    text: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

const tweetSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    content: { type: String, required: true},
    createdAt: { type: Date, default: Date.now },
    likes: { type: Number, default: 0 },
    comments: [commentSchema]
});

module.exports = mongoose.model('Tweet', tweetSchema);
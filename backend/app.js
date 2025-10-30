const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const tweetRoutes = require('./routes/tweetRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('API is running...'));

app.use('/api/users', userRoutes);
app.use('/api/tweets', tweetRoutes);

module.exports = app;

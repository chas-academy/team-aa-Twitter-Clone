1. Register a user
POST http://localhost:5000/api/users/register
Body (JSON):
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "123456"
}
Expected response: 
{
  "_id": "...",
  "username": "testuser",
  "email": "test@example.com",
  "token": "..."
}
--------------------------------------------------
2. Login
POST http://localhost:5000/api/users/login
Body (JSON):
{
  "email": "test@example.com",
  "password": "123456"
}
Expected response:
{
  "_id": "...",
  "username": "testuser",
  "email": "test@example.com",
  "token": "..."
}
--------------------------------------------
3. Create a tweet
POST http://localhost:5000/api/tweets
Body (JSON):
{
  "userId": "USER_ID_FROM_LOGIN",
  "content": "Hello Twitter Clone!"
}
Expected response: 
Tweet object with _id, content, likes, comments.
-----------------------------------------------
4. Get all tweets
GET http://localhost:5000/api/tweets
Expected response: 
Array of tweet objects sorted newest first.
-----------------------------------------------------
5. Like a tweet
POST http://localhost:5000/api/tweets/TWEET_ID/like
Expected response:
{
  "message": "Tweet liked",
  "likes": 1
}
-----------------------------------------------------
6. Comment on a tweet
POST http://localhost:5000/api/tweets/TWEET_ID/comment
Body (JSON):
{
  "userId": "USER_ID_FROM_LOGIN",
  "text": "Nice tweet!"
}
Expected response: 
Updated tweet object with the new comment included.
Insomnia Testing Guide – Twitter Clone Backend

This guide explains how to test the backend API using Insomnia step by step.
Make sure your backend server is running via (npm run dev) before you start testing.
-------------------------------------------------------------------------
Base Setup

Base URL:
http://localhost:5000
-------------------------------------------------------------------------
1. Register a New User
Method: POST
Endpoint: /api/users/register
Request Body (JSON):
{
  "username": "testuser",
  "email": "testuser@example.com",
  "password": "123456"
}
Expected Response:
{
  "_id": "someUserId",
  "username": "testuser",
  "email": "testuser@example.com",
  "token": "your_jwt_token"
}
-------------------------------------------------------------------------
2. Log In a User
Method: POST
Endpoint: /api/users/login
Request Body (JSON):
{
  "email": "testuser@example.com",
  "password": "123456"
}
Expected Response:
{
  "_id": "someUserId",
  "username": "testuser",
  "email": "testuser@example.com",
  "token": "your_jwt_token"
}
-------------------------------------------------------------------------
Setting the Authorization Header
For all protected routes like creating, liking, or commenting on tweets:
In Insomnia, go to the Auth tab and choose:
Type: Bearer Token
Token: paste the entire JWT token string from login response
-------------------------------------------------------------------------
3. Create a Tweet
Method: POST
Endpoint: /api/tweets
Auth: Required (Bearer Token)
Request Body (JSON):
{
  "userId": "your_user_id_here",
  "content": "This is my first tweet!"
}
Expected Response:
{
  "_id": "tweet_id_here",
  "userId": "your_user_id_here",
  "content": "This is my first tweet!",
  "likes": 0,
  "comments": [],
  "createdAt": "2025-10-30T12:34:56Z"
}
-------------------------------------------------------------------------
4. Get All Tweets
Method: GET
Endpoint: /api/tweets
Auth: Not required
Expected Response:
[
  {
    "_id": "tweet_id_here",
    "userId": "your_user_id_here",
    "content": "This is my first tweet!",
    "likes": 0,
    "comments": [],
    "createdAt": "2025-10-30T12:34:56Z"
  }
]
-------------------------------------------------------------------------
4.1 Search Tweets
Method: GET
Endpoint: /api/tweets/search?query=your_search_term
Auth: Not required
Example: /api/tweets/search?query=hello
Expected Response:
[
  {
    "_id": "tweet_id_here",
    "userId": "your_user_id_here",
    "content": "Hello world! This is my first tweet!",
    "likes": 0,
    "comments": [],
    "createdAt": "2025-10-30T12:34:56Z"
  }
]
Note: Search is case-insensitive and searches within tweet content.
-------------------------------------------------------------------------
5. Like a Tweet
Method: POST
Endpoint: /api/tweets/:id/like
Auth: Required (Bearer Token)
Replace :id with the tweet’s actual ID.
Example Endpoint: /api/tweets/6722adf8ccf6b1df9c57a432/like
Expected Response:
{
  "message": "Tweet liked",
  "likes": 1
}
-------------------------------------------------------------------------
6. Comment on a Tweet
Method: POST
Endpoint: /api/tweets/:id/comment
Auth: Required (Bearer Token)
Request Body (JSON):
{
  "userId": "your_user_id_here",
  "text": "Nice tweet!"
}
Expected Response:
{
  "_id": "tweet_id_here",
  "content": "This is my first tweet!",
  "likes": 1,
  "comments": [
    {
      "userId": "your_user_id_here",
      "text": "Nice tweet!"
    }
  ]
}
-------------------------------------------------------------------------
7. Admin Routes
Admin routes require a logged-in admin user with "role": "admin". Use the admin token in the Auth header.
-------------------------------------------------------------------------
Get All Users (Admin)
Method: GET
Endpoint: /api/users
Auth: Required (Bearer Token for admin)
Expected Response:
[
  {
    "_id": "user_id_here",
    "username": "testuser",
    "email": "testuser@example.com",
    "role": "user"
  },
  {
    "_id": "admin_id_here",
    "username": "adminuser",
    "email": "admin@example.com",
    "role": "admin"
  }
]
-------------------------------------------------------------------------
Update a User (Admin)
Method: PUT
Endpoint: /api/users/:id
Auth: Required (Bearer Token for admin)
Request Body (JSON):
You can update the username, email, or role:
{
  "username": "newUsername",
  "email": "newemail@example.com",
  "role": "admin"
}
Expected Response:
{
  "_id": "user_id_here",
  "username": "newUsername",
  "email": "newemail@example.com",
  "role": "admin"
}
-------------------------------------------------------------------------
Delete a User (Admin)
Method: DELETE
Endpoint: /api/users/:id
Auth: Required (Bearer Token for admin)
Replace :id with the ID of the user you want to delete.
Expected Response:
{
  "message": "User deleted successfully"
}

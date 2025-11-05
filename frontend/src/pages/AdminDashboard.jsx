import { useEffect, useState } from "react";
import API from "../api/api";
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        await Promise.all([fetchUsers(), fetchTweets()]);
      } catch (e) {
        // error already set inside helpers
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users", err);
      setError("Failed to fetch users");
    }
  };

  const fetchTweets = async () => {
    try {
      const res = await API.get("/tweets");
      setTweets(res.data);
    } catch (err) {
      console.error("Failed to fetch tweets", err);
      setError("Failed to fetch tweets");
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await API.delete(`/users/${id}`);
      setUsers(users.filter((user) => user._id !== id));
    } catch (err) {
      console.error("Delete user failed", err);
      setError("Delete user failed");
    }
  };

  const handleUpdateRole = async (id, role) => {
    try {
      const res = await API.put(`/users/${id}`, { role });
      // reflect change locally
      setUsers((prev) => prev.map((u) => (u._id === id ? { ...u, role: res.data.user.role } : u)));
    } catch (err) {
      console.error("Update role failed", err);
      setError("Update role failed");
    }
  };

  const handleDeleteTweet = async (id) => {
    try {
      await API.delete(`/tweets/${id}`);
      setTweets((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Delete tweet failed", err);
      setError("Delete tweet failed");
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "#e0245e" }}>{error}</p>}
      
      <h3>Users</h3>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.username} ({user.email}) — Role:
            <select
              value={user.role}
              onChange={(e) => handleUpdateRole(user._id, e.target.value)}
              style={{ marginLeft: 8, marginRight: 8 }}
            >
              <option value="user">user</option>
              <option value="admin">admin</option>
            </select>
            <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h3>Tweets</h3>
      <ul>
        {tweets.map((tweet) => (
          <li key={tweet._id}>
            {tweet.content}
            <button style={{ marginLeft: 8 }} onClick={() => handleDeleteTweet(tweet._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
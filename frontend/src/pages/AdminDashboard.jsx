import { useEffect, useState } from "react";
import API from "../api/api";
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newUser, setNewUser] = useState({ username: "", email: "", password: "", role: "user" });

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
      setError(err.response?.data?.message || "Failed to fetch users");
    }
  };

  const fetchTweets = async () => {
    try {
      const res = await API.get("/tweets");
      setTweets(res.data);
    } catch (err) {
      console.error("Failed to fetch tweets", err);
      setError(err.response?.data?.message || "Failed to fetch tweets");
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      if (!window.confirm("Delete this user? This cannot be undone.")) return;
      await API.delete(`/users/${id}`);
      setUsers(users.filter((user) => user._id !== id));
    } catch (err) {
      console.error("Delete user failed", err);
      setError(err.response?.data?.message || "Delete user failed");
    }
  };

  const handleUpdateRole = async (id, role) => {
    try {
      const res = await API.put(`/users/${id}`, { role });
      // reflect change locally
      setUsers((prev) => prev.map((u) => (u._id === id ? { ...u, role: res.data.user.role } : u)));
    } catch (err) {
      console.error("Update role failed", err);
      setError(err.response?.data?.message || "Update role failed");
    }
  };

  const handleDeleteTweet = async (id) => {
    try {
      if (!window.confirm("Delete this tweet? This cannot be undone.")) return;
      await API.delete(`/tweets/${id}`);
      setTweets((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Delete tweet failed", err);
      setError(err.response?.data?.message || "Delete tweet failed");
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await API.post("/users/register", {
        username: newUser.username,
        email: newUser.email,
        password: newUser.password,
      });
      // optionally update role if admin chosen
      if (newUser.role !== "user") {
        await API.put(`/users/${res.data._id}`, { role: newUser.role });
      }
      await fetchUsers();
      setNewUser({ username: "", email: "", password: "", role: "user" });
    } catch (err) {
      console.error("Create user failed", err);
      setError(err.response?.data?.message || "Create user failed");
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "#e0245e" }}>{error}</p>}
      
      <h3>Create User</h3>
      <form onSubmit={handleCreateUser} style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
        <input
          type="text"
          placeholder="Username"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          required
        />
        <select
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
        >
          <option value="user">user</option>
          <option value="admin">admin</option>
        </select>
        <button type="submit">Create</button>
      </form>

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
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../api/api';
import '../styles/Dashboard.css';

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  // Only load users if admin
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (user && user.role === 'admin') {
          const { data } = await api.get('/users', {
            headers: { Authorization: `Bearer ${user.token}` },
          });
          setUsers(data);
        }
      } catch (err) {
        setError('Failed to fetch users');
      }
    };
    fetchUsers();
  }, [user]);

  if (!user) return <p>Please login to access the dashboard.</p>;

  return (
    <div className="dashboard-page">
      <h2>Dashboard</h2>
      <p>Welcome, {user.username}!</p>
      <p>Your role: {user.role}</p>

      {user.role === 'admin' ? (
        <div className="admin-section">
          <h3> Admin Panel</h3>
          <p>Here you can view and manage users.</p>

          {error && <p style={{ color: 'red' }}>{error}</p>}

          {users.length > 0 ? (
            <table border="1" cellPadding="8">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id}>
                    <td>{u.username}</td>
                    <td>{u.email}</td>
                    <td>{u.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No users found or insufficient permissions.</p>
          )}
        </div>
      ) : (
        <p>💬 You are logged in as a regular user.</p>
      )}
    </div>
  );
}
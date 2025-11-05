import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import "../styles/Navbar.css";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="nav-link">
          Home
        </Link>

        {!user && (
          <>
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/register" className="nav-link">
              Register
            </Link>
          </>
        )}

        {user && (
          <>
            <Link to="/dashboard" className="nav-link">
              Dashboard
            </Link>
            <Link to="/create" className="nav-link primary">
              Create
            </Link>

            {/* Show only for admins */}
            {user.role === "admin" && (
              <Link to="/admin" className="nav-link">
                Admin Dashboard
              </Link>
            )}
          </>
        )}
      </div>

      {user && (
        <div className="navbar-right">
          <button onClick={logout} className="logout-btn">
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
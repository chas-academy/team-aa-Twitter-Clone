import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    // User not logged in
    return <Navigate to="/login" />;
  }

  if (adminOnly && user.role !== "admin") {
    // Logged in but not admin
    return <Navigate to="/dashboard" />;
  }

  // All checks passed
  return children;
};

export default ProtectedRoute;

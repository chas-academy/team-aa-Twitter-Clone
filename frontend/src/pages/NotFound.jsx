import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1>404</h1>
      <p>Oops! The page you’re looking for doesn’t exist.</p>
      <Link to="/">Go back home</Link>
      <style jsx="true">{`
        .not-found-container {
          text-align: center;
          margin-top: 100px;
        }
        h1 {
          font-size: 5rem;
          color: #3498db;
        }
        a {
          color: #3498db;
          text-decoration: none;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default NotFound;
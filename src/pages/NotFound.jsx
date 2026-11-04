import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="card">
      <h2>404 - Page not found</h2>
      <p>The page you are looking for does not exist.</p>
      <Link className="start-btn" to="/">Go Home</Link>
    </div>
  );
}

export default NotFound;

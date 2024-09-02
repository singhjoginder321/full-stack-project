import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/ShareNavbar.css";

function ShareNavbar({ onShareClick }) {
  const navigate = useNavigate(); // Hook for navigation

  const handleLogout = () => {
    // Clear localStorage and redirect
    localStorage.removeItem("token"); //replace with your actual key
    // Perform additional logout actions if needed
    navigate("/login-signup"); // Redirect to login/signup page after logout
  };

  return (
    <nav id="navbar-preview">
      <ul>
        <li className="left-button">
          <Link to="/">Back to Editor</Link>
        </li>
        <li className="right-button">
          <a href="#" id="share-link" onClick={onShareClick}>
            Share Link
          </a>
        </li>
        <li className="right-button">
          <button id="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default ShareNavbar;

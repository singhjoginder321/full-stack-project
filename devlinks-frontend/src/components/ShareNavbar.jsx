// ShareNavbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../style/ShareNavbar.css";

function ShareNavbar({ onShareClick }) {
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
      </ul>
    </nav>
  );
}

export default ShareNavbar;

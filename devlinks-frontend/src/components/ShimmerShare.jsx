// src/Shimmer.js
import "../style/ShimmerShare.css"; // Import the CSS file for styling
import React from "react";

const Shimmer = () => {
  return (
    <div className="shimmer-container">
      <div className="shimmer-profile">
        <div className="shimmer-profile-picture"></div>
        <div className="shimmer-profile-details">
          <div className="shimmer-name"></div>
          <div className="shimmer-email"></div>
        </div>
      </div>
      <div className="shimmer-links">
        <div className="shimmer-link"></div>
        <div className="shimmer-link"></div>
        <div className="shimmer-link"></div>
      </div>
      <div className="shimmer-form">
        <div className="shimmer-form-field"></div>
        <div className="shimmer-form-field"></div>
        <div className="shimmer-form-field"></div>
        <div className="shimmer-form-field"></div>
      </div>
    </div>
  );
};

export default Shimmer;

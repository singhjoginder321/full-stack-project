import React from "react";
import "../style/Shimmer.css"; // Ensure you create this CSS file

const Shimmer = () => {
  return (
    <div className="shimmer-fullscreen">
      {/* Navbar Shimmer */}
      <div className="shimmer-navbar"></div>

      <div className="shimmer-content">
        {/* Left Side (Mobile Preview) */}
        <div className="shimmer-mobile-preview">
          <div className="shimmer-avatar"></div>
          <div className="shimmer-name"></div>
          <div className="shimmer-info"></div>

          {/* Placeholder for Links */}
          <div className="shimmer-mobile-link"></div>
          <div className="shimmer-mobile-link"></div>
          <div className="shimmer-mobile-link"></div>
        </div>

        {/* Right Side (Customize Links) */}
        <div className="shimmer-customize">
          <div className="shimmer-section-title"></div>

          {/* Placeholder for Links Editing */}
          <div className="shimmer-input"></div>
          <div className="shimmer-link-edit"></div>
          <div className="shimmer-link-edit"></div>
        </div>
      </div>
    </div>
  );
};

export default Shimmer;

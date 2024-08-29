import React from "react";
import "../style/Loader.css"; // Import the CSS file

const Loader = ({ info }) => {
  return (
    <div className="loader-container">
      <div className="spinner"></div>
      <p>{`Sending ${info}... `}</p>
    </div>
  );
};

export default Loader;

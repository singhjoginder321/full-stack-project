import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import profilePictureImage from "../assets/images/profile-picture.jpeg";
import "../style/profile.css";
import Login from "./Login";
import Navbar from "./Navbar";
import Signup from "./Signup";
import { useNavigate } from "react-router-dom";
import Shimmer from "./Shimmer";

const Profile = () => {
  const [isSignup, setIsSignup] = useState(true); // Toggle between signup and login
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Hook for navigation

  useState(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after 2 seconds
    }, 200);

    return () => clearTimeout(timer); // Cleanup timer
  }, []);
  const handleSignupSuccess = () => {
    setIsSignup(false); // Switch to login view
  };

  const handleLoginSuccess = () => {
    navigate("/add-links"); // Navigate to /add-links route
  };

  if (loading) {
    return <Shimmer />;
  }

  return (
    <>
      <Navbar />
      <div className="full-section">
        <div className="main-section">
          <div className="left">
            <div className="smartphone">
              <div className="profile-container">
                <div className="profile-detail-section">
                  <img src={profilePictureImage} alt="Profile" />
                  <span className="name">Joginder Singh</span>
                  <span className="email">jogindersingh@gmail.com</span>
                </div>
                <ul className="links">
                  <li>
                    <a href="#" className="GitHub">
                      GitHub
                    </a>
                  </li>
                  <li>
                    <a href="#" className="LinkedIn">
                      LinkedIn
                    </a>
                  </li>
                  <li>
                    <a href="#" className="YouTube">
                      YouTube
                    </a>
                  </li>
                  <li>
                    <a href="#" className="Facebook">
                      Facebook
                    </a>
                  </li>
                  <li>
                    <a href="#" className="GitLab">
                      GitLab
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="right">
            <div className="container">
              <div className="toggle-container">
                <button
                  className={isSignup ? "active" : ""}
                  onClick={() => setIsSignup(true)}
                >
                  Sign Up
                </button>
                <button
                  className={!isSignup ? "active" : ""}
                  onClick={() => setIsSignup(false)}
                >
                  Already a User?
                </button>
              </div>
              <h2>{isSignup ? "Sign Up" : "Login"}</h2>
              {isSignup ? (
                <Signup onSuccess={handleSignupSuccess} />
              ) : (
                <Login onSuccess={handleLoginSuccess} />
              )}
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Profile;

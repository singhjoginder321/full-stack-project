import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../style/loginsignup.css";
import "../style/profile.css";
import Login from "./Login";
import Navbar from "./Navbar";
import Shimmer from "./Shimmer";
import Signup from "./Signup";

const Profile = () => {
  const [isSignup, setIsSignup] = useState(false); // Toggle between signup and login
  const navigate = useNavigate(); // Hook for navigation
  const [loading, setLoading] = useState(true); //

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setLoading(false); // Stop the loading after 2 seconds (simulating API call)
    }, 150);
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
      <div className="auth-container">
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
            Already User ?
          </button>
        </div>
        <h2>{isSignup ? "Sign Up" : "Login"}</h2>
        <div className="login-signup-form">
          {isSignup ? (
            <Signup onSuccess={handleSignupSuccess} />
          ) : (
            <Login onSuccess={handleLoginSuccess} />
          )}
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Profile;

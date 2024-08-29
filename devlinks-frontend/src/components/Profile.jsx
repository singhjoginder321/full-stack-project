import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import profilePictureImage from "../assets/images/profile-picture.jpeg";
import "../style/profile.css";
import Login from "./Login";
import Navbar from "./Navbar";
import Signup from "./Signup";

const Profile = () => {
  const [isSignup, setIsSignup] = useState(true); // Toggle between signup and login

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
                    <a href="#" className="github">
                      GitHub
                    </a>
                  </li>
                  <li>
                    <a href="#" className="linkedin">
                      LinkedIn
                    </a>
                  </li>
                  <li>
                    <a href="#" className="youtube">
                      YouTube
                    </a>
                  </li>
                  <li>
                    <a href="#" className="facebook">
                      Facebook
                    </a>
                  </li>
                  <li>
                    <a href="#" className="gitlab">
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
              {isSignup ? <Signup /> : <Login />}
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Profile;

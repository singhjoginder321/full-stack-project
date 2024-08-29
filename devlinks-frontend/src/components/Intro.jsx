import React from "react";
import Navbar from "./Navbar";
import "../style/navbar.css";
import Footer from "./Footer";
import "../style/style.css";
import { Link } from "react-router-dom";

const Intro = () => {
  return (
    <>
      <Navbar />
      <div className="intro-full-section">
        <section className="intro">
          <h2>Welcome to DevLinks</h2>
          <p>
            DevLinks helps you manage and share your profile and links
            effortlessly. Start by setting up your profile and adding your
            favorite links.
          </p>
          <div className="cta-buttons">
            <Link to="/profile" className="btn">
              Get Started
            </Link>
            <Link to="/add-links" className="btn">
              Add Links
            </Link>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
};

export default Intro;

import React from "react";
import { Link } from "react-router-dom";
import "../style/navbar.css";
import logo from "../assets/images/devlinks-logo.svg";
import linkIcon from "../assets/images/link-icon.png";
import userIcon from "../assets/images/user-icon.png";

const Navbar = () => {
  return (
    <header id="navbar">
      <nav id="navbar-id">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="DevLinks Logo" />{" "}
          </Link>
        </div>
        <ul>
          <li id="button-2">
            <Link to="/profile">
              <img src={userIcon} alt="Links Icon" className="link-icon" />
              Profile Details
            </Link>
          </li>
          <li id="button-1">
            <Link to="/add-links">
              <img src={linkIcon} alt="Links Icon" className="link-icon" />
              Links
            </Link>
          </li>

          <li>
            <Link className="preview" to="/share">
              Preview
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;

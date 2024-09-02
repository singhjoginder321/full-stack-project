import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AddLinks from "./components/AddLinks";
import Footer from "./components/Footer";
import Intro from "./components/Intro";
import LoginSignupPage from "./components/LoginSignupPage";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import Share from "./components/Share";
import ShareNavbar from "./components/ShareNavbar";
import Shimmer from "./components/Shimmer";
import "./style/style.css";
// import { useLocation } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);
  const [currentNavbar, setCurrentNavbar] = useState(<Navbar />);

  // const location = useLocation();
  // useEffect(() => {
  //   if (location.pathname === "/share") {
  //     console.log(location.pathname);
  //     setCurrentNavbar(<ShareNavbar />);
  //   } else {
  //     setCurrentNavbar(<Navbar />);
  //   }
  // }, [location.pathname]);

  return (
    <>
      <Router>
        <div className="main-div">
          <div className="main-div">
            {/* {location.pathname === "/share" ? <ShareNavbar /> : <Navbar />} */}
            {/* {currentNavbar} */}
            <Routes>
              <Route path="/" element={<Intro />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/add-links" element={<AddLinks />} />
              <Route path="/share" element={<Share />} />
              <Route path="login-signup" element={<LoginSignupPage />} />
              <Route path="shimmer" element={<Shimmer />} />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;

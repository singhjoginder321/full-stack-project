import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiService from "../services/apiService";
import "../style/share.css";
import Loader from "./Loader"; // Assuming you have a loader component
import ShareNavbar from "./ShareNavbar";

const Share = () => {
  const [userId, setUserId] = useState(null);
  const [profile, setProfile] = useState(null);
  const [links, setLinks] = useState([]);
  const [recipientEmail, setRecipientEmail] = useState(""); // State for the recipient email
  const [showEmailInput, setShowEmailInput] = useState(false); // State to show/hide the email input box
  const [loading, setLoading] = useState(false); // State for the loader

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await apiService.getCurrentUser();
        const fetchedUserId = response.data._id; // Assuming the userId is stored in _id
        setUserId(fetchedUserId);
      } catch (error) {
        console.error("Error fetching userId:", error);
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    if (userId) {
      const fetchProfile = async () => {
        try {
          const response = await apiService.getCurrentUser();
          setProfile(response.data);
          console.log(response.data);
        } catch (error) {
          console.error("Error fetching profile data:", error);
        }
      };

      const fetchLinks = async () => {
        try {
          const response = await apiService.getLinksByUserId(userId);
          setLinks(response.data);
          console.log(response.data);
        } catch (error) {
          console.error("Error fetching links:", error);
        }
      };

      fetchProfile();
      fetchLinks();
    }
  }, [userId]);

  const handleShareLinkClick = () => {
    setShowEmailInput(true); // Show the email input box when the button is clicked
  };

  const handleSendEmail = async (event) => {
    event.preventDefault();
    setLoading(true); // Start the loader

    try {
      const response = await apiService.shareLink({ recipientEmail });
      toast.success(response.data.message); // Show success toast
      setShowEmailInput(false); // Hide the email input box after sending the email
      setRecipientEmail(""); // Clear the input field
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Failed to send the email. Please try again.");
    } finally {
      setLoading(false); // Stop the loader
    }
  };

  return (
    <>
      <ToastContainer /> {/* Toast container for notifications */}
      <ShareNavbar onShareClick={handleShareLinkClick} />
      <div className="left">
        <div className="smartphone">
          <div className="profile-container" id="profile-details">
            {profile && (
              <>
                <div className="profile-details-2">
                  <img
                    src={profile.profilePicture || ""}
                    alt="Profile"
                    id="profile-picture"
                  />
                  <span className="name" id="profile-name">
                    {profile.name} {profile.lastName}
                  </span>
                  <span className="email" id="profile-email">
                    {profile.email}
                  </span>
                </div>
                <div>
                  <ul className="links" id="links-list">
                    {links.map((link, index) => (
                      <li key={index}>
                        <a
                          href={link.link}
                          className={link.platform}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {link.platform}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {showEmailInput && (
        <form onSubmit={handleSendEmail} className="email-form">
          <label htmlFor="recipientEmail">Enter recipient's email:</label>
          <input
            type="email"
            id="recipientEmail"
            value={recipientEmail}
            onChange={(e) => setRecipientEmail(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? <Loader info="Links" /> : "Send Email"}
          </button>
        </form>
      )}
      <button onClick={handleShareLinkClick} className="share-button">
        Share the Links
      </button>
    </>
  );
};

export default Share;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import profilePictureImage from "../assets/images/profile-picture.jpeg";
import apiService from "../services/apiService";
import "../style/add-links.css";
import Navbar from "./Navbar";
import Shimmer from "./Shimmer";

const AddLinks = () => {
  const [links, setLinks] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated
    const checkAuthentication = async () => {
      try {
        const token = localStorage.getItem("token"); // Or use context/state if available
        if (!token) {
          navigate("/login-signup"); // Redirect to login/signup if not authenticated
          return;
        }

        // Verify token or fetch user details
        const response = await apiService.getCurrentUser();
        setUserId(response.data._id); // Assuming userId is in response.data._id

        // Fetch links associated with the user
        const linksResponse = await apiService.getLinksByUserId();
        setLinks(linksResponse.data);
      } catch (error) {
        console.error("Error fetching user details or links:", error);
        toast.error("Failed to fetch user details or links.");
        navigate("/login-signup"); // Redirect on error
      } finally {
        setLoading(false); // Stop loading after data fetch
      }
    };

    checkAuthentication();
  }, [navigate]);

  const handleAddLink = () => {
    // Add a new link entry with a temporary unique id
    const tempId = Date.now().toString(); // Use a string ID
    setLinks([...links, { id: tempId, platform: "", link: "", userId }]);
  };

  const handleLinkChange = (index, field, value) => {
    const updatedLinks = links.map((link, i) =>
      i === index ? { ...link, [field]: value } : link
    );
    setLinks(updatedLinks);
    console.log(links);
  };

  const handleRemoveLink = (index) => {
    const linkToRemove = links[index];
    console.log(linkToRemove);

    // Check if link already exists in the database (has a MongoDB ObjectId)
    if (linkToRemove.link_id) {
      apiService
        .deleteLink(linkToRemove.link_id)
        .then(() => {
          toast.success("Link deleted!");
          setLinks(links.filter((_, i) => i !== index)); // Update the state to remove the deleted link from the UI
        })
        .catch((error) => {
          console.error("Error deleting link:", error);
          toast.error("Failed to delete link.");
        });
    } else {
      // If the link is not yet saved in the database, simply remove it from the UI
      setLinks(links.filter((_, i) => i !== index));
    }
  };

  const handleSave = () => {
    links.forEach((link) => {
      // If the link is new and doesn't have a MongoDB ObjectId, create it
      if (!link._id) {
        apiService
          .addLink({ platform: link.platform, link: link.link })
          .then((response) => {
            // Update the link in the state with the ID returned from the server
            setLinks((prevLinks) =>
              prevLinks.map((l) =>
                l.id === link.id ? { ...l, _id: response.data._id } : l
              )
            );
            toast.success("Link created!");
          })
          .catch((error) => {
            console.error("Error creating link:", error);
            toast.error("Failed to create link.");
          });
      }
    });
  };

  if (loading) {
    return <Shimmer />;
  }
  return (
    <>
      <Navbar />
      <div className="full-section">
        <div className="main-section">
          <div className="left-addlinks">
            <div className="smartphone">
              <div className="profile-container">
                <div className="profile-details-section">
                  <img src={profilePictureImage} alt="Profile Picture" />
                  <span className="name">Joginder Singh</span>
                  <span className="email">jogindersingh@gmail.com</span>
                </div>
                <ul className="links">
                  {links.map((link, index) => (
                    <li key={index}>
                      <a href={link.link} className={link.platform}>
                        {link.platform}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="right-addlinks">
            <div className="container">
              <h2>Customize your links</h2>
              <span className="add-remove-para">
                Add/edit/remove links below and then share all your profiles
                with the world!
              </span>
              <button id="add-link-btn" onClick={handleAddLink}>
                + Add new link
              </button>
              <form id="links-form">
                {links.map((link, index) => (
                  <div className="link" key={index}>
                    <label htmlFor={`platform-${index}`}>Platform</label>
                    <select
                      id={`platform-${index}`}
                      value={link.platform}
                      onChange={(e) =>
                        handleLinkChange(index, "platform", e.target.value)
                      }
                      required
                    >
                      <option value="" disabled>
                        Select Platform
                      </option>
                      <option value="GitHub">GitHub</option>
                      <option value="LinkedIn">LinkedIn</option>
                      <option value="Facebook">Facebook</option>
                      <option value="YouTube">YouTube</option>
                      <option value="GitLab">GitLab</option>
                    </select>
                    <label htmlFor={`link-${index}`}>Link</label>
                    <input
                      type="url"
                      id={`link-${index}`}
                      value={link.link}
                      onChange={(e) =>
                        handleLinkChange(index, "link", e.target.value)
                      }
                      required
                    />
                    <button
                      type="button"
                      className="remove-link-btn"
                      onClick={() => handleRemoveLink(index)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </form>
              <button type="button" className="save-btn" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default AddLinks;

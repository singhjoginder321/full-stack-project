import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import uploadImageIcon from "../assets/images/image-icon.png";
import Loader from "../components/Loader"; // Import your Loader component
import apiService from "../services/apiService";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState(""); // State to store OTP
  const [profilePicture, setProfilePicture] = useState(null);
  const [otpSent, setOtpSent] = useState(false); // State to track OTP sent status
  const [isLoading, setIsLoading] = useState(false); // State to track loading
  const [selectedImage, setSelectedImage] = useState(null);

  const handleProfilePictureChange = (e) => {
    console.log("IMAGE UPLOADED");
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
      setSelectedImage(URL.createObjectURL(file));
    }
  };
  const handleSendOtp = async () => {
    setIsLoading(true); // Show loader
    try {
      await apiService.sendOtp({ email });
      setOtpSent(true); // Update the state to indicate OTP is sent
      toast.success("OTP sent to your email!");
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false); // Hide loader after request completes
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otpSent) {
      handleSendOtp();
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    const name = `${firstName} ${lastName}`;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("profilePicture", profilePicture);
    formData.append("otp", otp); // Include OTP in form data

    try {
      console.log("FormData Contents:");
      formData.forEach((value, key) => {
        console.log(key, value);
      });

      await apiService.register(formData); // Use the apiService to make the API call
      toast.success("Signup successful!");
    } catch (error) {
      console.error("Error during signup:", error);

      const errorMessage =
        error.response?.data?.message || "Signup failed. Please try again.";

      toast.error(errorMessage);
    }
  };

  return (
    <form id="signup-form" onSubmit={handleSubmit}>
      <div className="profile-upload-container">
        <div className="upload-label">
          <label htmlFor="profile-picture">Profile picture</label>
        </div>
        <div className="upload-area">
          <input
            type="file"
            id="profile-picture"
            accept="image/*"
            onChange={handleProfilePictureChange}
          />
          {/* <label htmlFor="profile-picture" className="upload-button">
            <img
              src={uploadImageIcon}
              alt="Upload Icon"
              className="upload-icon"
            />
            <span>+ Upload Image</span>
          </label> */}
          <label htmlFor="profile-picture" className="upload-button">
            {selectedImage ? (
              // Show the uploaded image if one is selected
              <img
                src={selectedImage}
                alt="Uploaded Profile"
                className="upload-icon"
                style={{ width: "100px", height: "100px", objectFit: "cover" }} // Adjust size and styling as needed
              />
            ) : (
              // Otherwise, show the upload icon
              <>
                <img
                  src={uploadImageIcon}
                  alt="Upload Icon"
                  className="upload-icon"
                />
                <span>+ Upload Image</span>
              </>
            )}
          </label>
        </div>
        <div className="upload-info">
          <p>Image must be below 1024x1024px. Use PNG or JPG format.</p>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="first-name">First name*</label>
        <input
          type="text"
          id="first-name"
          required
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="last-name">Last name*</label>
        <input
          type="text"
          id="last-name"
          required
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email*</label>
        <input
          type="email"
          id="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password*</label>
        <input
          type="password"
          id="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="confirm-password">Confirm Password*</label>
        <input
          type="password"
          id="confirm-password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      {otpSent && ( // Conditionally render OTP field
        <div className="form-group">
          <label htmlFor="otp">Enter OTP*</label>
          <input
            type="text"
            id="otp"
            required
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </div>
      )}
      <div className="submit-button">
        <button type="submit" disabled={isLoading}>
          {isLoading ? <Loader info="OTP" /> : otpSent ? "Sign Up" : "Send OTP"}{" "}
          {/* Change button text based on OTP status */}
        </button>
      </div>
    </form>
  );
};

export default Signup;

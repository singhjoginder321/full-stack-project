import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import apiService from "../services/apiService"; // Adjust the import path as needed

const AlreadyUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showResetForm, setShowResetForm] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const credentials = {
      email,
      password,
    };

    try {
      const response = await apiService.login(credentials);
      const { token } = response.data;
      localStorage.setItem("token", token);

      toast.success("Login successful!");
      setEmail("");
      setPassword("");
      navigate("/add-links");
    } catch (error) {
      console.error("Error during login:", error);
      const errorMessage =
        error.response?.data?.message || "Login failed. Please try again.";
      toast.error(errorMessage);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      await apiService.resetPassword({ email: resetEmail });
      toast.success("Password reset link sent to your email.");
      setResetEmail("");
      setShowResetForm(false);
    } catch (error) {
      console.error("Error during password reset:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Failed to reset password. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <div>
      {showResetForm ? (
        <form id="reset-password-form" onSubmit={handleResetPassword}>
          <div className="form-group">
            <label htmlFor="reset-email">Email*</label>
            <input
              type="email"
              id="reset-email"
              required
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
            />
          </div>
          <div className="submit-button">
            <button type="submit">Reset Password</button>
          </div>
          <button type="button" onClick={() => setShowResetForm(false)}>
            Back to Login
          </button>
        </form>
      ) : (
        <form id="login-form" onSubmit={handleSubmit}>
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
          <div className="submit-button">
            <button type="submit">Login</button>
          </div>
          <button type="button" onClick={() => setShowResetForm(true)}>
            Forgot Password?
          </button>
        </form>
      )}
    </div>
  );
};

export default AlreadyUser;

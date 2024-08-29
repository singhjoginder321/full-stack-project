import React, { useState } from "react";
import { toast } from "react-toastify";
import apiService from "../services/apiService"; // Adjust the import path as needed

const AlreadyUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const credentials = {
      email,
      password,
    };

    try {
      // Await the login response
      const response = await apiService.login(credentials);

      // Assuming the token is in response.data.token
      const { token } = response.data;
      localStorage.setItem("token", token);

      toast.success("Login successful!");
      //clear form fields on successful login
      setEmail("");
      setPassword("");

      // Optionally redirect user or perform additional actions here
    } catch (error) {
      console.error("Error during login:", error);

      // Extract error message from server response if available
      const errorMessage =
        error.response?.data?.message || "Login failed. Please try again.";

      toast.error(errorMessage);
    }
  };

  return (
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
    </form>
  );
};

export default AlreadyUser;

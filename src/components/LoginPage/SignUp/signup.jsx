import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // For navigation
import axios from "axios"; // HTTP requests
import { signupSchema } from "../../Validators/signupSchema"; // Import validation schema
import logo from "/public/assets/logo.png"; // Your logo file
import "./signup.css";
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({}); // Changed to object to store individual errors
  const [loading, setLoading] = useState(false); // Optional: for handling loading state
  const navigate = useNavigate(); // Hook to redirect after signup

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError({}); // Clear any previous errors

    const data = { username, password };

    try {
      // Validate inputs using Yup
      await signupSchema.validate(data, { abortEarly: false });

      setLoading(true);

      const response = await axios.post(
        "https://localhost:7007/api/auth/signup",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert("Account created successfully. Please log in.");
        navigate("/signin"); // Redirect to signin page
      }
    } catch (err) {
      if (err.name === "ValidationError") {
        // Validation errors from Yup
        const errorMessages = err.inner.reduce((acc, error) => {
          acc[error.path] = error.message; // Store each error by field name
          return acc;
        }, {});
        setError(errorMessages);
      } else if (err.response) {
        // Server-side error
        setError({
          general:
            err.response.data.message ||
            "Something went wrong. Please try again.",
        });
      } else if (err.request) {
        // Network error
        setError({ general: "Network error, please try again later." });
      } else {
        // Other unknown error
        setError({ general: "An error occurred, please try again." });
      }
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="d-flex">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
      />

      <Link to="/">
        <img src={logo} className="logo_signup" alt="Logo" />
      </Link>

      <div className="contact_section" id="contact">
        <h2 className="section_title_contact" id="contactTitle">
          Sign Up
        </h2>
        <form id="contactForm" onSubmit={handleSubmit}>
          <div className="contact_container_container">
            <div className="contact_container">
              <div className="inputs">
                <div className="input-container">
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="off"
                    className="item1"
                    id="name"
                  />
                  {error.username && (
                    <div className="error-txt">{error.username}</div>
                  )}{" "}
                  {/* Username error */}
                </div>
                <div className="input-container">
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="off"
                    className="item2"
                    id="password"
                  />
                  {error.password && (
                    <div className="error-txt">{error.password}</div>
                  )}{" "}
                  {/* Password error */}
                </div>
                {error.general && (
                  <div className="error-txt">{error.general}</div>
                )}{" "}
                {/* General error */}
                <div className="under_inputs d-flex">
                  <label>
                    <input type="checkbox" className="item3" />
                  </label>
                  <span className="remember">Remember me</span>
                  <span className="remember2">
                    Forgot{" "}
                    <a className="anch_sign" href="#">
                      {" "}
                      Password?
                    </a>
                  </span>
                </div>
                <button
                  type="submit"
                  className="btn custom_button"
                  disabled={loading}
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </button>
                <div className="under mt-3">
                  <span>
                    Already have an account?{" "}
                    <Link to="/signin">
                      <a className="anch_sign" href="#">
                        Sign In
                      </a>
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      <img
        className="background_image"
        src="/assets/HeroBackground2.jpg"
        alt="sign in image"
      />
    </div>
  );
};

export default Signup;

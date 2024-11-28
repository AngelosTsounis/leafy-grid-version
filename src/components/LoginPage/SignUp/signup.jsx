import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate to redirect after successful signup
import axios from "axios"; // Import axios for HTTP requests
import logo from "/public/assets/logo.png";
import "./signup.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State to handle errors
  const [loading, setLoading] = useState(false); // Optional: for handling loading state
  const navigate = useNavigate(); // Hook to redirect after signup

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!username || !email || !password) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    setError(""); // Clear any previous errors

    const data = {
      username,
      email,
      password,
    };

    try {
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
        // Success, redirect to login page or show success message
        alert("Account created successfully. Please log in.");
        navigate("/signin"); // Redirect to signin page
      }
    } catch (error) {
      // Handle error response
      if (error.response) {
        // The server responded with a status other than 2xx
        setError(
          error.response.data.message ||
            "Something went wrong, please try again."
        );
      } else if (error.request) {
        // The request was made but no response was received
        setError("Network error, please try again later.");
      } else {
        // Something else happened while setting up the request
        setError("Error occurred while making the request.");
      }
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="d-flex">
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
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="off"
                  className="item1"
                  id="name"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="off"
                  className="item2"
                  id="password"
                />
                <input
                  type="email"
                  placeholder="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="off"
                  id="email"
                  className="item2"
                />
                {error && <div className="error-txt">{error}</div>}{" "}
                {/* Display error message */}
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

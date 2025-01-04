import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./sign.css";
import logo from "/public/assets/logo.png";

const SignIn = () => {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State for error messages
  const [loading, setLoading] = useState(false); // State for loading button
  const navigate = useNavigate(); // Hook to redirect after login

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!username || !password) {
      setError("Please provide both username and password.");
      return;
    }

    setLoading(true);
    setError("");

    const data = {
      username,
      password,
    };

    try {
      const response = await axios.post(
        "https://localhost:7007/api/auth/login",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem("jwtToken", token);
        navigate("/dashboard");
      }
    } catch (error) {
      // Handle errors
      if (error.response) {
        setError(
          error.response.data.message || "Invalid username or password."
        );
      } else if (error.request) {
        setError("Network error, please try again later.");
      } else {
        setError("An error occurred. Please try again.");
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
          Sign In
        </h2>
        <form id="contactForm" onSubmit={handleSubmit}>
          <div className="contact_container_container">
            <div className="contact_container">
              <div className="inputs">
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setusername(e.target.value)}
                  autoComplete="off"
                  className="item1"
                  id="username"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="off"
                  id="password"
                  className="item2"
                />
                {error && <div className="error-txt">{error}</div>}{" "}
                {/* Show error message */}
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
                  {loading ? "Logging In..." : "Login"}
                </button>
                <div className="under mt-3">
                  <span>
                    Don't have an account?{" "}
                    <Link to="/signup">
                      <a className="anch_sign" href="#">
                        Sign Up
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
        src="/assets/Hero-Background.png"
        alt="sign in image"
      />
    </div>
  );
};

export default SignIn;

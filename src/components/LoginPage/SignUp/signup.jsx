import React from "react";
import { Link } from "react-router-dom";
import logo from "/public/assets/logo.png";

import "./signup.css";

const signup = () => {
  return (
    <div className="d-flex">
      <Link to="/">
        <img src={logo} className="logo_signup" />
      </Link>

      <div className="contact_section" id="contact">
        <h2 className="section_title_contact" id="contactTitle">
          Sign Up
        </h2>
        <form id="contactForm" action="#">
          <div className="contact_container_container">
            <div className="contact_container">
              <div className="inputs">
                <input
                  type="text"
                  placeholder="Username"
                  autoComplete="off"
                  className="item1"
                  id="name"
                />

                {/* <div className="error-txt">Full name can't be blank</div> */}
                <input
                  type="password"
                  placeholder="Password"
                  autoComplete="off"
                  id="email"
                  className="item2"
                />
                <input
                  type="email"
                  placeholder="E-mail"
                  autoComplete="off"
                  id="email"
                  className="item2"
                />
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
                <button type="submit" className="btn custom_button">
                  Create Account
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

export default signup;

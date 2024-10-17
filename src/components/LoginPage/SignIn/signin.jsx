import React from "react";
import "./sign.css";
import { Link } from "react-router-dom";
import logo from "/public/assets/logo.png";

const SignIn = () => {
  return (
    <div className="d-flex">
      <Link to="/">
        <img src={logo} className="logo_signup" />
      </Link>
      <div className="contact_section" id="contact">
        <h2 className="section_title_contact" id="contactTitle">
          Sign In
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
                  Login
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

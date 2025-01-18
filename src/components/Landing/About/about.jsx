import React from "react";
import "./about.css";

const About = () => {
  return (
    <section className="section_about" id="about">
      <div className="about_container">
        <h1 className="h1_about">About Leafy</h1>
        <p className="p_about">
          At Leafy, we've transformed recycling into a fun and rewarding
          experience by gamifying the process. Every milestone you achieve
          brings you closer to climbing the ranks and unlocking amazing gifts.
          Start recycling today and turn your efforts into exciting rewards!
        </p>
      </div>
      <div className="img_container">
        <div className="img_box">
          <div className="img_about1">
            <img
              className="eikona1"
              src="/assets/Leafy_About1.png"
              alt="Garden1"
            />
          </div>
          <div className="flex23">
            <div className="img_about2">
              <img
                className="eikona2"
                src="/assets/Leafy_About2.png"
                alt="Garden2"
              />
            </div>
            <div className="img_about3">
              <img
                className="eikona3"
                src="/assets/HeroBackground2.jpg"
                alt="Garden3"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

import React from "react";
import "./about.css";

const About = () => {
  return (
    <section className="section_about" id="about">
      <div className="about_container">
        <h1 className="h1_about">About Leafy</h1>
        <p className="p_about">
          Find your peace of mind, flexibility, and confidence to embrace your
          next adventure in one of the most iconic neighbourhoods of Athens
          city. Under the momentous gaze of the Acropolis, our apartments offer
          the ultimate experience of luxury along with tradition and history.
        </p>
      </div>
      <div className="img_container">
        <div className="img_box">
          <div className="img_about1">
            <img
              className="eikona1"
              src="/assets/HeroBackground2.jpg"
              alt="Garden1"
            />
          </div>
          <div className="flex23">
            <div className="img_about2">
              <img
                className="eikona2"
                src="/assets/Hero-Background.png"
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

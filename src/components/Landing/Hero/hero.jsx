import React from "react";
import "./hero.css";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="section_hero" id="home">
      <div className="hero1">
        <div className="hero1_containers">
          <h1 className="hero_text">
            Track your recycling history and get Rewards!
          </h1>
          <p className="hero_p">
            Innovative super web app which offers more than just recycling
            schedules. It’s a way of life in order to make the planet green.
          </p>
          <div>
            <Link to="/signin">
              <button className="hero_btn">Try it out!</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

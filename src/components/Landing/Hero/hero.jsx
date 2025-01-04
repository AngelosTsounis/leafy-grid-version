import React from "react";
import "./hero.css";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="section_hero" id="home">
      <div className="hero1">
        <div className="hero1_containers">
          <h1 className="hero_text">
            Turn Recycling Into a Game! Level Up, Earn Rewards & Save the
            Planet!
          </h1>
          <p className="hero_p">
            Welcome to the ultimate recycling experience! Track your recycling
            progress, unlock exciting levels, and earn exciting rewards for
            making a difference. Recycling isn’t just a habit; it’s a fun,
            rewarding journey toward a greener planet. Are you ready to join the
            eco-hero leaderboard and make every item count?
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

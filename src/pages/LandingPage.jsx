import React from "react";
import Header from "../components/Landing/Header/header";
import Hero from "../components/Landing/Hero/hero";
import About from "../components/Landing/About/about";
import Explore from "../components/Landing/Explore/explore";
import Testimonials from "../components/Landing/Testimonials/testimonials";
import Footer from "../components/Landing/Footer/footer";

const LandingPage = () => {
  return (
    <div>
      <Header />
      <Hero />
      <About />
      <Explore />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default LandingPage;

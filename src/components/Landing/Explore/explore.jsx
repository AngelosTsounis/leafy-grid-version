import React from "react";
import "./explore.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import slides from "./sliders";

const Explore = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <section className="section_explore" id="explore">
      <h1 className="h1_explore">How It Works</h1>
      <Slider {...settings}>
        {slides.map((d) => (
          <div
            key={d.id}
            className={`sliders ${d.id === 1 ? "slide-id-1" : ""} 
            `}
          >
            <img
              className="slider_img"
              src={`/../assets/${d.coverImg}`}
              alt=""
            />
            <div className="explore1">
              <div className="explore1_containers">
                <div className="number">{d.number} </div>
                <div className="circle">
                  {d.circle}
                  <h1 className="explore1_text">{d.title}</h1>
                  <h2 className="explore1_text"></h2>
                  <p className="explore1_p">{d.paragraph}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Explore;

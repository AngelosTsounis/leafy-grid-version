import React from "react";
import "./testimonials.css";
import data from "./testimonialsdata";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    // autoplay: true,
    // autoplaySpeed: 2800,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="testimonials" id="testimonials">
      <div className="container">
        <div className="section-header">
          <h2 className="title">Top Players in the Game</h2>
        </div>
        <div className="testimonials_content">
          <Slider {...settings}>
            {data.map((d, index) => (
              <div
                key={d.id}
                className={`testimonial_item ${index === 0 ? "first" : ""}`}
              >
                <div className="testimonial_inner">
                  <img
                    className="coverImg"
                    src={`/../assets/${d.coverImg}`}
                    alt=""
                  />
                  <div className="info">
                    <p className="testimonial_title">{d.name}</p>
                    <p className="testimonial_location">{d.rank}</p>

                    <div className="d-flex">
                      {" "}
                      <span className="before_rank">
                        Points | {d.points}
                      </span>{" "}
                      <img
                        className="rankImg"
                        src={`/../assets/${d.rankImg}`}
                        alt=""
                      />
                    </div>
                    <p className="testimonial_location">
                      World Ranking Position | {d.position}
                    </p>
                    {/* <span className="star">
                      // <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                    </span> */}
                  </div>
                </div>
                <p className="testimonial_description">{d.description}</p>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

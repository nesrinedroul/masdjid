import React, { useState, useEffect } from "react";
import "./index.css";

const eventSlides = [
  {
    title: "Special Event 1",
    description: "Join us for a special Quran recitation event this weekend.",
    image: "./inside.jpg",
  },
  {
    title: "Special Event 2",
    description: "Community Iftar on the first Friday of Ramadan.",
    image: "./inside2.jpg",
  },
  {
    title: "Special Event 3",
    description: "Annual Mosque Fundraiser to support ongoing renovations.",
    image: "./background.png",
  },
];

function News() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === eventSlides.length - 1 ? 0 : prevSlide + 1
      );
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div id="about-section" className="about-container">
     <h1 className="h1about"> Announcement</h1>
      <div className="slideshow-container">
        <div className="slide">
          <img
            src={eventSlides[currentSlide].image}
            alt={eventSlides[currentSlide].title}
            className="slide-image"
          />
          <div className="slide-content">
            <h2 className="slide-title">{eventSlides[currentSlide].title}</h2>
            <p className="slide-description">
              {eventSlides[currentSlide].description}
            </p>
          </div>
        </div>
        <div className="slide-indicators">
          {eventSlides.map((_, index) => (
            <span
              key={index}
              className={`indicator ${index === currentSlide ? "active" : ""}`}
              onClick={() => setCurrentSlide(index)}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default News;

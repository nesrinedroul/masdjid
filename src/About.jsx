import React from "react";
import "./index.css";

function About() {
  return (
    <>
  <h1 className="h1about">About Us</h1>
    <div id="about-section" className="about-container">
      <div className="section left-image">
        <div className="section-image">
          <img src="./inside.jpg" alt="Mission" className="section-img" />
        </div>
        <div className="section-content">
          <h2 className="section-title">Our Mission: A Peaceful Sanctuary</h2>
          <p className="section-description">
            At Mosque El Shefaa, our mission is to provide a peaceful sanctuary
            for prayer, reflection, and community. We strive to grow spiritually,
            welcoming everyone to join us in daily prayers and special events.
          </p>
        </div>
      </div>

      {/* Story Section - Image on Right, Text on Left */}
      <div className="section right-image">
        <div className="section-content">
          <h2 className="section-title">Our Story</h2>
          <p className="section-description">
            Founded to foster spiritual connection, Mosque El Shefaa has become
            a pillar of the community. Over the years, we have grown to support
            our members in their spiritual journeys, creating a place where all
            are welcome to learn, pray, and thrive together.
          </p>
        </div>
        <div className="section-image">
          <img src="./inside2.jpg" alt="Story" className="section-img" />
        </div>
      </div>
    </div></>
  );
}

export default About;

import React from "react";
import "./index.css";  // Ensure your styles are defined here

function InfoPage() {
  return (
    <div className="info-page-container">
      <div className="info-text">
        <h1 className="info-title animate-fade-in"><span className="allah">Allah</span> Will always Help Who Moves In his way .</h1>
        <p className="info-description animate-fade-in-delay">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
        </p>
        <button className="info-button">know more</button>
      </div>
      <div className="info-image">
        <img src="./background.png" alt="Mosque" />
      </div>
    </div>
  );
}

export default InfoPage;



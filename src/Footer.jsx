import React from "react";
import "./index.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h2 className="footer-title">About Us</h2>
          <p className="footer-text">
            Mosque El Shefaa is a peaceful sanctuary for prayer, reflection, and community. We welcome everyone to join us in our daily prayers and special events.
          </p>
        </div>
        <div className="footer-section links">
          <h2 className="footer-title">Quick Links</h2>
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#salah">Prayer Times</a></li>
            <li><a href="#program">Programs</a></li>
            <li><a href="#contact">Contact Us</a></li>
          </ul>
        </div>
        <div className="footer-section contact">
          <h2 className="footer-title">Contact Us</h2>
          <p><i className="fas fa-map-marker-alt"></i> Bainam, Algeria</p>
          <p><i className="fas fa-phone"></i> +213 123 456 789</p>
          <p><i className="fas fa-envelope"></i> info@mosqueelshefaa.com</p>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; 2024 Mosque El Shefaa | All Rights Reserved
      </div>
    </footer>
  );
}

export default Footer;

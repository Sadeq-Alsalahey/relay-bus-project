import React from "react";
import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand */}
        <div className="footer-brand">
          <h2 className="footer-logo">RelayBus</h2>
          <p className="footer-description">
            Smart Transportation Solutions
          </p>
        </div>

        {/* Links */}
        <nav className="footer-links" aria-label="Footer navigation">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>

        <nav className="footer-links" aria-label="Services">
          <h3>Services</h3>
          <ul>
            <li><a href="#fleet-management">Fleet Management</a></li>
            <li><a href="#route-planning">Route Planning</a></li>
            <li><a href="#driver-management">Driver Management</a></li>
            <li><a href="#analytics">Analytics</a></li>
          </ul>
        </nav>

        <nav className="footer-links" aria-label="Support">
          <h3>Support</h3>
          <ul>
            <li><a href="#help-center">Help Center</a></li>
            <li><a href="#documentation">Documentation</a></li>
            <li><a href="#privacy-policy">Privacy Policy</a></li>
            <li><a href="#terms-of-service">Terms of Service</a></li>
          </ul>
        </nav>
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <p>© 2026 RelayBus. All rights reserved.</p>

        <div className="footer-icons" aria-hidden="true">
          <span>🚌</span>
          <span>🛑</span>
          <span>🚦</span>
          <span>🚄</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

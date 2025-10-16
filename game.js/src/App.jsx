import React from "react";
import "./App.css";

function App() {
  return (
    <>
      {/* Top Header */}
      <div className="top-header">
        <div className="header-left">
          <div className="fia-logo">FIA</div>
          <div className="race-series">Race Series</div>
        </div>
        <div className="header-right">
          <nav className="top-nav">
            <a href="#">AUTHENTICS</a>
            <a href="#">STORE</a>
            <a href="#">TICKETS</a>
            <a href="#">HOSPITALITY</a>
            <a href="#">EXPERIENCES</a>
          </nav>
          <div className="f1-tv">F1 TV</div>
          <button className="sign-in-btn">Sign In</button>
          <button className="subscribe-btn">Subscribe</button>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="main-nav">
        <div className="f1-logo">F1</div>
        <div className="nav-links">
          <a href="#">Schedule</a>
          <a href="#">Results</a>
          <a href="#">News</a>
          <a href="#">Drivers</a>
          <a href="#">Teams</a>
          <a href="#">Fantasy &amp; Gaming</a>
          <a href="#">F1 Members' Area</a>
        </div>
      </nav>

      {/* Race Info Bar */}
      <div className="race-info">
        <div className="race-left">
          <span className="race-round">R19 17 - 20 OCT</span>
          <span className="race-location">United States</span>
        </div>
        <div className="race-right">
          <div className="time-block">
            <div className="time-label">MY TIME</div>
            <div className="time-value">00:16</div>
          </div>
          <div className="time-block">
            <div className="time-label">TRACK TIME</div>
            <div className="time-value">21:16</div>
          </div>
        </div>
      </div>

      {/* Back Link */}
      <div className="back-section">
        <a href="#" className="back-link">
          All drivers
        </a>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <div className="tab active">Statistics</div>
        <div className="tab">Biography</div>
        <div className="tab">News</div>
      </div>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-shape-1"></div>
        <div className="hero-shape-2"></div>
        <div className="hero-shape-3"></div>

        <div className="hero-content">
          <div className="driver-firstname">Max</div>
          <div className="driver-lastname">VERSTAPPEN</div>
          <div className="driver-details">
            <span className="country">Netherlands</span>
            <span className="team">Red Bull Racing</span>
            <span className="number">1</span>
          </div>
          <button className="shop-btn">Shop now</button>
        </div>
      </section>
    </>
  );
}

export default App;

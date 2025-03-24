import React from 'react';
import './SplashScreen.css';
import logo from '../logo/logo.png';

function SplashScreen() {
  return (
    <div className="splash-container">
      <div className="splash-content">
        <img src={logo} alt="Macaron Logo" className="splash-logo" />
        <div className="loading-animation">
          <div className="macaron macaron-1"></div>
          <div className="macaron macaron-2"></div>
          <div className="macaron macaron-3"></div>
        </div>
        <p className="splash-text">Sweet delights loading...</p>
      </div>
    </div>
  );
}

export default SplashScreen;
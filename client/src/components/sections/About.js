import React from 'react';
import './About.css';
import { FaHeart, FaLeaf, FaStar, FaCertificate } from 'react-icons/fa';

function About() {
  return (
    <div className="about-section">
      <h2 className="section-title">Our Story</h2>
      
      <div className="about-content">
        <div className="about-intro">
          <p>
            Welcome to Karl's Macarons, where passion meets perfection in every delicate, 
            colorful treat we create. Our journey began with a simple love for the art of 
            French pâtisserie and has blossomed into a dedicated pursuit of creating the 
            perfect macaron.
          </p>
        </div>
        
        <div className="about-values">
          <div className="value-card">
            <div className="value-icon">
              <FaHeart />
            </div>
            <h3>Passion</h3>
            <p>We pour our hearts into every macaron we create, treating each one as a small work of art.</p>
          </div>
          
          <div className="value-card">
            <div className="value-icon">
              <FaLeaf />
            </div>
            <h3>Quality</h3>
            <p>We use only the finest organic ingredients, sourced locally whenever possible.</p>
          </div>
          
          <div className="value-card">
            <div className="value-icon">
              <FaStar />
            </div>
            <h3>Innovation</h3>
            <p>While respecting tradition, we love to experiment with unique flavor combinations.</p>
          </div>
          
          <div className="value-card">
            <div className="value-icon">
              <FaCertificate />
            </div>
            <h3>Craftsmanship</h3>
            <p>Each macaron is meticulously handcrafted with attention to detail and technical perfection.</p>
          </div>
        </div>
        
        <div className="about-milestones">
          <div className="milestone">
            <div className="milestone-year">2018</div>
            <div className="milestone-content">
              <h3>The Beginning</h3>
              <p>Our founder Karl discovered his passion for macarons during a trip to Paris.</p>
            </div>
          </div>
          
          <div className="milestone">
            <div className="milestone-year">2022</div>
            <div className="milestone-content">
              <h3>Growth</h3>
              <p>We expanded our shop and launched our online store, shipping nationwide.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;